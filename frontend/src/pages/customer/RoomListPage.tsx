import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import { hotelService } from '../../services/hotel.service';
import HotelCard from '../../components/customer/HotelCard';
import SearchForm from '../../components/customer/SearchForm';
import { formatVND } from '../../utils/format';

type SortKey = 'price_asc' | 'price_desc' | 'capacity_asc';

const PLACEHOLDER = 'https://placehold.co/400x300?text=No+Image';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

// Component thanh trượt giá 2 đầu tự thiết kế (Native HTML5 Range)
const DualPriceSlider = ({
  priceMin,
  priceMax,
  onChange,
}: {
  priceMin: number | '';
  priceMax: number | '';
  onChange: (min: number | '', max: number | '') => void;
}) => {
  const minLimit = 0;
  const maxLimit = 10000000; // Giới hạn tối đa là 10 triệu
  
  // Nếu trống thì lấy mặc định mốc min/max
  const currentMin = priceMin === '' ? minLimit : priceMin;
  const currentMax = priceMax === '' ? maxLimit : priceMax;

  const getPercent = (val: number) => Math.round(((val - minLimit) / (maxLimit - minLimit)) * 100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), currentMax - 100000);
    if (val === minLimit && currentMax === maxLimit) {
      onChange('', '');
    } else {
      onChange(val === minLimit ? '' : val, currentMax === maxLimit ? '' : currentMax);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), currentMin + 100000);
    if (currentMin === minLimit && val === maxLimit) {
      onChange('', '');
    } else {
      onChange(currentMin === minLimit ? '' : currentMin, val === maxLimit ? '' : val);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <style>
        {`
          .dual-range::-webkit-slider-thumb {
            pointer-events: auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #2563eb;
            cursor: pointer;
            -webkit-appearance: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .dual-range::-moz-range-thumb {
            pointer-events: auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #2563eb;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border: none;
          }
        `}
      </style>

      <div className="relative w-full h-8 flex items-center justify-center">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full z-0" />
        <div
          className="absolute h-1.5 bg-primary rounded-full z-10"
          style={{
            left: `${getPercent(currentMin)}%`,
            right: `${100 - getPercent(currentMax)}%`,
          }}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={100000} // Nhảy mỗi bước là 100.000đ
          value={currentMin}
          onChange={handleMinChange}
          className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-20"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={100000}
          value={currentMax}
          onChange={handleMaxChange}
          className="dual-range absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none z-20"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-700 bg-gray-50 text-center font-medium whitespace-nowrap">
          {formatVND(currentMin)}
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex-1 border border-gray-200 rounded-xl px-2 py-2 text-sm text-gray-700 bg-gray-50 text-center font-medium whitespace-nowrap">
          {currentMax >= maxLimit ? '10M+' : formatVND(currentMax)}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-100 rounded-full w-16" />
        <div className="h-6 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="h-8 bg-gray-100 rounded-xl mt-2" />
    </div>
  </div>
);

const DiscoveryCollections = () => {
  const navigate = useNavigate();
  const { data: roomTypes = [], isLoading } = useQuery({
    queryKey: ['hotels', 'all'],
    queryFn: () => hotelService.getAllRoomTypes(),
  });

  const collections = useMemo(() => {
    return {
      couples: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('standard') || rt.typeName.toLowerCase().includes('deluxe')),
      luxury: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('premium') || rt.typeName.toLowerCase().includes('suite')),
      family: roomTypes.filter((rt: any) => rt.typeName.toLowerCase().includes('family')),
    };
  }, [roomTypes]);

  if (isLoading) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-72" />
      ))}
    </div>
  );

  const renderSection = (title: string, subtitle: string, list: any[]) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-10">
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((rt: any) => (
            <div key={rt.id || rt.roomTypeId}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              onClick={() => navigate(`/room-type/${rt.id || rt.roomTypeId}`)}
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={rt.images?.[0]?.imageUrl ?? rt.roomImages?.[0]?.imageUrl ?? PLACEHOLDER}
                  alt={rt.typeName}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-white text-base font-medium">{rt.typeName}</span>
                  <span className="bg-white/95 text-primary text-sm font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {formatVND(Number(rt.basePrice))}/đêm
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Sức chứa tối đa: {rt.maxCapacity} người</div>
                  <div className="flex flex-wrap gap-1">
                    {rt.amenities?.slice(0, 3).map((a: any) => (
                      <span key={a.id || a.amenityId} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {a.amenity?.amenityName || a.amenityName}
                      </span>
                    ))}
                    {(rt.amenities?.length ?? 0) > 3 && (
                      <span className="text-xs text-gray-400 self-center ml-1">+{rt.amenities!.length - 3}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/room-type/${rt.id || rt.roomTypeId}`);
                  }}
                  className="w-full border border-primary text-primary py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Xem chi tiết & Đặt phòng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {renderSection('Dành cho Cặp đôi', 'Không gian ấm cúng, thiết kế tinh tế và đầy đủ tiện nghi cho kỳ nghỉ lãng mạn', collections.couples)}
      {renderSection('Trải nghiệm Đẳng cấp', 'Hạng phòng sang trọng bậc nhất với tầm nhìn thượng uyển và dịch vụ cá nhân hóa', collections.luxury)}
      {renderSection('Kỳ nghỉ Gia đình', 'Không gian rộng rãi, kết nối tối ưu, lý tưởng cho những khoảnh khắc gắn kết thành viên', collections.family)}
    </div>
  );
};

const StayInclusions = () => (
  <div className="bg-gray-50 py-12 px-6 border-t border-gray-100">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-medium text-gray-800 text-center mb-1 bg-clip-text">
        Đặc quyền dành riêng cho bạn
      </h2>
      <p className="text-sm text-gray-400 text-center mb-8">Trải nghiệm trọn vẹn giá trị nghỉ dưỡng cao cấp tích hợp trong mỗi lượt đặt phòng</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
        {[
          { title: 'Hồ bơi vô cực', desc: 'Tự do thư giãn với tầm nhìn toàn cảnh tuyệt đẹp trên tầng cao nhất' },
          { title: 'Bữa sáng buffet', desc: 'Khởi đầu ngày mới với thực đơn phong phú tại nhà hàng cao cấp' },
          { title: 'Dọn phòng hằng ngày', desc: 'Đảm bảo không gian lưu trú luôn sạch sẽ, ngăn nắp và thơm mát' },
          { title: 'Đồ uống chào mừng', desc: 'Thưởng thức hương vị tươi mát đặc trưng ngay khi hoàn tất nhận phòng' },
        ].map(item => (
          <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center items-center">
            <p className="font-medium text-gray-800 text-base mb-1">{item.title}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RoomListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1);
  const roomCount = Number(searchParams.get('roomCount') ?? 1);

  const [priceMin, setPriceMin] = useState<number | ''>('');
  const [priceMax, setPriceMax] = useState<number | ''>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('price_asc');
  const [showFilter, setShowFilter] = useState(false);

  const enabled = !!checkIn && !!checkOut && !!guests;

  const queryParams = {
    checkIn,
    checkOut,
    guests,
    roomCount,
    ...(priceMin !== '' && { minPrice: priceMin }),
    ...(priceMax !== '' && { maxPrice: priceMax }),
  };

  const { data: rooms = [], isLoading, isError, refetch } = useAvailableRooms(
    enabled ? queryParams : {}
  );

  const filtered = useMemo(() => {
    let list = [...rooms];

    if (selectedAmenities.length > 0) {
      list = list.filter((rt) =>
        selectedAmenities.every((name) =>
          rt.amenities?.some((a: any) => (a.amenity?.amenityName || a.amenityName) === name)
        )
      );
    }

    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => (a.lowestPrice ?? Number(a.basePrice)) - (b.lowestPrice ?? Number(b.basePrice)));
        break;
      case 'price_desc':
        list.sort((a, b) => (b.lowestPrice ?? Number(b.basePrice)) - (a.lowestPrice ?? Number(a.basePrice)));
        break;
      case 'capacity_asc':
        list.sort((a, b) => a.maxCapacity - b.maxCapacity);
        break;
    }

    return list;
  }, [rooms, selectedAmenities, sort]);

  const amenityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    rooms.forEach((rt: any) => {
      const uniqueAmenities = new Set<string>();
      rt.amenities?.forEach((a: any) => {
        const name = a.amenity?.amenityName || a.amenityName;
        if (name) uniqueAmenities.add(name);
      });
      uniqueAmenities.forEach(name => { counts[name] = (counts[name] || 0) + 1; });
    });
    // Chuyển thành mảng và sắp xếp ưu tiên những tiện ích có nhiều phòng nhất lên đầu
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [rooms]);

  const toggleAmenity = (name: string) =>
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );

  const clearFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedAmenities([]);
    setSort('price_asc');
  };

  const extendCheckOut = () => {
    if (!checkOut) return;
    const newCheckOut = new Date(checkOut);
    newCheckOut.setDate(newCheckOut.getDate() + 1);
    const newCheckOutStr = newCheckOut.toISOString().split('T')[0];
    const newParams = new URLSearchParams(searchParams);
    newParams.set('checkOut', newCheckOutStr);
    setSearchParams(newParams);
  };

  const hasFilter = priceMin !== '' || priceMax !== '' || selectedAmenities.length > 0;
  const activeFilterCount = selectedAmenities.length + (priceMin !== '' || priceMax !== '' ? 1 : 0);

  if (!enabled) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-primary to-primary-dark py-12 px-6">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h1 className="text-4xl font-medium text-white mb-2">
              Tìm không gian lý tưởng của bạn
            </h1>
            <p className="text-white/70 text-sm">
              Nhập thông tin lịch trình để kiểm tra tình trạng phòng trống và nhận báo giá ưu đãi chính xác nhất
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-xl">
            <SearchForm />
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-800">Khám phá các bộ sưu tập phòng</h2>
          </div>
          <DiscoveryCollections />
        </div>

        <StayInclusions />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-base text-gray-600 mb-3">
          <span className="font-medium text-gray-800">
            {formatDate(checkIn)} → {formatDate(checkOut)}
          </span>
          <span className="text-gray-300">·</span>
          <span>{guests} khách</span>
          <button
            onClick={() => navigate('/')}
            className="ml-auto text-sm text-primary hover:underline font-medium"
          >
            Đổi tiêu chí tìm kiếm
          </button>
        </div>
        <SearchForm />
      </div>

      <div className="flex gap-6 relative">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Bộ lọc</h2>
              {hasFilter && (
                <button onClick={clearFilters} className="text-sm text-primary hover:underline font-medium">
                  Xóa tất cả
                </button>
              )}
            </div>

            <div className="mb-6">
              <p className="text-base font-medium text-gray-700 mb-3">Giá / đêm</p>
              <DualPriceSlider 
                priceMin={priceMin} 
                priceMax={priceMax} 
                onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }} 
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: 'Dưới 1tr', min: undefined, max: 1000000 },
                  { label: '1 - 3tr', min: 1000000, max: 3000000 },
                  { label: 'Trên 3tr', min: 3000000, max: undefined },
                ].map((p) => {
                  const active = priceMin === (p.min ?? '') && priceMax === (p.max ?? '');
                  return (
                    <button
                      key={p.label}
                      onClick={() => {
                        setPriceMin(p.min ?? '');
                        setPriceMax(p.max ?? '');
                      }}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        active
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 text-gray-600 hover:border-primary/50'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {amenityCounts.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-base font-medium text-gray-700 mb-3">Tiện ích</p>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {amenityCounts.map(([name, count]) => (
                    <label key={name} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(name)}
                          onChange={() => toggleAmenity(name)}
                          className="w-4 h-4 rounded border-gray-300 text-primary accent-primary"
                        />
                        <span className="text-base text-gray-600 group-hover:text-gray-800 transition-colors">{name}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              {!isLoading && (
                <p className="text-base text-gray-600">
                  {filtered.length > 0 ? (
                    <>
                      <span className="font-bold text-gray-800">{filtered.length}</span> hạng phòng phù hợp
                      {hasFilter && (
                        <span className="ml-2 text-sm text-primary font-medium">
                          (đã lọc từ {rooms.length})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-medium text-gray-800">Không tìm thấy phòng phù hợp</span>
                  )}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="lg:hidden flex items-center gap-2 text-base border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Bộ lọc
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-base border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white cursor-pointer"
              >
                <option value="price_asc">Giá: Thấp → Cao</option>
                <option value="price_desc">Giá: Cao → Thấp</option>
                <option value="capacity_asc">Sức chứa tăng dần</option>
              </select>
            </div>
          </div>

          {/* Tag bộ lọc đang chọn (Active Filter Pills) */}
          {hasFilter && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 mr-1">Đang lọc theo:</span>
              {(priceMin !== '' || priceMax !== '') && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  Giá: {priceMin ? formatVND(Number(priceMin)) : '0đ'} - {priceMax ? formatVND(Number(priceMax)) : 'Trở lên'}
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); }} className="hover:text-blue-900 ml-1 text-base leading-none">&times;</button>
                </span>
              )}
              {selectedAmenities.map((name) => (
                <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                  {name}
                  <button onClick={() => toggleAmenity(name)} className="hover:text-blue-900 ml-1 text-base leading-none">&times;</button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-gray-700 underline ml-2 transition-colors">
                Xóa tất cả
              </button>
            </div>
          )}

          {showFilter && (
            <div className="lg:hidden bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
              <p className="text-base font-medium text-gray-700 mb-2">Giá / đêm</p>
              <div className="mb-4">
                <DualPriceSlider 
                  priceMin={priceMin} 
                  priceMax={priceMax} 
                  onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }} 
                />
              </div>

              <p className="text-base font-medium text-gray-700 mb-2">Tiện ích</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {amenityCounts.map(([name, count]) => (
                  <button
                    key={name}
                    onClick={() => toggleAmenity(name)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      selectedAmenities.includes(name)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-200 text-gray-600 hover:border-primary/50'
                    }`}
                  >
                    {name} ({count})
                  </button>
                ))}
              </div>

              {hasFilter && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 bg-gray-50 text-gray-600 text-base font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          )}

          {isLoading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-800 font-medium text-base">Đã xảy ra lỗi khi tải dữ liệu</p>
              <button
                onClick={() => refetch()}
                className="text-base font-medium text-primary border border-primary px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-6 text-center rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
              <div className="max-w-md">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Không có phòng phù hợp
                </p>
                <p className="text-base text-gray-500 leading-relaxed">
                  {hasFilter 
                    ? `Đang lọc từ ${rooms.length} kết quả nhưng không có phòng nào khớp với bộ lọc của bạn.`
                    : `Rất tiếc, chúng tôi không tìm thấy phòng trống nào trong khoảng thời gian `}
                  {!hasFilter && (
                    <>
                      <span className="font-medium text-gray-700">{formatDate(checkIn)} — {formatDate(checkOut)} </span>
                      cho <span className="font-medium text-gray-700">{roomCount} phòng và {guests} khách</span>.
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                {hasFilter ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center text-base font-medium text-primary border border-primary px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors w-full"
                  >
                    Xóa bộ lọc
                  </button>
                ) : (
                  <button
                    onClick={extendCheckOut}
                    className="flex items-center justify-center text-base font-medium text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors w-full"
                  >
                    Thêm 1 ngày (trả phòng ngày {formatDate(
                      new Date(new Date(checkOut).setDate(new Date(checkOut).getDate() + 1))
                        .toISOString().split('T')[0]
                    )})
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center text-base text-gray-400 hover:text-gray-600 transition-colors mt-2"
                >
                  Tìm kiếm lại từ đầu
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((room: any) => (
                <HotelCard
                  key={room.id}
                  roomType={room}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
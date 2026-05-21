import { useState, useMemo} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAvailableRooms } from '../../hooks/queries/use-hotels.query';
import HotelCard from '../../components/customer/HotelCard';
import SearchForm from '../../components/customer/SearchForm';

type SortKey = 'price_asc' | 'price_desc' | 'capacity_asc';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
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

const RoomListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Đọc params hiện tại (Giữ nguyên logic cũ bao gồm cả roomCount)
  const checkIn = searchParams.get('checkIn') ?? '';
  const checkOut = searchParams.get('checkOut') ?? '';
  const guests = Number(searchParams.get('guests') ?? 1);
  const roomCount = Number(searchParams.get('roomCount') ?? 1);

  // Filter state (Mới)
  const [priceMin, setPriceMin] = useState<number | ''>('');
  const [priceMax, setPriceMax] = useState<number | ''>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('price_asc');
  const [showFilter, setShowFilter] = useState(false);

  const enabled = !!checkIn && !!checkOut && !!guests;

  // Hợp nhất query params cho API
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

  // Lọc tiện ích + Sort ở client-side
  const filtered = useMemo(() => {
    let list = [...rooms];

    if (selectedAmenities.length > 0) {
      list = list.filter((rt) =>
        selectedAmenities.every((name) =>
          rt.amenities?.some((a: any) => a.amenityName === name)
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

  // Gộp tất cả amenities từ kết quả tìm kiếm
  const allAmenities = useMemo(() => {
    const set = new Set<string>();
    rooms.forEach((rt: any) => rt.amenities?.forEach((a: any) => set.add(a.amenityName)));
    return Array.from(set);
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

  // Tính năng cũ: Tăng checkOut thêm 1 ngày nếu không có phòng
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

  // Chưa có search params
  if (!enabled) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Tìm phòng phù hợp với bạn</h2>
          <p className="text-gray-500 text-sm">
            Vui lòng nhập ngày nhận phòng, trả phòng và số khách để xem danh sách phòng.
          </p>
        </div>
        <div className="w-full">
          <SearchForm />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">

      {/* Search bar compact */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-800">
            {formatDate(checkIn)} → {formatDate(checkOut)}
          </span>
          <span className="text-gray-300">·</span>
          <span>{guests} khách</span>
          <button
            onClick={() => navigate('/')}
            className="ml-auto text-xs text-primary hover:underline font-medium"
          >
            Đổi tiêu chí tìm kiếm
          </button>
        </div>
        <SearchForm />
      </div>

      <div className="flex gap-6 relative">

        {/* ── SIDEBAR BỘ LỌC (desktop) ── */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-medium text-gray-800">Bộ lọc</h2>
              {hasFilter && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline font-medium">
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Giá */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Giá / đêm</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : '')}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : '')}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Quick price filters */}
              <div className="flex flex-wrap gap-2 mt-3">
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
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
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

            {/* Tiện ích */}
            {allAmenities.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-3">Tiện ích</p>
                <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {allAmenities.map((name) => (
                    <label key={name} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(name)}
                        onChange={() => toggleAmenity(name)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── NỘI DUNG CHÍNH ── */}
        <div className="flex-1 min-w-0">

          {/* Header kết quả + Sort */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              {!isLoading && (
                <p className="text-sm text-gray-600">
                  {filtered.length > 0 ? (
                    <>
                      <span className="font-bold text-gray-800">{filtered.length}</span> hạng phòng phù hợp
                      {hasFilter && (
                        <span className="ml-2 text-xs text-primary font-medium">
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
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="lg:hidden flex items-center gap-2 text-sm border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Bộ lọc
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="price_asc">Giá: Thấp → Cao</option>
                <option value="price_desc">Giá: Cao → Thấp</option>
                <option value="capacity_asc">Sức chứa tăng dần</option>
              </select>
            </div>
          </div>

          {/* Mobile filter panel */}
          {showFilter && (
            <div className="lg:hidden bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-2">Giá / đêm</p>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Giá từ"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : '')}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="number"
                  placeholder="Giá đến"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : '')}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <p className="text-sm font-medium text-gray-700 mb-2">Tiện ích</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {allAmenities.map((name) => (
                  <button
                    key={name}
                    onClick={() => toggleAmenity(name)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      selectedAmenities.includes(name)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {hasFilter && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-800 font-medium text-sm">Đã xảy ra lỗi khi tải dữ liệu</p>
              <button
                onClick={() => refetch()}
                className="text-sm font-medium text-primary border border-primary px-5 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Empty State (Hợp nhất Logic cũ) */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-6 text-center rounded-2xl bg-white border border-gray-100 shadow-sm px-4">
              <div className="max-w-md">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Không có phòng phù hợp
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
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
                    className="flex items-center justify-center text-sm font-medium text-primary border border-primary px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors w-full"
                  >
                    Xóa bộ lọc
                  </button>
                ) : (
                  <button
                    onClick={extendCheckOut}
                    className="flex items-center justify-center text-sm font-medium text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors w-full"
                  >
                    Thêm 1 ngày (trả phòng ngày {formatDate(
                      new Date(new Date(checkOut).setDate(new Date(checkOut).getDate() + 1))
                        .toISOString().split('T')[0]
                    )})
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-600 hover:underline transition-colors mt-2"
                >
                  Tìm kiếm lại từ đầu
                </button>
              </div>
            </div>
          )}

          {/* Grid kết quả */}
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
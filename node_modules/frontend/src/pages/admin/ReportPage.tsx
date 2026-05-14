import { useState } from 'react';
import { useRevenueReport } from '../../hooks/queries/useAdminBookingsQuery';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import * as XLSX from 'xlsx';

const getStartOfMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
};

const getEndOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${lastDay}`;
};

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

// Format cho trục Y của biểu đồ
const formatMillions = (value: number) => {
  if (value === 0) return '0';
  return `${(value / 1_000_000).toFixed(1)}tr`;
};

// Custom Tooltip cho biểu đồ
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md text-sm">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="text-primary font-medium">
        {formatVND(payload[0].value)}
      </p>
    </div>
  );
};

const ReportPage = () => {
  const [from, setFrom] = useState(getStartOfMonth());
  const [to, setTo] = useState(getEndOfMonth());
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading } = useRevenueReport(
    submitted ? from : '',
    submitted ? to : ''
  );

  const handleSubmit = () => {
    if (from >= to) {
      setError('Ngày bắt đầu phải trước ngày kết thúc');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleExportExcel = () => {
    if (!data || !data.monthly) return;

    // Chuẩn bị dữ liệu để xuất Excel
    const excelData = data.monthly.map((item: any) => ({
      'Tháng': item.month,
      'Doanh thu (VNĐ)': item.revenue,
      'Số đơn': item.bookingCount,
    }));

    // Tạo worksheet và workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');

    // Xuất file
    XLSX.writeFile(workbook, 'bao-cao-doanh-thu.xlsx');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── Heading ── */}
      <h2 className="text-lg font-medium text-gray-800">Báo cáo doanh thu</h2>

      {/* ── Filter ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setError('');
              setSubmitted(false);
            }}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setError('');
              setSubmitted(false);
            }}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors"
        >
          Xem báo cáo
        </button>

        {error && (
          <p className="text-red-500 text-xs w-full">{error}</p>
        )}
      </div>

      {/* ── Loading skeleton ── */}
      {isLoading && (
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-7 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-72" />

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-32" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Data ── */}
      {!isLoading && submitted && data && (
        <div className="flex flex-col gap-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tổng doanh thu</span>
              <p className="text-2xl font-semibold text-primary">
                {formatVND(data.summary.totalRevenue)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tổng đơn đặt phòng</span>
              <p className="text-2xl font-semibold text-gray-800">
                {data.summary.totalBookings} đơn
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400">Tỉ lệ lấp đầy trung bình</span>
              <p className="text-2xl font-semibold text-gray-800">
                {data.summary.avgOccupancyRate}%
              </p>
            </div>
          </div>

          {/* Biểu đồ */}
          {data.monthly.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-medium text-gray-800 mb-4">
                Doanh thu theo tháng
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={data.monthly}
                  margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
                >
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={formatMillions}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                  <Bar
                    dataKey="revenue"
                    fill="#0f4c81"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Monthly table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Chi tiết theo tháng</h3>
              {data.monthly.length > 0 && (
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                >
                  Xuất Excel
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Tháng</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Doanh thu</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Số đơn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.monthly.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-10 text-gray-400 text-sm">
                        Không có dữ liệu trong khoảng thời gian này
                      </td>
                    </tr>
                  )}
                  {data.monthly.map((item: any) => (
                    <tr key={item.month} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-800 font-medium">{item.month}</td>
                      <td className="px-5 py-3 text-primary font-medium">
                        {formatVND(item.revenue)}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{item.bookingCount} đơn</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Placeholder ── */}
      {!isLoading && !submitted && !error && (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-400 text-sm">
            Chọn khoảng thời gian và nhấn "Xem báo cáo"
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
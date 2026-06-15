import { useState } from 'react';
import { useRevenueReport } from '../../hooks/queries/useAdminBookingsQuery';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const getStartOfPeriod = (monthsAgo: number = 6) => {
  const now = new Date();
  now.setMonth(now.getMonth() - (monthsAgo - 1));
  now.setDate(1);
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
};

const getEndOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${lastDay}`;
};

const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

const formatMillions = (value: number) => {
  if (value === 0) return '0';
  return `${(value / 1_000_000).toFixed(1)}tr`;
};

const COLORS = ['#0f4c81', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md text-sm">
      <p className="text-gray-500 mb-1">{label || payload[0].name}</p>
      <p className="text-primary font-medium">
        {formatVND(payload[0].value)}
      </p>
    </div>
  );
};

const ReportPage = () => {
  const [from, setFrom] = useState(getStartOfPeriod(6)); 
  const [to, setTo] = useState(getEndOfMonth());
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(true); 

  const { data, isLoading } = useRevenueReport(
    submitted ? from : '',
    submitted ? to : ''
  );

  const rawPieData = data?.byRoomType || data?.roomTypeRevenue || data?.revenueByRoomType || [];
  const pieData = rawPieData.map((item: any) => ({
    name: item.roomTypeName || item.name || item.roomType || 'Chưa xác định',
    revenue: Number(item.revenue || item.total || item.amount || 0)
  })).filter((item: any) => item.revenue > 0);

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

    const workbook = XLSX.utils.book_new();

    const excelData = data.monthly.map((item: any) => ({
      'Tháng': item.month,
      'Doanh thu (VNĐ)': item.revenue,
      'Số đơn': item.bookingCount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');

    if (data.byRoomType && data.byRoomType.length > 0) {
      const roomTypeData = data.byRoomType.map((item: any) => ({
        'Hạng phòng': item.roomTypeName || item.name,
        'Doanh thu (VNĐ)': item.revenue,
      }));
      const roomTypeSheet = XLSX.utils.json_to_sheet(roomTypeData);
      XLSX.utils.book_append_sheet(workbook, roomTypeSheet, 'Theo hạng phòng');
    }

    XLSX.writeFile(workbook, 'bao-cao-doanh-thu.xlsx');
  };

  const handleExportPDF = () => {
    if (!data || !data.monthly) return;

    const doc = new jsPDF();
    const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const formatVND_PDF = (amount: number) => amount.toLocaleString('vi-VN') + 'd';

    const primary: [number, number, number] = [15, 76, 129];

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('BÁO CÁO DOANH THU'), 14, 20);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(removeAccents(`Thời gian: Từ ${from} đến ${to}`), 14, 28);
    doc.text(removeAccents(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`), 14, 34);

    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('TỔNG QUAN'), 14, 45);
    
    doc.setFont('helvetica', 'normal');
    doc.text(removeAccents(`Tổng doanh thu: ${formatVND_PDF(data.summary.totalRevenue)}`), 14, 52);
    doc.text(removeAccents(`Tổng số đơn đặt phòng: ${data.summary.totalBookings}`), 14, 59);
    doc.text(removeAccents(`Tỉ lệ lấp đầy trung bình: ${data.summary.avgOccupancyRate}%`), 14, 66);

    let finalY = 75;

    doc.setFont('helvetica', 'bold');
    doc.text(removeAccents('DOANH THU THEO THÁNG'), 14, finalY);

    const monthlyBody = data.monthly.map((item: any) => [
      item.month,
      formatVND_PDF(item.revenue),
      String(item.bookingCount)
    ]);

    autoTable(doc, {
      startY: finalY + 5,
      head: [[removeAccents('Tháng'), removeAccents('Doanh thu'), removeAccents('Số đơn')]],
      body: monthlyBody,
      headStyles: { fillColor: primary, fontSize: 9 },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14 }
    });

    finalY = (doc as any).lastAutoTable.finalY + 15;

    if (pieData.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text(removeAccents('DOANH THU THEO HẠNG PHÒNG'), 14, finalY);

      const roomTypeBody = pieData.map((item: any) => [
        removeAccents(item.name),
        formatVND_PDF(item.revenue)
      ]);

      autoTable(doc, {
        startY: finalY + 5,
        head: [[removeAccents('Hạng phòng'), removeAccents('Doanh thu')]],
        body: roomTypeBody,
        headStyles: { fillColor: primary, fontSize: 9 },
        bodyStyles: { fontSize: 10 },
        margin: { left: 14 }
      });
    }

    doc.save('bao-cao-doanh-thu.pdf');
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Báo cáo doanh thu</h2>

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

      {!isLoading && submitted && data && (
        <div className="flex flex-col gap-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col">
              <h3 className="text-sm font-medium text-gray-800 mb-4">
                Doanh thu theo hạng phòng
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="revenue"
                      nameKey="name"
                    >
                      {pieData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex-1 w-full min-h-[280px] flex flex-col items-center justify-center text-center text-sm text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 p-4">
                  <span>API Backend hiện tại chưa trả về dữ liệu doanh thu theo hạng phòng.</span>
                </div>
              )}
            </div>
          </div>

          {/* Monthly table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-800">Chi tiết theo tháng</h3>
              {data.monthly.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleExportPDF}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Xuất PDF
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Xuất Excel
                  </button>
                </div>
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
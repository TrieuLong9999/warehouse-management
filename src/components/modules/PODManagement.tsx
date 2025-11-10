import React from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { FilterBar } from '../FilterBar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { KPICard } from '../KPICard';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';

const podData = [
  { maPOD: 'POD-2024-001', khachHang: 'Công ty ABC', ngayGiao: '01/11/2024', nguoiNhan: 'Nguyễn Văn A', trangThai: 'recovered', ngayThuHoi: '02/11/2024' },
  { maPOD: 'POD-2024-002', khachHang: 'Công ty XYZ', ngayGiao: '02/11/2024', nguoiNhan: 'Trần Thị B', trangThai: 'pending', ngayThuHoi: '' },
  { maPOD: 'POD-2024-003', khachHang: 'Doanh nghiệp 123', ngayGiao: '03/11/2024', nguoiNhan: 'Lê Văn C', trangThai: 'error', ngayThuHoi: '' },
  { maPOD: 'POD-2024-004', khachHang: 'Công ty DEF', ngayGiao: '04/11/2024', nguoiNhan: 'Phạm Thị D', trangThai: 'recovered', ngayThuHoi: '05/11/2024' },
  { maPOD: 'POD-2024-005', khachHang: 'Công ty ABC', ngayGiao: '05/11/2024', nguoiNhan: 'Hoàng Văn E', trangThai: 'pending', ngayThuHoi: '' },
];

const podStatusChart = [
  { name: 'Đã thu hồi', value: 145, color: '#10b981' },
  { name: 'Chưa thu hồi', value: 32, color: '#f59e0b' },
  { name: 'Lỗi/Mất', value: 8, color: '#ef4444' },
];

const timeline = [
  { date: '01/11/2024 09:30', event: 'Tạo phiếu giao', status: 'completed' },
  { date: '01/11/2024 14:15', event: 'Xuất kho', status: 'completed' },
  { date: '01/11/2024 16:45', event: 'Giao hàng thành công', status: 'completed' },
  { date: '02/11/2024 10:20', event: 'Thu hồi POD', status: 'completed' },
];

export function PODManagement() {
  const columns: Column[] = [
    { key: 'maPOD', label: 'Mã POD', width: '130px' },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'ngayGiao', label: 'Ngày giao', width: '120px' },
    { key: 'nguoiNhan', label: 'Người nhận' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '140px',
      render: (value) => {
        const statusMap: Record<string, string> = {
          recovered: 'Đã thu hồi',
          pending: 'Chưa thu hồi',
          error: 'Lỗi'
        };
        return <StatusBadge status={statusMap[value]} type={value === 'recovered' ? 'completed' : value === 'error' ? 'cancelled' : 'pending'} />;
      }
    },
    { key: 'ngayThuHoi', label: 'Ngày thu hồi', width: '130px' },
  ];

  const filterConfig = {
    dateFrom: {
      type: 'date' as const,
      label: 'Từ ngày',
      placeholder: 'Chọn ngày',
    },
    dateTo: {
      type: 'date' as const,
      label: 'Đến ngày',
      placeholder: 'Chọn ngày',
    },
    customer: {
      type: 'select' as const,
      label: 'Khách hàng',
      placeholder: 'Chọn khách hàng',
      options: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Công ty ABC', value: 'abc' },
        { label: 'Công ty XYZ', value: 'xyz' },
      ],
    },
    status: {
      type: 'select' as const,
      label: 'Trạng thái',
      placeholder: 'Chọn trạng thái',
      options: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Đã thu hồi', value: 'recovered' },
        { label: 'Chưa thu hồi', value: 'pending' },
        { label: 'Lỗi', value: 'error' },
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Quản lý chứng từ POD</h1>
          <p className="text-muted-foreground mt-1">Theo dõi và quản lý POD (Proof of Delivery)</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Đã thu hồi"
          value="145"
          icon={CheckCircle}
          color="#10b981"
        />
        <KPICard
          title="Chưa thu hồi"
          value="32"
          icon={Clock}
          color="#f59e0b"
        />
        <KPICard
          title="Lỗi/Mất POD"
          value="8"
          icon={XCircle}
          color="#ef4444"
        />
      </div>

      {/* Filters */}
      <FilterBar 
        filters={filterConfig}
        onSearch={() => console.log('Search')}
        onReset={() => console.log('Reset')}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <DataTable 
            columns={columns} 
            data={podData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
            onView={(row) => console.log('View', row)}
          />
        </div>

        {/* POD Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ thu hồi POD</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={podStatusChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {podStatusChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {podStatusChart.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full mt-4 bg-[#0046FF] hover:bg-[#003ACC]">
                  <FileText className="mr-2 h-4 w-4" />
                  Xem chi tiết POD
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[500px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Chi tiết POD-2024-001</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-[14px]">
                      <div className="text-muted-foreground">Khách hàng:</div>
                      <div className="font-medium">Công ty ABC</div>
                      <div className="text-muted-foreground">Người nhận:</div>
                      <div className="font-medium">Nguyễn Văn A</div>
                      <div className="text-muted-foreground">Ngày giao:</div>
                      <div className="font-medium">01/11/2024</div>
                      <div className="text-muted-foreground">Trạng thái:</div>
                      <div><StatusBadge status="Đã thu hồi" type="completed" /></div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium mb-4">Timeline thu hồi</h3>
                    <div className="space-y-4">
                      {timeline.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div 
                              className={`w-3 h-3 rounded-full ${
                                item.status === 'completed' ? 'bg-[#10b981]' : 'bg-gray-300'
                              }`}
                            />
                            {index < timeline.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="text-[14px] font-medium">{item.event}</div>
                            <div className="text-[12px] text-muted-foreground">{item.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { FilterBar } from '../FilterBar';
import { Button } from '../ui/button';
import { Upload, Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

const orderData = [
  { maDon: 'ORD-2024-001', khachHang: 'Công ty ABC', ngayTao: '01/11/2024', deadline: '10/11/2024', trangThai: 'completed', xacNhanTon: true, soLuong: 150 },
  { maDon: 'ORD-2024-002', khachHang: 'Công ty XYZ', ngayTao: '02/11/2024', deadline: '12/11/2024', trangThai: 'processing', xacNhanTon: true, soLuong: 200 },
  { maDon: 'ORD-2024-003', khachHang: 'Doanh nghiệp 123', ngayTao: '03/11/2024', deadline: '08/11/2024', trangThai: 'overdue', xacNhanTon: false, soLuong: 75 },
  { maDon: 'ORD-2024-004', khachHang: 'Công ty DEF', ngayTao: '04/11/2024', deadline: '15/11/2024', trangThai: 'pending', xacNhanTon: true, soLuong: 120 },
  { maDon: 'ORD-2024-005', khachHang: 'Công ty ABC', ngayTao: '05/11/2024', deadline: '09/11/2024', trangThai: 'pending', xacNhanTon: false, soLuong: 90 },
  { maDon: 'ORD-2024-006', khachHang: 'Công ty XYZ', ngayTao: '06/11/2024', deadline: '18/11/2024', trangThai: 'processing', xacNhanTon: true, soLuong: 180 },
];

export function OrderManagement() {
  const columns: Column[] = [
    { 
      key: 'maDon', 
      label: 'Mã đơn', 
      width: '130px',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {row.trangThai === 'overdue' && (
            <AlertCircle className="w-4 h-4 text-[#ef4444]" />
          )}
          <span>{value}</span>
        </div>
      )
    },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'ngayTao', label: 'Ngày tạo', width: '120px' },
    { 
      key: 'deadline', 
      label: 'Deadline', 
      width: '120px',
      render: (value, row) => (
        <span className={row.trangThai === 'overdue' ? 'text-[#ef4444] font-medium' : ''}>
          {value}
        </span>
      )
    },
    { key: 'soLuong', label: 'Số lượng', width: '100px' },
    { 
      key: 'xacNhanTon', 
      label: 'Xác nhận tồn', 
      width: '130px',
      render: (value) => (
        <StatusBadge 
          status={value ? 'Đã xác nhận' : 'Chưa xác nhận'} 
          type={value ? 'completed' : 'pending'} 
        />
      )
    },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => {
        const statusMap: Record<string, string> = {
          completed: 'Hoàn thành',
          processing: 'Đang xử lý',
          pending: 'Chờ duyệt',
          overdue: 'Quá hạn'
        };
        return <StatusBadge status={statusMap[value]} type={value} />;
      }
    },
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
        { label: 'Hoàn thành', value: 'completed' },
        { label: 'Đang xử lý', value: 'processing' },
        { label: 'Chờ duyệt', value: 'pending' },
        { label: 'Quá hạn', value: 'overdue' },
      ],
    },
  };

  const overdueOrders = orderData.filter(o => o.trangThai === 'overdue').length;
  const pendingOrders = orderData.filter(o => o.trangThai === 'pending' && !o.xacNhanTon).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground mt-1">Theo dõi và xử lý đơn hàng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Nhập từ Excel
          </Button>
          <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Tạo đơn mới
          </Button>
        </div>
      </div>

      {/* Alert Banners */}
      {overdueOrders > 0 && (
        <Alert className="border-[#ef4444] bg-[#ef444410]">
          <AlertCircle className="h-4 w-4 text-[#ef4444]" />
          <AlertDescription className="text-[#ef4444]">
            <strong>Cảnh báo:</strong> Có {overdueOrders} đơn hàng quá hạn cần xử lý ngay!
          </AlertDescription>
        </Alert>
      )}

      {pendingOrders > 0 && (
        <Alert className="border-[#f59e0b] bg-[#f59e0b10]">
          <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
          <AlertDescription className="text-[#f59e0b]">
            <strong>Chú ý:</strong> Có {pendingOrders} đơn hàng chưa xác nhận tồn kho
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <FilterBar 
        filters={filterConfig}
        onSearch={() => console.log('Search')}
        onReset={() => console.log('Reset')}
      />

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Tổng đơn', value: orderData.length, color: '#0046FF' },
          { label: 'Hoàn thành', value: orderData.filter(o => o.trangThai === 'completed').length, color: '#10b981' },
          { label: 'Đang xử lý', value: orderData.filter(o => o.trangThai === 'processing').length, color: '#008CFF' },
          { label: 'Chờ duyệt', value: orderData.filter(o => o.trangThai === 'pending').length, color: '#f59e0b' },
          { label: 'Quá hạn', value: overdueOrders, color: '#ef4444' },
        ].map((stat) => (
          <div 
            key={stat.label} 
            className="bg-white p-4 rounded-lg border border-border"
          >
            <div className="text-[14px] text-muted-foreground mb-1">{stat.label}</div>
            <div 
              className="text-[28px] font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={orderData}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onView={(row) => console.log('View', row)}
      />
    </div>
  );
}

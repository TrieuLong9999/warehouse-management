import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { FilterBar } from '../FilterBar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Upload, QrCode, Plus } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const receiptData = [
  { maNhap: 'IN-2024-001', khachHang: 'Công ty ABC', sanPham: 'Laptop Dell XPS 13', lotBatch: 'LOT-001', ngayNhap: '05/11/2024', putaway: 'A-01-02', trangThai: 'completed' },
  { maNhap: 'IN-2024-002', khachHang: 'Công ty XYZ', sanPham: 'iPhone 15 Pro', lotBatch: 'LOT-002', ngayNhap: '06/11/2024', putaway: 'B-03-01', trangThai: 'processing' },
  { maNhap: 'IN-2024-003', khachHang: 'Doanh nghiệp 123', sanPham: 'Samsung Galaxy S24', lotBatch: 'LOT-003', ngayNhap: '07/11/2024', putaway: 'A-02-05', trangThai: 'pending' },
  { maNhap: 'IN-2024-004', khachHang: 'Công ty DEF', sanPham: 'MacBook Pro M3', lotBatch: 'LOT-004', ngayNhap: '08/11/2024', putaway: 'C-01-03', trangThai: 'completed' },
  { maNhap: 'IN-2024-005', khachHang: 'Công ty ABC', sanPham: 'iPad Air', lotBatch: 'LOT-005', ngayNhap: '09/11/2024', putaway: '', trangThai: 'draft' },
];

const locationLayout = [
  { id: 'A-01-01', status: 'available', capacity: 80 },
  { id: 'A-01-02', status: 'occupied', capacity: 100 },
  { id: 'A-01-03', status: 'available', capacity: 60 },
  { id: 'A-02-01', status: 'available', capacity: 90 },
  { id: 'A-02-02', status: 'occupied', capacity: 95 },
  { id: 'A-02-03', status: 'available', capacity: 75 },
  { id: 'B-01-01', status: 'available', capacity: 85 },
  { id: 'B-01-02', status: 'occupied', capacity: 100 },
];

export function WarehouseReceipt() {
  const [filters, setFilters] = useState({});
  const [autoPutaway, setAutoPutaway] = useState(true);

  const columns: Column[] = [
    { key: 'maNhap', label: 'Mã nhập', width: '130px' },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'sanPham', label: 'Sản phẩm' },
    { key: 'lotBatch', label: 'Lot/Batch', width: '120px' },
    { key: 'ngayNhap', label: 'Ngày nhập', width: '130px' },
    { key: 'putaway', label: 'Putaway', width: '120px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => {
        const statusMap: Record<string, string> = {
          completed: 'Hoàn thành',
          processing: 'Đang xử lý',
          pending: 'Chờ duyệt',
          draft: 'Nháp'
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
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Nhập hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý phiếu nhập và putaway</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Excel
          </Button>
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR/Barcode
          </Button>
          <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Tạo phiếu nhập
          </Button>
        </div>
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
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox 
                id="auto-putaway" 
                checked={autoPutaway}
                onCheckedChange={(checked) => setAutoPutaway(checked as boolean)}
              />
              <label htmlFor="auto-putaway" className="text-[14px] cursor-pointer">
                Tự động Putaway
              </label>
            </div>
            <div className="text-[14px] text-muted-foreground">
              Tổng số: <strong>{receiptData.length}</strong> phiếu nhập
            </div>
          </div>
          <DataTable 
            columns={columns} 
            data={receiptData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
            onView={(row) => console.log('View', row)}
          />
        </div>

        {/* Putaway Suggestion Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Gợi ý Putaway</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-[14px] text-muted-foreground">
                Sơ đồ vị trí lưu kho - Kho A
              </div>
              <div className="grid grid-cols-3 gap-2">
                {locationLayout.map((location) => (
                  <div
                    key={location.id}
                    className={`p-3 rounded border-2 text-center transition-all cursor-pointer ${
                      location.status === 'available'
                        ? 'bg-[#10b98110] border-[#10b981] hover:bg-[#10b98120]'
                        : 'bg-[#f59e0b10] border-[#f59e0b]'
                    }`}
                  >
                    <div className="text-[12px] font-medium">{location.id}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      {location.capacity}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 text-[12px] pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#10b98130] border-2 border-[#10b981]"></div>
                  <span>Còn trống</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#f59e0b30] border-2 border-[#f59e0b]"></div>
                  <span>Đã sử dụng</span>
                </div>
              </div>
              <Button className="w-full bg-[#0046FF] hover:bg-[#003ACC]">
                Xác nhận Putaway
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

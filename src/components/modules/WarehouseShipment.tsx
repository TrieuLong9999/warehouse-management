import React from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { FilterBar } from '../FilterBar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Printer, CheckCircle, Smartphone } from 'lucide-react';
import { KPICard } from '../KPICard';
import { Package, Clock, CheckCircle2 } from 'lucide-react';

const shipmentData = [
  { maXuat: 'OUT-2024-001', khachHang: 'Công ty ABC', hangHoa: 'Laptop Dell XPS 13', soLuong: 50, fifoFefo: 'FIFO', trangThaiPick: 'completed' },
  { maXuat: 'OUT-2024-002', khachHang: 'Công ty XYZ', hangHoa: 'iPhone 15 Pro', soLuong: 120, fifoFefo: 'FIFO', trangThaiPick: 'processing' },
  { maXuat: 'OUT-2024-003', khachHang: 'Doanh nghiệp 123', hangHoa: 'Samsung Galaxy S24', soLuong: 80, fifoFefo: 'FEFO', trangThaiPick: 'pending' },
  { maXuat: 'OUT-2024-004', khachHang: 'Công ty DEF', hangHoa: 'MacBook Pro M3', soLuong: 35, fifoFefo: 'FIFO', trangThaiPick: 'completed' },
  { maXuat: 'OUT-2024-005', khachHang: 'Công ty ABC', hangHoa: 'iPad Air', soLuong: 65, fifoFefo: 'FIFO', trangThaiPick: 'processing' },
];

const pickingLocations = [
  { location: 'A-01-02', item: 'Laptop Dell', quantity: 20, priority: 1 },
  { location: 'A-02-05', item: 'Samsung Galaxy', quantity: 15, priority: 2 },
  { location: 'B-03-01', item: 'iPhone 15', quantity: 30, priority: 3 },
  { location: 'C-01-03', item: 'MacBook Pro', quantity: 10, priority: 4 },
];

export function WarehouseShipment() {
  const columns: Column[] = [
    { key: 'maXuat', label: 'Mã xuất', width: '130px' },
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'hangHoa', label: 'Hàng hóa' },
    { key: 'soLuong', label: 'Số lượng', width: '100px' },
    { key: 'fifoFefo', label: 'FIFO/FEFO', width: '110px' },
    { 
      key: 'trangThaiPick', 
      label: 'Trạng thái Pick', 
      width: '150px',
      render: (value) => {
        const statusMap: Record<string, string> = {
          completed: 'Hoàn thành',
          processing: 'Đang pick',
          pending: 'Chờ pick'
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
        { label: 'Đang pick', value: 'processing' },
        { label: 'Chờ pick', value: 'pending' },
      ],
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Xuất hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý phiếu xuất và picking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            In phiếu xuất
          </Button>
          <Button variant="outline">
            <Smartphone className="mr-2 h-4 w-4" />
            Quét RF Device
          </Button>
          <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
            <CheckCircle className="mr-2 h-4 w-4" />
            Xác nhận pick
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Tổng đơn đang xuất"
          value="24"
          icon={Package}
          color="#0046FF"
        />
        <KPICard
          title="Đơn chờ pick"
          value="8"
          icon={Clock}
          color="#f59e0b"
        />
        <KPICard
          title="Đơn hoàn tất hôm nay"
          value="127"
          icon={CheckCircle2}
          color="#10b981"
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
            data={shipmentData}
            onEdit={(row) => console.log('Edit', row)}
            onDelete={(row) => console.log('Delete', row)}
            onView={(row) => console.log('View', row)}
          />
        </div>

        {/* Picking Optimization Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Tối ưu hóa Picking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-[14px] text-muted-foreground">
                Lộ trình picking được đề xuất
              </div>
              <div className="space-y-3">
                {pickingLocations.map((loc) => (
                  <div
                    key={loc.location}
                    className="p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#0046FF] text-white flex items-center justify-center text-[12px] font-bold">
                            {loc.priority}
                          </div>
                          <span className="font-medium text-[14px]">{loc.location}</span>
                        </div>
                        <div className="text-[12px] text-muted-foreground mt-1 ml-8">
                          {loc.item}
                        </div>
                      </div>
                      <div className="text-[14px] font-medium text-[#0046FF]">
                        {loc.quantity} đơn vị
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-border">
                <div className="text-[12px] text-muted-foreground mb-2">
                  Tổng thời gian dự kiến: <strong>~15 phút</strong>
                </div>
                <div className="text-[12px] text-muted-foreground">
                  Khoảng cách: <strong>~250m</strong>
                </div>
              </div>
              <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
                Bắt đầu Picking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

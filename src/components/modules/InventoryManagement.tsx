import React from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { FilterBar } from '../FilterBar';
import { KPICard } from '../KPICard';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Download, Smartphone, Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const inventoryData = [
  { maHang: 'SKU-001', tenHang: 'Laptop Dell XPS 13', location: 'A-01-02', lot: 'LOT-001', soLuong: 145, hsd: '15/12/2025', fifoLifo: 'FIFO', trangThai: 'normal' },
  { maHang: 'SKU-002', tenHang: 'iPhone 15 Pro', location: 'B-03-01', lot: 'LOT-002', soLuong: 12, hsd: '01/01/2026', fifoLifo: 'FIFO', trangThai: 'low' },
  { maHang: 'SKU-003', tenHang: 'Samsung Galaxy S24', location: 'A-02-05', lot: 'LOT-003', soLuong: 320, hsd: '20/03/2025', fifoLifo: 'FEFO', trangThai: 'expiring' },
  { maHang: 'SKU-004', tenHang: 'MacBook Pro M3', location: 'C-01-03', lot: 'LOT-004', soLuong: 89, hsd: '10/06/2026', fifoLifo: 'FIFO', trangThai: 'normal' },
  { maHang: 'SKU-005', tenHang: 'iPad Air', location: 'A-03-01', lot: 'LOT-005', soLuong: 8, hsd: '30/01/2025', fifoLifo: 'FIFO', trangThai: 'critical' },
  { maHang: 'SKU-006', tenHang: 'Dell Monitor 27"', location: 'B-01-02', lot: 'LOT-006', soLuong: 234, hsd: '15/08/2026', fifoLifo: 'LIFO', trangThai: 'normal' },
];

const expiringItems = [
  { name: 'Samsung Galaxy S24', daysLeft: 15, quantity: 320 },
  { name: 'iPad Air', daysLeft: 8, quantity: 8 },
  { name: 'Laptop Asus ROG', daysLeft: 25, quantity: 45 },
];

const locationHeatmap = [
  { location: 'Kho A', quantity: 1245 },
  { location: 'Kho B', quantity: 892 },
  { location: 'Kho C', quantity: 678 },
  { location: 'Kho D', quantity: 1456 },
];

export function InventoryManagement() {
  const columns: Column[] = [
    { key: 'maHang', label: 'Mã hàng', width: '120px' },
    { key: 'tenHang', label: 'Tên hàng' },
    { key: 'location', label: 'Location', width: '100px' },
    { key: 'lot', label: 'Lot', width: '100px' },
    { 
      key: 'soLuong', 
      label: 'Số lượng', 
      width: '100px',
      render: (value, row) => (
        <span className={row.trangThai === 'critical' || row.trangThai === 'low' ? 'text-[#ef4444] font-medium' : ''}>
          {value}
        </span>
      )
    },
    { 
      key: 'hsd', 
      label: 'HSD', 
      width: '120px',
      render: (value, row) => (
        <span className={row.trangThai === 'expiring' ? 'text-[#f59e0b] font-medium' : ''}>
          {value}
        </span>
      )
    },
    { key: 'fifoLifo', label: 'FIFO/LIFO', width: '100px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => {
        const statusMap: Record<string, { label: string; type: string }> = {
          normal: { label: 'Bình thường', type: 'completed' },
          low: { label: 'Tồn thấp', type: 'pending' },
          critical: { label: 'Cảnh báo', type: 'cancelled' },
          expiring: { label: 'Sắp hết HSD', type: 'overdue' },
        };
        const status = statusMap[value] || statusMap.normal;
        return <StatusBadge status={status.label} type={status.type} />;
      }
    },
  ];

  const filterConfig = {
    search: {
      type: 'text' as const,
      label: 'Tìm kiếm',
      placeholder: 'Mã hàng, tên hàng...',
    },
    location: {
      type: 'select' as const,
      label: 'Kho/Location',
      placeholder: 'Chọn kho',
      options: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Kho A', value: 'kho-a' },
        { label: 'Kho B', value: 'kho-b' },
        { label: 'Kho C', value: 'kho-c' },
      ],
    },
    status: {
      type: 'select' as const,
      label: 'Trạng thái',
      placeholder: 'Chọn trạng thái',
      options: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Bình thường', value: 'normal' },
        { label: 'Tồn thấp', value: 'low' },
        { label: 'Cảnh báo', value: 'critical' },
        { label: 'Sắp hết HSD', value: 'expiring' },
      ],
    },
  };

  const criticalCount = inventoryData.filter(i => i.trangThai === 'critical').length;
  const lowCount = inventoryData.filter(i => i.trangThai === 'low').length;
  const expiringCount = inventoryData.filter(i => i.trangThai === 'expiring').length;
  const totalQuantity = inventoryData.reduce((sum, item) => sum + item.soLuong, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Quản trị tồn kho</h1>
          <p className="text-muted-foreground mt-1">Dashboard theo dõi tồn kho realtime</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Smartphone className="mr-2 h-4 w-4" />
            Kiểm kê RF
          </Button>
          <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Tổng tồn kho"
          value={totalQuantity}
          icon={Package}
          color="#0046FF"
        />
        <KPICard
          title="Cảnh báo tối thiểu"
          value={criticalCount}
          icon={AlertTriangle}
          color="#ef4444"
        />
        <KPICard
          title="Tồn thấp"
          value={lowCount}
          icon={TrendingDown}
          color="#f59e0b"
        />
        <KPICard
          title="Sắp hết HSD"
          value={expiringCount}
          icon={TrendingUp}
          color="#f59e0b"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tồn kho theo Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationHeatmap}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#0046FF" name="Số lượng" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expiring Items */}
        <Card>
          <CardHeader>
            <CardTitle>Hàng sắp hết HSD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringItems.map((item, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg border border-border bg-background"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-[14px]">{item.name}</div>
                      <div className="text-[12px] text-muted-foreground mt-1">
                        {item.quantity} đơn vị
                      </div>
                    </div>
                    <div 
                      className={`text-[14px] font-bold ${
                        item.daysLeft <= 10 ? 'text-[#ef4444]' : 'text-[#f59e0b]'
                      }`}
                    >
                      {item.daysLeft} ngày
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.max(10, (30 - item.daysLeft) / 30 * 100)}%`,
                        backgroundColor: item.daysLeft <= 10 ? '#ef4444' : '#f59e0b'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <FilterBar 
        filters={filterConfig}
        onSearch={() => console.log('Search')}
        onReset={() => console.log('Reset')}
      />

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={inventoryData}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onView={(row) => console.log('View', row)}
      />
    </div>
  );
}

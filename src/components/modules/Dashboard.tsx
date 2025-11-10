import React from 'react';
import { KPICard } from '../KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, TrendingUp, Archive, FileText, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '../ui/alert';

const orderData = [
  { date: '01/11', nhap: 120, xuat: 95 },
  { date: '02/11', nhap: 150, xuat: 110 },
  { date: '03/11', nhap: 180, xuat: 140 },
  { date: '04/11', nhap: 160, xuat: 125 },
  { date: '05/11', nhap: 200, xuat: 170 },
  { date: '06/11', nhap: 175, xuat: 160 },
  { date: '07/11', nhap: 190, xuat: 155 },
];

const inventoryBySKU = [
  { sku: 'SKU001', quantity: 1200 },
  { sku: 'SKU002', quantity: 850 },
  { sku: 'SKU003', quantity: 2100 },
  { sku: 'SKU004', quantity: 650 },
  { sku: 'SKU005', quantity: 1400 },
  { sku: 'SKU006', quantity: 980 },
];

const orderStatusData = [
  { name: 'Hoàn thành', value: 145, color: '#10b981' },
  { name: 'Đang xử lý', value: 32, color: '#0046FF' },
  { name: 'Chờ duyệt', value: 18, color: '#f59e0b' },
  { name: 'Đã hủy', value: 5, color: '#ef4444' },
];

const warehouseCapacity = [
  { type: 'Pallet', used: 450, total: 600 },
  { type: 'm²', used: 2800, total: 4000 },
  { type: 'm³', used: 8500, total: 12000 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">TỔNG HỢP HOẠT ĐỘNG KHO</h1>
          <p className="text-muted-foreground mt-1">Dashboard theo dõi realtime</p>
        </div>
        <div className="text-right text-[14px] text-muted-foreground">
          Cập nhật lúc: {new Date().toLocaleString('vi-VN')}
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert className="border-[#ef4444] bg-[#ef444410]">
          <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
          <AlertDescription className="text-[#ef4444]">
            <strong>Cảnh báo tồn kho tối thiểu:</strong> 12 SKU dưới mức an toàn
          </AlertDescription>
        </Alert>
        <Alert className="border-[#f59e0b] bg-[#f59e0b10]">
          <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />
          <AlertDescription className="text-[#f59e0b]">
            <strong>Đơn hàng pending quá hạn:</strong> 5 đơn hàng cần xử lý gấp
          </AlertDescription>
        </Alert>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Đơn hàng hôm nay"
          value="247"
          icon={Package}
          trend={{ value: '+12.5%', isPositive: true }}
          color="#0046FF"
        />
        <KPICard
          title="Số lượng nhập/xuất"
          value="1,245"
          icon={TrendingUp}
          trend={{ value: '+8.2%', isPositive: true }}
          color="#FFBE00"
        />
        <KPICard
          title="Tồn kho hiện tại"
          value="8,156"
          icon={Archive}
          trend={{ value: '-3.1%', isPositive: false }}
          color="#008CFF"
        />
        <KPICard
          title="POD chưa thu hồi"
          value="23"
          icon={FileText}
          color="#f59e0b"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory by SKU */}
        <Card>
          <CardHeader>
            <CardTitle>Tồn kho theo SKU</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryBySKU}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sku" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#0046FF" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Xu hướng nhập/xuất 7 ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nhap" stroke="#0046FF" strokeWidth={2} name="Nhập hàng" />
                <Line type="monotone" dataKey="xuat" stroke="#FFBE00" strokeWidth={2} name="Xuất hàng" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Warehouse Capacity */}
        <Card>
          <CardHeader>
            <CardTitle>Công suất kho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {warehouseCapacity.map((item) => {
              const percentage = (item.used / item.total) * 100;
              return (
                <div key={item.type} className="space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-muted-foreground">
                      {item.used.toLocaleString()} / {item.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: percentage > 80 ? '#ef4444' : percentage > 60 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                  <div className="text-right text-[12px] text-muted-foreground">
                    {percentage.toFixed(1)}% đã sử dụng
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React from 'react';
import { Download, TrendingUp, Package, Truck, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Reports() {
  const monthlyData = [
    { month: 'T6', inbound: 1200, outbound: 980, revenue: 125 },
    { month: 'T7', inbound: 1400, outbound: 1150, revenue: 145 },
    { month: 'T8', inbound: 1100, outbound: 920, revenue: 115 },
    { month: 'T9', inbound: 1600, outbound: 1380, revenue: 168 },
    { month: 'T10', inbound: 1800, outbound: 1520, revenue: 185 },
    { month: 'T11', inbound: 2100, outbound: 1780, revenue: 215 },
  ];

  const warehouseData = [
    { name: 'Kho A - Hà Nội', value: 45, color: '#0057FF' },
    { name: 'Kho B - TP.HCM', value: 35, color: '#10B981' },
    { name: 'Kho C - Đà Nẵng', value: 20, color: '#F59E0B' },
  ];

  const topProducts = [
    { sku: 'SKU-12345', name: 'Sản phẩm A', turnover: 2450, revenue: '245,000,000' },
    { sku: 'SKU-67890', name: 'Sản phẩm B', turnover: 2100, revenue: '210,000,000' },
    { sku: 'SKU-11223', name: 'Sản phẩm C', turnover: 1890, revenue: '189,000,000' },
    { sku: 'SKU-44556', name: 'Sản phẩm D', turnover: 1650, revenue: '165,000,000' },
    { sku: 'SKU-77889', name: 'Sản phẩm E', turnover: 1420, revenue: '142,000,000' },
  ];

  const topCustomers = [
    { name: 'Công ty TNHH ABC', orders: 145, revenue: '145,000,000' },
    { name: 'Doanh nghiệp XYZ', orders: 128, revenue: '128,000,000' },
    { name: 'Siêu thị DEF', orders: 112, revenue: '112,000,000' },
    { name: 'Nhà phân phối JKL', orders: 98, revenue: '98,000,000' },
    { name: 'Cửa hàng GHI', orders: 87, revenue: '87,000,000' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Báo cáo & Thống kê</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Phân tích hiệu suất và xu hướng hoạt động kho vận
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="3months">3 tháng qua</SelectItem>
              <SelectItem value="6months">6 tháng qua</SelectItem>
              <SelectItem value="1year">1 năm qua</SelectItem>
            </SelectContent>
          </Select>
          <Button style={{ backgroundColor: '#0057FF' }}>
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+15.3%</Badge>
            </div>
            <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
              Tổng lượng hàng nhập
            </p>
            <p className="text-gray-900" style={{ fontSize: '28px', fontWeight: '600' }}>
              9,200
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-green-50">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+12.7%</Badge>
            </div>
            <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
              Tổng lượng hàng xuất
            </p>
            <p className="text-gray-900" style={{ fontSize: '28px', fontWeight: '600' }}>
              7,730
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+8.4%</Badge>
            </div>
            <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
              Tỷ lệ luân chuyển
            </p>
            <p className="text-gray-900" style={{ fontSize: '28px', fontWeight: '600' }}>
              84%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-yellow-50">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+22.1%</Badge>
            </div>
            <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
              Tổng doanh thu
            </p>
            <p className="text-gray-900" style={{ fontSize: '28px', fontWeight: '600' }}>
              953M
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Xu hướng nhập xuất kho</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inbound" fill="#0057FF" name="Nhập kho" />
                <Bar dataKey="outbound" fill="#10B981" name="Xuất kho" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bổ theo kho</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={warehouseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name.split(' - ')[0]}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {warehouseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Xu hướng doanh thu (Triệu VNĐ)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0057FF" strokeWidth={2} name="Doanh thu" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top sản phẩm luân chuyển</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.sku} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: '#0057FF' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>{product.name}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>{product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>{product.turnover} lượt</p>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>{product.revenue} đ</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: '#10B981' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>{customer.name}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>{customer.orders} đơn hàng</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>{customer.revenue} đ</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
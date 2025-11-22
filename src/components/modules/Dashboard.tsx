import React from 'react';
import {
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function Dashboard() {
  const stats = [
    {
      title: 'Tổng nhập kho hôm nay',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: <ArrowDownRight className="w-5 h-5" />,
      color: '#0057FF',
    },
    {
      title: 'Tổng xuất kho hôm nay',
      value: '987',
      change: '+8.2%',
      trend: 'up',
      icon: <ArrowUpRight className="w-5 h-5" />,
      color: '#10B981',
    },
    {
      title: 'Đơn hàng chờ xử lý',
      value: '45',
      change: '-5.1%',
      trend: 'down',
      icon: <Clock className="w-5 h-5" />,
      color: '#F59E0B',
    },
    {
      title: 'Tỷ lệ hoàn thành',
      value: '98.5%',
      change: '+2.3%',
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5" />,
      color: '#8B5CF6',
    },
  ];

  const recentOrders = [
    {
      id: 'WH-2024-001',
      customer: 'Công ty TNHH ABC',
      type: 'Nhập kho',
      items: 125,
      status: 'Hoàn thành',
      time: '10:30',
    },
    {
      id: 'WH-2024-002',
      customer: 'Doanh nghiệp XYZ',
      type: 'Xuất kho',
      items: 87,
      status: 'Đang xử lý',
      time: '11:15',
    },
    {
      id: 'WH-2024-003',
      customer: 'Nhà phân phối DEF',
      type: 'Nhập kho',
      items: 234,
      status: 'Đang kiểm tra',
      time: '11:45',
    },
    {
      id: 'WH-2024-004',
      customer: 'Cửa hàng GHI',
      type: 'Xuất kho',
      items: 56,
      status: 'Hoàn thành',
      time: '12:20',
    },
    {
      id: 'WH-2024-005',
      customer: 'Siêu thị JKL',
      type: 'Xuất kho',
      items: 312,
      status: 'Chờ xác nhận',
      time: '13:00',
    },
  ];

  const lowStockItems = [
    { sku: 'SKU-12345', name: 'Sản phẩm A', current: 15, min: 50, unit: 'Thùng' },
    { sku: 'SKU-67890', name: 'Sản phẩm B', current: 8, min: 30, unit: 'Kiện' },
    { sku: 'SKU-11223', name: 'Sản phẩm C', current: 22, min: 100, unit: 'Pallet' },
    { sku: 'SKU-44556', name: 'Sản phẩm D', current: 5, min: 20, unit: 'Thùng' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang xử lý':
      case 'Đang kiểm tra':
        return 'bg-blue-100 text-blue-800';
      case 'Chờ xác nhận':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Tổng quan hệ thống</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Theo dõi hoạt động kho vận theo thời gian thực
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 mb-2" style={{ fontSize: '14px' }}>
                    {stat.title}
                  </p>
                  <p className="text-gray-900 mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                      style={{ fontSize: '13px' }}
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500" style={{ fontSize: '13px' }}>
                      so với hôm qua
                    </span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="text-blue-600" style={{ fontWeight: '500' }}>
                        {order.id}
                      </span>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.type}</Badge>
                    </TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Cảnh báo tồn kho thấp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.sku} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {item.name}
                      </p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        {item.sku}
                      </p>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Thấp
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(item.current / item.min) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-600" style={{ fontSize: '12px' }}>
                      {item.current}/{item.min} {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500" style={{ fontSize: '14px' }}>
                Kho A - Hà Nội
              </p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Hoạt động
              </Badge>
            </div>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600" style={{ fontSize: '13px' }}>
                  Công suất sử dụng
                </span>
                <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: '75%', backgroundColor: '#0057FF' }}
                />
              </div>
            </div>
            <p className="text-gray-500" style={{ fontSize: '13px' }}>
              7,500 / 10,000 m²
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500" style={{ fontSize: '14px' }}>
                Kho B - TP.HCM
              </p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Hoạt động
              </Badge>
            </div>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600" style={{ fontSize: '13px' }}>
                  Công suất sử dụng
                </span>
                <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                  62%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
            <p className="text-gray-500" style={{ fontSize: '13px' }}>
              9,300 / 15,000 m²
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500" style={{ fontSize: '14px' }}>
                Kho C - Đà Nẵng
              </p>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Bảo trì
              </Badge>
            </div>
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600" style={{ fontSize: '13px' }}>
                  Công suất sử dụng
                </span>
                <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                  45%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <p className="text-gray-500" style={{ fontSize: '13px' }}>
              3,600 / 8,000 m²
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

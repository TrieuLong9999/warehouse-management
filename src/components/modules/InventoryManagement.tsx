import React, { useState } from 'react';
import { 
  Package, TrendingUp, TrendingDown, AlertTriangle, Clock, 
  Search, Filter, Download, Eye, MapPin, BarChart3, 
  PackageCheck, PackageX, Calendar, ArrowUpDown, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';

export function InventoryManagement() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample inventory data
  const inventoryData = [
    {
      id: 1,
      code: 'ITM-001',
      name: 'iPhone 15 Pro Max',
      category: 'Điện thoại',
      totalQty: 450,
      available: 380,
      reserved: 50,
      damaged: 10,
      inTransit: 10,
      unit: 'PCS',
      minStock: 100,
      maxStock: 1000,
      reorderPoint: 200,
      avgCost: 28500000,
      totalValue: 12825000000,
      status: 'healthy',
      turnoverRate: 8.5,
      daysOnHand: 42,
      lastMovement: '21/11/2024 14:30',
      locations: [
        { warehouse: 'Kho A - HN', zone: 'A1', location: 'A1-01-01', qty: 150, status: 'active' },
        { warehouse: 'Kho A - HN', zone: 'A1', location: 'A1-01-02', qty: 100, status: 'active' },
        { warehouse: 'Kho B - HCM', zone: 'B2', location: 'B2-03-05', qty: 130, status: 'active' },
        { warehouse: 'Kho C - DN', zone: 'C1', location: 'C1-02-03', qty: 70, status: 'active' },
      ],
      movements: [
        { date: '21/11/2024', type: 'Xuất kho', ref: 'OUT-2024-001', qty: -50, balance: 450 },
        { date: '20/11/2024', type: 'Nhập kho', ref: 'IN-2024-0157', qty: 120, balance: 500 },
        { date: '19/11/2024', type: 'Xuất kho', ref: 'OUT-2024-0098', qty: -80, balance: 380 },
      ],
    },
    {
      id: 2,
      code: 'ITM-002',
      name: 'Samsung Galaxy S24',
      category: 'Điện thoại',
      totalQty: 180,
      available: 150,
      reserved: 20,
      damaged: 5,
      inTransit: 5,
      unit: 'PCS',
      minStock: 50,
      maxStock: 500,
      reorderPoint: 100,
      avgCost: 22000000,
      totalValue: 3960000000,
      status: 'low',
      turnoverRate: 6.2,
      daysOnHand: 58,
      lastMovement: '21/11/2024 10:15',
      locations: [
        { warehouse: 'Kho A - HN', zone: 'A1', location: 'A1-01-03', qty: 80, status: 'active' },
        { warehouse: 'Kho B - HCM', zone: 'B2', location: 'B2-03-06', qty: 100, status: 'active' },
      ],
      movements: [
        { date: '21/11/2024', type: 'Xuất kho', ref: 'OUT-2024-002', qty: -30, balance: 180 },
        { date: '18/11/2024', type: 'Nhập kho', ref: 'IN-2024-0155', qty: 60, balance: 210 },
      ],
    },
    {
      id: 3,
      code: 'ITM-003',
      name: 'Coca Cola 330ml',
      category: 'Nước giải khát',
      totalQty: 45,
      available: 40,
      reserved: 5,
      damaged: 0,
      inTransit: 0,
      unit: 'PCS',
      minStock: 500,
      maxStock: 5000,
      reorderPoint: 1000,
      avgCost: 8000,
      totalValue: 360000,
      status: 'critical',
      turnoverRate: 12.3,
      daysOnHand: 29,
      lastMovement: '21/11/2024 09:00',
      locations: [
        { warehouse: 'Kho B - HCM', zone: 'B1', location: 'B1-05-02', qty: 45, status: 'active' },
      ],
      movements: [
        { date: '21/11/2024', type: 'Xuất kho', ref: 'OUT-2024-003', qty: -480, balance: 45 },
        { date: '20/11/2024', type: 'Xuất kho', ref: 'OUT-2024-0099', qty: -300, balance: 525 },
      ],
    },
    {
      id: 4,
      code: 'ITM-004',
      name: 'Áo thun Nam Cotton',
      category: 'Thời trang',
      totalQty: 1850,
      available: 1800,
      reserved: 30,
      damaged: 15,
      inTransit: 5,
      unit: 'PCS',
      minStock: 200,
      maxStock: 2000,
      reorderPoint: 500,
      avgCost: 120000,
      totalValue: 222000000,
      status: 'overstock',
      turnoverRate: 3.2,
      daysOnHand: 113,
      lastMovement: '19/11/2024 16:20',
      locations: [
        { warehouse: 'Kho A - HN', zone: 'A2', location: 'A2-04-01', qty: 600, status: 'active' },
        { warehouse: 'Kho B - HCM', zone: 'B3', location: 'B3-02-04', qty: 800, status: 'active' },
        { warehouse: 'Kho C - DN', zone: 'C2', location: 'C2-01-02', qty: 450, status: 'active' },
      ],
      movements: [
        { date: '19/11/2024', type: 'Xuất kho', ref: 'OUT-2024-0095', qty: -50, balance: 1850 },
        { date: '17/11/2024', type: 'Nhập kho', ref: 'IN-2024-0153', qty: 500, balance: 1900 },
      ],
    },
    {
      id: 5,
      code: 'ITM-005',
      name: 'Laptop Dell XPS 15',
      category: 'Máy tính',
      totalQty: 85,
      available: 75,
      reserved: 8,
      damaged: 2,
      inTransit: 0,
      unit: 'PCS',
      minStock: 20,
      maxStock: 200,
      reorderPoint: 50,
      avgCost: 45000000,
      totalValue: 3825000000,
      status: 'healthy',
      turnoverRate: 5.8,
      daysOnHand: 62,
      lastMovement: '21/11/2024 11:45',
      locations: [
        { warehouse: 'Kho A - HN', zone: 'A1', location: 'A1-02-01', qty: 50, status: 'active' },
        { warehouse: 'Kho B - HCM', zone: 'B2', location: 'B2-02-03', qty: 35, status: 'active' },
      ],
      movements: [
        { date: '21/11/2024', type: 'Xuất kho', ref: 'OUT-2024-004', qty: -15, balance: 85 },
        { date: '20/11/2024', type: 'Nhập kho', ref: 'IN-2024-0156', qty: 30, balance: 100 },
      ],
    },
  ];

  // Calculate statistics
  const stats = {
    totalItems: inventoryData.length,
    totalValue: inventoryData.reduce((sum, item) => sum + item.totalValue, 0),
    lowStock: inventoryData.filter(item => item.status === 'low' || item.status === 'critical').length,
    overstock: inventoryData.filter(item => item.status === 'overstock').length,
    avgTurnover: (inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length).toFixed(1),
    damagedItems: inventoryData.reduce((sum, item) => sum + item.damaged, 0),
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'healthy':
        return { label: 'Bình thường', color: 'bg-green-100 text-green-800', icon: <PackageCheck className="w-4 h-4" /> };
      case 'low':
        return { label: 'Sắp hết', color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="w-4 h-4" /> };
      case 'critical':
        return { label: 'Thiếu hàng', color: 'bg-red-100 text-red-800', icon: <PackageX className="w-4 h-4" /> };
      case 'overstock':
        return { label: 'Tồn dư', color: 'bg-blue-100 text-blue-800', icon: <Package className="w-4 h-4" /> };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    return ((current - min) / (max - min)) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản trị tồn kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Theo dõi và quản lý tồn kho theo thời gian thực
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Kiểm kê kho
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng SKU
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {stats.totalItems}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Giá trị tồn
                </p>
                <p style={{ fontSize: '20px', fontWeight: '600' }} className="text-blue-600">
                  {(stats.totalValue / 1000000000).toFixed(1)}B
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Cảnh báo thiếu
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-red-600">
                  {stats.lowStock}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tồn dư
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-orange-600">
                  {stats.overstock}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Vòng quay TB
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-green-600">
                  {stats.avgTurnover}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <ArrowUpDown className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Hàng hỏng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-gray-600">
                  {stats.damagedItems}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50">
                <PackageX className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="by-product">Theo sản phẩm</TabsTrigger>
          <TabsTrigger value="by-location">Theo vị trí</TabsTrigger>
          <TabsTrigger value="alerts">Cảnh báo</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Tìm theo mã, tên sản phẩm..." className="pl-9" />
                </div>
                <Select defaultValue="all-category">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-category">Tất cả danh mục</SelectItem>
                    <SelectItem value="phone">Điện thoại</SelectItem>
                    <SelectItem value="laptop">Máy tính</SelectItem>
                    <SelectItem value="fashion">Thời trang</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-warehouse">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-warehouse">Tất cả kho</SelectItem>
                    <SelectItem value="wh-hn">Kho A - Hà Nội</SelectItem>
                    <SelectItem value="wh-hcm">Kho B - TP.HCM</SelectItem>
                    <SelectItem value="wh-dn">Kho C - Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tổng quan tồn kho</CardTitle>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Tổng tồn</TableHead>
                    <TableHead>Khả dụng</TableHead>
                    <TableHead>Đã đặt</TableHead>
                    <TableHead>Hỏng</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Vòng quay</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => {
                    const statusConfig = getStatusConfig(item.status);
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{item.totalQty.toLocaleString()} {item.unit}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600">{item.available.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600">{item.reserved.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className={item.damaged > 0 ? 'text-red-600' : 'text-gray-400'}>
                            {item.damaged}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(item.totalValue / 1000000).toFixed(1)}M
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.turnoverRate >= 8 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-orange-600" />
                            )}
                            <span>{item.turnoverRate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.color}>
                            {statusConfig.icon && <span className="mr-1">{statusConfig.icon}</span>}
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsDetailOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: By Product */}
        <TabsContent value="by-product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết tồn kho theo sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData.map((item) => {
                  const percentage = getStockPercentage(item.totalQty, item.minStock, item.maxStock);
                  return (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.code}</p>
                        </div>
                        <Badge className={getStatusConfig(item.status).color}>
                          {getStatusConfig(item.status).label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Tổng tồn</p>
                          <p className="font-medium">{item.totalQty.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tồn min</p>
                          <p className="font-medium text-orange-600">{item.minStock.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tồn max</p>
                          <p className="font-medium text-blue-600">{item.maxStock.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Điểm đặt lại</p>
                          <p className="font-medium text-purple-600">{item.reorderPoint.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Mức tồn</span>
                          <span className="font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Min: {item.minStock}</span>
                          <span>Hiện tại: {item.totalQty}</span>
                          <span>Max: {item.maxStock}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: By Location */}
        <TabsContent value="by-location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tồn kho theo vị trí lưu kho</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Khu vực</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.flatMap((item) =>
                    item.locations.map((loc, idx) => (
                      <TableRow key={`${item.id}-${idx}`}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{loc.warehouse}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{loc.zone}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{loc.location}</code>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{loc.qty.toLocaleString()} {item.unit}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Critical Stock */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  Thiếu hàng nghiêm trọng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventoryData
                    .filter((item) => item.status === 'critical')
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-red-50 rounded-lg">
                        <p className="font-medium text-red-900">{item.name}</p>
                        <p className="text-sm text-red-700">
                          Tồn: {item.totalQty} / Min: {item.minStock}
                        </p>
                        <p className="text-xs text-red-600 mt-1">Cần đặt hàng ngay!</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock */}
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <AlertTriangle className="w-5 h-5" />
                  Sắp hết hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventoryData
                    .filter((item) => item.status === 'low')
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-yellow-50 rounded-lg">
                        <p className="font-medium text-yellow-900">{item.name}</p>
                        <p className="text-sm text-yellow-700">
                          Tồn: {item.totalQty} / Min: {item.minStock}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">Cần theo dõi</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Overstock */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Package className="w-5 h-5" />
                  Tồn dư
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventoryData
                    .filter((item) => item.status === 'overstock')
                    .map((item) => (
                      <div key={item.id} className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">{item.name}</p>
                        <p className="text-sm text-blue-700">
                          Tồn: {item.totalQty} / Max: {item.maxStock}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Cân nhắc giảm tồn</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Slow Moving Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Hàng tồn lâu (Slow Moving)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Số ngày tồn</TableHead>
                    <TableHead>Vòng quay</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Giá trị tồn</TableHead>
                    <TableHead>Khuyến nghị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData
                    .filter((item) => item.daysOnHand > 60)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-orange-600 font-medium">{item.daysOnHand} ngày</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            <span>{item.turnoverRate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{item.totalQty.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{(item.totalValue / 1000000).toFixed(1)}M</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-orange-600">
                            Chương trình khuyến mãi
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Chi tiết tồn kho - {selectedItem.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500">Tổng tồn</p>
                    <p className="text-2xl font-semibold">{selectedItem.totalQty.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500">Khả dụng</p>
                    <p className="text-2xl font-semibold text-green-600">{selectedItem.available.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500">Đã đặt</p>
                    <p className="text-2xl font-semibold text-blue-600">{selectedItem.reserved.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500">Giá trị</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {(selectedItem.totalValue / 1000000).toFixed(0)}M
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Locations */}
              <Card>
                <CardHeader>
                  <CardTitle>Vị trí lưu kho</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kho</TableHead>
                        <TableHead>Khu vực</TableHead>
                        <TableHead>Vị trí</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItem.locations.map((loc: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{loc.warehouse}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{loc.zone}</Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{loc.location}</code>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{loc.qty.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Movement History */}
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử biến động gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Tham chiếu</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Tồn sau</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItem.movements.map((movement: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{movement.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs text-blue-600">{movement.ref}</code>
                          </TableCell>
                          <TableCell>
                            <span className={movement.qty > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {movement.qty > 0 ? '+' : ''}{movement.qty.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{movement.balance.toLocaleString()}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

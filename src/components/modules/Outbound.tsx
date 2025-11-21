import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Package2, Truck, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Outbound() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const outboundOrders = [
    {
      id: 'OUT-2024-001',
      customer: 'Công ty TNHH ABC',
      orderNumber: 'SO-2024-5678',
      requestDate: '21/11/2024',
      items: 87,
      status: 'Đang lấy hàng',
      warehouse: 'Kho A - Hà Nội',
      picker: 'Nguyễn Văn B',
      priority: 'Cao',
    },
    {
      id: 'OUT-2024-002',
      customer: 'Doanh nghiệp XYZ',
      orderNumber: 'SO-2024-5679',
      requestDate: '21/11/2024',
      items: 56,
      status: 'Chờ đóng gói',
      warehouse: 'Kho B - TP.HCM',
      picker: 'Trần Thị C',
      priority: 'Trung bình',
    },
    {
      id: 'OUT-2024-003',
      customer: 'Siêu thị DEF',
      orderNumber: 'SO-2024-5680',
      requestDate: '21/11/2024',
      items: 234,
      status: 'Đã đóng gói',
      warehouse: 'Kho A - Hà Nội',
      picker: 'Lê Văn D',
      priority: 'Cao',
    },
    {
      id: 'OUT-2024-004',
      customer: 'Cửa hàng GHI',
      orderNumber: 'SO-2024-5681',
      requestDate: '22/11/2024',
      items: 123,
      status: 'Đang giao hàng',
      warehouse: 'Kho C - Đà Nẵng',
      picker: 'Phạm Thị E',
      priority: 'Thấp',
    },
    {
      id: 'OUT-2024-005',
      customer: 'Nhà phân phối JKL',
      orderNumber: 'SO-2024-5682',
      requestDate: '22/11/2024',
      items: 312,
      status: 'Hoàn thành',
      warehouse: 'Kho B - TP.HCM',
      picker: 'Hoàng Văn F',
      priority: 'Trung bình',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang lấy hàng':
      case 'Chờ đóng gói':
      case 'Đã đóng gói':
        return 'bg-blue-100 text-blue-800';
      case 'Đang giao hàng':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cao':
        return 'bg-red-100 text-red-800';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-800';
      case 'Thấp':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý xuất kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Lấy hàng, đóng gói và giao hàng
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo phiếu xuất kho
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tạo phiếu xuất kho mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Khách hàng *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer1">Công ty TNHH ABC</SelectItem>
                      <SelectItem value="customer2">Doanh nghiệp XYZ</SelectItem>
                      <SelectItem value="customer3">Siêu thị DEF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Số đơn hàng</Label>
                  <Input placeholder="SO-2024-XXXX" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kho xuất *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wh1">Kho A - Hà Nội</SelectItem>
                      <SelectItem value="wh2">Kho B - TP.HCM</SelectItem>
                      <SelectItem value="wh3">Kho C - Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Độ ưu tiên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Nhập thủ công</TabsTrigger>
                  <TabsTrigger value="scan">Quét mã vạch</TabsTrigger>
                </TabsList>
                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Thêm sản phẩm</Label>
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sku1">SKU-12345 - Sản phẩm A</SelectItem>
                          <SelectItem value="sku2">SKU-67890 - Sản phẩm B</SelectItem>
                          <SelectItem value="sku3">SKU-11223 - Sản phẩm C</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="number" placeholder="Số lượng" className="w-32" />
                      <Button style={{ backgroundColor: '#0057FF' }}>Thêm</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="scan" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: '#0057FF' }}>
                    <Package2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">Sử dụng máy quét mã vạch</p>
                    <Input placeholder="Quét hoặc nhập mã vạch..." className="max-w-md mx-auto" />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="border rounded-lg p-4">
                <Label className="mb-2 block">Danh sách sản phẩm</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>SKU-12345 - Sản phẩm A</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>Kho: A-01-B-03</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span style={{ fontSize: '14px' }}>Số lượng: 50</span>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Tạo phiếu xuất kho
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Đang lấy hàng
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  12
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Package2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Chờ đóng gói
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  8
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <Package2 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Đang giao hàng
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  15
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Hoàn thành hôm nay
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  45
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm kiếm theo mã phiếu, khách hàng..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="picking">Đang lấy hàng</SelectItem>
                <SelectItem value="packing">Chờ đóng gói</SelectItem>
                <SelectItem value="packed">Đã đóng gói</SelectItem>
                <SelectItem value="shipping">Đang giao hàng</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-priority">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Độ ưu tiên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-priority">Tất cả</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiếu xuất kho</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Số đơn hàng</TableHead>
                <TableHead>Ngày yêu cầu</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Kho xuất</TableHead>
                <TableHead>Người lấy hàng</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outboundOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.requestDate}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>{order.warehouse}</TableCell>
                  <TableCell>{order.picker}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(order.priority)} variant="secondary">
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>
              Hiển thị 1-5 của 98 phiếu
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" style={{ backgroundColor: '#0057FF', color: 'white' }}>
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
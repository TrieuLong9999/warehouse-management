import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Eye } from 'lucide-react';
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
import { Textarea } from '../ui/textarea';

export function OrderManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'Công ty TNHH ABC',
      type: 'Nhập kho',
      createdDate: '21/11/2024 10:30',
      expectedDate: '23/11/2024',
      items: 125,
      totalValue: '125,000,000',
      status: 'Đang xử lý',
      priority: 'Cao',
    },
    {
      id: 'ORD-2024-002',
      customer: 'Doanh nghiệp XYZ',
      type: 'Xuất kho',
      createdDate: '21/11/2024 11:15',
      expectedDate: '22/11/2024',
      items: 87,
      totalValue: '87,500,000',
      status: 'Chờ xác nhận',
      priority: 'Trung bình',
    },
    {
      id: 'ORD-2024-003',
      customer: 'Siêu thị DEF',
      type: 'Xuất kho',
      createdDate: '21/11/2024 14:20',
      expectedDate: '24/11/2024',
      items: 234,
      totalValue: '345,000,000',
      status: 'Hoàn thành',
      priority: 'Thấp',
    },
    {
      id: 'ORD-2024-004',
      customer: 'Cửa hàng GHI',
      type: 'Nhập kho',
      createdDate: '20/11/2024 09:00',
      expectedDate: '22/11/2024',
      items: 56,
      totalValue: '56,000,000',
      status: 'Đang xử lý',
      priority: 'Cao',
    },
    {
      id: 'ORD-2024-005',
      customer: 'Nhà phân phối JKL',
      type: 'Xuất kho',
      createdDate: '20/11/2024 15:45',
      expectedDate: '23/11/2024',
      items: 312,
      totalValue: '468,000,000',
      status: 'Đã hủy',
      priority: 'Trung bình',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang xử lý':
        return 'bg-blue-100 text-blue-800';
      case 'Chờ xác nhận':
        return 'bg-yellow-100 text-yellow-800';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800';
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
          <h1 className="text-gray-900 mb-1">Quản lý đơn hàng</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý tổng thể các đơn hàng nhập xuất kho
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo đơn hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tạo đơn hàng mới</DialogTitle>
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
                  <Label>Loại đơn hàng *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Nhập kho</SelectItem>
                      <SelectItem value="outbound">Xuất kho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày dự kiến *</Label>
                  <Input type="date" />
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

              <div className="space-y-2">
                <Label>Kho</Label>
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
                <Label>Ghi chú</Label>
                <Textarea placeholder="Nhập ghi chú về đơn hàng..." rows={4} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Tạo đơn hàng
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
                  Tổng đơn hôm nay
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  45
                </p>
              </div>
              <Badge style={{ backgroundColor: '#0057FF' }} className="text-white">
                +12%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Chờ xác nhận
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  8
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">
                Cần xử lý
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Đang xử lý
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  23
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                Trong tiến trình
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Giá trị đơn hàng
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  1.2B
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                VNĐ
              </Badge>
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
              <Input placeholder="Tìm kiếm theo mã đơn, khách hàng..." className="pl-9" />
            </div>
            <Select defaultValue="all-type">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-type">Tất cả loại</SelectItem>
                <SelectItem value="inbound">Nhập kho</SelectItem>
                <SelectItem value="outbound">Xuất kho</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-priority">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ưu tiên" />
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
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày dự kiến</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
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
                  <TableCell>{order.createdDate}</TableCell>
                  <TableCell>{order.expectedDate}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>{order.totalValue} đ</TableCell>
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
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>
              Hiển thị 1-5 của 324 đơn hàng
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
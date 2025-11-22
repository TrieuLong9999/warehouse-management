import React, { useState } from 'react';
import { Plus, Filter, Download, Search, DollarSign, FileText } from 'lucide-react';
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

export function ServiceFee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'Công ty TNHH ABC',
      period: 'Tháng 11/2024',
      storageFee: '15,000,000',
      handlingFee: '8,500,000',
      additionalFee: '2,000,000',
      totalFee: '25,500,000',
      status: 'Đã thanh toán',
      dueDate: '30/11/2024',
    },
    {
      id: 'INV-2024-002',
      customer: 'Doanh nghiệp XYZ',
      period: 'Tháng 11/2024',
      storageFee: '12,000,000',
      handlingFee: '6,500,000',
      additionalFee: '1,500,000',
      totalFee: '20,000,000',
      status: 'Chờ thanh toán',
      dueDate: '30/11/2024',
    },
    {
      id: 'INV-2024-003',
      customer: 'Siêu thị DEF',
      period: 'Tháng 11/2024',
      storageFee: '25,000,000',
      handlingFee: '15,000,000',
      additionalFee: '3,500,000',
      totalFee: '43,500,000',
      status: 'Đã thanh toán',
      dueDate: '30/11/2024',
    },
    {
      id: 'INV-2024-004',
      customer: 'Cửa hàng GHI',
      period: 'Tháng 11/2024',
      storageFee: '8,000,000',
      handlingFee: '4,500,000',
      additionalFee: '1,000,000',
      totalFee: '13,500,000',
      status: 'Quá hạn',
      dueDate: '15/11/2024',
    },
    {
      id: 'INV-2024-005',
      customer: 'Nhà phân phối JKL',
      period: 'Tháng 11/2024',
      storageFee: '30,000,000',
      handlingFee: '18,000,000',
      additionalFee: '5,000,000',
      totalFee: '53,000,000',
      status: 'Chờ thanh toán',
      dueDate: '30/11/2024',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã thanh toán':
        return 'bg-green-100 text-green-800';
      case 'Chờ thanh toán':
        return 'bg-yellow-100 text-yellow-800';
      case 'Quá hạn':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Phí dịch vụ kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý phí dịch vụ lưu kho và vận hành
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo hóa đơn
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tạo hóa đơn phí dịch vụ</DialogTitle>
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
                  <Label>Kỳ hóa đơn *</Label>
                  <Input type="month" />
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h3 style={{ fontSize: '16px', fontWeight: '500' }}>Chi tiết phí dịch vụ</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phí lưu kho (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      Diện tích: 500 m² × 30,000đ/m²
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Phí vận hành (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      1,250 items × 5,000đ/item
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phí đóng gói (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phí bảo quản đặc biệt (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phí vận chuyển nội bộ (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phí khác (VNĐ)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>Tổng cộng:</span>
                    <span className="text-blue-600" style={{ fontSize: '24px', fontWeight: '600' }}>
                      0 đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hạn thanh toán</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Phương thức thanh toán</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">Chuyển khoản</SelectItem>
                      <SelectItem value="cash">Tiền mặt</SelectItem>
                      <SelectItem value="credit">Công nợ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button variant="outline">
                  Lưu nháp
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Tạo hóa đơn
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
                  Tổng doanh thu tháng này
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  155.5M
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Đã thu
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  89.0M
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Chờ thanh toán
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  53.0M
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Quá hạn
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  13.5M
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <DollarSign className="w-6 h-6 text-red-600" />
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
              <Input placeholder="Tìm kiếm theo mã hóa đơn, khách hàng..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="pending">Chờ thanh toán</SelectItem>
                <SelectItem value="overdue">Quá hạn</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="current">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kỳ hóa đơn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Tháng 11/2024</SelectItem>
                <SelectItem value="prev">Tháng 10/2024</SelectItem>
                <SelectItem value="prev2">Tháng 9/2024</SelectItem>
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
          <CardTitle>Danh sách hóa đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hóa đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Kỳ hóa đơn</TableHead>
                <TableHead>Phí lưu kho</TableHead>
                <TableHead>Phí vận hành</TableHead>
                <TableHead>Phí khác</TableHead>
                <TableHead>Tổng cộng</TableHead>
                <TableHead>Hạn TT</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {invoice.id}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.period}</TableCell>
                  <TableCell>{invoice.storageFee} đ</TableCell>
                  <TableCell>{invoice.handlingFee} đ</TableCell>
                  <TableCell>{invoice.additionalFee} đ</TableCell>
                  <TableCell>
                    <span style={{ fontWeight: '500' }}>{invoice.totalFee} đ</span>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)} variant="secondary">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>
              Hiển thị 1-5 của 67 hóa đơn
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
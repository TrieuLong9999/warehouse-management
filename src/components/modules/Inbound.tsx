import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Package, Barcode, Camera } from 'lucide-react';
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

export function Inbound() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  const inboundOrders = [
    {
      id: 'IN-2024-001',
      supplier: 'Nhà cung cấp A',
      poNumber: 'PO-2024-1234',
      expectedDate: '21/11/2024',
      items: 125,
      status: 'Đang tiếp nhận',
      warehouse: 'Kho A - Hà Nội',
      receivedBy: 'Nguyễn Văn B',
    },
    {
      id: 'IN-2024-002',
      supplier: 'Nhà cung cấp B',
      poNumber: 'PO-2024-1235',
      expectedDate: '21/11/2024',
      items: 87,
      status: 'Chờ kiểm tra',
      warehouse: 'Kho B - TP.HCM',
      receivedBy: 'Trần Thị C',
    },
    {
      id: 'IN-2024-003',
      supplier: 'Nhà cung cấp C',
      poNumber: 'PO-2024-1236',
      expectedDate: '22/11/2024',
      items: 234,
      status: 'Hoàn thành',
      warehouse: 'Kho A - Hà Nội',
      receivedBy: 'Lê Văn D',
    },
    {
      id: 'IN-2024-004',
      supplier: 'Nhà cung cấp D',
      poNumber: 'PO-2024-1237',
      expectedDate: '22/11/2024',
      items: 56,
      status: 'Đang tiếp nhận',
      warehouse: 'Kho C - Đà Nẵng',
      receivedBy: 'Phạm Thị E',
    },
    {
      id: 'IN-2024-005',
      supplier: 'Nhà cung cấp E',
      poNumber: 'PO-2024-1238',
      expectedDate: '23/11/2024',
      items: 312,
      status: 'Chờ xác nhận',
      warehouse: 'Kho B - TP.HCM',
      receivedBy: 'Hoàng Văn F',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang tiếp nhận':
      case 'Chờ kiểm tra':
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý nhập kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Tiếp nhận và quản lý hàng hóa nhập kho
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo phiếu nhập kho
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tạo phiếu nhập kho mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nhà cung cấp *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier1">Nhà cung cấp A</SelectItem>
                      <SelectItem value="supplier2">Nhà cung cấp B</SelectItem>
                      <SelectItem value="supplier3">Nhà cung cấp C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Số PO</Label>
                  <Input placeholder="PO-2024-XXXX" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kho nhận *</Label>
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
                  <Label>Ngày dự kiến</Label>
                  <Input type="date" />
                </div>
              </div>

              {/* Barcode Scanner Section */}
              <Card className="border-2 border-dashed" style={{ borderColor: '#0057FF' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Barcode className="w-5 h-5" style={{ color: '#0057FF' }} />
                      <Label>Quét mã vạch sản phẩm</Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setScanMode(!scanMode)}
                      style={{ borderColor: '#0057FF', color: '#0057FF' }}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {scanMode ? 'Tắt camera' : 'Bật camera'}
                    </Button>
                  </div>

                  {scanMode && (
                    <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center mb-4">
                      <div className="text-white text-center">
                        <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p style={{ fontSize: '14px' }}>Camera đang quét mã vạch...</p>
                      </div>
                    </div>
                  )}

                  <Input
                    placeholder="Quét hoặc nhập mã vạch sản phẩm"
                    className="mb-4"
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '500' }}>SKU-12345 - Sản phẩm A</p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>Đơn vị: Thùng</p>
                      </div>
                      <Input type="number" placeholder="SL" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '500' }}>SKU-67890 - Sản phẩm B</p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>Đơn vị: Kiện</p>
                      </div>
                      <Input type="number" placeholder="SL" className="w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea placeholder="Nhập ghi chú về lô hàng..." rows={3} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Tạo phiếu nhập kho
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm kiếm theo mã phiếu, nhà cung cấp..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="receiving">Đang tiếp nhận</SelectItem>
                <SelectItem value="checking">Chờ kiểm tra</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-wh">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-wh">Tất cả kho</SelectItem>
                <SelectItem value="wh1">Kho A - Hà Nội</SelectItem>
                <SelectItem value="wh2">Kho B - TP.HCM</SelectItem>
                <SelectItem value="wh3">Kho C - Đà Nẵng</SelectItem>
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
          <CardTitle>Danh sách phiếu nhập kho</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Số PO</TableHead>
                <TableHead>Ngày dự kiến</TableHead>
                <TableHead>Số lượng item</TableHead>
                <TableHead>Kho nhận</TableHead>
                <TableHead>Người tiếp nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.poNumber}</TableCell>
                  <TableCell>{order.expectedDate}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>{order.warehouse}</TableCell>
                  <TableCell>{order.receivedBy}</TableCell>
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
              Hiển thị 1-5 của 127 phiếu
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
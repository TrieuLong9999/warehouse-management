import React, { useState } from 'react';
import { Filter, Download, Search, Upload, FileText, Image, CheckCircle } from 'lucide-react';
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

export function PODManagement() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const podRecords = [
    {
      id: 'POD-2024-001',
      orderNumber: 'OUT-2024-001',
      customer: 'Công ty TNHH ABC',
      deliveryDate: '21/11/2024',
      recipient: 'Nguyễn Văn X',
      status: 'Đã xác nhận',
      podType: 'Chữ ký điện tử',
      uploadedBy: 'Nguyễn Văn B',
    },
    {
      id: 'POD-2024-002',
      orderNumber: 'OUT-2024-002',
      customer: 'Doanh nghiệp XYZ',
      deliveryDate: '21/11/2024',
      recipient: 'Trần Thị Y',
      status: 'Chờ xác nhận',
      podType: 'Ảnh chụp',
      uploadedBy: 'Trần Thị C',
    },
    {
      id: 'POD-2024-003',
      orderNumber: 'OUT-2024-003',
      customer: 'Siêu thị DEF',
      deliveryDate: '20/11/2024',
      recipient: 'Lê Văn Z',
      status: 'Đã xác nhận',
      podType: 'PDF',
      uploadedBy: 'Lê Văn D',
    },
    {
      id: 'POD-2024-004',
      orderNumber: 'OUT-2024-004',
      customer: 'Cửa hàng GHI',
      deliveryDate: '20/11/2024',
      recipient: 'Phạm Thị T',
      status: 'Thiếu thông tin',
      podType: 'Ảnh chụp',
      uploadedBy: 'Phạm Thị E',
    },
    {
      id: 'POD-2024-005',
      orderNumber: 'OUT-2024-005',
      customer: 'Nhà phân phối JKL',
      deliveryDate: '19/11/2024',
      recipient: 'Hoàng Văn U',
      status: 'Đã xác nhận',
      podType: 'Chữ ký điện tử',
      uploadedBy: 'Hoàng Văn F',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã xác nhận':
        return 'bg-green-100 text-green-800';
      case 'Chờ xác nhận':
        return 'bg-yellow-100 text-yellow-800';
      case 'Thiếu thông tin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPodTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-4 h-4" />;
      case 'Ảnh chụp':
        return <Image className="w-4 h-4" />;
      case 'Chữ ký điện tử':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý POD</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý chứng từ giao nhận hàng hóa (Proof of Delivery)
          </p>
        </div>
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Upload className="w-4 h-4 mr-2" />
              Tải lên POD
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Tải lên chứng từ POD</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Mã đơn hàng *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đơn hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="out1">OUT-2024-001 - Công ty TNHH ABC</SelectItem>
                    <SelectItem value="out2">OUT-2024-002 - Doanh nghiệp XYZ</SelectItem>
                    <SelectItem value="out3">OUT-2024-003 - Siêu thị DEF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên người nhận *</Label>
                  <Input placeholder="Nhập tên người nhận" />
                </div>
                <div className="space-y-2">
                  <Label>Ngày giao hàng *</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Loại POD *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại POD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="signature">Chữ ký điện tử</SelectItem>
                    <SelectItem value="photo">Ảnh chụp</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tải lên file *</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: '#0057FF' }}>
                  <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 mb-1">Kéo thả file hoặc click để chọn</p>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>
                    Hỗ trợ: JPG, PNG, PDF (Tối đa 10MB)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Chọn file
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Tải lên POD
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
                  Đã xác nhận
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  234
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
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
                  18
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Thiếu thông tin
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  5
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Tổng POD tháng này
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  257
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
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
              <Input placeholder="Tìm kiếm theo mã POD, đơn hàng, khách hàng..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="missing">Thiếu thông tin</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-type">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại POD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-type">Tất cả loại</SelectItem>
                <SelectItem value="signature">Chữ ký điện tử</SelectItem>
                <SelectItem value="photo">Ảnh chụp</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
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
          <CardTitle>Danh sách POD</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã POD</TableHead>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày giao</TableHead>
                <TableHead>Người nhận</TableHead>
                <TableHead>Loại POD</TableHead>
                <TableHead>Người tải lên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {podRecords.map((pod) => (
                <TableRow key={pod.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {pod.id}
                    </span>
                  </TableCell>
                  <TableCell>{pod.orderNumber}</TableCell>
                  <TableCell>{pod.customer}</TableCell>
                  <TableCell>{pod.deliveryDate}</TableCell>
                  <TableCell>{pod.recipient}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPodTypeIcon(pod.podType)}
                      <span>{pod.podType}</span>
                    </div>
                  </TableCell>
                  <TableCell>{pod.uploadedBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pod.status)} variant="secondary">
                      {pod.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Xem
                      </Button>
                      <Button variant="ghost" size="sm">
                        Tải về
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
              Hiển thị 1-5 của 257 POD
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
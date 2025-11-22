import React, { useState } from 'react';
import { Plus, Edit, Trash2, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function UnitManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Units Data
  const units = [
    {
      id: 1,
      code: 'PCS',
      name: 'Pieces',
      nameVi: 'Cái/Chiếc',
      type: 'Đơn vị cơ bản',
      description: 'Đơn vị tính theo từng sản phẩm riêng lẻ',
      status: 'Hoạt động',
    },
    {
      id: 2,
      code: 'CASE',
      name: 'Case',
      nameVi: 'Thùng',
      type: 'Đơn vị đóng gói',
      description: 'Đơn vị tính theo thùng chứa nhiều sản phẩm',
      status: 'Hoạt động',
    },
    {
      id: 3,
      code: 'PALLET',
      name: 'Pallet',
      nameVi: 'Pallet',
      type: 'Đơn vị vận chuyển',
      description: 'Đơn vị tính theo pallet chứa nhiều thùng',
      status: 'Hoạt động',
    },
    {
      id: 4,
      code: 'BOX',
      name: 'Box',
      nameVi: 'Hộp',
      type: 'Đơn vị đóng gói',
      description: 'Đơn vị tính theo hộp',
      status: 'Hoạt động',
    },
    {
      id: 5,
      code: 'KG',
      name: 'Kilogram',
      nameVi: 'Kilogram',
      type: 'Đơn vị khối lượng',
      description: 'Đơn vị tính theo cân nặng',
      status: 'Hoạt động',
    },
    {
      id: 6,
      code: 'LTR',
      name: 'Liter',
      nameVi: 'Lít',
      type: 'Đơn vị thể tích',
      description: 'Đơn vị tính theo thể tích chất lỏng',
      status: 'Hoạt động',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Hoạt động' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  const getUnitTypeColor = (type: string) => {
    switch (type) {
      case 'Đơn vị cơ bản':
        return 'bg-blue-100 text-blue-800';
      case 'Đơn vị đóng gói':
        return 'bg-purple-100 text-purple-800';
      case 'Đơn vị vận chuyển':
        return 'bg-green-100 text-green-800';
      case 'Đơn vị khối lượng':
        return 'bg-orange-100 text-orange-800';
      case 'Đơn vị thể tích':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Đơn vị đo lường</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quản lý các đơn vị đo lường trong hệ thống
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng đơn vị
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {units.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <Ruler className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đang sử dụng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {units.filter(u => u.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <Ruler className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Loại đơn vị
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  5
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                <Ruler className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đơn vị cơ bản
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {units.filter(u => u.type === 'Đơn vị cơ bản').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Ruler className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách đơn vị đo lường</CardTitle>
            <div className="flex gap-3">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button style={{ backgroundColor: '#0057FF' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm đơn vị
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Thêm đơn vị đo lường mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Mã đơn vị *</Label>
                        <Input placeholder="VD: PCS, CASE, KG" />
                      </div>
                      <div className="space-y-2">
                        <Label>Loại đơn vị *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Đơn vị cơ bản</SelectItem>
                            <SelectItem value="packaging">Đơn vị đóng gói</SelectItem>
                            <SelectItem value="shipping">Đơn vị vận chuyển</SelectItem>
                            <SelectItem value="weight">Đơn vị khối lượng</SelectItem>
                            <SelectItem value="volume">Đơn vị thể tích</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tên tiếng Anh *</Label>
                        <Input placeholder="VD: Pieces, Case" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tên tiếng Việt *</Label>
                        <Input placeholder="VD: Cái/Chiếc, Thùng" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Mô tả</Label>
                      <Textarea 
                        placeholder="Mô tả chi tiết về đơn vị đo lường" 
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Trạng thái</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Hoạt động</SelectItem>
                          <SelectItem value="inactive">Tạm ngưng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button style={{ backgroundColor: '#0057FF' }}>
                      Thêm đơn vị
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn vị</TableHead>
                <TableHead>Tên đơn vị</TableHead>
                <TableHead>Tên tiếng Việt</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>
                    <code className="text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
                      {unit.code}
                    </code>
                  </TableCell>
                  <TableCell style={{ fontWeight: '500' }}>
                    {unit.name}
                  </TableCell>
                  <TableCell>{unit.nameVi}</TableCell>
                  <TableCell>
                    <Badge className={getUnitTypeColor(unit.type)} variant="secondary">
                      {unit.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-600 text-sm max-w-xs">
                      {unit.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(unit.status)} variant="secondary">
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
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
              Hiển thị 1-{units.length} của {units.length} đơn vị
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" style={{ backgroundColor: '#0057FF', color: 'white' }}>
                1
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

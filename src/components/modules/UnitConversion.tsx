import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function UnitConversion() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Items for dropdown
  const items = [
    { id: 1, code: 'ITM-001', name: 'iPhone 15 Pro Max' },
    { id: 2, code: 'ITM-002', name: 'Samsung Galaxy S24 Ultra' },
    { id: 3, code: 'ITM-003', name: 'Coca Cola 330ml' },
    { id: 4, code: 'ITM-004', name: 'Áo thun Nam Cotton' },
  ];

  // Sample Units for dropdown
  const units = [
    { id: 1, code: 'PCS', nameVi: 'Cái/Chiếc' },
    { id: 2, code: 'CASE', nameVi: 'Thùng' },
    { id: 3, code: 'PALLET', nameVi: 'Pallet' },
    { id: 4, code: 'BOX', nameVi: 'Hộp' },
    { id: 5, code: 'KG', nameVi: 'Kilogram' },
  ];

  // Sample Conversions Data
  const conversions = [
    {
      id: 1,
      itemCode: 'ITM-001',
      itemName: 'iPhone 15 Pro Max',
      fromUnit: 'CASE',
      toUnit: 'PCS',
      conversionRate: 12,
      description: '1 Case = 12 Pieces',
    },
    {
      id: 2,
      itemCode: 'ITM-001',
      itemName: 'iPhone 15 Pro Max',
      fromUnit: 'PALLET',
      toUnit: 'CASE',
      conversionRate: 50,
      description: '1 Pallet = 50 Cases',
    },
    {
      id: 3,
      itemCode: 'ITM-003',
      itemName: 'Coca Cola 330ml',
      fromUnit: 'CASE',
      toUnit: 'PCS',
      conversionRate: 24,
      description: '1 Case = 24 Cans',
    },
    {
      id: 4,
      itemCode: 'ITM-003',
      itemName: 'Coca Cola 330ml',
      fromUnit: 'PALLET',
      toUnit: 'CASE',
      conversionRate: 72,
      description: '1 Pallet = 72 Cases',
    },
    {
      id: 5,
      itemCode: 'ITM-004',
      itemName: 'Áo thun Nam Cotton',
      fromUnit: 'BOX',
      toUnit: 'PCS',
      conversionRate: 20,
      description: '1 Box = 20 Pieces',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Quy đổi đơn vị</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quản lý quy tắc quy đổi giữa các đơn vị đo lường
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng quy đổi
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {conversions.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <ArrowLeftRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Mã hàng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  3
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <ArrowLeftRight className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đơn vị sử dụng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  4
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                <ArrowLeftRight className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tạo tháng này
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  5
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <ArrowLeftRight className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quy đổi đơn vị đo lường</CardTitle>
            <div className="flex gap-3">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button style={{ backgroundColor: '#0057FF' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm quy đổi
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Thêm quy đổi đơn vị mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Mã hàng *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mã hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          {items.map((item) => (
                            <SelectItem key={item.id} value={item.code}>
                              {item.code} - {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                        <Label>Từ đơn vị *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.code}>
                                {unit.code} - {unit.nameVi}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-center pb-2">
                        <ArrowLeftRight className="w-5 h-5 text-gray-400" />
                      </div>

                      <div className="space-y-2">
                        <Label>Sang đơn vị *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn" />
                          </SelectTrigger>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.code}>
                                {unit.code} - {unit.nameVi}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tỷ lệ quy đổi *</Label>
                      <Input 
                        type="number" 
                        placeholder="VD: 12 (nghĩa là 1 đơn vị FROM = 12 đơn vị TO)" 
                      />
                      <p className="text-gray-500 text-xs">
                        Nhập số lượng đơn vị TO tương đương với 1 đơn vị FROM
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Ghi chú</Label>
                      <Textarea 
                        placeholder="VD: 1 Case = 12 Pieces" 
                        rows={2}
                      />
                    </div>

                    {/* Preview */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-2">
                        Ví dụ quy đổi:
                      </p>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p>• 1 CASE = 12 PCS</p>
                        <p>• 1 PALLET = 50 CASE = 600 PCS</p>
                        <p>• 100 PCS = 8.33 CASE</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button style={{ backgroundColor: '#0057FF' }}>
                      Thêm quy đổi
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
                <TableHead>Mã hàng</TableHead>
                <TableHead>Tên hàng hóa</TableHead>
                <TableHead>Từ đơn vị</TableHead>
                <TableHead></TableHead>
                <TableHead>Sang đơn vị</TableHead>
                <TableHead>Tỷ lệ</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversions.map((conv) => (
                <TableRow key={conv.id}>
                  <TableCell>
                    <span className="text-blue-600 font-medium">
                      {conv.itemCode}
                    </span>
                  </TableCell>
                  <TableCell>{conv.itemName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-semibold">
                      {conv.fromUnit}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-semibold">
                      {conv.toUnit}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      1 : {conv.conversionRate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600">
                      {conv.description}
                    </p>
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

          {/* Info Box */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">💡 Hướng dẫn sử dụng</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Thiết lập quy đổi giữa các đơn vị để hệ thống tự động tính toán khi nhập/xuất kho</li>
              <li>• Ví dụ: Nếu bạn nhập 10 CASE và có quy đổi 1 CASE = 12 PCS, hệ thống sẽ tự động tính = 120 PCS</li>
              <li>• Quy đổi có thể áp dụng cho từng mã hàng cụ thể hoặc chung cho tất cả hàng hóa</li>
            </ul>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>
              Hiển thị 1-{conversions.length} của {conversions.length} quy đổi
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

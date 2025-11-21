import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, FileUp, FileDown, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function ItemManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sample Items Data
  const items = [
    {
      id: 1,
      code: 'ITM-001',
      name: 'iPhone 15 Pro Max',
      category: 'Điện tử',
      barcode: '8934567890123',
      baseUnit: 'pcs',
      weight: '221g',
      dimensions: '159.9 x 76.7 x 8.25mm',
      description: 'Smartphone cao cấp',
      status: 'Hoạt động',
      createdDate: '15/01/2024',
    },
    {
      id: 2,
      code: 'ITM-002',
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Điện tử',
      barcode: '8934567890456',
      baseUnit: 'pcs',
      weight: '234g',
      dimensions: '162.3 x 79.0 x 8.6mm',
      description: 'Smartphone flagship',
      status: 'Hoạt động',
      createdDate: '20/01/2024',
    },
    {
      id: 3,
      code: 'ITM-003',
      name: 'Coca Cola 330ml',
      category: 'Đồ uống',
      barcode: '8934567890789',
      baseUnit: 'can',
      weight: '330ml',
      dimensions: '66 x 122mm',
      description: 'Nước ngọt có ga',
      status: 'Hoạt động',
      createdDate: '10/01/2024',
    },
    {
      id: 4,
      code: 'ITM-004',
      name: 'Áo thun Nam Cotton',
      category: 'Thời trang',
      barcode: '8934567891012',
      baseUnit: 'pcs',
      weight: '200g',
      dimensions: 'Size M',
      description: 'Áo thun 100% cotton',
      status: 'Hoạt động',
      createdDate: '25/01/2024',
    },
    {
      id: 5,
      code: 'ITM-005',
      name: 'Gạo ST25',
      category: 'Thực phẩm',
      barcode: '8934567891345',
      baseUnit: 'kg',
      weight: '5kg',
      dimensions: '300 x 200 x 100mm',
      description: 'Gạo cao cấp',
      status: 'Tạm ngưng',
      createdDate: '05/02/2024',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Hoạt động' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Quản lý mã hàng</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quản lý danh sách mã hàng hóa trong hệ thống
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng mã hàng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {items.length}
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
                  Đang hoạt động
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {items.filter(i => i.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Danh mục
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  4
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                <Package className="w-6 h-6 text-purple-600" />
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
                <Package className="w-6 h-6 text-orange-600" />
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
              <Input placeholder="Tìm kiếm theo mã, tên hàng hóa, barcode..." className="pl-9" />
            </div>
            <Select defaultValue="all-category">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-category">Tất cả danh mục</SelectItem>
                <SelectItem value="electronics">Điện tử</SelectItem>
                <SelectItem value="food">Thực phẩm</SelectItem>
                <SelectItem value="beverage">Đồ uống</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách mã hàng</CardTitle>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileUp className="w-4 h-4 mr-2" />
                Nhập Excel
              </Button>
              <Button variant="outline">
                <FileDown className="w-4 h-4 mr-2" />
                Xuất Excel
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    style={{ backgroundColor: '#0057FF' }}
                    onClick={() => {
                      setIsEditMode(false);
                      setSelectedItem(null);
                      setIsModalOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm mã hàng
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? 'Chỉnh sửa mã hàng' : 'Thêm mã hàng mới'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Mã hàng *</Label>
                        <Input 
                          placeholder="Tự động tạo hoặc nhập thủ công" 
                          defaultValue={isEditMode ? selectedItem?.code : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Barcode</Label>
                        <Input 
                          placeholder="8934567890123" 
                          defaultValue={isEditMode ? selectedItem?.barcode : ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tên hàng hóa *</Label>
                      <Input 
                        placeholder="Nhập tên hàng hóa" 
                        defaultValue={isEditMode ? selectedItem?.name : ''}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Danh mục *</Label>
                        <Select defaultValue={isEditMode ? selectedItem?.category : ''}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Điện tử">Điện tử</SelectItem>
                            <SelectItem value="Thực phẩm">Thực phẩm</SelectItem>
                            <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                            <SelectItem value="Thời trang">Thời trang</SelectItem>
                            <SelectItem value="Mỹ phẩm">Mỹ phẩm</SelectItem>
                            <SelectItem value="Gia dụng">Gia dụng</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Đơn vị cơ bản *</Label>
                        <Select defaultValue={isEditMode ? selectedItem?.baseUnit : 'pcs'}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đơn vị" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pcs">PCS - Cái/Chiếc</SelectItem>
                            <SelectItem value="case">CASE - Thùng</SelectItem>
                            <SelectItem value="box">BOX - Hộp</SelectItem>
                            <SelectItem value="kg">KG - Kilogram</SelectItem>
                            <SelectItem value="ltr">LTR - Lít</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Trọng lượng</Label>
                        <Input 
                          placeholder="VD: 500g, 1.5kg" 
                          defaultValue={isEditMode ? selectedItem?.weight : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Kích thước</Label>
                        <Input 
                          placeholder="VD: 100 x 50 x 30mm" 
                          defaultValue={isEditMode ? selectedItem?.dimensions : ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Mô tả</Label>
                      <Textarea 
                        placeholder="Nhập mô tả chi tiết về hàng hóa" 
                        rows={3}
                        defaultValue={isEditMode ? selectedItem?.description : ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Trạng thái</Label>
                      <Select defaultValue={isEditMode ? selectedItem?.status : 'Hoạt động'}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                          <SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button style={{ backgroundColor: '#0057FF' }}>
                      {isEditMode ? 'Cập nhật' : 'Thêm mã hàng'}
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
                <TableHead>Danh mục</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Đơn vị cơ bản</TableHead>
                <TableHead>Thông tin</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {item.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontWeight: '500' }}>{item.name}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        {item.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.barcode}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.baseUnit.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-600">
                      <p>Trọng lượng: {item.weight}</p>
                      <p>Kích thước: {item.dimensions}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setIsEditMode(true);
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                      >
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
              Hiển thị 1-{items.length} của {items.length} mã hàng
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

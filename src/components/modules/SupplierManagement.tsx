import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, Mail, Phone, Factory, FileUp, FileDown, Globe, Star } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function SupplierManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const suppliers = [
    {
      id: 1,
      code: 'SUP-001',
      name: 'Công ty TNHH Sản xuất ABC',
      type: 'Nhà sản xuất',
      contactPerson: 'Trần Văn A',
      phone: '0912 345 678',
      email: 'contact@abc.com',
      address: '123 KCN Tân Bình, TP.HCM',
      taxCode: '0123456789',
      website: 'www.abc.com',
      products: 'Hàng điện tử, Linh kiện',
      creditLimit: '1,000,000,000',
      currentDebt: '250,000,000',
      paymentMethod: 'Chuyển khoản',
      rating: 5,
      status: 'Hoạt động',
      startDate: '01/01/2023',
    },
    {
      id: 2,
      code: 'SUP-002',
      name: 'Công ty Phân phối XYZ',
      type: 'Nhà phân phối',
      contactPerson: 'Nguyễn Thị B',
      phone: '0987 654 321',
      email: 'info@xyz.vn',
      address: '456 Quận 2, TP.HCM',
      taxCode: '0987654321',
      website: 'www.xyz.vn',
      products: 'Thực phẩm, Đồ uống',
      creditLimit: '500,000,000',
      currentDebt: '125,000,000',
      paymentMethod: 'Công nợ',
      rating: 4,
      status: 'Hoạt động',
      startDate: '15/02/2023',
    },
    {
      id: 3,
      code: 'SUP-003',
      name: 'Xưởng may DEF',
      type: 'Nhà sản xuất',
      contactPerson: 'Lê Văn C',
      phone: '0901 234 567',
      email: 'sales@def.com',
      address: '789 KCN Bình Dương',
      taxCode: '0111222333',
      website: 'www.def.com',
      products: 'Hàng dệt may, Quần áo',
      creditLimit: '800,000,000',
      currentDebt: '320,000,000',
      paymentMethod: 'Chuyển khoản',
      rating: 5,
      status: 'Hoạt động',
      startDate: '20/03/2023',
    },
    {
      id: 4,
      code: 'SUP-004',
      name: 'Đại lý GHI',
      type: 'Đại lý',
      contactPerson: 'Phạm Thị D',
      phone: '0932 111 222',
      email: 'contact@ghi.vn',
      address: '321 Quận 7, TP.HCM',
      taxCode: '0444555666',
      website: '',
      products: 'Vật liệu xây dựng',
      creditLimit: '300,000,000',
      currentDebt: '180,000,000',
      paymentMethod: 'Tiền mặt',
      rating: 3,
      status: 'Hoạt động',
      startDate: '10/04/2023',
    },
    {
      id: 5,
      code: 'SUP-005',
      name: 'Công ty Logistics JKL',
      type: 'Nhà cung cấp dịch vụ',
      contactPerson: 'Hoàng Văn E',
      phone: '0945 678 901',
      email: 'service@jkl.com',
      address: '654 Quận 9, TP.HCM',
      taxCode: '0777888999',
      website: 'www.jkl.com',
      products: 'Dịch vụ vận chuyển, Kho bãi',
      creditLimit: '600,000,000',
      currentDebt: '540,000,000',
      paymentMethod: 'Công nợ',
      rating: 4,
      status: 'Tạm ngưng',
      startDate: '05/05/2023',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động':
        return 'bg-green-100 text-green-800';
      case 'Tạm ngưng':
        return 'bg-orange-100 text-orange-800';
      case 'Ngưng hợp tác':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Nhà sản xuất':
        return 'bg-blue-100 text-blue-800';
      case 'Nhà phân phối':
        return 'bg-purple-100 text-purple-800';
      case 'Đại lý':
        return 'bg-cyan-100 text-cyan-800';
      case 'Nhà cung cấp dịch vụ':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddSupplier = () => {
    setIsEditMode(false);
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setIsEditMode(true);
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng nhà cung cấp
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {suppliers.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <Factory className="w-6 h-6 text-blue-600" />
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
                  {suppliers.filter(s => s.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <Factory className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Nhà sản xuất
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {suppliers.filter(s => s.type === 'Nhà sản xuất').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                <Factory className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Công nợ cao
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {suppliers.filter(s => {
                    const debt = parseInt(s.currentDebt.replace(/,/g, ''));
                    const limit = parseInt(s.creditLimit.replace(/,/g, ''));
                    return debt / limit > 0.7;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Factory className="w-6 h-6 text-orange-600" />
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
              <Input placeholder="Tìm kiếm theo mã, tên nhà cung cấp, sản phẩm..." className="pl-9" />
            </div>
            <Select defaultValue="all-type">
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Loại nhà cung cấp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-type">Tất cả loại</SelectItem>
                <SelectItem value="manufacturer">Nhà sản xuất</SelectItem>
                <SelectItem value="distributor">Nhà phân phối</SelectItem>
                <SelectItem value="agent">Đại lý</SelectItem>
                <SelectItem value="service">Nhà cung cấp dịch vụ</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="suspended">Tạm ngưng</SelectItem>
                <SelectItem value="inactive">Ngưng hợp tác</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-rating">Tất cả đánh giá</SelectItem>
                <SelectItem value="5">5 sao</SelectItem>
                <SelectItem value="4">4 sao trở lên</SelectItem>
                <SelectItem value="3">3 sao trở lên</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách nhà cung cấp</CardTitle>
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
                  <Button style={{ backgroundColor: '#0057FF' }} onClick={handleAddSupplier}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm nhà cung cấp
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
                    </DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                      <TabsTrigger value="contact">Liên hệ</TabsTrigger>
                      <TabsTrigger value="financial">Tài chính</TabsTrigger>
                    </TabsList>

                    {/* Basic Info Tab */}
                    <TabsContent value="basic" className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Mã nhà cung cấp *</Label>
                          <Input 
                            placeholder="Tự động tạo" 
                            defaultValue={isEditMode ? selectedSupplier?.code : ''}
                            disabled={isEditMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Loại nhà cung cấp *</Label>
                          <Select defaultValue={isEditMode ? selectedSupplier?.type : ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại nhà cung cấp" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nhà sản xuất">Nhà sản xuất</SelectItem>
                              <SelectItem value="Nhà phân phối">Nhà phân phối</SelectItem>
                              <SelectItem value="Đại lý">Đại lý</SelectItem>
                              <SelectItem value="Nhà cung cấp dịch vụ">Nhà cung cấp dịch vụ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tên nhà cung cấp *</Label>
                        <Input 
                          placeholder="Nhập tên công ty" 
                          defaultValue={isEditMode ? selectedSupplier?.name : ''}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Mã số thuế *</Label>
                          <Input 
                            placeholder="0123456789" 
                            defaultValue={isEditMode ? selectedSupplier?.taxCode : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Website</Label>
                          <Input 
                            placeholder="www.example.com" 
                            defaultValue={isEditMode ? selectedSupplier?.website : ''}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Địa chỉ *</Label>
                        <Textarea 
                          placeholder="Nhập địa chỉ chi tiết" 
                          rows={2}
                          defaultValue={isEditMode ? selectedSupplier?.address : ''}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Sản phẩm/Dịch vụ cung cấp</Label>
                        <Textarea 
                          placeholder="Mô tả các sản phẩm/dịch vụ chính" 
                          rows={2}
                          defaultValue={isEditMode ? selectedSupplier?.products : ''}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Đánh giá</Label>
                          <Select defaultValue={isEditMode ? selectedSupplier?.rating.toString() : '5'}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn đánh giá" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">⭐⭐⭐⭐⭐ Xuất sắc</SelectItem>
                              <SelectItem value="4">⭐⭐⭐⭐ Tốt</SelectItem>
                              <SelectItem value="3">⭐⭐⭐ Trung bình</SelectItem>
                              <SelectItem value="2">⭐⭐ Khá</SelectItem>
                              <SelectItem value="1">⭐ Kém</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Trạng thái</Label>
                          <Select defaultValue={isEditMode ? 'active' : 'active'}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Hoạt động</SelectItem>
                              <SelectItem value="suspended">Tạm ngưng</SelectItem>
                              <SelectItem value="inactive">Ngưng hợp tác</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Contact Tab */}
                    <TabsContent value="contact" className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Người đại diện *</Label>
                          <Input 
                            placeholder="Họ và tên" 
                            defaultValue={isEditMode ? selectedSupplier?.contactPerson : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Chức vụ</Label>
                          <Input placeholder="Ví dụ: Giám đốc kinh doanh" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Số điện thoại *</Label>
                          <Input 
                            placeholder="0912 345 678" 
                            defaultValue={isEditMode ? selectedSupplier?.phone : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input 
                            type="email" 
                            placeholder="email@example.com" 
                            defaultValue={isEditMode ? selectedSupplier?.email : ''}
                          />
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 style={{ fontSize: '14px', fontWeight: '500' }}>
                            Người liên hệ bổ sung
                          </h4>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Thêm
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <p style={{ fontSize: '13px', fontWeight: '500' }}>Trần Văn B</p>
                              <p className="text-gray-500" style={{ fontSize: '12px' }}>
                                Trưởng phòng bán hàng - 0987 654 321
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Ghi chú</Label>
                        <Textarea placeholder="Nhập ghi chú về nhà cung cấp..." rows={3} />
                      </div>
                    </TabsContent>

                    {/* Financial Tab */}
                    <TabsContent value="financial" className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Hạn mức công nợ (VNĐ)</Label>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            defaultValue={isEditMode ? selectedSupplier?.creditLimit.replace(/,/g, '') : ''}
                          />
                          <p className="text-gray-500" style={{ fontSize: '12px' }}>
                            Giới hạn công nợ tối đa cho phép
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Kỳ hạn thanh toán (ngày)</Label>
                          <Input type="number" placeholder="30" defaultValue="30" />
                          <p className="text-gray-500" style={{ fontSize: '12px' }}>
                            Số ngày cho phép thanh toán chậm
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Phương thức thanh toán ưu tiên</Label>
                        <Select defaultValue={isEditMode ? selectedSupplier?.paymentMethod : 'transfer'}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phương thức" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                            <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                            <SelectItem value="Công nợ">Công nợ</SelectItem>
                            <SelectItem value="Séc">Séc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <h4 style={{ fontSize: '14px', fontWeight: '500' }}>Thông tin ngân hàng</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Tên ngân hàng</Label>
                            <Input placeholder="Ví dụ: Vietcombank" />
                          </div>
                          <div className="space-y-2">
                            <Label>Chi nhánh</Label>
                            <Input placeholder="Ví dụ: CN TP.HCM" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Số tài khoản</Label>
                            <Input placeholder="0123456789" />
                          </div>
                          <div className="space-y-2">
                            <Label>Tên chủ tài khoản</Label>
                            <Input placeholder="Tên công ty" />
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <h4 style={{ fontSize: '14px', fontWeight: '500' }}>Điều khoản hợp đồng</h4>
                        <div className="space-y-2">
                          <Label>Thời hạn hợp đồng (tháng)</Label>
                          <Input type="number" placeholder="12" defaultValue="12" />
                        </div>
                        <div className="space-y-2">
                          <Label>Điều khoản đặc biệt</Label>
                          <Textarea placeholder="Nhập các điều khoản đặc biệt trong hợp đồng..." rows={3} />
                        </div>
                      </div>

                      {isEditMode && (
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <h4 className="mb-3" style={{ fontSize: '14px', fontWeight: '500' }}>
                            Thông tin công nợ hiện tại
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-600 mb-1" style={{ fontSize: '12px' }}>
                                Hạn mức công nợ
                              </p>
                              <p style={{ fontSize: '16px', fontWeight: '600' }}>
                                {selectedSupplier?.creditLimit} đ
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1" style={{ fontSize: '12px' }}>
                                Công nợ hiện tại
                              </p>
                              <p className="text-orange-600" style={{ fontSize: '16px', fontWeight: '600' }}>
                                {selectedSupplier?.currentDebt} đ
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1" style={{ fontSize: '12px' }}>
                                Còn lại
                              </p>
                              <p className="text-green-600" style={{ fontSize: '16px', fontWeight: '600' }}>
                                {isEditMode ? 
                                  (parseInt(selectedSupplier?.creditLimit.replace(/,/g, '')) - 
                                   parseInt(selectedSupplier?.currentDebt.replace(/,/g, ''))).toLocaleString() 
                                  : '0'} đ
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button variant="outline">
                      Lưu nháp
                    </Button>
                    <Button style={{ backgroundColor: '#0057FF' }}>
                      {isEditMode ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp'}
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
                <TableHead>Mã NCC</TableHead>
                <TableHead>Tên nhà cung cấp</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Người đại diện</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Công nợ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {supplier.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontWeight: '500' }}>{supplier.name}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        MST: {supplier.taxCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(supplier.type)} variant="secondary">
                      {supplier.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p style={{ fontSize: '13px' }} className="max-w-[150px] truncate">
                      {supplier.products}
                    </p>
                  </TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span style={{ fontSize: '13px' }}>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span style={{ fontSize: '13px' }}>{supplier.email}</span>
                      </div>
                      {supplier.website && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Globe className="w-3 h-3" />
                          <span style={{ fontSize: '13px' }}>{supplier.website}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStars(supplier.rating)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                        {supplier.currentDebt} đ
                      </p>
                      <p className="text-gray-500" style={{ fontSize: '11px' }}>
                        / {supplier.creditLimit} đ
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(supplier.status)} variant="secondary">
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditSupplier(supplier)}
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
              Hiển thị 1-{suppliers.length} của {suppliers.length} nhà cung cấp
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

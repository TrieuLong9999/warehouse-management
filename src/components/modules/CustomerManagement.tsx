import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, Mail, Phone, Building2, FileUp, FileDown } from 'lucide-react';
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

export function CustomerManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const customers = [
    {
      id: 1,
      code: 'CUST-001',
      name: 'Công ty TNHH ABC',
      group: 'VIP',
      contactPerson: 'Nguyễn Văn A',
      phone: '0912 345 678',
      email: 'nguyenvana@abc.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      taxCode: '0123456789',
      defaultWarehouse: 'Kho A - Hà Nội',
      creditLimit: '500,000,000',
      currentDebt: '125,000,000',
      status: 'Hoạt động',
      joinDate: '15/01/2024',
    },
    {
      id: 2,
      code: 'CUST-002',
      name: 'Doanh nghiệp XYZ',
      group: 'Doanh nghiệp',
      contactPerson: 'Trần Thị B',
      phone: '0987 654 321',
      email: 'tranthib@xyz.vn',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      taxCode: '0987654321',
      defaultWarehouse: 'Kho B - TP.HCM',
      creditLimit: '300,000,000',
      currentDebt: '87,500,000',
      status: 'Hoạt động',
      joinDate: '20/02/2024',
    },
    {
      id: 3,
      code: 'CUST-003',
      name: 'Siêu thị DEF',
      group: 'VIP',
      contactPerson: 'Lê Văn C',
      phone: '0901 234 567',
      email: 'levanc@def.com',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      taxCode: '0111222333',
      defaultWarehouse: 'Kho A - Hà Nội',
      creditLimit: '800,000,000',
      currentDebt: '345,000,000',
      status: 'Hoạt động',
      joinDate: '10/03/2024',
    },
    {
      id: 4,
      code: 'CUST-004',
      name: 'Cửa hàng GHI',
      group: 'Bán lẻ',
      contactPerson: 'Phạm Thị D',
      phone: '0932 111 222',
      email: 'phamthid@ghi.vn',
      address: '321 Đường GHI, Quận 4, TP.HCM',
      taxCode: '0444555666',
      defaultWarehouse: 'Kho C - Đà Nẵng',
      creditLimit: '150,000,000',
      currentDebt: '56,000,000',
      status: 'Hoạt động',
      joinDate: '05/04/2024',
    },
    {
      id: 5,
      code: 'CUST-005',
      name: 'Nhà phân phối JKL',
      group: 'Đại lý',
      contactPerson: 'Hoàng Văn E',
      phone: '0945 678 901',
      email: 'hoangvane@jkl.com',
      address: '654 Đường JKL, Quận 5, TP.HCM',
      taxCode: '0777888999',
      defaultWarehouse: 'Kho B - TP.HCM',
      creditLimit: '600,000,000',
      currentDebt: '468,000,000',
      status: 'Tạm ngưng',
      joinDate: '12/05/2024',
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

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Doanh nghiệp':
        return 'bg-blue-100 text-blue-800';
      case 'Đại lý':
        return 'bg-cyan-100 text-cyan-800';
      case 'Bán lẻ':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCustomer = () => {
    setIsEditMode(false);
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setIsEditMode(true);
    setSelectedCustomer(customer);
    setIsModalOpen(true);
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
                  Tổng khách hàng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {customers.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Khách hàng VIP
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {customers.filter(c => c.group === 'VIP').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-50">
                <Building2 className="w-6 h-6 text-purple-600" />
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
                  {customers.filter(c => c.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <Building2 className="w-6 h-6 text-green-600" />
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
                  {customers.filter(c => {
                    const debt = parseInt(c.currentDebt.replace(/,/g, ''));
                    const limit = parseInt(c.creditLimit.replace(/,/g, ''));
                    return debt / limit > 0.7;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Building2 className="w-6 h-6 text-orange-600" />
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
              <Input placeholder="Tìm kiếm theo mã, tên khách hàng, số điện thoại..." className="pl-9" />
            </div>
            <Select defaultValue="all-group">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Nhóm khách hàng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-group">Tất cả nhóm</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="enterprise">Doanh nghiệp</SelectItem>
                <SelectItem value="agent">Đại lý</SelectItem>
                <SelectItem value="retail">Bán lẻ</SelectItem>
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
            <Select defaultValue="all-warehouse">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kho mặc định" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-warehouse">Tất cả kho</SelectItem>
                <SelectItem value="wh1">Kho A - Hà Nội</SelectItem>
                <SelectItem value="wh2">Kho B - TP.HCM</SelectItem>
                <SelectItem value="wh3">Kho C - Đà Nẵng</SelectItem>
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
            <CardTitle>Danh sách khách hàng</CardTitle>
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
                  <Button style={{ backgroundColor: '#0057FF' }} onClick={handleAddCustomer}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm khách hàng
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>
                      {isEditMode ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
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
                          <Label>Mã khách hàng *</Label>
                          <Input 
                            placeholder="Tự động tạo" 
                            defaultValue={isEditMode ? selectedCustomer?.code : ''}
                            disabled={isEditMode}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nhóm khách hàng *</Label>
                          <Select defaultValue={isEditMode ? selectedCustomer?.group.toLowerCase() : ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn nhóm khách hàng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vip">VIP</SelectItem>
                              <SelectItem value="enterprise">Doanh nghiệp</SelectItem>
                              <SelectItem value="agent">Đại lý</SelectItem>
                              <SelectItem value="retail">Bán lẻ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tên khách hàng *</Label>
                        <Input 
                          placeholder="Nhập tên công ty/cá nhân" 
                          defaultValue={isEditMode ? selectedCustomer?.name : ''}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Mã số thuế</Label>
                          <Input 
                            placeholder="0123456789" 
                            defaultValue={isEditMode ? selectedCustomer?.taxCode : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Kho mặc định</Label>
                          <Select defaultValue={isEditMode ? 'wh1' : ''}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kho mặc định" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wh1">Kho A - Hà Nội</SelectItem>
                              <SelectItem value="wh2">Kho B - TP.HCM</SelectItem>
                              <SelectItem value="wh3">Kho C - Đà Nẵng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Địa chỉ</Label>
                        <Textarea 
                          placeholder="Nhập địa chỉ chi tiết" 
                          rows={2}
                          defaultValue={isEditMode ? selectedCustomer?.address : ''}
                        />
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
                    </TabsContent>

                    {/* Contact Tab */}
                    <TabsContent value="contact" className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Người liên hệ *</Label>
                          <Input 
                            placeholder="Họ và tên" 
                            defaultValue={isEditMode ? selectedCustomer?.contactPerson : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Chức vụ</Label>
                          <Input placeholder="Ví dụ: Giám đốc" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Số điện thoại *</Label>
                          <Input 
                            placeholder="0912 345 678" 
                            defaultValue={isEditMode ? selectedCustomer?.phone : ''}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input 
                            type="email" 
                            placeholder="email@example.com" 
                            defaultValue={isEditMode ? selectedCustomer?.email : ''}
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
                              <p style={{ fontSize: '13px', fontWeight: '500' }}>Nguyễn Thị F</p>
                              <p className="text-gray-500" style={{ fontSize: '12px' }}>
                                Trưởng phòng kinh doanh - 0987 654 321
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
                        <Textarea placeholder="Nhập ghi chú về khách hàng..." rows={3} />
                      </div>
                    </TabsContent>

                    {/* Financial Tab */}
                    <TabsContent value="financial" className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Hạn mức tín dụng (VNĐ)</Label>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            defaultValue={isEditMode ? selectedCustomer?.creditLimit.replace(/,/g, '') : ''}
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
                        <Select defaultValue="transfer">
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phương thức" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transfer">Chuyển khoản</SelectItem>
                            <SelectItem value="cash">Tiền mặt</SelectItem>
                            <SelectItem value="credit">Công nợ</SelectItem>
                            <SelectItem value="cod">COD</SelectItem>
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
                            <Input placeholder="Ví dụ: CN Hà Nội" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Số tài khoản</Label>
                            <Input placeholder="0123456789" />
                          </div>
                          <div className="space-y-2">
                            <Label>Tên chủ tài khoản</Label>
                            <Input placeholder="Tên công ty/cá nhân" />
                          </div>
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
                                Hạn mức tín dụng
                              </p>
                              <p style={{ fontSize: '16px', fontWeight: '600' }}>
                                {selectedCustomer?.creditLimit} đ
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1" style={{ fontSize: '12px' }}>
                                Công nợ hiện tại
                              </p>
                              <p className="text-orange-600" style={{ fontSize: '16px', fontWeight: '600' }}>
                                {selectedCustomer?.currentDebt} đ
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1" style={{ fontSize: '12px' }}>
                                Còn lại
                              </p>
                              <p className="text-green-600" style={{ fontSize: '16px', fontWeight: '600' }}>
                                {isEditMode ? 
                                  (parseInt(selectedCustomer?.creditLimit.replace(/,/g, '')) - 
                                   parseInt(selectedCustomer?.currentDebt.replace(/,/g, ''))).toLocaleString() 
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
                      {isEditMode ? 'Cập nhật khách hàng' : 'Thêm khách hàng'}
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
                <TableHead>Mã KH</TableHead>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Nhóm</TableHead>
                <TableHead>Người liên hệ</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Kho mặc định</TableHead>
                <TableHead>Công nợ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {customer.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontWeight: '500' }}>{customer.name}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        MST: {customer.taxCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getGroupColor(customer.group)} variant="secondary">
                      {customer.group}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.contactPerson}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span style={{ fontSize: '13px' }}>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-3 h-3" />
                        <span style={{ fontSize: '13px' }}>{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.defaultWarehouse}</TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                        {customer.currentDebt} đ
                      </p>
                      <p className="text-gray-500" style={{ fontSize: '11px' }}>
                        / {customer.creditLimit} đ
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)} variant="secondary">
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCustomer(customer)}
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
              Hiển thị 1-5 của {customers.length} khách hàng
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
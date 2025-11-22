import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Tag, Percent, Clock, Search, X, FileUp, FileDown } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function CustomerGroups() {
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [discountFilter, setDiscountFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDiscountFilter('all');
    setSortBy('newest');
  };

  const customerGroups = [
    {
      id: 1,
      code: 'VIP',
      name: 'Khách hàng VIP',
      description: 'Khách hàng có doanh số cao, ưu tiên xử lý',
      customerCount: 25,
      discountRate: 15,
      storageDiscount: 10,
      handlingDiscount: 12,
      color: '#F59E0B',
      status: 'Hoạt động',
      createdDate: '2024-01-15',
      totalRevenue: 2500000000,
    },
    {
      id: 2,
      code: 'GOLD',
      name: 'Khách hàng Gold',
      description: 'Khách hàng thân thiết, hợp tác lâu dài',
      customerCount: 48,
      discountRate: 10,
      storageDiscount: 7,
      handlingDiscount: 8,
      color: '#EAB308',
      status: 'Hoạt động',
      createdDate: '2024-01-20',
      totalRevenue: 1800000000,
    },
    {
      id: 3,
      code: 'SILVER',
      name: 'Khách hàng Silver',
      description: 'Khách hàng có tiềm năng phát triển',
      customerCount: 92,
      discountRate: 5,
      storageDiscount: 3,
      handlingDiscount: 5,
      color: '#94A3B8',
      status: 'Hoạt động',
      createdDate: '2024-02-01',
      totalRevenue: 950000000,
    },
    {
      id: 4,
      code: 'STANDARD',
      name: 'Khách hàng thường',
      description: 'Khách hàng thông thường',
      customerCount: 156,
      discountRate: 0,
      storageDiscount: 0,
      handlingDiscount: 0,
      color: '#64748B',
      status: 'Hoạt động',
      createdDate: '2024-01-10',
      totalRevenue: 480000000,
    },
    {
      id: 5,
      code: 'TRIAL',
      name: 'Khách hàng dùng thử',
      description: 'Khách hàng mới, đang trong giai đoạn dùng thử',
      customerCount: 34,
      discountRate: 0,
      storageDiscount: 0,
      handlingDiscount: 0,
      color: '#10B981',
      status: 'Hoạt động',
      createdDate: '2024-03-01',
      totalRevenue: 85000000,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động':
        return 'bg-green-100 text-green-800';
      case 'Tạm ngưng':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng nhóm
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>5</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0057FF20' }}>
                <Users className="w-6 h-6" style={{ color: '#0057FF' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng khách hàng
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>355</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Khách VIP
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>25</p>
                <p className="text-green-600" style={{ fontSize: '12px' }}>
                  +3 tháng này
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng doanh thu
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>5.8B</p>
                <p className="text-green-600" style={{ fontSize: '12px' }}>
                  +12% vs tháng trước
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-100">
                <Percent className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo mã nhóm, tên nhóm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>

            <Select value={discountFilter} onValueChange={setDiscountFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mức chiết khấu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức CK</SelectItem>
                <SelectItem value="none">Không CK (0%)</SelectItem>
                <SelectItem value="low">1-5%</SelectItem>
                <SelectItem value="medium">6-10%</SelectItem>
                <SelectItem value="high">&gt;10%</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="name-asc">Tên A-Z</SelectItem>
                <SelectItem value="name-desc">Tên Z-A</SelectItem>
                <SelectItem value="customers">Số KH nhiều nhất</SelectItem>
                <SelectItem value="revenue">Doanh thu cao nhất</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button variant="outline" onClick={handleResetFilters}>
              <X className="w-4 h-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Groups Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách nhóm khách hàng</CardTitle>
            <div className="flex gap-3">
              <Button variant="outline">
                <FileUp className="w-4 h-4 mr-2" />
                Nhập Excel
              </Button>
              <Button variant="outline">
                <FileDown className="w-4 h-4 mr-2" />
                Xuất Excel
              </Button>
              <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
                <DialogTrigger asChild>
                  <Button style={{ backgroundColor: '#0057FF' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm nhóm khách hàng
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>Thêm nhóm khách hàng mới</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Mã nhóm *</Label>
                        <Input placeholder="VIP" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tên nhóm *</Label>
                        <Input placeholder="Khách hàng VIP" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Mô tả</Label>
                      <Textarea placeholder="Nhập mô tả nhóm khách hàng..." rows={3} />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>
                        Chính sách chiết khấu
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Chiết khấu chung (%)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Chiết khấu lưu kho (%)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Chiết khấu bốc xếp (%)</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Màu nhóm</Label>
                        <div className="flex gap-2 flex-wrap">
                          {['#F59E0B', '#EAB308', '#10B981', '#0057FF', '#8B5CF6', '#EC4899', '#64748B'].map(
                            (color) => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-900"
                                style={{ backgroundColor: color }}
                              />
                            )
                          )}
                        </div>
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
                      <Button variant="outline" onClick={() => setIsAddGroupOpen(false)}>
                        Hủy
                      </Button>
                      <Button style={{ backgroundColor: '#0057FF' }}>Thêm nhóm</Button>
                    </div>
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
                <TableHead>Mã nhóm</TableHead>
                <TableHead>Tên nhóm</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số KH</TableHead>
                <TableHead>Chiết khấu</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: group.color }}
                      />
                      <span style={{ fontWeight: '600' }}>{group.code}</span>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: '500' }}>{group.name}</TableCell>
                  <TableCell className="text-gray-600 max-w-xs">
                    {group.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span style={{ fontWeight: '500' }}>{group.customerCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Percent className="w-3 h-3 text-blue-600" />
                        <span style={{ fontSize: '12px' }}>Chung: {group.discountRate}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-green-600" />
                        <span style={{ fontSize: '12px' }}>Lưu kho: {group.storageDiscount}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-orange-600" />
                        <span style={{ fontSize: '12px' }}>Bốc xếp: {group.handlingDiscount}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p style={{ fontWeight: '600' }}>
                      {(group.totalRevenue / 1000000).toFixed(0)}M
                    </p>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      VNĐ
                    </p>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(group.createdDate).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(group.status)} variant="secondary">
                      {group.status}
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
        </CardContent>
      </Card>
    </div>
  );
}
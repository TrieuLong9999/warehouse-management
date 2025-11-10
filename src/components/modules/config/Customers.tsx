import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface Customer {
  customerId: string;
  customerName: string;
  taxCode: string;
  address: string;
  phoneNumber: string;
  email: string;
  groupId: string;
  createdDate: string;
  status: 'active' | 'inactive';
}

const customerGroups = [
  { groupCode: 'NKH001', groupName: 'VIP' },
  { groupCode: 'NKH002', groupName: 'Doanh nghiệp lớn' },
  { groupCode: 'NKH003', groupName: 'Doanh nghiệp vừa' },
  { groupCode: 'NKH004', groupName: 'Doanh nghiệp nhỏ' },
  { groupCode: 'NKH005', groupName: 'Khách hàng thường' },
  { groupCode: 'NKH006', groupName: 'Khách hàng mới' },
];

const initialData: Customer[] = [
  { customerId: 'KH001', customerName: 'Công ty TNHH Điện tử Samsung Việt Nam', taxCode: '0123456789', address: 'Khu Công nghệ cao, Q.9, TP.HCM', phoneNumber: '028-1234-5678', email: 'contact@samsung.vn', groupId: 'NKH001', createdDate: '15/01/2024', status: 'active' },
  { customerId: 'KH002', customerName: 'Công ty CP Thế giới Di động', taxCode: '0987654321', address: '128 Trần Quang Khải, Q.1, TP.HCM', phoneNumber: '028-9876-5432', email: 'info@thegioididong.com', groupId: 'NKH001', createdDate: '18/01/2024', status: 'active' },
  { customerId: 'KH003', customerName: 'Công ty TNHH Logistics Viettel', taxCode: '0111222333', address: '100 Lê Văn Việt, Q.9, TP.HCM', phoneNumber: '028-3456-7890', email: 'logistics@viettel.vn', groupId: 'NKH002', createdDate: '20/01/2024', status: 'active' },
  { customerId: 'KH004', customerName: 'Công ty CP Đầu tư Xây dựng Hòa Bình', taxCode: '0444555666', address: '25 Phan Đăng Lưu, Phú Nhuận, TP.HCM', phoneNumber: '028-2222-3333', email: 'contact@hoabinhcorp.com', groupId: 'NKH002', createdDate: '22/01/2024', status: 'active' },
  { customerId: 'KH005', customerName: 'Công ty TNHH Thương mại ABC', taxCode: '0777888999', address: '45 Nguyễn Văn Cừ, Q.5, TP.HCM', phoneNumber: '028-5555-6666', email: 'sales@abctrade.com', groupId: 'NKH003', createdDate: '25/01/2024', status: 'active' },
  { customerId: 'KH006', customerName: 'Công ty CP Dược phẩm XYZ', taxCode: '0333444555', address: '67 Lý Thái Tổ, Q.10, TP.HCM', phoneNumber: '028-7777-8888', email: 'info@xyzpharma.com', groupId: 'NKH003', createdDate: '28/01/2024', status: 'active' },
  { customerId: 'KH007', customerName: 'Doanh nghiệp tư nhân Minh Anh', taxCode: '0666777888', address: '123 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM', phoneNumber: '028-4444-5555', email: 'contact@minhanh.com', groupId: 'NKH004', createdDate: '01/02/2024', status: 'active' },
  { customerId: 'KH008', customerName: 'Công ty TNHH Thực phẩm Sạch', taxCode: '0222333444', address: '89 Cách Mạng Tháng 8, Q.3, TP.HCM', phoneNumber: '028-6666-7777', email: 'info@thucphamsach.vn', groupId: 'NKH004', createdDate: '03/02/2024', status: 'active' },
];

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Customer | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [toAssign, setToAssign] = useState<Customer | null>(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [form, setForm] = useState({ 
    customerId: '', customerName: '', taxCode: '', address: '', phoneNumber: '', 
    email: '', groupId: '', status: 'active' 
  });
  const [errors, setErrors] = useState({ customerId: '', customerName: '', groupId: '' });

  const validateForm = () => {
    const newErrors = { customerId: '', customerName: '', groupId: '' };
    let isValid = true;

    if (!form.customerId.trim()) {
      newErrors.customerId = 'Vui lòng nhập mã khách hàng';
      isValid = false;
    }

    if (!form.customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập tên khách hàng';
      isValid = false;
    }

    if (!form.groupId) {
      newErrors.groupId = 'Vui lòng chọn nhóm khách hàng';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    // Check duplicate code
    if (customers.some(c => c.customerId === form.customerId)) {
      setErrors(prev => ({ ...prev, customerId: 'Mã khách hàng đã tồn tại' }));
      toast.error('Mã khách hàng đã tồn tại trong hệ thống');
      return;
    }
    
    const newCustomer: Customer = {
      ...form,
      createdDate: new Date().toLocaleDateString('vi-VN'),
      status: form.status as 'active' | 'inactive',
    };
    
    setCustomers([...customers, newCustomer]);
    setDialogOpen(false);
    setForm({ customerId: '', customerName: '', taxCode: '', address: '', phoneNumber: '', email: '', groupId: '', status: 'active' });
    setErrors({ customerId: '', customerName: '', groupId: '' });
    toast.success('Thêm khách hàng thành công');
  };

  const handleUpdate = () => {
    if (!editing) return;
    
    if (!form.customerName.trim() || !form.groupId) {
      const newErrors = { customerId: '', customerName: '', groupId: '' };
      if (!form.customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên khách hàng';
      if (!form.groupId) newErrors.groupId = 'Vui lòng chọn nhóm khách hàng';
      setErrors(newErrors);
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    setCustomers(customers.map(c => 
      c.customerId === editing.customerId 
        ? { ...c, ...form, status: form.status as 'active' | 'inactive' }
        : c
    ));
    
    setDialogOpen(false);
    setEditing(null);
    setForm({ customerId: '', customerName: '', taxCode: '', address: '', phoneNumber: '', email: '', groupId: '', status: 'active' });
    setErrors({ customerId: '', customerName: '', groupId: '' });
    toast.success('Cập nhật khách hàng thành công');
  };

  const handleDelete = () => {
    if (!toDelete) return;
    
    setCustomers(customers.filter(c => c.customerId !== toDelete.customerId));
    setDeleteDialogOpen(false);
    setToDelete(null);
    toast.success('Xóa khách hàng thành công');
  };

  const handleAssign = () => {
    if (!toAssign || !selectedGroup) {
      toast.error('Vui lòng chọn nhóm khách hàng');
      return;
    }
    
    setCustomers(customers.map(c => 
      c.customerId === toAssign.customerId 
        ? { ...c, groupId: selectedGroup }
        : c
    ));
    
    setAssignDialogOpen(false);
    setToAssign(null);
    setSelectedGroup('');
    toast.success('Gán khách hàng vào nhóm thành công');
  };

  const columns: Column[] = [
    { key: 'customerId', label: 'Mã KH', width: '100px' },
    { key: 'customerName', label: 'Tên khách hàng' },
    { key: 'taxCode', label: 'MST', width: '120px' },
    { key: 'phoneNumber', label: 'Số ĐT', width: '130px' },
    { 
      key: 'groupId', 
      label: 'Nhóm KH', 
      width: '180px',
      render: (value) => {
        const group = customerGroups.find(g => g.groupCode === value);
        return <Badge variant="outline">{group?.groupName || value}</Badge>;
      }
    },
    { key: 'createdDate', label: 'Ngày tạo', width: '110px' },
    { 
      key: 'status', 
      label: 'Trạng thái', 
      width: '120px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Khách hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý danh sách khách hàng</p>
        </div>
        <Button 
          className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
          onClick={() => {
            setEditing(null);
            setForm({ customerId: '', customerName: '', taxCode: '', address: '', phoneNumber: '', email: '', groupId: '', status: 'active' });
            setErrors({ customerId: '', customerName: '', groupId: '' });
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={customers}
        onEdit={(row) => {
          setEditing(row as Customer);
          setForm({
            customerId: row.customerId,
            customerName: row.customerName,
            taxCode: row.taxCode,
            address: row.address,
            phoneNumber: row.phoneNumber,
            email: row.email,
            groupId: row.groupId,
            status: row.status
          });
          setErrors({ customerId: '', customerName: '', groupId: '' });
          setDialogOpen(true);
        }}
        onDelete={(row) => {
          setToDelete(row as Customer);
          setDeleteDialogOpen(true);
        }}
        customActions={(row) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setToAssign(row as Customer);
              setSelectedGroup(row.groupId);
              setAssignDialogOpen(true);
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Gán nhóm
          </Button>
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Chỉnh sửa' : 'Thêm mới'} khách hàng</DialogTitle>
            <DialogDescription>
              {editing ? 'Cập nhật thông tin khách hàng' : 'Nhập đầy đủ thông tin khách hàng và chọn nhóm'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã khách hàng <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập mã khách hàng..." 
                  value={form.customerId}
                  onChange={(e) => {
                    setForm({ ...form, customerId: e.target.value });
                    setErrors({ ...errors, customerId: '' });
                  }}
                  disabled={!!editing}
                  className={errors.customerId ? 'border-red-500' : ''}
                />
                {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
              </div>
              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <Input 
                  placeholder="Nhập mã số thuế..." 
                  value={form.taxCode}
                  onChange={(e) => setForm({ ...form, taxCode: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tên khách hàng <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="Nhập tên khách hàng..." 
                value={form.customerName}
                onChange={(e) => {
                  setForm({ ...form, customerName: e.target.value });
                  setErrors({ ...errors, customerName: '' });
                }}
                className={errors.customerName ? 'border-red-500' : ''}
              />
              {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input 
                placeholder="Nhập địa chỉ..." 
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input 
                  placeholder="Nhập số điện thoại..." 
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  placeholder="Nhập email..." 
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nhóm khách hàng <span className="text-red-500">*</span></Label>
                <Select value={form.groupId} onValueChange={(value) => {
                  setForm({ ...form, groupId: value });
                  setErrors({ ...errors, groupId: '' });
                }}>
                  <SelectTrigger className={errors.groupId ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Chọn nhóm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customerGroups.map(group => (
                      <SelectItem key={group.groupCode} value={group.groupCode}>
                        {group.groupName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.groupId && <p className="text-red-500 text-sm">{errors.groupId}</p>}
              </div>
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Ngưng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setEditing(null);
                setForm({ customerId: '', customerName: '', taxCode: '', address: '', phoneNumber: '', email: '', groupId: '', status: 'active' });
                setErrors({ customerId: '', customerName: '', groupId: '' });
              }}>
                Hủy
              </Button>
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC]" 
                onClick={editing ? handleUpdate : handleCreate}
              >
                {editing ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gán khách hàng vào nhóm</DialogTitle>
            <DialogDescription>
              Khách hàng: <span className="font-semibold">{toAssign?.customerName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nhóm khách hàng hiện tại</Label>
              <Input 
                value={customerGroups.find(g => g.groupCode === toAssign?.groupId)?.groupName || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>Chuyển sang nhóm mới <span className="text-red-500">*</span></Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm..." />
                </SelectTrigger>
                <SelectContent>
                  {customerGroups.map(group => (
                    <SelectItem key={group.groupCode} value={group.groupCode}>
                      {group.groupName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setAssignDialogOpen(false);
                setToAssign(null);
                setSelectedGroup('');
              }}>
                Hủy
              </Button>
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC]" 
                onClick={handleAssign}
              >
                Gán nhóm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng "{toDelete?.customerName}"?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteDialogOpen(false);
              setToDelete(null);
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

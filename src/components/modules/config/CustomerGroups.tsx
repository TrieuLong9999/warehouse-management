import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus, Users, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface CustomerGroup {
  groupCode: string;
  groupName: string;
  description: string;
  customerCount: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

const initialData: CustomerGroup[] = [
  { groupCode: 'NKH001', groupName: 'VIP', description: 'Khách hàng VIP, ưu tiên cao nhất', customerCount: 15, createdDate: '01/01/2024', status: 'active' },
  { groupCode: 'NKH002', groupName: 'Doanh nghiệp lớn', description: 'Các doanh nghiệp có quy mô lớn', customerCount: 28, createdDate: '01/01/2024', status: 'active' },
  { groupCode: 'NKH003', groupName: 'Doanh nghiệp vừa', description: 'Các doanh nghiệp quy mô vừa', customerCount: 45, createdDate: '05/01/2024', status: 'active' },
  { groupCode: 'NKH004', groupName: 'Doanh nghiệp nhỏ', description: 'Các doanh nghiệp quy mô nhỏ', customerCount: 67, createdDate: '10/01/2024', status: 'active' },
  { groupCode: 'NKH005', groupName: 'Khách hàng thường', description: 'Khách hàng giao dịch thông thường', customerCount: 120, createdDate: '15/01/2024', status: 'active' },
  { groupCode: 'NKH006', groupName: 'Khách hàng mới', description: 'Khách hàng mới đăng ký', customerCount: 8, createdDate: '01/02/2024', status: 'active' },
];

export function CustomerGroups() {
  const [groups, setGroups] = useState<CustomerGroup[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CustomerGroup | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<CustomerGroup | null>(null);
  const [form, setForm] = useState({ groupCode: '', groupName: '', description: '', status: 'active' });
  const [errors, setErrors] = useState({ groupCode: '', groupName: '' });

  const validateForm = () => {
    const newErrors = { groupCode: '', groupName: '' };
    let isValid = true;

    if (!form.groupCode.trim()) {
      newErrors.groupCode = 'Vui lòng nhập mã nhóm';
      isValid = false;
    }

    if (!form.groupName.trim()) {
      newErrors.groupName = 'Vui lòng nhập tên nhóm';
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
    if (groups.some(g => g.groupCode === form.groupCode)) {
      setErrors(prev => ({ ...prev, groupCode: 'Mã nhóm đã tồn tại' }));
      toast.error('Mã nhóm đã tồn tại trong hệ thống');
      return;
    }
    
    const newGroup: CustomerGroup = {
      ...form,
      customerCount: 0,
      createdDate: new Date().toLocaleDateString('vi-VN'),
      status: form.status as 'active' | 'inactive',
    };
    
    setGroups([...groups, newGroup]);
    setDialogOpen(false);
    setForm({ groupCode: '', groupName: '', description: '', status: 'active' });
    setErrors({ groupCode: '', groupName: '' });
    toast.success('Thêm nhóm khách hàng thành công');
  };

  const handleUpdate = () => {
    if (!editing) return;
    
    if (!form.groupName.trim()) {
      setErrors({ ...errors, groupName: 'Vui lòng nhập tên nhóm' });
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    setGroups(groups.map(g => 
      g.groupCode === editing.groupCode 
        ? { ...g, ...form, status: form.status as 'active' | 'inactive' }
        : g
    ));
    
    setDialogOpen(false);
    setEditing(null);
    setForm({ groupCode: '', groupName: '', description: '', status: 'active' });
    setErrors({ groupCode: '', groupName: '' });
    toast.success('Cập nhật nhóm khách hàng thành công');
  };

  const handleDelete = () => {
    if (!toDelete) return;
    
    if (toDelete.customerCount > 0) {
      toast.error('Không thể xóa nhóm đã có khách hàng. Vui lòng chuyển khách hàng sang nhóm khác trước.');
      setDeleteDialogOpen(false);
      setToDelete(null);
      return;
    }
    
    setGroups(groups.filter(g => g.groupCode !== toDelete.groupCode));
    setDeleteDialogOpen(false);
    setToDelete(null);
    toast.success('Xóa nhóm khách hàng thành công');
  };

  const columns: Column[] = [
    { key: 'groupCode', label: 'Mã nhóm', width: '120px' },
    { key: 'groupName', label: 'Tên nhóm', width: '200px' },
    { key: 'description', label: 'Mô tả' },
    { 
      key: 'customerCount', 
      label: 'Số khách hàng', 
      width: '150px',
      render: (value) => <Badge variant="secondary">{value} khách hàng</Badge>
    },
    { key: 'createdDate', label: 'Ngày tạo', width: '130px' },
    { 
      key: 'status', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Nhóm khách hàng</h1>
          <p className="text-muted-foreground mt-1">Quản lý danh mục nhóm khách hàng</p>
        </div>
        <Button 
          className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
          onClick={() => {
            setEditing(null);
            setForm({ groupCode: '', groupName: '', description: '', status: 'active' });
            setErrors({ groupCode: '', groupName: '' });
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={groups}
        onEdit={(row) => {
          setEditing(row as CustomerGroup);
          setForm({
            groupCode: row.groupCode,
            groupName: row.groupName,
            description: row.description,
            status: row.status
          });
          setErrors({ groupCode: '', groupName: '' });
          setDialogOpen(true);
        }}
        onDelete={(row) => {
          setToDelete(row as CustomerGroup);
          setDeleteDialogOpen(true);
        }}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Chỉnh sửa' : 'Thêm mới'} nhóm khách hàng</DialogTitle>
            <DialogDescription>
              {editing ? 'Cập nhật thông tin nhóm khách hàng' : 'Nhập thông tin để tạo nhóm khách hàng mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã nhóm <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập mã nhóm..." 
                  value={form.groupCode}
                  onChange={(e) => {
                    setForm({ ...form, groupCode: e.target.value });
                    setErrors({ ...errors, groupCode: '' });
                  }}
                  disabled={!!editing}
                  className={errors.groupCode ? 'border-red-500' : ''}
                />
                {errors.groupCode && <p className="text-red-500 text-sm">{errors.groupCode}</p>}
              </div>
              <div className="space-y-2">
                <Label>Tên nhóm <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập tên nhóm..." 
                  value={form.groupName}
                  onChange={(e) => {
                    setForm({ ...form, groupName: e.target.value });
                    setErrors({ ...errors, groupName: '' });
                  }}
                  className={errors.groupName ? 'border-red-500' : ''}
                />
                {errors.groupName && <p className="text-red-500 text-sm">{errors.groupName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea 
                placeholder="Nhập mô tả nhóm khách hàng..." 
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
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
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setEditing(null);
                setForm({ groupCode: '', groupName: '', description: '', status: 'active' });
                setErrors({ groupCode: '', groupName: '' });
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa nhóm khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa nhóm "{toDelete?.groupName}"?
              <br />
              <span className="text-red-500">Lưu ý: Không thể xóa nh��m đã có khách hàng.</span>
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

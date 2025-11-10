import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { DatePicker } from '../../ui/date-picker';
import { toast } from 'sonner@2.0.3';

interface User {
  employeeId: string;
  employeeName: string;
  position: string;
  email: string;
  phoneNumber: string;
  department: string;
  startDate: string;
  status: 'active' | 'inactive';
}

const initialData: User[] = [
  { employeeId: 'NV001', employeeName: 'Nguyễn Văn A', position: 'Quản lý kho', email: 'nva@thanhdat.com', phoneNumber: '0901234567', department: 'Kho vận', startDate: '01/01/2023', status: 'active' },
  { employeeId: 'NV002', employeeName: 'Trần Thị B', position: 'Nhân viên kho', email: 'ttb@thanhdat.com', phoneNumber: '0912345678', department: 'Kho vận', startDate: '15/02/2023', status: 'active' },
  { employeeId: 'NV003', employeeName: 'Lê Văn C', position: 'Kế toán', email: 'lvc@thanhdat.com', phoneNumber: '0923456789', department: 'Kế toán', startDate: '01/03/2023', status: 'active' },
  { employeeId: 'NV004', employeeName: 'Phạm Thị D', position: 'Nhân viên kho', email: 'ptd@thanhdat.com', phoneNumber: '0934567890', department: 'Kho vận', startDate: '10/04/2023', status: 'inactive' },
  { employeeId: 'NV005', employeeName: 'Hoàng Văn E', position: 'Trưởng phòng', email: 'hve@thanhdat.com', phoneNumber: '0945678901', department: 'Kho vận', startDate: '01/01/2022', status: 'active' },
];

const departments = [
  'Kho vận',
  'Kế toán',
  'Kinh doanh',
  'Hành chính',
  'IT',
];

const positions = [
  'Quản lý kho',
  'Trưởng phòng',
  'Phó phòng',
  'Nhân viên kho',
  'Kế toán',
  'Nhân viên kinh doanh',
  'IT Support',
  'Admin',
];

export function Users() {
  const [users, setUsers] = useState<User[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [form, setForm] = useState({ 
    employeeId: '', 
    employeeName: '', 
    position: '', 
    email: '', 
    phoneNumber: '',
    department: '',
    startDate: new Date().toLocaleDateString('vi-VN'),
    status: 'active' 
  });
  const [errors, setErrors] = useState({ 
    employeeId: '', 
    employeeName: '', 
    position: '', 
    email: '', 
    phoneNumber: '',
    department: '' 
  });

  const validateForm = () => {
    const newErrors = { 
      employeeId: '', 
      employeeName: '', 
      position: '', 
      email: '', 
      phoneNumber: '',
      department: '' 
    };
    let isValid = true;

    if (!form.employeeId.trim()) {
      newErrors.employeeId = 'Vui lòng nhập mã nhân viên';
      isValid = false;
    }

    if (!form.employeeName.trim()) {
      newErrors.employeeName = 'Vui lòng nhập tên nhân viên';
      isValid = false;
    }

    if (!form.position) {
      newErrors.position = 'Vui lòng chọn chức vụ';
      isValid = false;
    }

    if (!form.department) {
      newErrors.department = 'Vui lòng chọn phòng ban';
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
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
    if (users.some(u => u.employeeId === form.employeeId)) {
      setErrors(prev => ({ ...prev, employeeId: 'Mã nhân viên đã tồn tại' }));
      toast.error('Mã nhân viên đã tồn tại trong hệ thống');
      return;
    }

    // Check duplicate email
    if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase())) {
      setErrors(prev => ({ ...prev, email: 'Email đã được sử dụng' }));
      toast.error('Email đã được sử dụng cho tài khoản khác');
      return;
    }
    
    const newUser: User = {
      ...form,
      startDate: form.startDate,
      status: form.status as 'active' | 'inactive',
    };
    
    setUsers([...users, newUser]);
    setDialogOpen(false);
    setSelectedDate(new Date());
    setForm({ 
      employeeId: '', 
      employeeName: '', 
      position: '', 
      email: '', 
      phoneNumber: '',
      department: '',
      startDate: new Date().toLocaleDateString('vi-VN'),
      status: 'active' 
    });
    setErrors({ employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' });
    toast.success('Thêm người dùng thành công');
  };

  const handleUpdate = () => {
    if (!editing) return;
    
    const validationErrors = { employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' };
    let isValid = true;

    if (!form.employeeName.trim()) {
      validationErrors.employeeName = 'Vui lòng nhập tên nhân viên';
      isValid = false;
    }
    if (!form.position) {
      validationErrors.position = 'Vui lòng chọn chức vụ';
      isValid = false;
    }
    if (!form.department) {
      validationErrors.department = 'Vui lòng chọn phòng ban';
      isValid = false;
    }
    if (!form.email.trim()) {
      validationErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = 'Email không hợp lệ';
      isValid = false;
    }
    if (!form.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
      validationErrors.phoneNumber = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!isValid) {
      setErrors(validationErrors);
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    // Check duplicate email (excluding current user)
    if (users.some(u => u.email.toLowerCase() === form.email.toLowerCase() && u.employeeId !== editing.employeeId)) {
      setErrors(prev => ({ ...prev, email: 'Email đã được sử dụng' }));
      toast.error('Email đã được sử dụng cho tài khoản khác');
      return;
    }
    
    setUsers(users.map(u => 
      u.employeeId === editing.employeeId 
        ? { 
            ...u, 
            ...form, 
            startDate: form.startDate,
            status: form.status as 'active' | 'inactive' 
          }
        : u
    ));
    
    setDialogOpen(false);
    setEditing(null);
    setSelectedDate(new Date());
    setForm({ 
      employeeId: '', 
      employeeName: '', 
      position: '', 
      email: '', 
      phoneNumber: '',
      department: '',
      startDate: new Date().toLocaleDateString('vi-VN'),
      status: 'active' 
    });
    setErrors({ employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' });
    toast.success('Cập nhật người dùng thành công');
  };

  const handleDelete = () => {
    if (!toDelete) return;
    
    setUsers(users.filter(u => u.employeeId !== toDelete.employeeId));
    setDeleteDialogOpen(false);
    setToDelete(null);
    toast.success('Xóa người dùng thành công');
  };

  const columns: Column[] = [
    { key: 'employeeId', label: 'Mã NV', width: '100px' },
    { key: 'employeeName', label: 'Tên nhân viên', width: '180px' },
    { key: 'position', label: 'Chức vụ', width: '150px' },
    { key: 'department', label: 'Phòng ban', width: '120px' },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'phoneNumber', label: 'Số điện thoại', width: '120px' },
    { key: 'startDate', label: 'Ngày vào làm', width: '110px' },
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
          <h1 className="text-[28px] font-bold text-foreground">Người dùng</h1>
          <p className="text-muted-foreground mt-1">Quản lý tài khoản người dùng hệ thống</p>
        </div>
        <Button 
          className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
          onClick={() => {
            setEditing(null);
            setSelectedDate(new Date());
            setForm({ 
              employeeId: '', 
              employeeName: '', 
              position: '', 
              email: '', 
              phoneNumber: '',
              department: '',
              startDate: new Date().toLocaleDateString('vi-VN'),
              status: 'active' 
            });
            setErrors({ employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' });
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={users}
        onEdit={(row) => {
          setEditing(row as User);
          const user = row as User;
          // Convert date from DD/MM/YYYY to Date object
          const dateParts = user.startDate.split('/');
          const dateObj = dateParts.length === 3 
            ? new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]))
            : new Date();
          
          setSelectedDate(dateObj);
          setForm({
            employeeId: user.employeeId,
            employeeName: user.employeeName,
            position: user.position,
            email: user.email,
            phoneNumber: user.phoneNumber,
            department: user.department,
            startDate: user.startDate,
            status: user.status
          });
          setErrors({ employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' });
          setDialogOpen(true);
        }}
        onDelete={(row) => {
          setToDelete(row as User);
          setDeleteDialogOpen(true);
        }}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Chỉnh sửa' : 'Thêm mới'} người dùng</DialogTitle>
            <DialogDescription>
              {editing ? 'Cập nhật thông tin người dùng' : 'Nhập đầy đủ thông tin để tạo tài khoản người dùng mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã nhân viên <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập mã nhân viên..." 
                  value={form.employeeId}
                  onChange={(e) => {
                    setForm({ ...form, employeeId: e.target.value });
                    setErrors({ ...errors, employeeId: '' });
                  }}
                  disabled={!!editing}
                  className={errors.employeeId ? 'border-red-500' : ''}
                />
                {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
              </div>
              <div className="space-y-2">
                <Label>Tên nhân viên <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập tên nhân viên..." 
                  value={form.employeeName}
                  onChange={(e) => {
                    setForm({ ...form, employeeName: e.target.value });
                    setErrors({ ...errors, employeeName: '' });
                  }}
                  className={errors.employeeName ? 'border-red-500' : ''}
                />
                {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email <span className="text-red-500">*</span></Label>
                <Input 
                  type="email"
                  placeholder="Nhập email..." 
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: '' });
                  }}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập số điện thoại..." 
                  value={form.phoneNumber}
                  onChange={(e) => {
                    setForm({ ...form, phoneNumber: e.target.value });
                    setErrors({ ...errors, phoneNumber: '' });
                  }}
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phòng ban <span className="text-red-500">*</span></Label>
                <Select 
                  value={form.department} 
                  onValueChange={(value) => {
                    setForm({ ...form, department: value });
                    setErrors({ ...errors, department: '' });
                  }}
                >
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Chọn phòng ban..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
              </div>
              <div className="space-y-2">
                <Label>Chức vụ <span className="text-red-500">*</span></Label>
                <Select 
                  value={form.position} 
                  onValueChange={(value) => {
                    setForm({ ...form, position: value });
                    setErrors({ ...errors, position: '' });
                  }}
                >
                  <SelectTrigger className={errors.position ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Chọn chức vụ..." />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(pos => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày vào làm</Label>
                <DatePicker
                  date={selectedDate}
                  onDateChange={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      setForm({ ...form, startDate: date.toLocaleDateString('vi-VN') });
                    }
                  }}
                  placeholder="Chọn ngày vào làm..."
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
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setEditing(null);
                setSelectedDate(new Date());
                setForm({ 
                  employeeId: '', 
                  employeeName: '', 
                  position: '', 
                  email: '', 
                  phoneNumber: '',
                  department: '',
                  startDate: new Date().toLocaleDateString('vi-VN'),
                  status: 'active' 
                });
                setErrors({ employeeId: '', employeeName: '', position: '', email: '', phoneNumber: '', department: '' });
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
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa người dùng <strong>{toDelete?.employeeName}</strong> ({toDelete?.employeeId})? 
              <br />
              <span className="text-red-500">Hành động này không thể hoàn tác.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

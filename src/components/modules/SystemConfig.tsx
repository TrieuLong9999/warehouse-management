import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { Button } from '../ui/button';
import { Plus, Users, UserPlus, Eye, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { CustomerGroups } from './config/CustomerGroups';
import { Customers } from './config/Customers';
import { Suppliers } from './config/Suppliers';
import { Warehouses } from './config/Warehouses';
import { Users as UsersComponent } from './config/Users';
import { ABACPolicies } from './config/ABACPolicies';

// Types
interface CustomerGroup {
  maNhom: string;
  tenNhom: string;
  moTa: string;
  soKhachHang: number;
  ngayTao: string;
  trangThai: 'active' | 'inactive';
}

interface Customer {
  maKH: string;
  tenKH: string;
  maSoThue: string;
  diaChi: string;
  soDienThoai: string;
  email: string;
  nhomKH: string;
  ngayTao: string;
  trangThai: 'active' | 'inactive';
}

// Initial Data
const initialCustomerGroups: CustomerGroup[] = [
  { maNhom: 'NKH001', tenNhom: 'VIP', moTa: 'Khách hàng VIP, ưu tiên cao nhất', soKhachHang: 15, ngayTao: '01/01/2024', trangThai: 'active' },
  { maNhom: 'NKH002', tenNhom: 'Doanh nghiệp lớn', moTa: 'Các doanh nghiệp có quy mô lớn', soKhachHang: 28, ngayTao: '01/01/2024', trangThai: 'active' },
  { maNhom: 'NKH003', tenNhom: 'Doanh nghiệp vừa', moTa: 'Các doanh nghiệp quy mô vừa', soKhachHang: 45, ngayTao: '05/01/2024', trangThai: 'active' },
  { maNhom: 'NKH004', tenNhom: 'Doanh nghiệp nhỏ', moTa: 'Các doanh nghiệp quy mô nhỏ', soKhachHang: 67, ngayTao: '10/01/2024', trangThai: 'active' },
  { maNhom: 'NKH005', tenNhom: 'Khách hàng thường', moTa: 'Khách hàng giao dịch thông thường', soKhachHang: 120, ngayTao: '15/01/2024', trangThai: 'active' },
  { maNhom: 'NKH006', tenNhom: 'Khách hàng mới', moTa: 'Khách hàng mới đăng ký', soKhachHang: 8, ngayTao: '01/02/2024', trangThai: 'active' },
];

const initialCustomers: Customer[] = [
  { maKH: 'KH001', tenKH: 'Công ty TNHH Điện tử Samsung Việt Nam', maSoThue: '0123456789', diaChi: 'Khu Công nghệ cao, Q.9, TP.HCM', soDienThoai: '028-1234-5678', email: 'contact@samsung.vn', nhomKH: 'NKH001', ngayTao: '15/01/2024', trangThai: 'active' },
  { maKH: 'KH002', tenKH: 'Công ty CP Thế giới Di động', maSoThue: '0987654321', diaChi: '128 Trần Quang Khải, Q.1, TP.HCM', soDienThoai: '028-9876-5432', email: 'info@thegioididong.com', nhomKH: 'NKH001', ngayTao: '18/01/2024', trangThai: 'active' },
  { maKH: 'KH003', tenKH: 'Công ty TNHH Logistics Viettel', maSoThue: '0111222333', diaChi: '100 Lê Văn Việt, Q.9, TP.HCM', soDienThoai: '028-3456-7890', email: 'logistics@viettel.vn', nhomKH: 'NKH002', ngayTao: '20/01/2024', trangThai: 'active' },
  { maKH: 'KH004', tenKH: 'Công ty CP Đầu tư Xây dựng Hòa Bình', maSoThue: '0444555666', diaChi: '25 Phan Đăng Lưu, Phú Nhuận, TP.HCM', soDienThoai: '028-2222-3333', email: 'contact@hoabinhcorp.com', nhomKH: 'NKH002', ngayTao: '22/01/2024', trangThai: 'active' },
  { maKH: 'KH005', tenKH: 'Công ty TNHH Thương mại ABC', maSoThue: '0777888999', diaChi: '45 Nguyễn Văn Cừ, Q.5, TP.HCM', soDienThoai: '028-5555-6666', email: 'sales@abctrade.com', nhomKH: 'NKH003', ngayTao: '25/01/2024', trangThai: 'active' },
  { maKH: 'KH006', tenKH: 'Công ty CP Dược phẩm XYZ', maSoThue: '0333444555', diaChi: '67 Lý Thái Tổ, Q.10, TP.HCM', soDienThoai: '028-7777-8888', email: 'info@xyzpharma.com', nhomKH: 'NKH003', ngayTao: '28/01/2024', trangThai: 'active' },
  { maKH: 'KH007', tenKH: 'Doanh nghiệp tư nhân Minh Anh', maSoThue: '0666777888', diaChi: '123 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM', soDienThoai: '028-4444-5555', email: 'contact@minhanh.com', nhomKH: 'NKH004', ngayTao: '01/02/2024', trangThai: 'active' },
  { maKH: 'KH008', tenKH: 'Công ty TNHH Thực phẩm Sạch', maSoThue: '0222333444', diaChi: '89 Cách Mạng Tháng 8, Q.3, TP.HCM', soDienThoai: '028-6666-7777', email: 'info@thucphamsach.vn', nhomKH: 'NKH004', ngayTao: '03/02/2024', trangThai: 'active' },
  { maKH: 'KH009', tenKH: 'Cửa hàng Điện máy Thanh Hà', maSoThue: '0555666777', diaChi: '234 Lê Hồng Phong, Q.5, TP.HCM', soDienThoai: '028-8888-9999', email: 'thanhha@gmail.com', nhomKH: 'NKH005', ngayTao: '05/02/2024', trangThai: 'active' },
  { maKH: 'KH010', tenKH: 'Công ty TNHH May mặc Hoàng Gia', maSoThue: '0888999000', diaChi: '56 Nguyễn Trãi, Q.1, TP.HCM', soDienThoai: '028-3333-4444', email: 'hoanggia@textile.vn', nhomKH: 'NKH005', ngayTao: '08/02/2024', trangThai: 'active' },
  { maKH: 'KH011', tenKH: 'Siêu thị Mini Tươi Ngon', maSoThue: '0999000111', diaChi: '78 Võ Văn Tần, Q.3, TP.HCM', soDienThoai: '028-1111-2222', email: 'tuoingon@market.vn', nhomKH: 'NKH006', ngayTao: '10/02/2024', trangThai: 'active' },
  { maKH: 'KH012', tenKH: 'Công ty CP Công nghệ Số Việt', maSoThue: '0112233445', diaChi: '90 Lê Lợi, Q.1, TP.HCM', soDienThoai: '028-5678-1234', email: 'digital@tech.vn', nhomKH: 'NKH006', ngayTao: '12/02/2024', trangThai: 'active' },
];

const supplierData = [
  { maNCC: 'NCC001', tenNCC: 'Nhà cung cấp A', loaiHang: 'Điện tử', ngayTao: '10/09/2024', trangThai: 'active' },
  { maNCC: 'NCC002', tenNCC: 'Nhà cung cấp B', loaiHang: 'Thực phẩm', ngayTao: '15/09/2024', trangThai: 'active' },
  { maNCC: 'NCC003', tenNCC: 'Nhà cung cấp C', loaiHang: 'Dệt may', ngayTao: '20/09/2024', trangThai: 'inactive' },
];

const warehouseData = [
  { maKho: 'KHO-A', tenKho: 'Kho A - Tầng 1', dienTich: '2000 m²', soLocation: 120, trangThai: 'active' },
  { maKho: 'KHO-B', tenKho: 'Kho B - Tầng 2', dienTich: '1500 m²', soLocation: 90, trangThai: 'active' },
  { maKho: 'KHO-C', tenKho: 'Kho C - Tầng 3', dienTich: '1800 m²', soLocation: 110, trangThai: 'inactive' },
];

const userData = [
  { maNV: 'NV001', tenNV: 'Nguyễn Văn A', chucVu: 'Quản lý kho', email: 'nva@thanhdat.com', trangThai: 'active' },
  { maNV: 'NV002', tenNV: 'Trần Thị B', chucVu: 'Nhân viên kho', email: 'ttb@thanhdat.com', trangThai: 'active' },
  { maNV: 'NV003', tenNV: 'Lê Văn C', chucVu: 'Kế toán', email: 'lvc@thanhdat.com', trangThai: 'active' },
  { maNV: 'NV004', tenNV: 'Phạm Thị D', chucVu: 'Nhân viên kho', email: 'ptd@thanhdat.com', trangThai: 'inactive' },
];

export function SystemConfig() {
  const [activeTab, setActiveTab] = useState('customer-groups');
  
  // State for customer groups
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>(initialCustomerGroups);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<CustomerGroup | null>(null);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<CustomerGroup | null>(null);
  
  // State for customers
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  
  // State for group members view
  const [viewGroupMembersDialogOpen, setViewGroupMembersDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroup | null>(null);
  
  // State for assign customer to group
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [customerToAssign, setCustomerToAssign] = useState<Customer | null>(null);
  
  // State for add customer to group from group view
  const [addToGroupDialogOpen, setAddToGroupDialogOpen] = useState(false);

  // Form states
  const [groupForm, setGroupForm] = useState({ maNhom: '', tenNhom: '', moTa: '', trangThai: 'active' });
  const [customerForm, setCustomerForm] = useState({ 
    maKH: '', tenKH: '', maSoThue: '', diaChi: '', soDienThoai: '', 
    email: '', nhomKH: '', trangThai: 'active' 
  });
  const [selectedGroupForAssign, setSelectedGroupForAssign] = useState('');
  const [selectedCustomersToAdd, setSelectedCustomersToAdd] = useState<string[]>([]);

  // Customer Group CRUD
  const handleCreateGroup = () => {
    if (!groupForm.tenNhom || !groupForm.maNhom) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    const newGroup: CustomerGroup = {
      ...groupForm,
      soKhachHang: 0,
      ngayTao: new Date().toLocaleDateString('vi-VN'),
      trangThai: groupForm.trangThai as 'active' | 'inactive',
    };
    
    setCustomerGroups([...customerGroups, newGroup]);
    setGroupDialogOpen(false);
    setGroupForm({ maNhom: '', tenNhom: '', moTa: '', trangThai: 'active' });
    toast.success('Thêm nhóm khách hàng thành công');
  };

  const handleUpdateGroup = () => {
    if (!editingGroup || !groupForm.tenNhom) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    setCustomerGroups(customerGroups.map(g => 
      g.maNhom === editingGroup.maNhom 
        ? { ...g, ...groupForm, trangThai: groupForm.trangThai as 'active' | 'inactive' }
        : g
    ));
    
    setGroupDialogOpen(false);
    setEditingGroup(null);
    setGroupForm({ maNhom: '', tenNhom: '', moTa: '', trangThai: 'active' });
    toast.success('Cập nhật nhóm khách hàng thành công');
  };

  const handleDeleteGroup = () => {
    if (!groupToDelete) return;
    
    const hasCustomers = customers.some(c => c.nhomKH === groupToDelete.maNhom);
    if (hasCustomers) {
      toast.error('Không thể xóa nhóm đã có khách hàng. Vui lòng chuyển khách hàng sang nhóm khác trước.');
      setDeleteGroupDialogOpen(false);
      setGroupToDelete(null);
      return;
    }
    
    setCustomerGroups(customerGroups.filter(g => g.maNhom !== groupToDelete.maNhom));
    setDeleteGroupDialogOpen(false);
    setGroupToDelete(null);
    toast.success('Xóa nhóm khách hàng thành công');
  };

  // Customer CRUD
  const handleCreateCustomer = () => {
    if (!customerForm.maKH || !customerForm.tenKH || !customerForm.nhomKH) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    const newCustomer: Customer = {
      ...customerForm,
      ngayTao: new Date().toLocaleDateString('vi-VN'),
      trangThai: customerForm.trangThai as 'active' | 'inactive',
    };
    
    setCustomers([...customers, newCustomer]);
    
    // Update customer count in group
    setCustomerGroups(customerGroups.map(g => 
      g.maNhom === customerForm.nhomKH 
        ? { ...g, soKhachHang: g.soKhachHang + 1 }
        : g
    ));
    
    setCustomerDialogOpen(false);
    setCustomerForm({ maKH: '', tenKH: '', maSoThue: '', diaChi: '', soDienThoai: '', email: '', nhomKH: '', trangThai: 'active' });
    toast.success('Thêm khách hàng thành công');
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer || !customerForm.tenKH || !customerForm.nhomKH) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    const oldGroup = customers.find(c => c.maKH === editingCustomer.maKH)?.nhomKH;
    const newGroup = customerForm.nhomKH;
    
    setCustomers(customers.map(c => 
      c.maKH === editingCustomer.maKH 
        ? { ...c, ...customerForm, trangThai: customerForm.trangThai as 'active' | 'inactive' }
        : c
    ));
    
    // Update customer counts if group changed
    if (oldGroup !== newGroup) {
      setCustomerGroups(customerGroups.map(g => {
        if (g.maNhom === oldGroup) return { ...g, soKhachHang: g.soKhachHang - 1 };
        if (g.maNhom === newGroup) return { ...g, soKhachHang: g.soKhachHang + 1 };
        return g;
      }));
    }
    
    setCustomerDialogOpen(false);
    setEditingCustomer(null);
    setCustomerForm({ maKH: '', tenKH: '', maSoThue: '', diaChi: '', soDienThoai: '', email: '', nhomKH: '', trangThai: 'active' });
    toast.success('Cập nhật khách hàng thành công');
  };

  const handleDeleteCustomer = () => {
    if (!customerToDelete) return;
    
    setCustomers(customers.filter(c => c.maKH !== customerToDelete.maKH));
    
    // Update customer count in group
    setCustomerGroups(customerGroups.map(g => 
      g.maNhom === customerToDelete.nhomKH 
        ? { ...g, soKhachHang: g.soKhachHang - 1 }
        : g
    ));
    
    setDeleteCustomerDialogOpen(false);
    setCustomerToDelete(null);
    toast.success('Xóa khách hàng thành công');
  };

  // Assign customer to group
  const handleAssignCustomerToGroup = () => {
    if (!customerToAssign || !selectedGroupForAssign) {
      toast.error('Vui lòng chọn nhóm khách hàng');
      return;
    }
    
    const oldGroup = customerToAssign.nhomKH;
    
    setCustomers(customers.map(c => 
      c.maKH === customerToAssign.maKH 
        ? { ...c, nhomKH: selectedGroupForAssign }
        : c
    ));
    
    // Update customer counts
    setCustomerGroups(customerGroups.map(g => {
      if (g.maNhom === oldGroup) return { ...g, soKhachHang: g.soKhachHang - 1 };
      if (g.maNhom === selectedGroupForAssign) return { ...g, soKhachHang: g.soKhachHang + 1 };
      return g;
    }));
    
    setAssignDialogOpen(false);
    setCustomerToAssign(null);
    setSelectedGroupForAssign('');
    toast.success('Gán khách hàng vào nhóm thành công');
  };

  // Add customers to group from group view
  const handleAddCustomersToGroup = () => {
    if (!selectedGroup || selectedCustomersToAdd.length === 0) {
      toast.error('Vui lòng chọn ít nhất một khách hàng');
      return;
    }
    
    const updates: { [key: string]: number } = {};
    
    setCustomers(customers.map(c => {
      if (selectedCustomersToAdd.includes(c.maKH)) {
        const oldGroup = c.nhomKH;
        updates[oldGroup] = (updates[oldGroup] || 0) - 1;
        updates[selectedGroup.maNhom] = (updates[selectedGroup.maNhom] || 0) + 1;
        return { ...c, nhomKH: selectedGroup.maNhom };
      }
      return c;
    }));
    
    // Update customer counts
    setCustomerGroups(customerGroups.map(g => {
      const change = updates[g.maNhom] || 0;
      return { ...g, soKhachHang: g.soKhachHang + change };
    }));
    
    setAddToGroupDialogOpen(false);
    setSelectedCustomersToAdd([]);
    toast.success(`Đã thêm ${selectedCustomersToAdd.length} khách hàng vào nhóm`);
  };

  // Column definitions for Customer Groups
  const groupColumns: Column[] = [
    { key: 'maNhom', label: 'Mã nhóm', width: '120px' },
    { key: 'tenNhom', label: 'Tên nhóm', width: '200px' },
    { key: 'moTa', label: 'Mô tả' },
    { 
      key: 'soKhachHang', 
      label: 'Số khách hàng', 
      width: '150px',
      render: (value) => <Badge variant="secondary">{value} khách hàng</Badge>
    },
    { key: 'ngayTao', label: 'Ngày tạo', width: '130px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  // Column definitions for Customers
  const customerColumns: Column[] = [
    { key: 'maKH', label: 'Mã KH', width: '100px' },
    { key: 'tenKH', label: 'Tên khách hàng' },
    { key: 'maSoThue', label: 'MST', width: '120px' },
    { key: 'soDienThoai', label: 'Số ĐT', width: '130px' },
    { 
      key: 'nhomKH', 
      label: 'Nhóm KH', 
      width: '180px',
      render: (value) => {
        const group = customerGroups.find(g => g.maNhom === value);
        return <Badge variant="outline">{group?.tenNhom || value}</Badge>;
      }
    },
    { key: 'ngayTao', label: 'Ngày tạo', width: '110px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '120px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  const supplierColumns: Column[] = [
    { key: 'maNCC', label: 'Mã NCC', width: '120px' },
    { key: 'tenNCC', label: 'Tên nhà cung cấp' },
    { key: 'loaiHang', label: 'Loại hàng', width: '150px' },
    { key: 'ngayTao', label: 'Ngày tạo', width: '130px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  const warehouseColumns: Column[] = [
    { key: 'maKho', label: 'Mã kho', width: '120px' },
    { key: 'tenKho', label: 'Tên kho' },
    { key: 'dienTich', label: 'Diện tích', width: '130px' },
    { key: 'soLocation', label: 'Số Location', width: '130px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  const userColumns: Column[] = [
    { key: 'maNV', label: 'Mã NV', width: '120px' },
    { key: 'tenNV', label: 'Tên nhân viên' },
    { key: 'chucVu', label: 'Chức vụ', width: '150px' },
    { key: 'email', label: 'Email' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
    },
  ];

  // Get customers in selected group
  const getGroupMembers = () => {
    if (!selectedGroup) return [];
    return customers.filter(c => c.nhomKH === selectedGroup.maNhom);
  };

  // Get customers not in selected group
  const getAvailableCustomers = () => {
    if (!selectedGroup) return [];
    return customers.filter(c => c.nhomKH !== selectedGroup.maNhom);
  };

  // Update customer count when data changes
  React.useEffect(() => {
    const groupCounts: { [key: string]: number } = {};
    customers.forEach(c => {
      groupCounts[c.nhomKH] = (groupCounts[c.nhomKH] || 0) + 1;
    });
    
    setCustomerGroups(customerGroups.map(g => ({
      ...g,
      soKhachHang: groupCounts[g.maNhom] || 0
    })));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Cấu hình hệ thống</h1>
          <p className="text-muted-foreground mt-1">Quản lý thông tin cơ bản</p>
        </div>
        <Button 
          className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
          onClick={() => {
            if (activeTab === 'customer-groups') {
              setEditingGroup(null);
              setGroupForm({ maNhom: '', tenNhom: '', moTa: '', trangThai: 'active' });
              setGroupDialogOpen(true);
            } else if (activeTab === 'customers') {
              setEditingCustomer(null);
              setCustomerForm({ maKH: '', tenKH: '', maSoThue: '', diaChi: '', soDienThoai: '', email: '', nhomKH: '', trangThai: 'active' });
              setCustomerDialogOpen(true);
            }
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted">
          <TabsTrigger value="customer-groups">Nhóm khách hàng</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          <TabsTrigger value="suppliers">Nhà cung cấp</TabsTrigger>
          <TabsTrigger value="warehouses">Kho & Location</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="abac">ABAC</TabsTrigger>
        </TabsList>

        {/* Customer Groups Tab */}
        <TabsContent value="customer-groups" className="mt-6">
          <CustomerGroups />
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="mt-6">
          <Customers />
        </TabsContent>

        <TabsContent value="suppliers" className="mt-6">
          <Suppliers />
        </TabsContent>

        <TabsContent value="warehouses" className="mt-6">
          <Warehouses />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UsersComponent />
        </TabsContent>

        <TabsContent value="abac" className="mt-6">
          <ABACPolicies />
        </TabsContent>
      </Tabs>

      {/* Customer Group Dialog (Create/Edit) */}
      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingGroup ? 'Chỉnh sửa' : 'Thêm mới'} nhóm khách hàng</DialogTitle>
            <DialogDescription>
              {editingGroup ? 'Cập nhật thông tin nhóm khách hàng' : 'Nhập thông tin để tạo nhóm khách hàng mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã nhóm <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập mã nhóm..." 
                  value={groupForm.maNhom}
                  onChange={(e) => setGroupForm({ ...groupForm, maNhom: e.target.value })}
                  disabled={!!editingGroup}
                />
              </div>
              <div className="space-y-2">
                <Label>Tên nhóm <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập tên nhóm..." 
                  value={groupForm.tenNhom}
                  onChange={(e) => setGroupForm({ ...groupForm, tenNhom: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea 
                placeholder="Nhập mô tả nhóm khách hàng..." 
                value={groupForm.moTa}
                onChange={(e) => setGroupForm({ ...groupForm, moTa: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={groupForm.trangThai} onValueChange={(value) => setGroupForm({ ...groupForm, trangThai: value })}>
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
                setGroupDialogOpen(false);
                setEditingGroup(null);
                setGroupForm({ maNhom: '', tenNhom: '', moTa: '', trangThai: 'active' });
              }}>
                Hủy
              </Button>
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC]" 
                onClick={editingGroup ? handleUpdateGroup : handleCreateGroup}
              >
                {editingGroup ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Dialog (Create/Edit) */}
      <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCustomer ? 'Chỉnh sửa' : 'Thêm mới'} khách hàng</DialogTitle>
            <DialogDescription>
              {editingCustomer ? 'Cập nhật thông tin khách hàng' : 'Nhập đầy đủ thông tin khách hàng và chọn nhóm'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mã khách hàng <span className="text-red-500">*</span></Label>
                <Input 
                  placeholder="Nhập mã khách hàng..." 
                  value={customerForm.maKH}
                  onChange={(e) => setCustomerForm({ ...customerForm, maKH: e.target.value })}
                  disabled={!!editingCustomer}
                />
              </div>
              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <Input 
                  placeholder="Nhập mã số thuế..." 
                  value={customerForm.maSoThue}
                  onChange={(e) => setCustomerForm({ ...customerForm, maSoThue: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tên khách hàng <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="Nhập tên khách hàng..." 
                value={customerForm.tenKH}
                onChange={(e) => setCustomerForm({ ...customerForm, tenKH: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input 
                placeholder="Nhập địa chỉ..." 
                value={customerForm.diaChi}
                onChange={(e) => setCustomerForm({ ...customerForm, diaChi: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input 
                  placeholder="Nhập số điện thoại..." 
                  value={customerForm.soDienThoai}
                  onChange={(e) => setCustomerForm({ ...customerForm, soDienThoai: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  placeholder="Nhập email..." 
                  type="email"
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nhóm khách hàng <span className="text-red-500">*</span></Label>
                <Select value={customerForm.nhomKH} onValueChange={(value) => setCustomerForm({ ...customerForm, nhomKH: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customerGroups.filter(g => g.trangThai === 'active').map(group => (
                      <SelectItem key={group.maNhom} value={group.maNhom}>
                        {group.tenNhom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={customerForm.trangThai} onValueChange={(value) => setCustomerForm({ ...customerForm, trangThai: value })}>
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
                setCustomerDialogOpen(false);
                setEditingCustomer(null);
                setCustomerForm({ maKH: '', tenKH: '', maSoThue: '', diaChi: '', soDienThoai: '', email: '', nhomKH: '', trangThai: 'active' });
              }}>
                Hủy
              </Button>
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC]" 
                onClick={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
              >
                {editingCustomer ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Group Members Dialog */}
      <Dialog open={viewGroupMembersDialogOpen} onOpenChange={setViewGroupMembersDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Khách hàng trong nhóm: {selectedGroup?.tenNhom}
            </DialogTitle>
            <DialogDescription>
              Danh sách {getGroupMembers().length} khách hàng thuộc nhóm này
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
                onClick={() => setAddToGroupDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Thêm khách hàng vào nhóm
              </Button>
            </div>
            <div className="border rounded-lg">
              <DataTable 
                columns={customerColumns} 
                data={getGroupMembers()}
                onEdit={(row) => {
                  setEditingCustomer(row as Customer);
                  setCustomerForm({
                    maKH: row.maKH,
                    tenKH: row.tenKH,
                    maSoThue: row.maSoThue,
                    diaChi: row.diaChi,
                    soDienThoai: row.soDienThoai,
                    email: row.email,
                    nhomKH: row.nhomKH,
                    trangThai: row.trangThai
                  });
                  setCustomerDialogOpen(true);
                }}
                onDelete={(row) => {
                  setCustomerToDelete(row as Customer);
                  setDeleteCustomerDialogOpen(true);
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Customers to Group Dialog */}
      <Dialog open={addToGroupDialogOpen} onOpenChange={setAddToGroupDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm khách hàng vào nhóm: {selectedGroup?.tenNhom}</DialogTitle>
            <DialogDescription>
              Chọn khách hàng từ danh sách dưới đây để thêm vào nhóm
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border rounded-lg max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="text-left p-3 w-12">
                      <input 
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedCustomersToAdd.length === getAvailableCustomers().length && getAvailableCustomers().length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCustomersToAdd(getAvailableCustomers().map(c => c.maKH));
                          } else {
                            setSelectedCustomersToAdd([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-3">Mã KH</th>
                    <th className="text-left p-3">Tên khách hàng</th>
                    <th className="text-left p-3">Nhóm hiện tại</th>
                    <th className="text-left p-3">Số điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  {getAvailableCustomers().map(customer => (
                    <tr key={customer.maKH} className="border-t hover:bg-muted/50">
                      <td className="p-3">
                        <input 
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedCustomersToAdd.includes(customer.maKH)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCustomersToAdd([...selectedCustomersToAdd, customer.maKH]);
                            } else {
                              setSelectedCustomersToAdd(selectedCustomersToAdd.filter(id => id !== customer.maKH));
                            }
                          }}
                        />
                      </td>
                      <td className="p-3">{customer.maKH}</td>
                      <td className="p-3">{customer.tenKH}</td>
                      <td className="p-3">
                        <Badge variant="outline">
                          {customerGroups.find(g => g.maNhom === customer.nhomKH)?.tenNhom}
                        </Badge>
                      </td>
                      <td className="p-3">{customer.soDienThoai}</td>
                    </tr>
                  ))}
                  {getAvailableCustomers().length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        Tất cả khách hàng đã thuộc nhóm này
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Đã chọn: <span className="font-semibold">{selectedCustomersToAdd.length}</span> khách hàng
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setAddToGroupDialogOpen(false);
                  setSelectedCustomersToAdd([]);
                }}>
                  Hủy
                </Button>
                <Button 
                  className="bg-[#0046FF] hover:bg-[#003ACC]" 
                  onClick={handleAddCustomersToGroup}
                  disabled={selectedCustomersToAdd.length === 0}
                >
                  Thêm vào nhóm
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Customer to Group Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gán khách hàng vào nhóm</DialogTitle>
            <DialogDescription>
              Khách hàng: <span className="font-semibold">{customerToAssign?.tenKH}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nhóm khách hàng hiện tại</Label>
              <Input 
                value={customerGroups.find(g => g.maNhom === customerToAssign?.nhomKH)?.tenNhom || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>Chuyển sang nhóm mới <span className="text-red-500">*</span></Label>
              <Select value={selectedGroupForAssign} onValueChange={setSelectedGroupForAssign}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm..." />
                </SelectTrigger>
                <SelectContent>
                  {customerGroups.filter(g => g.trangThai === 'active').map(group => (
                    <SelectItem key={group.maNhom} value={group.maNhom}>
                      {group.tenNhom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setAssignDialogOpen(false);
                setCustomerToAssign(null);
                setSelectedGroupForAssign('');
              }}>
                Hủy
              </Button>
              <Button 
                className="bg-[#0046FF] hover:bg-[#003ACC]" 
                onClick={handleAssignCustomerToGroup}
              >
                Gán nhóm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Group Confirmation */}
      <AlertDialog open={deleteGroupDialogOpen} onOpenChange={setDeleteGroupDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa nhóm khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa nhóm "{groupToDelete?.tenNhom}"?
              <br />
              <span className="text-red-500">Lưu ý: Không thể xóa nhóm đã có khách hàng.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteGroupDialogOpen(false);
              setGroupToDelete(null);
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGroup} className="bg-red-500 hover:bg-red-600">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Customer Confirmation */}
      <AlertDialog open={deleteCustomerDialogOpen} onOpenChange={setDeleteCustomerDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khách hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng "{customerToDelete?.tenKH}"?
              <br />
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteCustomerDialogOpen(false);
              setCustomerToDelete(null);
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-red-500 hover:bg-red-600">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

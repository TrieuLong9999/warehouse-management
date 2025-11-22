import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, Shield, ChevronRight, ChevronDown, Lock, User as UserIcon, Save } from 'lucide-react';
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
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';

interface Permission {
  id: string;
  name: string;
  children?: Permission[];
}

interface RolePermissions {
  [key: string]: string[];
}

export function UserPermissions() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isManagePermissionsOpen, setIsManagePermissionsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['dashboard', 'system', 'inbound', 'outbound']);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      code: 'USR-001',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@tdat.com',
      phone: '0912 345 678',
      role: 'Quản trị viên',
      roleCode: 'admin',
      warehouse: 'Tất cả kho',
      warehouseCode: 'all',
      status: 'Hoạt động',
      lastLogin: '21/11/2024 14:30',
      createdDate: '15/01/2024',
    },
    {
      id: 2,
      code: 'USR-002',
      name: 'Trần Thị B',
      email: 'tranthib@tdat.com',
      phone: '0987 654 321',
      role: 'Quản lý kho',
      roleCode: 'warehouse-manager',
      warehouse: 'Kho A - Hà Nội',
      warehouseCode: 'wh-a',
      status: 'Hoạt động',
      lastLogin: '21/11/2024 15:20',
      createdDate: '20/02/2024',
    },
    {
      id: 3,
      code: 'USR-003',
      name: 'Lê Văn C',
      email: 'levanc@tdat.com',
      phone: '0901 234 567',
      role: 'Nhân viên nhập kho',
      roleCode: 'inbound-staff',
      warehouse: 'Kho A - Hà Nội',
      warehouseCode: 'wh-a',
      status: 'Hoạt động',
      lastLogin: '21/11/2024 10:15',
      createdDate: '10/03/2024',
    },
    {
      id: 4,
      code: 'USR-004',
      name: 'Phạm Thị D',
      email: 'phamthid@tdat.com',
      phone: '0932 111 222',
      role: 'Nhân viên xuất kho',
      roleCode: 'outbound-staff',
      warehouse: 'Kho B - TP.HCM',
      warehouseCode: 'wh-b',
      status: 'Hoạt động',
      lastLogin: '21/11/2024 11:45',
      createdDate: '05/04/2024',
    },
    {
      id: 5,
      code: 'USR-005',
      name: 'Hoàng Văn E',
      email: 'hoangvane@tdat.com',
      phone: '0945 678 901',
      role: 'Kế toán',
      roleCode: 'accountant',
      warehouse: 'Tất cả kho',
      warehouseCode: 'all',
      status: 'Tạm khóa',
      lastLogin: '18/11/2024 16:30',
      createdDate: '12/05/2024',
    },
  ];

  const roles = [
    { code: 'admin', name: 'Quản trị viên', color: '#8B5CF6', count: 1 },
    { code: 'warehouse-manager', name: 'Quản lý kho', color: '#0057FF', count: 1 },
    { code: 'inbound-staff', name: 'Nhân viên nhập kho', color: '#10B981', count: 1 },
    { code: 'outbound-staff', name: 'Nhân viên xuất kho', color: '#F59E0B', count: 1 },
    { code: 'accountant', name: 'Kế toán', color: '#EC4899', count: 1 },
    { code: 'viewer', name: 'Chỉ xem', color: '#6B7280', count: 0 },
  ];

  const permissions: Permission[] = [
    {
      id: 'dashboard',
      name: 'Tổng quan',
      children: [
        { id: 'dashboard-view', name: 'Xem dashboard' },
        { id: 'dashboard-export', name: 'Xuất báo cáo' },
      ],
    },
    {
      id: 'system',
      name: 'Cấu hình hệ thống',
      children: [
        { id: 'system-config', name: 'Cấu hình chung' },
        { id: 'warehouse-manage', name: 'Quản lý kho' },
        { id: 'user-manage', name: 'Quản lý người dùng' },
        { id: 'permission-manage', name: 'Phân quyền' },
      ],
    },
    {
      id: 'inbound',
      name: 'Nhập kho',
      children: [
        { id: 'inbound-view', name: 'Xem danh sách' },
        { id: 'inbound-create', name: 'Tạo phiếu nhập' },
        { id: 'inbound-edit', name: 'Sửa phiếu nhập' },
        { id: 'inbound-delete', name: 'Xóa phiếu nhập' },
        { id: 'inbound-approve', name: 'Duyệt phiếu nhập' },
        { id: 'inbound-quality', name: 'Kiểm tra chất lượng' },
      ],
    },
    {
      id: 'outbound',
      name: 'Xuất kho',
      children: [
        { id: 'outbound-view', name: 'Xem danh sách' },
        { id: 'outbound-create', name: 'Tạo phiếu xuất' },
        { id: 'outbound-edit', name: 'Sửa phiếu xuất' },
        { id: 'outbound-delete', name: 'Xóa phiếu xuất' },
        { id: 'outbound-approve', name: 'Duyệt phiếu xuất' },
        { id: 'outbound-pick', name: 'Lấy hàng' },
        { id: 'outbound-pack', name: 'Đóng gói' },
      ],
    },
    {
      id: 'transfer',
      name: 'Chuyển kho nội bộ',
      children: [
        { id: 'transfer-view', name: 'Xem danh sách' },
        { id: 'transfer-create', name: 'Tạo yêu cầu' },
        { id: 'transfer-approve', name: 'Duyệt yêu cầu' },
        { id: 'transfer-execute', name: 'Thực hiện chuyển kho' },
      ],
    },
    {
      id: 'pod',
      name: 'Quản lý POD',
      children: [
        { id: 'pod-view', name: 'Xem POD' },
        { id: 'pod-upload', name: 'Tải lên POD' },
        { id: 'pod-approve', name: 'Xác nhận POD' },
        { id: 'pod-download', name: 'Tải xuống POD' },
      ],
    },
    {
      id: 'order',
      name: 'Quản lý đơn hàng',
      children: [
        { id: 'order-view', name: 'Xem đơn hàng' },
        { id: 'order-create', name: 'Tạo đơn hàng' },
        { id: 'order-edit', name: 'Sửa đơn hàng' },
        { id: 'order-cancel', name: 'Hủy đơn hàng' },
      ],
    },
    {
      id: 'customer',
      name: 'Quản lý khách hàng',
      children: [
        { id: 'customer-view', name: 'Xem khách hàng' },
        { id: 'customer-create', name: 'Thêm khách hàng' },
        { id: 'customer-edit', name: 'Sửa khách hàng' },
        { id: 'customer-delete', name: 'Xóa khách hàng' },
      ],
    },
    {
      id: 'fee',
      name: 'Phí dịch vụ kho',
      children: [
        { id: 'fee-view', name: 'Xem hóa đơn' },
        { id: 'fee-create', name: 'Tạo hóa đơn' },
        { id: 'fee-edit', name: 'Sửa hóa đơn' },
        { id: 'fee-approve', name: 'Duyệt hóa đơn' },
        { id: 'fee-export', name: 'Xuất báo cáo' },
      ],
    },
    {
      id: 'report',
      name: 'Báo cáo & Thống kê',
      children: [
        { id: 'report-view', name: 'Xem báo cáo' },
        { id: 'report-export', name: 'Xuất báo cáo' },
        { id: 'report-financial', name: 'Báo cáo tài chính' },
      ],
    },
  ];

  const [rolePermissions, setRolePermissions] = useState<RolePermissions>({
    admin: permissions.flatMap(p => [p.id, ...(p.children?.map(c => c.id) || [])]),
    'warehouse-manager': [
      'dashboard', 'dashboard-view', 'dashboard-export',
      'inbound', 'inbound-view', 'inbound-create', 'inbound-edit', 'inbound-approve',
      'outbound', 'outbound-view', 'outbound-create', 'outbound-edit', 'outbound-approve',
      'transfer', 'transfer-view', 'transfer-create', 'transfer-approve',
      'order', 'order-view', 'order-create', 'order-edit',
      'report', 'report-view', 'report-export',
    ],
    'inbound-staff': [
      'dashboard', 'dashboard-view',
      'inbound', 'inbound-view', 'inbound-create', 'inbound-quality',
    ],
    'outbound-staff': [
      'dashboard', 'dashboard-view',
      'outbound', 'outbound-view', 'outbound-pick', 'outbound-pack',
    ],
    accountant: [
      'dashboard', 'dashboard-view',
      'fee', 'fee-view', 'fee-create', 'fee-edit', 'fee-approve', 'fee-export',
      'report', 'report-view', 'report-export', 'report-financial',
    ],
    viewer: ['dashboard', 'dashboard-view'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động':
        return 'bg-green-100 text-green-800';
      case 'Tạm khóa':
        return 'bg-red-100 text-red-800';
      case 'Chờ kích hoạt':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (roleCode: string) => {
    const role = roles.find(r => r.code === roleCode);
    return role?.color || '#6B7280';
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const isPermissionChecked = (permissionId: string) => {
    return rolePermissions[selectedRole]?.includes(permissionId) || false;
  };

  const togglePermission = (permissionId: string) => {
    setRolePermissions(prev => {
      const current = prev[selectedRole] || [];
      const newPermissions = current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId];
      return { ...prev, [selectedRole]: newPermissions };
    });
  };

  const toggleAllChildren = (parent: Permission, checked: boolean) => {
    const childIds = parent.children?.map(c => c.id) || [];
    setRolePermissions(prev => {
      const current = prev[selectedRole] || [];
      let newPermissions = [...current];
      
      if (checked) {
        newPermissions = [...new Set([...newPermissions, parent.id, ...childIds])];
      } else {
        newPermissions = newPermissions.filter(id => id !== parent.id && !childIds.includes(id));
      }
      
      return { ...prev, [selectedRole]: newPermissions };
    });
  };

  const handleAddUser = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setIsAddUserOpen(true);
  };

  const handleEditUser = (user: any) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setIsAddUserOpen(true);
  };

  const renderPermissionTree = (permission: Permission, level: number = 0) => {
    const hasChildren = permission.children && permission.children.length > 0;
    const isExpanded = expandedNodes.includes(permission.id);
    const isChecked = isPermissionChecked(permission.id);
    const allChildrenChecked = hasChildren
      ? permission.children!.every(child => isPermissionChecked(child.id))
      : false;
    const someChildrenChecked = hasChildren
      ? permission.children!.some(child => isPermissionChecked(child.id))
      : false;

    return (
      <div key={permission.id}>
        <div
          className="flex items-center gap-2 py-2 px-3 hover:bg-gray-50 rounded"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNode(permission.id)}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          <Checkbox
            checked={hasChildren ? allChildrenChecked : isChecked}
            onCheckedChange={(checked) => {
              if (hasChildren) {
                toggleAllChildren(permission, checked as boolean);
              } else {
                togglePermission(permission.id);
              }
            }}
            className={someChildrenChecked && !allChildrenChecked ? 'data-[state=checked]:bg-blue-300' : ''}
          />
          
          <span
            style={{
              fontSize: level === 0 ? '14px' : '13px',
              fontWeight: level === 0 ? '500' : '400',
            }}
          >
            {permission.name}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {permission.children!.map(child => renderPermissionTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý người dùng & phân quyền</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý tài khoản người dùng và phân quyền hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isManagePermissionsOpen} onOpenChange={setIsManagePermissionsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Quản lý phân quyền
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[92vh] overflow-hidden" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Quản lý phân quyền theo vai trò</DialogTitle>
              </DialogHeader>
              <div className="flex gap-6 h-[75vh]">
                {/* Role List */}
                <div className="w-64 border-r pr-4">
                  <h3 className="mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Chọn vai trò
                  </h3>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <button
                        key={role.code}
                        onClick={() => setSelectedRole(role.code)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                          selectedRole === role.code
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: role.color }}
                          />
                          <div className="text-left">
                            <p style={{ fontSize: '14px', fontWeight: '500' }}>{role.name}</p>
                            <p className="text-gray-500" style={{ fontSize: '12px' }}>
                              {role.count} người dùng
                            </p>
                          </div>
                        </div>
                        <Lock className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Permission Tree */}
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: '14px', fontWeight: '600' }}>
                      Quyền của vai trò: {roles.find(r => r.code === selectedRole)?.name}
                    </h3>
                    <Button size="sm" style={{ backgroundColor: '#0057FF' }}>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                  </div>
                  <div className="border rounded-lg p-2">
                    {permissions.map(permission => renderPermissionTree(permission))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p style={{ fontSize: '13px', color: '#0057FF' }}>
                      💡 <strong>Lưu ý:</strong> Thay đổi quyền sẽ ảnh hưởng đến tất cả người dùng có vai trò này.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: '#0057FF' }} onClick={handleAddUser}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                  <TabsTrigger value="role">Vai trò & Kho</TabsTrigger>
                  <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                </TabsList>

                {/* Basic Info */}
                <TabsContent value="basic" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Họ và tên *</Label>
                      <Input
                        placeholder="Nhập họ và tên"
                        defaultValue={isEditMode ? selectedUser?.name : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Mã nhân viên</Label>
                      <Input
                        placeholder="Tự động tạo"
                        defaultValue={isEditMode ? selectedUser?.code : ''}
                        disabled={isEditMode}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        defaultValue={isEditMode ? selectedUser?.email : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Số điện thoại *</Label>
                      <Input
                        placeholder="0912 345 678"
                        defaultValue={isEditMode ? selectedUser?.phone : ''}
                      />
                    </div>
                  </div>

                  {!isEditMode && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Mật khẩu *</Label>
                        <Input type="password" placeholder="Nhập mật khẩu" />
                      </div>
                      <div className="space-y-2">
                        <Label>Xác nhận mật khẩu *</Label>
                        <Input type="password" placeholder="Nhập lại mật khẩu" />
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Role & Warehouse */}
                <TabsContent value="role" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Vai trò *</Label>
                    <Select defaultValue={isEditMode ? selectedUser?.roleCode : ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.code} value={role.code}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: role.color }}
                              />
                              {role.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      Vai trò xác định quyền truy cập của người dùng trong hệ thống
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Phân công kho</Label>
                    <Select defaultValue={isEditMode ? selectedUser?.warehouseCode : 'all'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả kho</SelectItem>
                        <SelectItem value="wh-a">Kho A - Hà Nội</SelectItem>
                        <SelectItem value="wh-b">Kho B - TP.HCM</SelectItem>
                        <SelectItem value="wh-c">Kho C - Đà Nẵng</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      Giới hạn người dùng chỉ làm việc với kho được phân công
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="mb-3" style={{ fontSize: '14px', fontWeight: '500' }}>
                      Xem trước quyền hạn
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span style={{ fontSize: '13px' }}>Xem dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span style={{ fontSize: '13px' }}>Quản lý nhập kho</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span style={{ fontSize: '13px' }}>Quản lý xuất kho</span>
                      </div>
                      <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                        Xem tất cả quyền →
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings" className="space-y-4 py-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>Trạng thái tài khoản</p>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>
                        Cho phép người dùng đăng nhập vào hệ thống
                      </p>
                    </div>
                    <Switch defaultChecked={isEditMode ? selectedUser?.status === 'Hoạt động' : true} />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>Xác thực 2 lớp (2FA)</p>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>
                        Yêu cầu mã OTP khi đăng nhập
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>Thông báo email</p>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>
                        Gửi thông báo hệ thống qua email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>Cho phép đăng nhập từ thiết bị di động</p>
                      <p className="text-gray-500" style={{ fontSize: '13px' }}>
                        Cho phép truy cập từ ứng dụng mobile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  {isEditMode ? 'Cập nhật người dùng' : 'Thêm người dùng'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Tổng người dùng
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {users.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Đang hoạt động
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {users.filter(u => u.status === 'Hoạt động').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <UserIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Vai trò
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {roles.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '14px' }}>
                  Online hôm nay
                </p>
                <p className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                  {users.filter(u => u.lastLogin.includes('21/11/2024')).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <UserIcon className="w-6 h-6 text-orange-600" />
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
              <Input placeholder="Tìm kiếm theo tên, email, mã nhân viên..." className="pl-9" />
            </div>
            <Select defaultValue="all-role">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-role">Tất cả vai trò</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role.code} value={role.code}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all-warehouse">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-warehouse">Tất cả kho</SelectItem>
                <SelectItem value="all">Tất cả kho (tổng hợp)</SelectItem>
                <SelectItem value="wh-a">Kho A - Hà Nội</SelectItem>
                <SelectItem value="wh-b">Kho B - TP.HCM</SelectItem>
                <SelectItem value="wh-c">Kho C - Đà Nẵng</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="locked">Tạm khóa</SelectItem>
                <SelectItem value="pending">Chờ kích hoạt</SelectItem>
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
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email / ST</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Kho phân công</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {user.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: getRoleColor(user.roleCode) }}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: '500' }}>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontSize: '13px' }}>{user.email}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>{user.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: `${getRoleColor(user.roleCode)}15`,
                        color: getRoleColor(user.roleCode),
                      }}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.warehouse}</TableCell>
                  <TableCell className="text-gray-600" style={{ fontSize: '13px' }}>
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)} variant="secondary">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
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
              Hiển thị 1-{users.length} của {users.length} người dùng
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
import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus, Shield, Copy, FileText, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { toast } from 'sonner@2.0.3';
import { ABACGuide } from './ABACGuide';

// Types
interface Condition {
  attribute: string;
  operator: string;
  value: string;
}

interface ABACPolicy {
  policyCode: string;
  policyName: string;
  description: string;
  module: string;
  actions: string[];
  userConditions: Condition[];
  resourceConditions: Condition[];
  environmentConditions: Condition[];
  effect: 'allow' | 'deny';
  priority: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

interface SystemAttribute {
  attributeCode: string;
  attributeName: string;
  type: 'user' | 'resource' | 'environment';
  dataType: 'string' | 'number' | 'boolean' | 'date';
  values: string[];
  description: string;
}

// Initial Data
const initialPolicies: ABACPolicy[] = [
  {
    policyCode: 'CS001',
    policyName: 'Quản lý toàn quyền',
    description: 'Cho phép quản lý truy cập tất cả chức năng',
    module: 'all',
    actions: ['view', 'create', 'edit', 'delete', 'approve'],
    userConditions: [
      { attribute: 'position', operator: 'equals', value: 'Giám đốc' }
    ],
    resourceConditions: [],
    environmentConditions: [],
    effect: 'allow',
    priority: 1,
    createdDate: '01/01/2024',
    status: 'active',
  },
  {
    policyCode: 'CS002',
    policyName: 'Quản lý kho xem tồn kho',
    description: 'Quản lý kho chỉ xem tồn kho trong khu vực quản lý',
    module: 'inventory',
    actions: ['view'],
    userConditions: [
      { attribute: 'position', operator: 'equals', value: 'Quản lý kho' },
      { attribute: 'department', operator: 'equals', value: 'Kho vận' }
    ],
    resourceConditions: [
      { attribute: 'region', operator: 'in', value: 'userRegion' }
    ],
    environmentConditions: [],
    effect: 'allow',
    priority: 5,
    createdDate: '01/01/2024',
    status: 'active',
  },
  {
    policyCode: 'CS003',
    policyName: 'Kế toán trong giờ hành chính',
    description: 'Kế toán chỉ được tính phí trong giờ hành chính',
    module: 'pricing',
    actions: ['view', 'create', 'edit'],
    userConditions: [
      { attribute: 'position', operator: 'equals', value: 'Kế toán' }
    ],
    resourceConditions: [],
    environmentConditions: [
      { attribute: 'time', operator: 'between', value: '08:00-17:30' },
      { attribute: 'dayOfWeek', operator: 'in', value: 'T2,T3,T4,T5,T6' }
    ],
    effect: 'allow',
    priority: 3,
    createdDate: '05/01/2024',
    status: 'active',
  },
  {
    policyCode: 'CS004',
    policyName: 'Chặn xóa sau duyệt',
    description: 'Không cho phép xóa phiếu đã được duyệt',
    module: 'all',
    actions: ['delete'],
    userConditions: [],
    resourceConditions: [
      { attribute: 'approvalStatus', operator: 'equals', value: 'approved' }
    ],
    environmentConditions: [],
    effect: 'deny',
    priority: 2,
    createdDate: '10/01/2024',
    status: 'active',
  },
  {
    policyCode: 'CS005',
    policyName: 'Nhân viên xem dữ liệu riêng',
    description: 'Nhân viên chỉ xem được dữ liệu do mình tạo',
    module: 'all',
    actions: ['view'],
    userConditions: [
      { attribute: 'position', operator: 'equals', value: 'Nhân viên kho' }
    ],
    resourceConditions: [
      { attribute: 'createdBy', operator: 'equals', value: 'currentUser' }
    ],
    environmentConditions: [],
    effect: 'allow',
    priority: 7,
    createdDate: '15/01/2024',
    status: 'active',
  },
];

const initialAttributes: SystemAttribute[] = [
  {
    attributeCode: 'position',
    attributeName: 'Chức vụ',
    type: 'user',
    dataType: 'string',
    values: ['Giám đốc', 'Quản lý kho', 'Nhân viên kho', 'Kế toán', 'Kinh doanh'],
    description: 'Chức vụ của người dùng trong tổ chức',
  },
  {
    attributeCode: 'department',
    attributeName: 'Phòng ban',
    type: 'user',
    dataType: 'string',
    values: ['Kho vận', 'Kế toán', 'Kinh doanh', 'IT', 'Admin'],
    description: 'Phòng ban mà người dùng làm việc',
  },
  {
    attributeCode: 'level',
    attributeName: 'Cấp bậc',
    type: 'user',
    dataType: 'number',
    values: ['1', '2', '3', '4', '5'],
    description: 'Cấp bậc người dùng (1=thấp nhất, 5=cao nhất)',
  },
  {
    attributeCode: 'region',
    attributeName: 'Khu vực',
    type: 'user',
    dataType: 'string',
    values: ['Miền Bắc', 'Miền Trung', 'Miền Nam'],
    description: 'Khu vực quản lý của người dùng',
  },
  {
    attributeCode: 'approvalStatus',
    attributeName: 'Trạng thái duyệt',
    type: 'resource',
    dataType: 'string',
    values: ['draft', 'pending', 'approved', 'rejected'],
    description: 'Trạng thái duyệt của tài nguyên',
  },
  {
    attributeCode: 'orderValue',
    attributeName: 'Giá trị đơn hàng',
    type: 'resource',
    dataType: 'number',
    values: [],
    description: 'Giá trị đơn hàng (VNĐ)',
  },
  {
    attributeCode: 'createdBy',
    attributeName: 'Người tạo',
    type: 'resource',
    dataType: 'string',
    values: [],
    description: 'Người tạo tài nguyên',
  },
  {
    attributeCode: 'time',
    attributeName: 'Thời gian',
    type: 'environment',
    dataType: 'date',
    values: [],
    description: 'Thời gian thực hiện hành động',
  },
  {
    attributeCode: 'dayOfWeek',
    attributeName: 'Thứ trong tuần',
    type: 'environment',
    dataType: 'string',
    values: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    description: 'Thứ trong tuần thực hiện hành động',
  },
  {
    attributeCode: 'ipAddress',
    attributeName: 'Địa chỉ IP',
    type: 'environment',
    dataType: 'string',
    values: [],
    description: 'Địa chỉ IP truy cập hệ thống',
  },
];

const modules = [
  { value: 'all', label: 'Tất cả module' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'warehouseReceipt', label: 'Nhập hàng' },
  { value: 'warehouseShipment', label: 'Xuất hàng' },
  { value: 'internalTransfer', label: 'Chuyển kho' },
  { value: 'pod', label: 'Quản lý POD' },
  { value: 'order', label: 'Đơn hàng' },
  { value: 'inventory', label: 'Tồn kho' },
  { value: 'pricing', label: 'Tính phí' },
  { value: 'config', label: 'Cấu hình' },
];

const operators = [
  { value: 'equals', label: 'Bằng (=)' },
  { value: 'notEquals', label: 'Khác (≠)' },
  { value: 'greaterThan', label: 'Lớn hơn (>)' },
  { value: 'lessThan', label: 'Nhỏ hơn (<)' },
  { value: 'greaterOrEqual', label: 'Lớn hơn hoặc bằng (≥)' },
  { value: 'lessOrEqual', label: 'Nhỏ hơn hoặc bằng (≤)' },
  { value: 'in', label: 'Trong danh sách' },
  { value: 'notIn', label: 'Không trong danh sách' },
  { value: 'contains', label: 'Chứa' },
  { value: 'between', label: 'Trong khoảng' },
];

export function ABACPolicies() {
  const [activeTab, setActiveTab] = useState('policies');
  const [policies, setPolicies] = useState<ABACPolicy[]>(initialPolicies);
  const [attributes, setAttributes] = useState<SystemAttribute[]>(initialAttributes);
  
  // Policy states
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<ABACPolicy | null>(null);
  const [deletePolicyDialogOpen, setDeletePolicyDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<ABACPolicy | null>(null);
  const [viewPolicyDialogOpen, setViewPolicyDialogOpen] = useState(false);
  const [viewingPolicy, setViewingPolicy] = useState<ABACPolicy | null>(null);
  
  // Attribute states
  const [attributeDialogOpen, setAttributeDialogOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<SystemAttribute | null>(null);
  const [deleteAttributeDialogOpen, setDeleteAttributeDialogOpen] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState<SystemAttribute | null>(null);

  const [policyForm, setPolicyForm] = useState({
    policyCode: '',
    policyName: '',
    description: '',
    module: 'all',
    effect: 'allow',
    priority: 5,
    status: 'active',
  });

  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [userConditions, setUserConditions] = useState<Condition[]>([]);
  const [resourceConditions, setResourceConditions] = useState<Condition[]>([]);
  const [environmentConditions, setEnvironmentConditions] = useState<Condition[]>([]);

  const [attributeForm, setAttributeForm] = useState({
    attributeCode: '',
    attributeName: '',
    type: 'user' as 'user' | 'resource' | 'environment',
    dataType: 'string' as 'string' | 'number' | 'boolean' | 'date',
    values: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    policyCode: '',
    policyName: '',
    attributeCode: '',
    attributeName: '',
  });

  // Policy CRUD
  const handleCreatePolicy = () => {
    if (!policyForm.policyCode || !policyForm.policyName) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    if (selectedActions.length === 0) {
      toast.error('Vui lòng chọn ít nhất một hành động');
      return;
    }

    const newPolicy: ABACPolicy = {
      ...policyForm,
      actions: selectedActions,
      userConditions,
      resourceConditions,
      environmentConditions,
      effect: policyForm.effect as 'allow' | 'deny',
      status: policyForm.status as 'active' | 'inactive',
      createdDate: new Date().toLocaleDateString('vi-VN'),
    };

    setPolicies([...policies, newPolicy]);
    setPolicyDialogOpen(false);
    resetPolicyForm();
    toast.success('Thêm chính sách thành công');
  };

  const handleUpdatePolicy = () => {
    if (!editingPolicy) return;

    if (!policyForm.policyName) {
      toast.error('Vui lòng nhập tên chính sách');
      return;
    }

    setPolicies(
      policies.map((p) =>
        p.policyCode === editingPolicy.policyCode
          ? {
              ...p,
              ...policyForm,
              actions: selectedActions,
              userConditions,
              resourceConditions,
              environmentConditions,
              effect: policyForm.effect as 'allow' | 'deny',
              status: policyForm.status as 'active' | 'inactive',
            }
          : p
      )
    );

    setPolicyDialogOpen(false);
    setEditingPolicy(null);
    resetPolicyForm();
    toast.success('Cập nhật chính sách thành công');
  };

  const handleDeletePolicy = () => {
    if (!policyToDelete) return;

    setPolicies(policies.filter((p) => p.policyCode !== policyToDelete.policyCode));
    setDeletePolicyDialogOpen(false);
    setPolicyToDelete(null);
    toast.success('Xóa chính sách thành công');
  };

  const handleDuplicatePolicy = (policy: ABACPolicy) => {
    const newPolicy: ABACPolicy = {
      ...policy,
      policyCode: `${policy.policyCode}_COPY`,
      policyName: `${policy.policyName} (Bản sao)`,
      createdDate: new Date().toLocaleDateString('vi-VN'),
    };

    setPolicies([...policies, newPolicy]);
    toast.success('Nhân bản chính sách thành công');
  };

  // Attribute CRUD
  const handleCreateAttribute = () => {
    if (!attributeForm.attributeCode || !attributeForm.attributeName) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    const newAttribute: SystemAttribute = {
      ...attributeForm,
      values: attributeForm.values ? attributeForm.values.split(',').map(v => v.trim()) : [],
    };

    setAttributes([...attributes, newAttribute]);
    setAttributeDialogOpen(false);
    resetAttributeForm();
    toast.success('Thêm thuộc tính thành công');
  };

  const handleUpdateAttribute = () => {
    if (!editingAttribute) return;

    setAttributes(
      attributes.map((a) =>
        a.attributeCode === editingAttribute.attributeCode
          ? {
              ...a,
              ...attributeForm,
              values: attributeForm.values ? attributeForm.values.split(',').map(v => v.trim()) : [],
            }
          : a
      )
    );

    setAttributeDialogOpen(false);
    setEditingAttribute(null);
    resetAttributeForm();
    toast.success('Cập nhật thuộc tính thành công');
  };

  const handleDeleteAttribute = () => {
    if (!attributeToDelete) return;

    setAttributes(attributes.filter((a) => a.attributeCode !== attributeToDelete.attributeCode));
    setDeleteAttributeDialogOpen(false);
    setAttributeToDelete(null);
    toast.success('Xóa thuộc tính thành công');
  };

  const resetPolicyForm = () => {
    setPolicyForm({
      policyCode: '',
      policyName: '',
      description: '',
      module: 'all',
      effect: 'allow',
      priority: 5,
      status: 'active',
    });
    setSelectedActions([]);
    setUserConditions([]);
    setResourceConditions([]);
    setEnvironmentConditions([]);
    setErrors({ policyCode: '', policyName: '', attributeCode: '', attributeName: '' });
  };

  const resetAttributeForm = () => {
    setAttributeForm({
      attributeCode: '',
      attributeName: '',
      type: 'user',
      dataType: 'string',
      values: '',
      description: '',
    });
    setErrors({ policyCode: '', policyName: '', attributeCode: '', attributeName: '' });
  };

  const addCondition = (type: 'user' | 'resource' | 'environment') => {
    const newCondition: Condition = { attribute: '', operator: 'equals', value: '' };
    
    if (type === 'user') {
      setUserConditions([...userConditions, newCondition]);
    } else if (type === 'resource') {
      setResourceConditions([...resourceConditions, newCondition]);
    } else {
      setEnvironmentConditions([...environmentConditions, newCondition]);
    }
  };

  const updateCondition = (
    type: 'user' | 'resource' | 'environment',
    index: number,
    field: keyof Condition,
    value: string
  ) => {
    const updateList = (conditions: Condition[]) => {
      const updated = [...conditions];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    };

    if (type === 'user') {
      setUserConditions(updateList(userConditions));
    } else if (type === 'resource') {
      setResourceConditions(updateList(resourceConditions));
    } else {
      setEnvironmentConditions(updateList(environmentConditions));
    }
  };

  const removeCondition = (type: 'user' | 'resource' | 'environment', index: number) => {
    if (type === 'user') {
      setUserConditions(userConditions.filter((_, i) => i !== index));
    } else if (type === 'resource') {
      setResourceConditions(resourceConditions.filter((_, i) => i !== index));
    } else {
      setEnvironmentConditions(environmentConditions.filter((_, i) => i !== index));
    }
  };

  const toggleAction = (action: string) => {
    setSelectedActions(
      selectedActions.includes(action)
        ? selectedActions.filter((a) => a !== action)
        : [...selectedActions, action]
    );
  };

  // Columns
  const policyColumns: Column[] = [
    { key: 'policyCode', label: 'Mã CS', width: '100px' },
    { key: 'policyName', label: 'Tên chính sách', width: '200px' },
    {
      key: 'module',
      label: 'Module',
      width: '130px',
      render: (value) => {
        const mod = modules.find((m) => m.value === value);
        return <Badge variant="outline">{mod?.label || value}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Hành động',
      width: '150px',
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {value.slice(0, 2).map((action) => (
            <Badge key={action} variant="secondary" className="text-xs">
              {action}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'effect',
      label: 'Hiệu lực',
      width: '100px',
      render: (value) => (
        <Badge variant={value === 'allow' ? 'default' : 'destructive'}>
          {value === 'allow' ? 'Cho phép' : 'Từ chối'}
        </Badge>
      ),
    },
    { 
      key: 'priority', 
      label: 'Ưu tiên', 
      width: '90px',
      render: (value) => <Badge variant="outline">{value}</Badge>
    },
    { key: 'createdDate', label: 'Ngày tạo', width: '110px' },
    {
      key: 'status',
      label: 'Trạng thái',
      width: '120px',
      render: (value) => (
        <StatusBadge status={value === 'active' ? 'Hoạt động' : 'Ngưng'} type={value} />
      ),
    },
  ];

  const attributeColumns: Column[] = [
    { 
      key: 'attributeCode', 
      label: 'Mã thuộc tính', 
      width: '150px',
      render: (value) => <code className="text-xs bg-muted px-2 py-1 rounded">{value}</code>
    },
    { key: 'attributeName', label: 'Tên thuộc tính', width: '180px' },
    {
      key: 'type',
      label: 'Loại',
      width: '130px',
      render: (value) => {
        const labels = {
          user: 'Người dùng',
          resource: 'Tài nguyên',
          environment: 'Môi trường',
        };
        return <Badge variant="outline">{labels[value as keyof typeof labels]}</Badge>;
      },
    },
    {
      key: 'dataType',
      label: 'Kiểu dữ liệu',
      width: '120px',
      render: (value) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: 'values',
      label: 'Giá trị',
      render: (value: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {value.length > 0 ? (
            <>
              {value.slice(0, 3).map((v, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {v}
                </Badge>
              ))}
              {value.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{value.length - 3}
                </Badge>
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-sm">Động</span>
          )}
        </div>
      ),
    },
    { key: 'description', label: 'Mô tả' },
  ];

  const renderConditions = (
    conditions: Condition[],
    type: 'user' | 'resource' | 'environment',
    title: string
  ) => {
    const attributeList = attributes.filter((a) => a.type === type);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base">{title}</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addCondition(type)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Thêm điều kiện
          </Button>
        </div>
        {conditions.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Chưa có điều kiện. Nhấn "Thêm điều kiện" để thêm.
          </p>
        ) : (
          <div className="space-y-2">
            {conditions.map((condition, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Select
                  value={condition.attribute}
                  onValueChange={(value) =>
                    updateCondition(type, index, 'attribute', value)
                  }
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Chọn thuộc tính..." />
                  </SelectTrigger>
                  <SelectContent>
                    {attributeList.map((attr) => (
                      <SelectItem key={attr.attributeCode} value={attr.attributeCode}>
                        {attr.attributeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateCondition(type, index, 'operator', value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Giá trị..."
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(type, index, 'value', e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCondition(type, index)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">ABAC - Phân quyền theo thuộc tính</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý chính sách phân quyền dựa trên thuộc tính người dùng, tài nguyên và môi trường
          </p>
        </div>
        <Button
          className="bg-[#0046FF] hover:bg-[#003ACC] text-white"
          onClick={() => {
            if (activeTab === 'policies') {
              setEditingPolicy(null);
              resetPolicyForm();
              setPolicyDialogOpen(true);
            } else {
              setEditingAttribute(null);
              resetAttributeForm();
              setAttributeDialogOpen(true);
            }
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="policies">Chính sách phân quyền</TabsTrigger>
          <TabsTrigger value="attributes">Thuộc tính hệ thống</TabsTrigger>
          <TabsTrigger value="guide">Hướng dẫn</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="mt-6">
          <DataTable
            columns={policyColumns}
            data={policies}
            onEdit={(row) => {
              const policy = row as ABACPolicy;
              setEditingPolicy(policy);
              setPolicyForm({
                policyCode: policy.policyCode,
                policyName: policy.policyName,
                description: policy.description,
                module: policy.module,
                effect: policy.effect,
                priority: policy.priority,
                status: policy.status,
              });
              setSelectedActions(policy.actions);
              setUserConditions(policy.userConditions);
              setResourceConditions(policy.resourceConditions);
              setEnvironmentConditions(policy.environmentConditions);
              setPolicyDialogOpen(true);
            }}
            onDelete={(row) => {
              setPolicyToDelete(row as ABACPolicy);
              setDeletePolicyDialogOpen(true);
            }}
            onView={(row) => {
              setViewingPolicy(row as ABACPolicy);
              setViewPolicyDialogOpen(true);
            }}
            customActions={(row) => (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDuplicatePolicy(row as ABACPolicy)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Nhân bản
              </Button>
            )}
          />
        </TabsContent>

        <TabsContent value="attributes" className="mt-6">
          <DataTable
            columns={attributeColumns}
            data={attributes}
            onEdit={(row) => {
              const attr = row as SystemAttribute;
              setEditingAttribute(attr);
              setAttributeForm({
                attributeCode: attr.attributeCode,
                attributeName: attr.attributeName,
                type: attr.type,
                dataType: attr.dataType,
                values: attr.values.join(', '),
                description: attr.description,
              });
              setAttributeDialogOpen(true);
            }}
            onDelete={(row) => {
              setAttributeToDelete(row as SystemAttribute);
              setDeleteAttributeDialogOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="guide" className="mt-6">
          <ABACGuide />
        </TabsContent>
      </Tabs>

      {/* Policy Dialog */}
      <Dialog open={policyDialogOpen} onOpenChange={setPolicyDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPolicy ? 'Chỉnh sửa' : 'Thêm mới'} chính sách ABAC</DialogTitle>
            <DialogDescription>
              {editingPolicy
                ? 'Cập nhật thông tin chính sách phân quyền'
                : 'Tạo chính sách phân quyền dựa trên thuộc tính'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Mã chính sách <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nhập mã chính sách..."
                  value={policyForm.policyCode}
                  onChange={(e) =>
                    setPolicyForm({ ...policyForm, policyCode: e.target.value })
                  }
                  disabled={!!editingPolicy}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Tên chính sách <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nhập tên chính sách..."
                  value={policyForm.policyName}
                  onChange={(e) =>
                    setPolicyForm({ ...policyForm, policyName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Nhập mô tả chính sách..."
                value={policyForm.description}
                onChange={(e) =>
                  setPolicyForm({ ...policyForm, description: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Module</Label>
                <Select
                  value={policyForm.module}
                  onValueChange={(value) =>
                    setPolicyForm({ ...policyForm, module: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((mod) => (
                      <SelectItem key={mod.value} value={mod.value}>
                        {mod.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Hiệu lực</Label>
                <Select
                  value={policyForm.effect}
                  onValueChange={(value) =>
                    setPolicyForm({ ...policyForm, effect: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allow">Cho phép</SelectItem>
                    <SelectItem value="deny">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Độ ưu tiên (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={policyForm.priority}
                  onChange={(e) =>
                    setPolicyForm({ ...policyForm, priority: parseInt(e.target.value) || 5 })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Hành động <span className="text-red-500">*</span></Label>
              <div className="flex gap-2 flex-wrap">
                {['view', 'create', 'edit', 'delete', 'approve', 'export'].map((action) => (
                  <div key={action} className="flex items-center space-x-2">
                    <Checkbox
                      id={`action-${action}`}
                      checked={selectedActions.includes(action)}
                      onCheckedChange={() => toggleAction(action)}
                    />
                    <label
                      htmlFor={`action-${action}`}
                      className="text-sm cursor-pointer"
                    >
                      {action}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {renderConditions(userConditions, 'user', 'Điều kiện người dùng')}
            {renderConditions(resourceConditions, 'resource', 'Điều kiện tài nguyên')}
            {renderConditions(environmentConditions, 'environment', 'Điều kiện môi trường')}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={policyForm.status}
                  onValueChange={(value) =>
                    setPolicyForm({ ...policyForm, status: value })
                  }
                >
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
              <Button
                variant="outline"
                onClick={() => {
                  setPolicyDialogOpen(false);
                  setEditingPolicy(null);
                  resetPolicyForm();
                }}
              >
                Hủy
              </Button>
              <Button
                className="bg-[#0046FF] hover:bg-[#003ACC]"
                onClick={editingPolicy ? handleUpdatePolicy : handleCreatePolicy}
              >
                {editingPolicy ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attribute Dialog */}
      <Dialog open={attributeDialogOpen} onOpenChange={setAttributeDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAttribute ? 'Chỉnh sửa' : 'Thêm mới'} thuộc tính</DialogTitle>
            <DialogDescription>
              {editingAttribute ? 'Cập nhật thông tin thuộc tính' : 'Tạo thuộc tính hệ thống mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Mã thuộc tính <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nhập mã thuộc tính..."
                  value={attributeForm.attributeCode}
                  onChange={(e) =>
                    setAttributeForm({ ...attributeForm, attributeCode: e.target.value })
                  }
                  disabled={!!editingAttribute}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Tên thuộc tính <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nhập tên thuộc tính..."
                  value={attributeForm.attributeName}
                  onChange={(e) =>
                    setAttributeForm({ ...attributeForm, attributeName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại</Label>
                <Select
                  value={attributeForm.type}
                  onValueChange={(value: 'user' | 'resource' | 'environment') =>
                    setAttributeForm({ ...attributeForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Người dùng</SelectItem>
                    <SelectItem value="resource">Tài nguyên</SelectItem>
                    <SelectItem value="environment">Môi trường</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kiểu dữ liệu</Label>
                <Select
                  value={attributeForm.dataType}
                  onValueChange={(value: 'string' | 'number' | 'boolean' | 'date') =>
                    setAttributeForm({ ...attributeForm, dataType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Giá trị (phân cách bởi dấu phẩy)</Label>
              <Input
                placeholder="VD: value1, value2, value3"
                value={attributeForm.values}
                onChange={(e) =>
                  setAttributeForm({ ...attributeForm, values: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                placeholder="Nhập mô tả thuộc tính..."
                value={attributeForm.description}
                onChange={(e) =>
                  setAttributeForm({ ...attributeForm, description: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setAttributeDialogOpen(false);
                  setEditingAttribute(null);
                  resetAttributeForm();
                }}
              >
                Hủy
              </Button>
              <Button
                className="bg-[#0046FF] hover:bg-[#003ACC]"
                onClick={editingAttribute ? handleUpdateAttribute : handleCreateAttribute}
              >
                {editingAttribute ? 'Cập nhật' : 'Lưu'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Policy Dialog */}
      <Dialog open={viewPolicyDialogOpen} onOpenChange={setViewPolicyDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết chính sách</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết chính sách phân quyền
            </DialogDescription>
          </DialogHeader>
          {viewingPolicy && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Mã chính sách</Label>
                  <p className="mt-1">{viewingPolicy.policyCode}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Tên chính sách</Label>
                  <p className="mt-1">{viewingPolicy.policyName}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Mô tả</Label>
                <p className="mt-1">{viewingPolicy.description || 'Không có mô tả'}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-muted-foreground">Module</Label>
                  <p className="mt-1">
                    <Badge variant="outline">
                      {modules.find((m) => m.value === viewingPolicy.module)?.label}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Hiệu lực</Label>
                  <p className="mt-1">
                    <Badge variant={viewingPolicy.effect === 'allow' ? 'default' : 'destructive'}>
                      {viewingPolicy.effect === 'allow' ? 'Cho phép' : 'Từ chối'}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Độ ưu tiên</Label>
                  <p className="mt-1">{viewingPolicy.priority}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Hành động</Label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {viewingPolicy.actions.map((action) => (
                    <Badge key={action} variant="secondary">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>

              {viewingPolicy.userConditions.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Điều kiện người dùng</Label>
                  <div className="mt-2 space-y-2">
                    {viewingPolicy.userConditions.map((cond, i) => {
                      const attr = attributes.find(a => a.attributeCode === cond.attribute);
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{attr?.attributeName || cond.attribute}</Badge>
                          <span className="text-muted-foreground">{operators.find(op => op.value === cond.operator)?.label}</span>
                          <Badge variant="secondary">{cond.value}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {viewingPolicy.resourceConditions.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Điều kiện tài nguyên</Label>
                  <div className="mt-2 space-y-2">
                    {viewingPolicy.resourceConditions.map((cond, i) => {
                      const attr = attributes.find(a => a.attributeCode === cond.attribute);
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{attr?.attributeName || cond.attribute}</Badge>
                          <span className="text-muted-foreground">{operators.find(op => op.value === cond.operator)?.label}</span>
                          <Badge variant="secondary">{cond.value}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {viewingPolicy.environmentConditions.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Điều kiện môi trường</Label>
                  <div className="mt-2 space-y-2">
                    {viewingPolicy.environmentConditions.map((cond, i) => {
                      const attr = attributes.find(a => a.attributeCode === cond.attribute);
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{attr?.attributeName || cond.attribute}</Badge>
                          <span className="text-muted-foreground">{operators.find(op => op.value === cond.operator)?.label}</span>
                          <Badge variant="secondary">{cond.value}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Ngày tạo</Label>
                  <p className="mt-1">{viewingPolicy.createdDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  <p className="mt-1">
                    <StatusBadge
                      status={viewingPolicy.status === 'active' ? 'Hoạt động' : 'Ngưng'}
                      type={viewingPolicy.status}
                    />
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Policy Dialog */}
      <AlertDialog open={deletePolicyDialogOpen} onOpenChange={setDeletePolicyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa chính sách</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chính sách "{policyToDelete?.policyName}"?
              <br />
              <span className="text-red-500">Hành động này không thể hoàn tác.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePolicy}
              className="bg-red-500 hover:bg-red-600"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Attribute Dialog */}
      <AlertDialog open={deleteAttributeDialogOpen} onOpenChange={setDeleteAttributeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa thuộc tính</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa thuộc tính "{attributeToDelete?.attributeName}"?
              <br />
              <span className="text-red-500">
                Xóa thuộc tính này có thể ảnh hưởng đến các chính sách đang sử dụng.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAttribute}
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

import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';

const supplierData = [
  { supplierId: 'NCC001', supplierName: 'Nhà cung cấp A', goodsType: 'Điện tử', phoneNumber: '028-1111-2222', createdDate: '10/09/2024', status: 'active' },
  { supplierId: 'NCC002', supplierName: 'Nhà cung cấp B', goodsType: 'Thực phẩm', phoneNumber: '028-3333-4444', createdDate: '15/09/2024', status: 'active' },
  { supplierId: 'NCC003', supplierName: 'Nhà cung cấp C', goodsType: 'Dệt may', phoneNumber: '028-5555-6666', createdDate: '20/09/2024', status: 'inactive' },
  { supplierId: 'NCC004', supplierName: 'Nhà cung cấp D', goodsType: 'Hóa chất', phoneNumber: '028-7777-8888', createdDate: '25/09/2024', status: 'active' },
];

export function Suppliers() {
  const [suppliers, setSuppliers] = useState(supplierData);

  const columns: Column[] = [
    { key: 'supplierId', label: 'Mã NCC', width: '120px' },
    { key: 'supplierName', label: 'Tên nhà cung cấp' },
    { key: 'goodsType', label: 'Loại hàng', width: '150px' },
    { key: 'phoneNumber', label: 'Số điện thoại', width: '150px' },
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
          <h1 className="text-[28px] font-bold text-foreground">Nhà cung cấp</h1>
          <p className="text-muted-foreground mt-1">Quản lý danh sách nhà cung cấp</p>
        </div>
        <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={suppliers}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onView={(row) => console.log('View', row)}
      />
    </div>
  );
}

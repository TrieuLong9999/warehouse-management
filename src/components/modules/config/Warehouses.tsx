import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../../DataTable';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';

const warehouseData = [
  { warehouseCode: 'KHO-A', warehouseName: 'Kho A - Tầng 1', area: '2000 m²', locationCount: 120, phoneNumber: '028-1111-0001', status: 'active' },
  { warehouseCode: 'KHO-B', warehouseName: 'Kho B - Tầng 2', area: '1500 m²', locationCount: 90, phoneNumber: '028-1111-0002', status: 'active' },
  { warehouseCode: 'KHO-C', warehouseName: 'Kho C - Tầng 3', area: '1800 m²', locationCount: 110, phoneNumber: '028-1111-0003', status: 'inactive' },
  { warehouseCode: 'KHO-D', warehouseName: 'Kho D - Tầng 4', area: '2200 m²', locationCount: 135, phoneNumber: '028-1111-0004', status: 'active' },
];

export function Warehouses() {
  const [warehouses, setWarehouses] = useState(warehouseData);

  const columns: Column[] = [
    { key: 'warehouseCode', label: 'Mã kho', width: '120px' },
    { key: 'warehouseName', label: 'Tên kho' },
    { key: 'area', label: 'Diện tích', width: '130px' },
    { key: 'locationCount', label: 'Số Location', width: '130px' },
    { key: 'phoneNumber', label: 'Điện thoại', width: '150px' },
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
          <h1 className="text-[28px] font-bold text-foreground">Kho & Location</h1>
          <p className="text-muted-foreground mt-1">Quản lý danh sách kho và vị trí lưu trữ</p>
        </div>
        <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Thêm mới
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={warehouses}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        onView={(row) => console.log('View', row)}
      />
    </div>
  );
}

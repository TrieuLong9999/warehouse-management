import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DataTable, Column } from '../DataTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileDown, Calculator } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const storageFeeData = [
  { khachHang: 'Công ty ABC', loaiPhi: 'Phí lưu kho', donViTinh: 'Pallet', soLuong: 120, donGia: 50000, thanhTien: 6000000, thang: '11/2024' },
  { khachHang: 'Công ty XYZ', loaiPhi: 'Phí lưu kho', donViTinh: 'm²', soLuong: 500, donGia: 25000, thanhTien: 12500000, thang: '11/2024' },
  { khachHang: 'Doanh nghiệp 123', loaiPhi: 'Phí lưu kho', donViTinh: 'm³', soLuong: 300, donGia: 30000, thanhTien: 9000000, thang: '11/2024' },
  { khachHang: 'Công ty DEF', loaiPhi: 'Phí lưu kho', donViTinh: 'Pallet', soLuong: 85, donGia: 50000, thanhTien: 4250000, thang: '11/2024' },
];

const serviceFeeData = [
  { khachHang: 'Công ty ABC', loaiPhi: 'Phí nhập hàng', donViTinh: 'SKU', soLuong: 250, donGia: 5000, thanhTien: 1250000, thang: '11/2024' },
  { khachHang: 'Công ty XYZ', loaiPhi: 'Phí xuất hàng', donViTinh: 'SKU', soLuong: 180, donGia: 6000, thanhTien: 1080000, thang: '11/2024' },
  { khachHang: 'Doanh nghiệp 123', loaiPhi: 'Phí picking', donViTinh: 'Đơn hàng', soLuong: 95, donGia: 15000, thanhTien: 1425000, thang: '11/2024' },
  { khachHang: 'Công ty DEF', loaiPhi: 'Phí đóng gói', donViTinh: 'Kiện', soLuong: 320, donGia: 8000, thanhTien: 2560000, thang: '11/2024' },
  { khachHang: 'Công ty ABC', loaiPhi: 'Phí kiểm đếm', donViTinh: 'Lần', soLuong: 12, donGia: 50000, thanhTien: 600000, thang: '11/2024' },
];

export function PricingManagement() {
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState('11/2024');

  const storageColumns: Column[] = [
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'loaiPhi', label: 'Loại phí', width: '130px' },
    { key: 'donViTinh', label: 'Đơn vị tính', width: '120px' },
    { key: 'soLuong', label: 'Số lượng', width: '100px' },
    { 
      key: 'donGia', 
      label: 'Đơn giá (VNĐ)', 
      width: '130px',
      render: (value) => value.toLocaleString('vi-VN')
    },
    { 
      key: 'thanhTien', 
      label: 'Thành tiền (VNĐ)', 
      width: '150px',
      render: (value) => (
        <span className="font-medium text-[#0046FF]">
          {value.toLocaleString('vi-VN')}
        </span>
      )
    },
    { key: 'thang', label: 'Tháng', width: '100px' },
  ];

  const serviceColumns: Column[] = [
    { key: 'khachHang', label: 'Khách hàng' },
    { key: 'loaiPhi', label: 'Loại phí' },
    { key: 'donViTinh', label: 'Đơn vị tính', width: '120px' },
    { key: 'soLuong', label: 'Số lượng', width: '100px' },
    { 
      key: 'donGia', 
      label: 'Đơn giá (VNĐ)', 
      width: '130px',
      render: (value) => value.toLocaleString('vi-VN')
    },
    { 
      key: 'thanhTien', 
      label: 'Thành tiền (VNĐ)', 
      width: '150px',
      render: (value) => (
        <span className="font-medium text-[#0046FF]">
          {value.toLocaleString('vi-VN')}
        </span>
      )
    },
    { key: 'thang', label: 'Tháng', width: '100px' },
  ];

  const totalStorageFee = storageFeeData.reduce((sum, item) => sum + item.thanhTien, 0);
  const totalServiceFee = serviceFeeData.reduce((sum, item) => sum + item.thanhTien, 0);
  const grandTotal = totalStorageFee + totalServiceFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Tính phí dịch vụ kho</h1>
          <p className="text-muted-foreground mt-1">Quản lý và tính toán phí dịch vụ kho bãi</p>
        </div>
        <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
          <FileDown className="mr-2 h-4 w-4" />
          Xuất báo giá PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#0046FF] border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-[16px]">Phí lưu kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[32px] font-bold text-[#0046FF]">
              {totalStorageFee.toLocaleString('vi-VN')} đ
            </div>
            <div className="text-[12px] text-muted-foreground mt-1">
              Tháng {selectedMonth}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#FFBE00] border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-[16px]">Phí dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[32px] font-bold text-[#FFBE00]">
              {totalServiceFee.toLocaleString('vi-VN')} đ
            </div>
            <div className="text-[12px] text-muted-foreground mt-1">
              Tháng {selectedMonth}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#10b981] border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-[16px] flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Tổng cộng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[32px] font-bold text-[#10b981]">
              {grandTotal.toLocaleString('vi-VN')} đ
            </div>
            <div className="text-[12px] text-muted-foreground mt-1">
              Tháng {selectedMonth}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Period Filter */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <label className="text-[14px] font-medium">Thời gian:</label>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Theo tháng</SelectItem>
              <SelectItem value="quarter">Theo quý</SelectItem>
              <SelectItem value="year">Theo năm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {timePeriod === 'month' && (
          <div className="flex items-center gap-2">
            <label className="text-[14px] font-medium">Chọn tháng:</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09/2024">Tháng 9/2024</SelectItem>
                <SelectItem value="10/2024">Tháng 10/2024</SelectItem>
                <SelectItem value="11/2024">Tháng 11/2024</SelectItem>
                <SelectItem value="12/2024">Tháng 12/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="storage">Phí lưu kho</TabsTrigger>
          <TabsTrigger value="service">Phí dịch vụ</TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="mt-6">
          <DataTable 
            columns={storageColumns} 
            data={storageFeeData}
            onEdit={(row) => console.log('Edit', row)}
            onView={(row) => console.log('View', row)}
          />
          <div className="mt-4 flex justify-end">
            <div className="bg-[#0046FF10] p-4 rounded-lg border-2 border-[#0046FF]">
              <div className="text-[14px] text-muted-foreground mb-1">Tổng phí lưu kho</div>
              <div className="text-[24px] font-bold text-[#0046FF]">
                {totalStorageFee.toLocaleString('vi-VN')} đ
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="service" className="mt-6">
          <DataTable 
            columns={serviceColumns} 
            data={serviceFeeData}
            onEdit={(row) => console.log('Edit', row)}
            onView={(row) => console.log('View', row)}
          />
          <div className="mt-4 flex justify-end">
            <div className="bg-[#FFBE0010] p-4 rounded-lg border-2 border-[#FFBE00]">
              <div className="text-[14px] text-muted-foreground mb-1">Tổng phí dịch vụ</div>
              <div className="text-[24px] font-bold text-[#FFBE00]">
                {totalServiceFee.toLocaleString('vi-VN')} đ
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

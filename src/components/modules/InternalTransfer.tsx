import React, { useState } from 'react';
import { DataTable, StatusBadge, Column } from '../DataTable';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Printer, Plus, ArrowRight } from 'lucide-react';

const transferData = [
  { maChuyenKho: 'TF-2024-001', tuKho: 'Kho A - Tầng 1', denKho: 'Kho B - Tầng 2', loaiHang: 'Điện tử', soLuong: 100, ngayTao: '05/11/2024', trangThai: 'completed' },
  { maChuyenKho: 'TF-2024-002', tuKho: 'Kho B - Tầng 2', denKho: 'Kho C - Tầng 3', loaiHang: 'Thực phẩm', soLuong: 250, ngayTao: '06/11/2024', trangThai: 'confirmed' },
  { maChuyenKho: 'TF-2024-003', tuKho: 'Kho A - Tầng 1', denKho: 'Kho C - Tầng 3', loaiHang: 'Dệt may', soLuong: 150, ngayTao: '07/11/2024', trangThai: 'draft' },
  { maChuyenKho: 'TF-2024-004', tuKho: 'Kho C - Tầng 3', denKho: 'Kho A - Tầng 1', loaiHang: 'Điện tử', soLuong: 80, ngayTao: '08/11/2024', trangThai: 'confirmed' },
];

export function InternalTransfer() {
  const [formData, setFormData] = useState({
    fromWarehouse: '',
    toWarehouse: '',
    itemType: '',
    quantity: '',
    note: ''
  });

  const columns: Column[] = [
    { key: 'maChuyenKho', label: 'Mã chuyển kho', width: '140px' },
    { key: 'tuKho', label: 'Từ kho' },
    { key: 'denKho', label: 'Đến kho' },
    { key: 'loaiHang', label: 'Loại hàng', width: '130px' },
    { key: 'soLuong', label: 'Số lượng', width: '100px' },
    { key: 'ngayTao', label: 'Ngày tạo', width: '120px' },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: '130px',
      render: (value) => {
        const statusMap: Record<string, string> = {
          completed: 'Hoàn thành',
          confirmed: 'Đã xác nhận',
          draft: 'Nháp'
        };
        return <StatusBadge status={statusMap[value]} type={value} />;
      }
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground">Chuyển kho nội bộ</h1>
          <p className="text-muted-foreground mt-1">Quản lý phiếu chuyển kho giữa các khu vực</p>
        </div>
      </div>

      {/* Form & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tạo phiếu chuyển kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Từ kho</Label>
                  <Select value={formData.fromWarehouse} onValueChange={(v) => setFormData({...formData, fromWarehouse: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho nguồn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kho-a">Kho A - Tầng 1</SelectItem>
                      <SelectItem value="kho-b">Kho B - Tầng 2</SelectItem>
                      <SelectItem value="kho-c">Kho C - Tầng 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Đến kho</Label>
                  <Select value={formData.toWarehouse} onValueChange={(v) => setFormData({...formData, toWarehouse: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho đích" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kho-a">Kho A - Tầng 1</SelectItem>
                      <SelectItem value="kho-b">Kho B - Tầng 2</SelectItem>
                      <SelectItem value="kho-c">Kho C - Tầng 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Loại hàng</Label>
                  <Select value={formData.itemType} onValueChange={(v) => setFormData({...formData, itemType: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dien-tu">Điện tử</SelectItem>
                      <SelectItem value="thuc-pham">Thực phẩm</SelectItem>
                      <SelectItem value="det-may">Dệt may</SelectItem>
                      <SelectItem value="khac">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Số lượng</Label>
                  <Input 
                    type="number" 
                    placeholder="Nhập số lượng"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Input 
                  placeholder="Nhập ghi chú (nếu có)"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline">
                  Lưu nháp
                </Button>
                <Button className="bg-[#0046FF] hover:bg-[#003ACC] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo phiếu chuyển
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Xem trước</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.fromWarehouse && formData.toWarehouse ? (
                <>
                  <div className="text-center space-y-4">
                    <div className="p-4 rounded-lg bg-[#0046FF10] border-2 border-[#0046FF]">
                      <div className="text-[14px] text-muted-foreground">Kho nguồn</div>
                      <div className="font-medium mt-1">
                        {formData.fromWarehouse === 'kho-a' ? 'Kho A - Tầng 1' : 
                         formData.fromWarehouse === 'kho-b' ? 'Kho B - Tầng 2' : 
                         'Kho C - Tầng 3'}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="w-8 h-8 text-[#FFBE00]" />
                    </div>

                    <div className="p-4 rounded-lg bg-[#10b98110] border-2 border-[#10b981]">
                      <div className="text-[14px] text-muted-foreground">Kho đích</div>
                      <div className="font-medium mt-1">
                        {formData.toWarehouse === 'kho-a' ? 'Kho A - Tầng 1' : 
                         formData.toWarehouse === 'kho-b' ? 'Kho B - Tầng 2' : 
                         'Kho C - Tầng 3'}
                      </div>
                    </div>
                  </div>

                  {formData.quantity && (
                    <div className="pt-4 border-t border-border">
                      <div className="text-[14px] space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Số lượng:</span>
                          <span className="font-medium">{formData.quantity} đơn vị</span>
                        </div>
                        {formData.itemType && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Loại hàng:</span>
                            <span className="font-medium">
                              {formData.itemType === 'dien-tu' ? 'Điện tử' :
                               formData.itemType === 'thuc-pham' ? 'Thực phẩm' :
                               formData.itemType === 'det-may' ? 'Dệt may' : 'Khác'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Chọn kho nguồn và kho đích để xem trước
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-bold">Danh sách phiếu chuyển kho</h2>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            In phiếu chuyển
          </Button>
        </div>
        <DataTable 
          columns={columns} 
          data={transferData}
          onEdit={(row) => console.log('Edit', row)}
          onDelete={(row) => console.log('Delete', row)}
          onView={(row) => console.log('View', row)}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function SystemConfig() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Cấu hình hệ thống</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quản lý cấu hình và thiết lập hệ thống
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Cấu hình chung</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin công ty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tên công ty</Label>
                  <Input defaultValue="THÀNH ĐẠT EXPRESS" />
                </div>
                <div className="space-y-2">
                  <Label>Mã số thuế</Label>
                  <Input defaultValue="0123456789" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email liên hệ</Label>
                  <Input type="email" defaultValue="contact@thanhdatexpress.vn" />
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input defaultValue="0123 456 789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Địa chỉ</Label>
                <Input defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
              </div>
              <div className="flex justify-end">
                <Button style={{ backgroundColor: '#0057FF' }}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Tự động tạo mã phiếu</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Tự động tạo mã phiếu nhập/xuất kho
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Kiểm tra tồn kho</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Cảnh báo khi hàng hóa dưới mức tồn kho tối thiểu
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Quét mã vạch</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Cho phép quét mã vạch khi nhập/xuất kho
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p style={{ fontWeight: '500' }}>Phê duyệt phiếu xuất</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Yêu cầu phê duyệt trước khi xuất kho
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end">
                <Button style={{ backgroundColor: '#0057FF' }}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Thông báo email</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Cảnh báo tồn kho thấp</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Thông báo khi hàng hóa dưới mức tồn kho tối thiểu
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p style={{ fontWeight: '500' }}>Thông báo phê duyệt</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Thông báo khi có phiếu cần phê duyệt
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p style={{ fontWeight: '500' }}>Báo cáo định kỳ</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Nhận báo cáo tự động hàng tuần
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end">
                <Button style={{ backgroundColor: '#0057FF' }}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

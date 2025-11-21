import React, { useState } from 'react';
import { Truck, MapPin, Phone, Package, Clock, CheckCircle, Camera, FileText, Navigation, AlertTriangle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function ShippingManagement() {
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPODOpen, setIsPODOpen] = useState(false);

  // Sample shipments
  const shipments = [
    {
      id: 1,
      code: 'SHIP-2024-001',
      outboundCode: 'OUT-2024-0089',
      customer: {
        code: 'KH-001',
        name: 'Công ty TNHH ABC',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        phone: '0901234567',
        contactPerson: 'Nguyễn Văn A',
      },
      packages: 2,
      totalWeight: 52.5,
      shipDate: '21/11/2024',
      estimatedDelivery: '22/11/2024',
      status: 'in_transit',
      driver: {
        name: 'Trần Văn B',
        phone: '0912345678',
        vehiclePlate: '51A-12345',
        vehicleType: 'Xe tải 1.5 tấn',
      },
      trackingHistory: [
        { time: '21/11/2024 14:00', status: 'Đã xuất kho', location: 'Kho A - Hà Nội', note: '' },
        { time: '21/11/2024 14:30', status: 'Đang vận chuyển', location: 'Cao tốc HN-HCM', note: 'Đã rời khỏi kho' },
        { time: '21/11/2024 18:00', status: 'Dừng nghỉ', location: 'Trạm dừng Km 150', note: 'Nghỉ ăn tối' },
      ],
      currentLocation: {
        lat: 20.9805,
        lng: 105.7911,
        address: 'Cao tốc Hà Nội - TP.HCM, Km 180',
      },
      pod: null,
    },
    {
      id: 2,
      code: 'SHIP-2024-002',
      outboundCode: 'OUT-2024-0088',
      customer: {
        code: 'KH-002',
        name: 'Công ty Cổ phần XYZ',
        address: '456 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
        phone: '0903456789',
        contactPerson: 'Lê Thị C',
      },
      packages: 3,
      totalWeight: 78.3,
      shipDate: '20/11/2024',
      estimatedDelivery: '21/11/2024',
      status: 'delivered',
      driver: {
        name: 'Phạm Văn D',
        phone: '0923456789',
        vehiclePlate: '51B-67890',
        vehicleType: 'Xe tải 2 tấn',
      },
      trackingHistory: [
        { time: '20/11/2024 08:00', status: 'Đã xuất kho', location: 'Kho A - Hà Nội', note: '' },
        { time: '20/11/2024 09:00', status: 'Đang vận chuyển', location: 'Cao tốc HN-HCM', note: '' },
        { time: '21/11/2024 14:00', status: 'Đã giao hàng', location: 'KH tại TP.HCM', note: 'Giao thành công' },
      ],
      currentLocation: {
        lat: 10.7769,
        lng: 106.7009,
        address: '456 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
      },
      pod: {
        receivedBy: 'Lê Thị C',
        receivedDate: '21/11/2024 14:00',
        signature: 'data:image/png;base64,...',
        photos: ['photo1.jpg', 'photo2.jpg'],
        note: 'Giao hàng đúng hẹn, khách hàng hài lòng',
      },
    },
    {
      id: 3,
      code: 'SHIP-2024-003',
      outboundCode: 'OUT-2024-0087',
      customer: {
        code: 'KH-003',
        name: 'Doanh nghiệp DEF',
        address: '789 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        phone: '0904567890',
        contactPerson: 'Hoàng Văn E',
      },
      packages: 1,
      totalWeight: 25.0,
      shipDate: '21/11/2024',
      estimatedDelivery: '22/11/2024',
      status: 'pending',
      driver: null,
      trackingHistory: [],
      currentLocation: null,
      pod: null,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Chờ giao', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" /> };
      case 'assigned':
        return { label: 'Đã phân xe', color: 'bg-blue-100 text-blue-800', icon: <Truck className="w-4 h-4" /> };
      case 'in_transit':
        return { label: 'Đang giao', color: 'bg-orange-100 text-orange-800', icon: <Navigation className="w-4 h-4" /> };
      case 'delivered':
        return { label: 'Đã giao', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
      case 'failed':
        return { label: 'Giao thất bại', color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="w-4 h-4" /> };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Shipping - Giao hàng</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quản lý vận chuyển và theo dõi đơn hàng
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Tổng đơn</p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Chờ giao</p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-50">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Đang giao</p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-orange-600">
                  {stats.inTransit}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Navigation className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Đã giao</p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-green-600">
                  {stats.delivered}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipment List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách vận chuyển</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipments.map((shipment) => {
              const statusConfig = getStatusConfig(shipment.status);
              return (
                <Card key={shipment.id} className="border-2 hover:border-blue-300 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        shipment.status === 'delivered' ? 'bg-green-500' :
                        shipment.status === 'in_transit' ? 'bg-orange-500' :
                        shipment.status === 'pending' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`}>
                        {statusConfig.icon && <span className="text-white">{statusConfig.icon}</span>}
                      </div>

                      {/* Shipment Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{shipment.code}</h3>
                              <Badge className={statusConfig.color}>
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Phiếu xuất: <code className="text-xs bg-gray-100 px-2 py-1 rounded">{shipment.outboundCode}</code>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedShipment(shipment);
                              setIsDetailOpen(true);
                            }}
                          >
                            Chi tiết
                          </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Khách hàng</p>
                            <p className="font-medium">{shipment.customer.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Số kiện</p>
                            <p className="font-medium">{shipment.packages} kiện • {shipment.totalWeight} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Ngày giao dự kiến</p>
                            <p className="font-medium">{shipment.estimatedDelivery}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Tài xế</p>
                            <p className="font-medium">
                              {shipment.driver?.name || <span className="text-gray-400">Chưa phân</span>}
                            </p>
                          </div>
                        </div>

                        {shipment.status === 'in_transit' && shipment.currentLocation && (
                          <div className="mt-3 p-2 bg-orange-50 rounded text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-orange-600" />
                              <span className="text-orange-800">
                                Vị trí hiện tại: {shipment.currentLocation.address}
                              </span>
                            </div>
                          </div>
                        )}

                        {shipment.status === 'delivered' && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>
                              Đã giao lúc {shipment.pod?.receivedDate} - Người nhận: {shipment.pod?.receivedBy}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-auto"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsPODOpen(true);
                              }}
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Xem POD
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Shipment Detail Dialog */}
      {selectedShipment && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Chi tiết vận chuyển - {selectedShipment.code}</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="tracking">Theo dõi</TabsTrigger>
                <TabsTrigger value="documents">Tài liệu</TabsTrigger>
              </TabsList>

              {/* Info Tab */}
              <TabsContent value="info" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Thông tin khách hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500">Mã KH:</p>
                        <p className="font-medium">{selectedShipment.customer.code}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tên:</p>
                        <p className="font-medium">{selectedShipment.customer.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Người liên hệ:</p>
                        <p className="font-medium">{selectedShipment.customer.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Điện thoại:</p>
                        <p className="font-medium">{selectedShipment.customer.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500">Địa chỉ giao hàng:</p>
                      <p className="font-medium">{selectedShipment.customer.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {selectedShipment.driver && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Thông tin tài xế</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500">Tên tài xế:</p>
                          <p className="font-medium">{selectedShipment.driver.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Điện thoại:</p>
                          <p className="font-medium">{selectedShipment.driver.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Biển số xe:</p>
                          <p className="font-medium">{selectedShipment.driver.vehiclePlate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Loại xe:</p>
                          <p className="font-medium">{selectedShipment.driver.vehicleType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Thông tin hàng hóa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-500">Số kiện:</p>
                        <p className="font-medium text-lg">{selectedShipment.packages} kiện</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tổng khối lượng:</p>
                        <p className="font-medium text-lg">{selectedShipment.totalWeight} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Ngày giao dự kiến:</p>
                        <p className="font-medium text-lg">{selectedShipment.estimatedDelivery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tracking Tab */}
              <TabsContent value="tracking" className="space-y-4">
                {selectedShipment.currentLocation && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <p className="font-semibold text-orange-900">Vị trí hiện tại</p>
                          <p className="text-sm text-orange-700">{selectedShipment.currentLocation.address}</p>
                          <p className="text-xs text-orange-600 mt-1">
                            GPS: {selectedShipment.currentLocation.lat}, {selectedShipment.currentLocation.lng}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Lịch sử vận chuyển</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200"></div>

                      {/* Timeline Items */}
                      <div className="space-y-6">
                        {selectedShipment.trackingHistory.map((item: any, index: number) => (
                          <div key={index} className="relative flex gap-4">
                            <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-blue-500">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 pb-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{item.status}</p>
                                  <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                                  {item.note && (
                                    <p className="text-sm text-gray-500 mt-1">{item.note}</p>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Tài liệu vận chuyển</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Phiếu xuất kho - {selectedShipment.outboundCode}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="w-4 h-4 mr-2" />
                      Phiếu đóng gói ({selectedShipment.packages} kiện)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Truck className="w-4 h-4 mr-2" />
                      Lệnh vận chuyển - {selectedShipment.code}
                    </Button>
                    {selectedShipment.pod && (
                      <Button
                        variant="outline"
                        className="w-full justify-start text-green-600 border-green-300"
                        onClick={() => {
                          setIsDetailOpen(false);
                          setIsPODOpen(true);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Biên bản giao nhận (POD)
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* POD Dialog */}
      {selectedShipment?.pod && (
        <Dialog open={isPODOpen} onOpenChange={setIsPODOpen}>
          <DialogContent className="max-w-2xl" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Biên bản giao nhận (POD)</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Giao hàng thành công</p>
                      <p className="text-sm text-green-700">{selectedShipment.pod.receivedDate}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700">Người nhận:</p>
                      <p className="font-medium text-green-900">{selectedShipment.pod.receivedBy}</p>
                    </div>
                    <div>
                      <p className="text-green-700">Mã đơn:</p>
                      <p className="font-medium text-green-900">{selectedShipment.code}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Chữ ký người nhận</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50">
                    <p className="text-gray-500 text-sm mb-2">Chữ ký điện tử</p>
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-2xl font-script text-blue-600">
                        {selectedShipment.pod.receivedBy}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Hình ảnh giao hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedShipment.pod.photos.map((photo: string, idx: number) => (
                      <div key={idx} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Ghi chú</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{selectedShipment.pod.note}</p>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsPODOpen(false)}>
                  Đóng
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  <FileText className="w-4 h-4 mr-2" />
                  Xuất PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

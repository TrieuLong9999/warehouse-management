import React, { useState } from 'react';
import { ArrowLeft, Package, User, Calendar, Warehouse, FileText, TrendingUp, MapPin, Clock, CheckCircle, AlertCircle, XCircle, Download, Printer, Edit, Truck, Box, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface InboundItem {
  id: string;
  sku: string;
  productName: string;
  expectedQty: number;
  receivedQty: number;
  unit: string;
  location?: string;
  status: 'pending' | 'received' | 'putaway' | 'completed';
  discrepancy: number;
  notes?: string;
}

interface PutawayRecord {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  unit: string;
  fromLocation: string;
  toLocation: string;
  assignedBy: string;
  assignedDate: string;
  completedBy?: string;
  completedDate?: string;
  status: 'assigned' | 'in-progress' | 'completed';
  duration?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export function InboundDetail() {
  const [activeTab, setActiveTab] = useState('items');

  // Mock shipment data
  const shipment = {
    code: 'IN-2024-001',
    supplier: {
      id: 'SUP-001',
      name: 'Công ty TNHH ABC',
      contact: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'contact@abc.com',
    },
    documentNo: 'PO-2024-001',
    warehouse: 'Kho A - Hà Nội',
    deliveryType: 'Case',
    expectedArrivalDate: '21/11/2024',
    actualArrivalDate: '21/11/2024 14:30',
    status: 'in-progress',
    createdBy: 'Nguyễn Văn B',
    createdDate: '20/11/2024 10:00',
    receivedBy: 'Trần Thị C',
    receivedDate: '21/11/2024 14:30',
    notes: 'Hàng đến đúng hạn, cần kiểm tra kỹ chất lượng sản phẩm điện tử',
    priority: 'high',
    totalItems: 4,
    totalQuantity: 450,
    receivedItems: 4,
    receivedQuantity: 445,
    putawayItems: 2,
    putawayQuantity: 215,
  };

  // Mock items data
  const items: InboundItem[] = [
    {
      id: '1',
      sku: 'SKU-12345',
      productName: 'Sản phẩm A - Điện tử',
      expectedQty: 120,
      receivedQty: 120,
      unit: 'Thùng',
      location: 'A-01-A-03',
      status: 'completed',
      discrepancy: 0,
    },
    {
      id: '2',
      sku: 'SKU-12346',
      productName: 'Sản phẩm B - Gia dụng',
      expectedQty: 95,
      receivedQty: 95,
      unit: 'Kiện',
      location: 'A-01-A-02',
      status: 'completed',
      discrepancy: 0,
    },
    {
      id: '3',
      sku: 'SKU-12347',
      productName: 'Sản phẩm C - Thực phẩm',
      expectedQty: 150,
      receivedQty: 145,
      unit: 'Thùng',
      location: 'A-02-A-02',
      status: 'putaway',
      discrepancy: -5,
      notes: 'Thiếu 5 thùng, đã báo cáo nhà cung cấp',
    },
    {
      id: '4',
      sku: 'SKU-12348',
      productName: 'Sản phẩm D - Đồ chơi',
      expectedQty: 85,
      receivedQty: 85,
      unit: 'Pallet',
      status: 'received',
      discrepancy: 0,
    },
  ];

  // Mock putaway history
  const putawayHistory: PutawayRecord[] = [
    {
      id: 'PA-001',
      sku: 'SKU-12345',
      productName: 'Sản phẩm A - Điện tử',
      quantity: 120,
      unit: 'Thùng',
      fromLocation: 'STG-01',
      toLocation: 'A-01-A-03',
      assignedBy: 'Nguyễn Văn B',
      assignedDate: '21/11/2024 14:45',
      completedBy: 'Lê Văn D',
      completedDate: '21/11/2024 15:30',
      status: 'completed',
      duration: '45 phút',
    },
    {
      id: 'PA-002',
      sku: 'SKU-12346',
      productName: 'Sản phẩm B - Gia dụng',
      quantity: 95,
      unit: 'Kiện',
      fromLocation: 'STG-01',
      toLocation: 'A-01-A-02',
      assignedBy: 'Nguyễn Văn B',
      assignedDate: '21/11/2024 14:45',
      completedBy: 'Phạm Thị E',
      completedDate: '21/11/2024 16:00',
      status: 'completed',
      duration: '1 giờ 15 phút',
    },
    {
      id: 'PA-003',
      sku: 'SKU-12347',
      productName: 'Sản phẩm C - Thực phẩm',
      quantity: 145,
      unit: 'Thùng',
      fromLocation: 'STG-02',
      toLocation: 'A-02-A-02',
      assignedBy: 'Nguyễn Văn B',
      assignedDate: '21/11/2024 15:00',
      completedBy: 'Lê Văn D',
      completedDate: '21/11/2024 16:30',
      status: 'completed',
      duration: '1 giờ 30 phút',
    },
    {
      id: 'PA-004',
      sku: 'SKU-12348',
      productName: 'Sản phẩm D - Đồ chơi',
      quantity: 85,
      unit: 'Pallet',
      fromLocation: 'STG-02',
      toLocation: 'B-01-A-03',
      assignedBy: 'Nguyễn Văn B',
      assignedDate: '21/11/2024 16:00',
      status: 'assigned',
    },
  ];

  // Mock logs
  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: '21/11/2024 16:30',
      action: 'Hoàn tất xếp kho',
      user: 'Lê Văn D',
      details: 'Đã xếp xong 145 Thùng Sản phẩm C vào vị trí A-02-A-02',
      type: 'success',
    },
    {
      id: '2',
      timestamp: '21/11/2024 16:00',
      action: 'Phân bổ vị trí',
      user: 'Nguyễn Văn B',
      details: 'Phân bổ 85 Pallet Sản phẩm D vào vị trí B-01-A-03',
      type: 'info',
    },
    {
      id: '3',
      timestamp: '21/11/2024 16:00',
      action: 'Hoàn tất xếp kho',
      user: 'Phạm Thị E',
      details: 'Đã xếp xong 95 Kiện Sản phẩm B vào vị trí A-01-A-02',
      type: 'success',
    },
    {
      id: '4',
      timestamp: '21/11/2024 15:30',
      action: 'Hoàn tất xếp kho',
      user: 'Lê Văn D',
      details: 'Đã xếp xong 120 Thùng Sản phẩm A vào vị trí A-01-A-03',
      type: 'success',
    },
    {
      id: '5',
      timestamp: '21/11/2024 15:00',
      action: 'Phân bổ vị trí',
      user: 'Nguyễn Văn B',
      details: 'Phân bổ 145 Thùng Sản phẩm C vào vị trí A-02-A-02',
      type: 'info',
    },
    {
      id: '6',
      timestamp: '21/11/2024 14:50',
      action: 'Ghi nhận chênh lệch',
      user: 'Trần Thị C',
      details: 'Phát hiện thiếu 5 thùng Sản phẩm C. Đã ghi nhận và báo cáo.',
      type: 'warning',
    },
    {
      id: '7',
      timestamp: '21/11/2024 14:45',
      action: 'Phân bổ vị trí',
      user: 'Nguyễn Văn B',
      details: 'Tự động phân bổ vị trí cho 2 sản phẩm',
      type: 'info',
    },
    {
      id: '8',
      timestamp: '21/11/2024 14:30',
      action: 'Tiếp nhận hàng',
      user: 'Trần Thị C',
      details: 'Đã tiếp nhận 4 sản phẩm, tổng 445 đơn vị',
      type: 'success',
    },
    {
      id: '9',
      timestamp: '20/11/2024 10:00',
      action: 'Tạo phiếu nhập',
      user: 'Nguyễn Văn B',
      details: 'Tạo phiếu nhập kho từ nhà cung cấp Công ty TNHH ABC',
      type: 'info',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' };
      case 'in-progress':
        return { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' };
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' };
      case 'received':
        return { bg: '#E0E7FF', text: '#4338CA', border: '#A5B4FC' };
      case 'putaway':
        return { bg: '#FCE7F3', text: '#BE185D', border: '#F9A8D4' };
      case 'assigned':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' };
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in-progress':
        return 'Đang xử lý';
      case 'pending':
        return 'Chờ xử lý';
      case 'received':
        return 'Đã tiếp nhận';
      case 'putaway':
        return 'Đang xếp kho';
      case 'assigned':
        return 'Đã phân bổ';
      default:
        return status;
    }
  };

  const getItemStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'putaway':
        return <TrendingUp className="w-4 h-4" />;
      case 'received':
        return <Package className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const completionPercentage = Math.round((shipment.putawayQuantity / shipment.receivedQuantity) * 100);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" className="mb-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại danh sách
      </Button>

      {/* Header Card */}
      <Card className="border-2" style={{ borderColor: '#0057FF' }}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0057FF' }}>
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-gray-900" style={{ fontSize: '24px', fontWeight: '600' }}>
                    {shipment.code}
                  </h1>
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: getStatusColor(shipment.status).bg,
                      color: getStatusColor(shipment.status).text,
                      borderColor: getStatusColor(shipment.status).border,
                    }}
                  >
                    {getStatusLabel(shipment.status)}
                  </Badge>
                  {shipment.priority === 'high' && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Ưu tiên cao
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span style={{ fontSize: '14px' }}>
                      <strong>Nhà cung cấp:</strong> {shipment.supplier.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span style={{ fontSize: '14px' }}>
                      <strong>Số chứng từ:</strong> {shipment.documentNo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Warehouse className="w-4 h-4" />
                    <span style={{ fontSize: '14px' }}>
                      <strong>Kho nhận:</strong> {shipment.warehouse}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                In phiếu
              </Button>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900" style={{ fontSize: '12px', fontWeight: '600' }}>
                  Tổng sản phẩm
                </span>
              </div>
              <p className="text-blue-900" style={{ fontSize: '24px', fontWeight: '700' }}>
                {shipment.totalItems}
              </p>
              <p className="text-blue-700" style={{ fontSize: '12px' }}>
                {shipment.totalQuantity} đơn vị
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-900" style={{ fontSize: '12px', fontWeight: '600' }}>
                  Đã tiếp nhận
                </span>
              </div>
              <p className="text-green-900" style={{ fontSize: '24px', fontWeight: '700' }}>
                {shipment.receivedItems}/{shipment.totalItems}
              </p>
              <p className="text-green-700" style={{ fontSize: '12px' }}>
                {shipment.receivedQuantity} đơn vị
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-purple-900" style={{ fontSize: '12px', fontWeight: '600' }}>
                  Đã xếp kho
                </span>
              </div>
              <p className="text-purple-900" style={{ fontSize: '24px', fontWeight: '700' }}>
                {shipment.putawayItems}/{shipment.receivedItems}
              </p>
              <p className="text-purple-700" style={{ fontSize: '12px' }}>
                {shipment.putawayQuantity} đơn vị
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="text-orange-900" style={{ fontSize: '12px', fontWeight: '600' }}>
                  Tiến độ
                </span>
              </div>
              <p className="text-orange-900" style={{ fontSize: '24px', fontWeight: '700' }}>
                {completionPercentage}%
              </p>
              <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Ngày tạo
              </p>
              <p className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                {shipment.createdDate}
              </p>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>
                Bởi: {shipment.createdBy}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Ngày dự kiến
              </p>
              <p className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                {shipment.expectedArrivalDate}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Ngày tiếp nhận
              </p>
              <p className="text-gray-900" style={{ fontSize: '13px', fontWeight: '500' }}>
                {shipment.actualArrivalDate}
              </p>
              <p className="text-gray-600" style={{ fontSize: '12px' }}>
                Bởi: {shipment.receivedBy}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Loại giao hàng
              </p>
              <Badge variant="outline">{shipment.deliveryType}</Badge>
            </div>
          </div>

          {/* Notes */}
          {shipment.notes && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900" style={{ fontSize: '13px', fontWeight: '600' }}>
                    Ghi chú quan trọng
                  </p>
                  <p className="text-yellow-800" style={{ fontSize: '13px' }}>
                    {shipment.notes}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supplier Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin nhà cung cấp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Mã NCC
              </p>
              <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: '500' }}>
                {shipment.supplier.id}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Tên công ty
              </p>
              <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: '500' }}>
                {shipment.supplier.name}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Người liên hệ
              </p>
              <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: '500' }}>
                {shipment.supplier.contact}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Số điện thoại
              </p>
              <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: '500' }}>
                {shipment.supplier.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6">
              <TabsList className="h-14 bg-transparent">
                <TabsTrigger value="items" className="data-[state=active]:border-b-2" style={{ borderColor: activeTab === 'items' ? '#0057FF' : 'transparent' }}>
                  <Package className="w-4 h-4 mr-2" />
                  Danh sách sản phẩm
                </TabsTrigger>
                <TabsTrigger value="putaway" className="data-[state=active]:border-b-2" style={{ borderColor: activeTab === 'putaway' ? '#0057FF' : 'transparent' }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Lịch sử xếp kho
                </TabsTrigger>
                <TabsTrigger value="logs" className="data-[state=active]:border-b-2" style={{ borderColor: activeTab === 'logs' ? '#0057FF' : 'transparent' }}>
                  <Activity className="w-4 h-4 mr-2" />
                  Nhật ký hoạt động
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Item List Tab */}
            <TabsContent value="items" className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        SKU
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        Sản phẩm
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        SL dự kiến
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        SL tiếp nhận
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        Chênh lệch
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        Vị trí lưu kho
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        Trạng thái
                      </th>
                      <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                        Ghi chú
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <span className="font-mono text-gray-700" style={{ fontSize: '13px', fontWeight: '500' }}>
                            {item.sku}
                          </span>
                        </td>
                        <td className="p-3">
                          <span style={{ fontSize: '13px', fontWeight: '500' }}>
                            {item.productName}
                          </span>
                        </td>
                        <td className="p-3">
                          <span style={{ fontSize: '13px' }}>
                            {item.expectedQty} {item.unit}
                          </span>
                        </td>
                        <td className="p-3">
                          <span style={{ fontSize: '13px', fontWeight: '500' }}>
                            {item.receivedQty} {item.unit}
                          </span>
                        </td>
                        <td className="p-3">
                          {item.discrepancy !== 0 ? (
                            <Badge
                              variant="outline"
                              className={item.discrepancy > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}
                            >
                              {item.discrepancy > 0 ? '+' : ''}{item.discrepancy}
                            </Badge>
                          ) : (
                            <span className="text-gray-500" style={{ fontSize: '13px' }}>
                              --
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {item.location ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.location}
                            </Badge>
                          ) : (
                            <span className="text-gray-400" style={{ fontSize: '12px' }}>
                              Chưa xếp kho
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: getStatusColor(item.status).bg,
                              color: getStatusColor(item.status).text,
                              borderColor: getStatusColor(item.status).border,
                            }}
                          >
                            <div className="flex items-center gap-1">
                              {getItemStatusIcon(item.status)}
                              {getStatusLabel(item.status)}
                            </div>
                          </Badge>
                        </td>
                        <td className="p-3">
                          {item.notes ? (
                            <span className="text-gray-600" style={{ fontSize: '12px' }}>
                              {item.notes}
                            </span>
                          ) : (
                            <span className="text-gray-400" style={{ fontSize: '12px' }}>
                              --
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Putaway History Tab */}
            <TabsContent value="putaway" className="p-6">
              <div className="space-y-4">
                {putawayHistory.map((record) => (
                  <div
                    key={record.id}
                    className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600' }}>
                            {record.productName}
                          </p>
                          <p className="text-gray-600" style={{ fontSize: '13px' }}>
                            SKU: {record.sku} • {record.quantity} {record.unit}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: getStatusColor(record.status).bg,
                          color: getStatusColor(record.status).text,
                          borderColor: getStatusColor(record.status).border,
                        }}
                      >
                        {getStatusLabel(record.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-gray-500 mb-1" style={{ fontSize: '11px' }}>
                          Từ vị trí
                        </p>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {record.fromLocation}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1" style={{ fontSize: '11px' }}>
                          Đến vị trí
                        </p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {record.toLocation}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1" style={{ fontSize: '11px' }}>
                          Phân bổ bởi
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: '500' }}>
                          {record.assignedBy}
                        </p>
                        <p className="text-gray-500" style={{ fontSize: '11px' }}>
                          {record.assignedDate}
                        </p>
                      </div>
                      {record.completedBy && (
                        <div>
                          <p className="text-gray-500 mb-1" style={{ fontSize: '11px' }}>
                            Hoàn thành bởi
                          </p>
                          <p style={{ fontSize: '12px', fontWeight: '500' }}>
                            {record.completedBy}
                          </p>
                          <p className="text-gray-500" style={{ fontSize: '11px' }}>
                            {record.completedDate}
                          </p>
                        </div>
                      )}
                    </div>

                    {record.duration && (
                      <div className="mt-3 flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span style={{ fontSize: '12px' }}>
                          Thời gian: {record.duration}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" className="p-6">
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={log.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                        {getLogIcon(log.type)}
                      </div>
                      {index < logs.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <p style={{ fontSize: '14px', fontWeight: '600' }}>
                          {log.action}
                        </p>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>
                          {log.timestamp}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-2" style={{ fontSize: '13px' }}>
                        {log.details}
                      </p>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-500" style={{ fontSize: '12px' }}>
                          {log.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

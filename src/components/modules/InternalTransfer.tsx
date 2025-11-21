import React, { useState } from 'react';
import { Plus, Filter, Download, Search, ArrowRightLeft, Package, Clock, CheckCircle, Truck, Box, Eye, ScanBarcode, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ApprovalModal, PickingModal, ReceivingModal } from './InternalTransferModals';

export function InternalTransfer() {
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fromWarehouse: '',
    toWarehouse: '',
    expectedDate: '',
    notes: '',
  });

  // Modal states for workflow steps
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isPickingOpen, setIsPickingOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isReceivingOpen, setIsReceivingOpen] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    driverName: '',
    vehicleNumber: '',
    departureTime: '',
  });
  const [pickingProgress, setPickingProgress] = useState<any[]>([]);

  // Available products for selection
  const availableProducts = [
    { code: 'ITM-001', name: 'iPhone 15 Pro Max', qty: 450, unit: 'PCS' },
    { code: 'ITM-002', name: 'Samsung Galaxy S24', qty: 180, unit: 'PCS' },
    { code: 'ITM-003', name: 'Coca Cola 330ml', qty: 45, unit: 'PCS' },
    { code: 'ITM-004', name: 'Áo thun Nam Cotton', qty: 1850, unit: 'PCS' },
    { code: 'ITM-005', name: 'Laptop Dell XPS 15', qty: 85, unit: 'PCS' },
  ];

  // Sample transfer orders with full workflow
  const transfers = [
    {
      id: 'TR-2024-001',
      code: 'TR-2024-001',
      fromWarehouse: { code: 'WH-HCM', name: 'Kho TP.HCM' },
      toWarehouse: { code: 'WH-HN', name: 'Kho Hà Nội' },
      requestDate: '21/11/2024',
      expectedDate: '23/11/2024',
      totalItems: 3,
      totalQty: 600,
      status: 'in_transit',
      requestedBy: 'Nguyễn Văn A',
      approvedBy: 'Trần Thị B',
      inboundCode: 'IN-2024-0158', // Auto-generated inbound
      products: [
        {
          id: 1,
          code: 'ITM-001',
          name: 'iPhone 15 Pro Max',
          quantity: 120,
          unit: 'PCS',
          pickedQty: 120,
          receivedQty: 0,
        },
        {
          id: 2,
          code: 'ITM-003',
          name: 'Coca Cola 330ml',
          quantity: 480,
          unit: 'PCS',
          pickedQty: 480,
          receivedQty: 0,
        },
      ],
      timeline: [
        { status: 'created', label: 'Tạo phiếu', date: '21/11/2024 08:00', done: true },
        { status: 'approved', label: 'Phê duyệt', date: '21/11/2024 09:00', done: true },
        { status: 'picking', label: 'Lấy hàng', date: '21/11/2024 10:00', done: true },
        { status: 'shipped', label: 'Vận chuyển', date: '21/11/2024 14:00', done: true, current: true },
        { status: 'receiving', label: 'Tiếp nhận', date: '-', done: false },
        { status: 'completed', label: 'Hoàn thành', date: '-', done: false },
      ],
    },
    {
      id: 'TR-2024-002',
      code: 'TR-2024-002',
      fromWarehouse: { code: 'WH-HN', name: 'Kho Hà Nội' },
      toWarehouse: { code: 'WH-DN', name: 'Kho Đà Nẵng' },
      requestDate: '21/11/2024',
      expectedDate: '24/11/2024',
      totalItems: 2,
      totalQty: 300,
      status: 'pending',
      requestedBy: 'Lê Văn C',
      approvedBy: null,
      inboundCode: null,
      products: [
        {
          id: 3,
          code: 'ITM-002',
          name: 'Samsung Galaxy S24',
          quantity: 60,
          unit: 'PCS',
          pickedQty: 0,
          receivedQty: 0,
        },
      ],
      timeline: [
        { status: 'created', label: 'Tạo phiếu', date: '21/11/2024 13:00', done: true, current: true },
        { status: 'approved', label: 'Phê duyệt', date: '-', done: false },
        { status: 'picking', label: 'Lấy hàng', date: '-', done: false },
        { status: 'shipped', label: 'Vận chuyển', date: '-', done: false },
        { status: 'receiving', label: 'Tiếp nhận', date: '-', done: false },
        { status: 'completed', label: 'Hoàn thành', date: '-', done: false },
      ],
    },
    {
      id: 'TR-2024-003',
      code: 'TR-2024-003',
      fromWarehouse: { code: 'WH-HCM', name: 'Kho TP.HCM' },
      toWarehouse: { code: 'WH-DN', name: 'Kho Đà Nẵng' },
      requestDate: '20/11/2024',
      expectedDate: '22/11/2024',
      totalItems: 4,
      totalQty: 800,
      status: 'completed',
      requestedBy: 'Phạm Thị D',
      approvedBy: 'Hoàng Văn E',
      inboundCode: 'IN-2024-0156',
      products: [
        {
          id: 4,
          code: 'ITM-004',
          name: 'Áo thun Nam Cotton',
          quantity: 200,
          unit: 'PCS',
          pickedQty: 200,
          receivedQty: 200,
        },
      ],
      timeline: [
        { status: 'created', label: 'Tạo phiếu', date: '20/11/2024 08:00', done: true },
        { status: 'approved', label: 'Phê duyệt', date: '20/11/2024 08:30', done: true },
        { status: 'picking', label: 'Lấy hàng', date: '20/11/2024 09:00', done: true },
        { status: 'shipped', label: 'Vận chuyển', date: '20/11/2024 11:00', done: true },
        { status: 'receiving', label: 'Tiếp nhận', date: '21/11/2024 15:00', done: true },
        { status: 'completed', label: 'Hoàn thành', date: '21/11/2024 16:00', done: true, current: true },
      ],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" /> };
      case 'approved':
        return { label: 'Đã duyệt', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-4 h-4" /> };
      case 'picking':
        return { label: 'Đang lấy hàng', color: 'bg-purple-100 text-purple-800', icon: <Package className="w-4 h-4" /> };
      case 'in_transit':
        return { label: 'Đang vận chuyển', color: 'bg-orange-100 text-orange-800', icon: <Truck className="w-4 h-4" /> };
      case 'receiving':
        return { label: 'Đang tiếp nhận', color: 'bg-cyan-100 text-cyan-800', icon: <MapPin className="w-4 h-4" /> };
      case 'completed':
        return { label: 'Hoàn thành', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const stats = {
    total: transfers.length,
    pending: transfers.filter(t => t.status === 'pending').length,
    inTransit: transfers.filter(t => ['picking', 'in_transit'].includes(t.status)).length,
    completed: transfers.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Chuyển kho nội bộ</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý việc chuyển hàng giữa các kho
          </p>
        </div>
        <Button style={{ backgroundColor: '#0057FF' }} onClick={() => setIsCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo phiếu chuyển kho
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Tổng phiếu
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                <ArrowRightLeft className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Chờ duyệt
                </p>
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
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đang vận chuyển
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-orange-600">
                  {stats.inTransit}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Hoàn thành
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-green-600">
                  {stats.completed}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
              <Input placeholder="Tìm theo mã phiếu, kho..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="in_transit">Đang vận chuyển</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transfer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách phiếu chuyển kho</CardTitle>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Từ kho</TableHead>
                <TableHead>Đến kho</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Dự kiến đến</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Phiếu nhập</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => {
                const statusConfig = getStatusConfig(transfer.status);
                return (
                  <TableRow key={transfer.id}>
                    <TableCell>
                      <span className="text-blue-600 font-medium">{transfer.code}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p style={{ fontWeight: '500' }}>{transfer.fromWarehouse.code}</p>
                        <p className="text-sm text-gray-500">{transfer.fromWarehouse.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                        <div>
                          <p style={{ fontWeight: '500' }}>{transfer.toWarehouse.code}</p>
                          <p className="text-sm text-gray-500">{transfer.toWarehouse.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.requestDate}</TableCell>
                    <TableCell>{transfer.expectedDate}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.totalItems} SKU</p>
                        <p className="text-sm text-gray-500">{transfer.totalQty.toLocaleString()} PCS</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig.color}>
                        {statusConfig.icon && <span className="mr-1">{statusConfig.icon}</span>}
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transfer.inboundCode ? (
                        <code className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                          {transfer.inboundCode}
                        </code>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTransfer(transfer);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transfer Detail Dialog */}
      {selectedTransfer && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Chi tiết phiếu chuyển kho</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Mã phiếu chuyển</p>
                        <p className="text-lg font-semibold text-blue-600">{selectedTransfer.code}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Từ kho</p>
                          <p className="font-medium">{selectedTransfer.fromWarehouse.name}</p>
                        </div>
                        <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Đến kho</p>
                          <p className="font-medium">{selectedTransfer.toWarehouse.name}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Trạng thái</p>
                        <Badge className={getStatusConfig(selectedTransfer.status).color}>
                          {getStatusConfig(selectedTransfer.status).label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Ngày tạo</p>
                          <p className="font-medium">{selectedTransfer.requestDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Dự kiến đến</p>
                          <p className="font-medium">{selectedTransfer.expectedDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Quy trình chuyển kho</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-5 left-5 h-full w-0.5 bg-gray-200"></div>

                    {/* Timeline Items */}
                    <div className="space-y-6">
                      {selectedTransfer.timeline.map((item: any, index: number) => (
                        <div key={index} className="relative flex gap-4">
                          {/* Icon */}
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                            item.done
                              ? item.current
                                ? 'bg-blue-500 ring-4 ring-blue-100'
                                : 'bg-green-500'
                              : 'bg-gray-200'
                          }`}>
                            {item.done ? (
                              item.current ? (
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              ) : (
                                <CheckCircle className="w-5 h-5 text-white" />
                              )
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className={`font-medium ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>
                                  {item.label}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                              </div>
                              {item.current && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  Đang xử lý
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Đã lấy</TableHead>
                        <TableHead>Đã nhận</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTransfer.products.map((product: any) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.code}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{product.quantity} {product.unit}</span>
                          </TableCell>
                          <TableCell>
                            <span className={product.pickedQty === product.quantity ? 'text-green-600' : 'text-gray-600'}>
                              {product.pickedQty} / {product.quantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={product.receivedQty === product.quantity ? 'text-green-600' : 'text-gray-600'}>
                              {product.receivedQty} / {product.quantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            {product.receivedQty === product.quantity ? (
                              <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                            ) : product.pickedQty === product.quantity ? (
                              <Badge className="bg-blue-100 text-blue-800">Đã lấy</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">Chờ</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Linked Inbound */}
              {selectedTransfer.inboundCode && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-700">Phiếu nhập tự động đã tạo</p>
                        <p className="text-lg font-semibold text-green-900">{selectedTransfer.inboundCode}</p>
                        <p className="text-sm text-green-600 mt-1">
                          Kho đích: {selectedTransfer.toWarehouse.name}
                        </p>
                      </div>
                      <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                        <Eye className="w-4 h-4 mr-2" />
                        Xem phiếu nhập
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                {selectedTransfer.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="text-red-600"
                      onClick={() => {
                        // Handle rejection
                        console.log('Reject transfer:', selectedTransfer.code);
                        setIsDetailOpen(false);
                      }}
                    >
                      Từ chối
                    </Button>
                    <Button 
                      style={{ backgroundColor: '#0057FF' }}
                      onClick={() => {
                        setIsApprovalOpen(true);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Phê duyệt
                    </Button>
                  </>
                )}
                {selectedTransfer.status === 'approved' && (
                  <Button 
                    style={{ backgroundColor: '#0057FF' }}
                    onClick={() => {
                      setPickingProgress(selectedTransfer.products.map((p: any) => ({
                        ...p,
                        pickedQty: 0
                      })));
                      setIsPickingOpen(true);
                    }}
                  >
                    <ScanBarcode className="w-4 h-4 mr-2" />
                    Bắt đầu lấy hàng
                  </Button>
                )}
                {selectedTransfer.status === 'in_transit' && (
                  <Button 
                    style={{ backgroundColor: '#0057FF' }}
                    onClick={() => {
                      setIsReceivingOpen(true);
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Xác nhận đã đến kho
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Transfer Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Tạo phiếu chuyển kho mới</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Warehouse Selection */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Từ kho *</Label>
                <Select value={formData.fromWarehouse} onValueChange={(value) => setFormData({...formData, fromWarehouse: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kho nguồn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WH-HCM">Kho A - TP.HCM</SelectItem>
                    <SelectItem value="WH-HN">Kho B - Hà Nội</SelectItem>
                    <SelectItem value="WH-DN">Kho C - Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Đến kho *</Label>
                <Select value={formData.toWarehouse} onValueChange={(value) => setFormData({...formData, toWarehouse: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kho đích" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WH-HCM">Kho A - TP.HCM</SelectItem>
                    <SelectItem value="WH-HN">Kho B - Hà Nội</SelectItem>
                    <SelectItem value="WH-DN">Kho C - Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Ngày dự kiến đến *</Label>
                <Input 
                  type="date" 
                  value={formData.expectedDate}
                  onChange={(e) => setFormData({...formData, expectedDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Người yêu cầu</Label>
                <Input value="Nguyễn Văn A" disabled />
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Danh sách sản phẩm *</Label>
                <Button 
                  type="button" 
                  size="sm" 
                  style={{ backgroundColor: '#0057FF' }}
                  onClick={() => {
                    setSelectedProducts([
                      ...selectedProducts,
                      { id: Date.now(), code: '', name: '', quantity: 0, unit: 'PCS', available: 0 }
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </div>

              {selectedProducts.length > 0 ? (
                <Card>
                  <CardContent className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Tồn kho</TableHead>
                          <TableHead>Số lượng chuyển</TableHead>
                          <TableHead>Đơn vị</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedProducts.map((product, index) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <Select 
                                value={product.code}
                                onValueChange={(value) => {
                                  const products = [...selectedProducts];
                                  const selected = availableProducts.find(p => p.code === value);
                                  if (selected) {
                                    products[index] = { 
                                      ...products[index], 
                                      code: selected.code, 
                                      name: selected.name,
                                      available: selected.qty,
                                      unit: selected.unit
                                    };
                                    setSelectedProducts(products);
                                  }
                                }}
                              >
                                <SelectTrigger className="w-64">
                                  <SelectValue placeholder="Chọn sản phẩm" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableProducts.map((p) => (
                                    <SelectItem key={p.code} value={p.code}>
                                      {p.code} - {p.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-green-600">
                                {product.available.toLocaleString()} {product.unit}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                className="w-32"
                                value={product.quantity || ''}
                                onChange={(e) => {
                                  const products = [...selectedProducts];
                                  products[index].quantity = parseInt(e.target.value) || 0;
                                  setSelectedProducts(products);
                                }}
                                max={product.available}
                              />
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-500">{product.unit}</span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
                                }}
                              >
                                <Truck className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Summary */}
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Tổng: {selectedProducts.length} sản phẩm
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Tổng số lượng</p>
                        <p style={{ fontSize: '18px', fontWeight: '600' }}>
                          {selectedProducts.reduce((sum, p) => sum + (p.quantity || 0), 0).toLocaleString()} PCS
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Chưa có sản phẩm nào được chọn</p>
                    <p className="text-sm text-gray-400 mt-1">Nhấn "Thêm sản phẩm" để bắt đầu</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Ghi chú</Label>
              <Textarea 
                placeholder="Nhập ghi chú thêm (nếu có)..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            {/* Warning */}
            {formData.fromWarehouse && formData.toWarehouse && formData.fromWarehouse === formData.toWarehouse && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">Cảnh báo</p>
                      <p className="text-sm text-orange-700">Kho nguồn và kho đích không được giống nhau</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Hủy
              </Button>
              <Button 
                style={{ backgroundColor: '#0057FF' }}
                disabled={
                  !formData.fromWarehouse || 
                  !formData.toWarehouse || 
                  formData.fromWarehouse === formData.toWarehouse ||
                  !formData.expectedDate ||
                  selectedProducts.length === 0 ||
                  selectedProducts.some(p => !p.code || p.quantity <= 0)
                }
                onClick={() => {
                  // Handle submit
                  console.log('Create transfer:', { formData, selectedProducts });
                  setIsCreateOpen(false);
                  // Reset form
                  setFormData({ fromWarehouse: '', toWarehouse: '', expectedDate: '', notes: '' });
                  setSelectedProducts([]);
                }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Tạo phiếu chuyển kho
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        transfer={selectedTransfer}
        notes={approvalNotes}
        setNotes={setApprovalNotes}
      />

      {/* Picking Modal */}
      <PickingModal
        isOpen={isPickingOpen}
        onClose={() => setIsPickingOpen(false)}
        transfer={selectedTransfer}
        pickingProgress={pickingProgress}
        setPickingProgress={setPickingProgress}
      />

      {/* Receiving Modal */}
      <ReceivingModal
        isOpen={isReceivingOpen}
        onClose={() => setIsReceivingOpen(false)}
        transfer={selectedTransfer}
      />
    </div>
  );
}
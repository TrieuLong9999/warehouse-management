import React, { useState } from 'react';
import { ScanBarcode, Check, X, AlertTriangle, Package, MapPin, Calendar, Hash, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';

export function ReceivingInbound() {
  const [scanMode, setScanMode] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [showScanResult, setShowScanResult] = useState(false);
  const [selectedInbound, setSelectedInbound] = useState<any>(null);

  // Sample inbound order
  const inboundOrder = {
    code: 'IN-2024-0156',
    date: '21/11/2024',
    source: 'Khách hàng gửi kho',
    customer: 'KH-001 - Công ty TNHH ABC',
    warehouse: 'WH-HCM - Kho TP.HCM',
    status: 'Chờ tiếp nhận',
    products: [
      {
        id: 1,
        code: 'ITM-001',
        name: 'iPhone 15 Pro Max',
        barcode: '8934567890123',
        expectedUnit: 'CASE',
        expectedQty: 10,
        expectedQtyBase: 120,
        receivedQty: 0,
        receivedItems: [],
        status: 'pending',
      },
      {
        id: 2,
        code: 'ITM-003',
        name: 'Coca Cola 330ml',
        barcode: '8934567890789',
        expectedUnit: 'CASE',
        expectedQty: 20,
        expectedQtyBase: 480,
        receivedQty: 0,
        receivedItems: [],
        status: 'pending',
      },
    ],
  };

  const [receiving, setReceiving] = useState(inboundOrder);

  const handleScan = (code: string) => {
    // Find product by barcode
    const product = receiving.products.find(p => p.barcode === code);
    if (product) {
      setSelectedInbound(product);
      setShowScanResult(true);
    }
    setScannedCode('');
  };

  const receiveProduct = (productId: number, quantity: number, condition: string, lotNumber: string) => {
    const newReceiving = { ...receiving };
    const productIndex = newReceiving.products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
      const product = newReceiving.products[productIndex];
      product.receivedQty += quantity;
      product.receivedItems.push({
        quantity,
        condition,
        lotNumber,
        timestamp: new Date().toISOString(),
      });
      
      if (product.receivedQty >= product.expectedQtyBase) {
        product.status = 'completed';
      } else {
        product.status = 'receiving';
      }
    }
    
    setReceiving(newReceiving);
    setShowScanResult(false);
    setSelectedInbound(null);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'damaged': return 'bg-red-100 text-red-800';
      case 'return': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'receiving': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (product: any) => {
    return (product.receivedQty / product.expectedQtyBase) * 100;
  };

  const totalProgress = () => {
    const totalExpected = receiving.products.reduce((sum, p) => sum + p.expectedQtyBase, 0);
    const totalReceived = receiving.products.reduce((sum, p) => sum + p.receivedQty, 0);
    return (totalReceived / totalExpected) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Tiếp nhận hàng</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quét barcode/QR code để xác nhận tiếp nhận hàng vào kho
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inbound Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phiếu nhập: {receiving.code}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {receiving.customer} • {receiving.date}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {receiving.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Kho nhận:</span>
                  <span style={{ fontWeight: '500' }}>{receiving.warehouse}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Loại hình:</span>
                  <Badge variant="secondary">{receiving.source}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tiến độ tổng:</span>
                    <span style={{ fontWeight: '600' }}>{totalProgress().toFixed(0)}%</span>
                  </div>
                  <Progress value={totalProgress()} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Barcode Scanner */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <ScanBarcode className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">Quét mã sản phẩm</h3>
                  <p className="text-sm text-blue-700">
                    Sử dụng máy quét barcode hoặc nhập mã thủ công
                  </p>
                </div>
                <Button
                  variant={scanMode ? "default" : "outline"}
                  onClick={() => setScanMode(!scanMode)}
                  style={scanMode ? { backgroundColor: '#0057FF' } : {}}
                >
                  {scanMode ? 'Đang quét' : 'Tắt'}
                </Button>
              </div>

              {scanMode && (
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && scannedCode) {
                          handleScan(scannedCode);
                        }
                      }}
                      placeholder="Quét hoặc nhập barcode/QR code..."
                      className="text-lg h-12 bg-white"
                      autoFocus
                    />
                    <ScanBarcode className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      style={{ backgroundColor: '#0057FF' }}
                      onClick={() => scannedCode && handleScan(scannedCode)}
                    >
                      Xác nhận quét
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setScannedCode('')}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product List */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách sản phẩm chờ tiếp nhận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receiving.products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 style={{ fontWeight: '600' }}>{product.name}</h4>
                          <Badge className={getStatusColor(product.status)} variant="secondary">
                            {product.status === 'completed' ? 'Hoàn thành' : 
                             product.status === 'receiving' ? 'Đang tiếp nhận' : 'Chờ'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{product.code}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product.barcode}
                          </code>
                          <span className="text-sm text-gray-600">
                            Dự kiến: {product.expectedQty} {product.expectedUnit} ({product.expectedQtyBase} PCS)
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInbound(product);
                          setShowScanResult(true);
                        }}
                      >
                        Nhập thủ công
                      </Button>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Đã nhận:</span>
                        <span style={{ fontWeight: '600' }}>
                          {product.receivedQty} / {product.expectedQtyBase} PCS 
                          ({calculateProgress(product).toFixed(0)}%)
                        </span>
                      </div>
                      <Progress value={calculateProgress(product)} className="h-2" />
                    </div>

                    {/* Received Items */}
                    {product.receivedItems.length > 0 && (
                      <div className="border-t pt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Lịch sử tiếp nhận:</p>
                        {product.receivedItems.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Badge className={getConditionColor(item.condition)} variant="secondary">
                                {item.condition === 'good' ? 'Tốt' : 
                                 item.condition === 'damaged' ? 'Hư hỏng' : 'Trả lại'}
                              </Badge>
                              <span>{item.quantity} PCS</span>
                              {item.lotNumber && (
                                <code className="text-xs bg-gray-200 px-1 rounded">
                                  LOT: {item.lotNumber}
                                </code>
                              )}
                            </div>
                            <span className="text-gray-500">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan tiếp nhận</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Tổng tiến độ</p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalProgress().toFixed(0)}%
                </p>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Tổng SKU:</span>
                <span style={{ fontWeight: '600' }}>{receiving.products.length}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Hoàn thành:</span>
                <span className="text-green-600" style={{ fontWeight: '600' }}>
                  {receiving.products.filter(p => p.status === 'completed').length}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Đang xử lý:</span>
                <span className="text-blue-600" style={{ fontWeight: '600' }}>
                  {receiving.products.filter(p => p.status === 'receiving').length}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Chờ xử lý:</span>
                <span className="text-gray-600" style={{ fontWeight: '600' }}>
                  {receiving.products.filter(p => p.status === 'pending').length}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-sm text-gray-600">Đã nhận:</p>
                <p className="text-2xl font-bold text-blue-600">
                  {receiving.products.reduce((sum, p) => sum + p.receivedQty, 0).toLocaleString()}
                  <span className="text-sm text-gray-500 ml-1">PCS</span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Dự kiến:</p>
                <p className="text-2xl font-bold text-gray-700">
                  {receiving.products.reduce((sum, p) => sum + p.expectedQtyBase, 0).toLocaleString()}
                  <span className="text-sm text-gray-500 ml-1">PCS</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Chụp ảnh lô hàng
              </Button>
              <Button className="w-full" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Kiểm tra chất lượng
              </Button>
              <Button 
                className="w-full" 
                style={{ backgroundColor: '#0057FF' }}
                disabled={totalProgress() < 100}
              >
                <Check className="w-4 h-4 mr-2" />
                Hoàn tất tiếp nhận
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Quét barcode để tiếp nhận nhanh</li>
                <li>• Nhập Lot/Batch cho mỗi lần nhận</li>
                <li>• Chọn tình trạng hàng hóa</li>
                <li>• Xác nhận đầy đủ trước khi hoàn tất</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receiving Dialog */}
      <Dialog open={showScanResult} onOpenChange={setShowScanResult}>
        <DialogContent className="max-w-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Xác nhận tiếp nhận</DialogTitle>
          </DialogHeader>
          {selectedInbound && (
            <ReceivingForm
              product={selectedInbound}
              onConfirm={receiveProduct}
              onCancel={() => setShowScanResult(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Receiving Form Component
function ReceivingForm({ product, onConfirm, onCancel }: any) {
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('good');
  const [lotNumber, setLotNumber] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const remaining = product.expectedQtyBase - product.receivedQty;

  return (
    <div className="space-y-4 py-4">
      {/* Product Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">{product.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{product.code}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Đã nhận:</span>
            <span className="ml-2 font-medium text-blue-600">
              {product.receivedQty} PCS
            </span>
          </div>
          <div>
            <span className="text-gray-600">Còn lại:</span>
            <span className="ml-2 font-medium text-orange-600">
              {remaining} PCS
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Số lượng nhận (PCS) *</Label>
          <Input
            type="number"
            placeholder="Nhập số lượng"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            max={remaining}
          />
          <p className="text-xs text-gray-500">
            Tối đa: {remaining} PCS
          </p>
        </div>

        <div className="space-y-2">
          <Label>Tình trạng hàng *</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="good">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Tốt - Đạt chuẩn
                </div>
              </SelectItem>
              <SelectItem value="damaged">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Hư hỏng - Cần kiểm tra
                </div>
              </SelectItem>
              <SelectItem value="return">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-orange-600" />
                  Trả lại - Không đạt
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Số Lot</Label>
            <Input
              placeholder="LOT-XXXX"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Số Batch</Label>
            <Input
              placeholder="BATCH-XXXX"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ngày hết hạn</Label>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          style={{ backgroundColor: '#0057FF' }}
          onClick={() => {
            const qty = parseInt(quantity);
            if (qty > 0 && qty <= remaining) {
              onConfirm(product.id, qty, condition, lotNumber);
            }
          }}
          disabled={!quantity || parseInt(quantity) <= 0 || parseInt(quantity) > remaining}
        >
          <Check className="w-4 h-4 mr-2" />
          Xác nhận tiếp nhận
        </Button>
      </div>
    </div>
  );
}

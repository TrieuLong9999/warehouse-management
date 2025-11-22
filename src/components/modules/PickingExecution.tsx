import React, { useState } from 'react';
import { ScanBarcode, Check, X, MapPin, Package, Navigation, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';

export function PickingExecution() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [scanMode, setScanMode] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pickQuantity, setPickQuantity] = useState('');

  // Sample outbound order with picking list
  const outboundOrder = {
    code: 'OUT-2024-0089',
    customer: 'KH-001 - Công ty TNHH ABC',
    date: '21/11/2024',
    priority: 'high',
    pickingStrategy: 'FIFO',
    totalItems: 2,
    status: 'picking',
    picker: 'Nguyễn Văn A',
    startTime: '10:30',
    pickList: [
      {
        seq: 1,
        productCode: 'ITM-001',
        productName: 'iPhone 15 Pro Max',
        barcode: '8934567890123',
        locationCode: 'A-01-001',
        zone: 'Zone A',
        lotNumber: 'LOT-2024-001',
        requiredQty: 60,
        pickedQty: 60,
        unit: 'PCS',
        expiryDate: '2025-12-31',
        storageTime: 310,
        status: 'completed',
        distance: 0,
      },
      {
        seq: 2,
        productCode: 'ITM-001',
        productName: 'iPhone 15 Pro Max',
        barcode: '8934567890123',
        locationCode: 'A-01-002',
        zone: 'Zone A',
        lotNumber: 'LOT-2024-005',
        requiredQty: 45,
        pickedQty: 0,
        unit: 'PCS',
        expiryDate: '2025-06-30',
        storageTime: 185,
        status: 'current',
        distance: 5, // meters from previous location
      },
      {
        seq: 3,
        productCode: 'ITM-001',
        productName: 'iPhone 15 Pro Max',
        barcode: '8934567890123',
        locationCode: 'A-02-001',
        zone: 'Zone A',
        lotNumber: 'LOT-2024-008',
        requiredQty: 15,
        pickedQty: 0,
        unit: 'PCS',
        expiryDate: '2026-03-31',
        storageTime: 103,
        status: 'pending',
        distance: 8,
      },
      {
        seq: 4,
        productCode: 'ITM-003',
        productName: 'Coca Cola 330ml',
        barcode: '8934567890789',
        locationCode: 'B-01-001',
        zone: 'Zone B',
        lotNumber: 'LOT-2024-010',
        requiredQty: 480,
        pickedQty: 0,
        unit: 'PCS',
        expiryDate: '2025-01-31',
        storageTime: 51,
        status: 'pending',
        distance: 25, // meters to different zone
      },
    ],
  };

  const [picking, setPicking] = useState(outboundOrder);
  const currentPick = picking.pickList[currentPickIndex];

  const handleScan = (code: string) => {
    if (!currentPick) return;

    // Verify location
    if (code === currentPick.locationCode) {
      setShowConfirmDialog(true);
      setPickQuantity(currentPick.requiredQty.toString());
    } 
    // Verify product
    else if (code === currentPick.barcode || code === currentPick.productCode) {
      // Product scanned, now need to scan location
      alert('✓ Sản phẩm đúng! Hãy quét vị trí lấy hàng: ' + currentPick.locationCode);
    }
    // Wrong scan
    else {
      alert('❌ Mã không đúng! Vui lòng quét lại.');
    }
    
    setScannedCode('');
  };

  const confirmPick = () => {
    const qty = parseInt(pickQuantity);
    if (!qty || qty <= 0 || qty > currentPick.requiredQty) {
      alert('Số lượng không hợp lệ!');
      return;
    }

    // Update pick status
    const updated = { ...picking };
    updated.pickList[currentPickIndex].pickedQty = qty;
    updated.pickList[currentPickIndex].status = 'completed';
    
    // Move to next item
    if (currentPickIndex < picking.pickList.length - 1) {
      updated.pickList[currentPickIndex + 1].status = 'current';
      setCurrentPickIndex(currentPickIndex + 1);
    }
    
    setPicking(updated);
    setShowConfirmDialog(false);
    setPickQuantity('');
  };

  const skipPick = () => {
    const updated = { ...picking };
    updated.pickList[currentPickIndex].status = 'skipped';
    
    if (currentPickIndex < picking.pickList.length - 1) {
      updated.pickList[currentPickIndex + 1].status = 'current';
      setCurrentPickIndex(currentPickIndex + 1);
    }
    
    setPicking(updated);
    setShowConfirmDialog(false);
  };

  const calculateProgress = () => {
    const total = picking.pickList.reduce((sum, item) => sum + item.requiredQty, 0);
    const picked = picking.pickList.reduce((sum, item) => sum + item.pickedQty, 0);
    return (picked / total) * 100;
  };

  const progress = calculateProgress();
  const completedItems = picking.pickList.filter(item => item.status === 'completed').length;
  const totalDistance = picking.pickList.reduce((sum, item) => sum + item.distance, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Picking - Lấy hàng</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Quét barcode để xác nhận vị trí và số lượng lấy hàng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Phiếu xuất: {picking.code}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {picking.customer} • {picking.date}
                  </p>
                </div>
                <Badge className={
                  picking.priority === 'high' ? 'bg-red-100 text-red-800' :
                  picking.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {picking.priority === 'high' ? 'Ưu tiên cao' :
                   picking.priority === 'medium' ? 'Ưu tiên trung bình' : 'Bình thường'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Chiến lược:</span>
                  <Badge variant="outline">{picking.pickingStrategy}</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Người lấy hàng:</span>
                  <span style={{ fontWeight: '500' }}>{picking.picker}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Bắt đầu:</span>
                  <span style={{ fontWeight: '500' }}>{picking.startTime}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tiến độ:</span>
                    <span style={{ fontWeight: '600' }}>{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
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
                  <h3 className="font-semibold text-blue-900">Quét mã để xác nhận</h3>
                  <p className="text-sm text-blue-700">
                    Quét vị trí hoặc sản phẩm để lấy hàng
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
                      placeholder="Quét vị trí hoặc barcode sản phẩm..."
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

          {/* Current Pick Location */}
          {currentPick && (
            <Card className="border-2 border-green-300 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-900">
                    🎯 Vị trí hiện tại: {currentPick.locationCode}
                  </CardTitle>
                  <Badge className="bg-green-600 text-white">
                    Bước {currentPick.seq}/{picking.pickList.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Sản phẩm</p>
                    <p className="font-semibold">{currentPick.productName}</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{currentPick.productCode}</code>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Số lượng cần lấy</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {currentPick.requiredQty}
                    </p>
                    <p className="text-xs text-gray-500">{currentPick.unit}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Lot/Batch</p>
                    <code className="text-sm font-medium">{currentPick.lotNumber}</code>
                    <p className="text-xs text-gray-500">HSD: {currentPick.expiryDate}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">Khoảng cách</p>
                    <p className="text-xl font-bold text-orange-600">
                      {currentPick.distance}m
                    </p>
                    <p className="text-xs text-gray-500">{currentPick.zone}</p>
                  </div>
                </div>

                <Alert className="bg-white border-green-300">
                  <Navigation className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <strong>Hướng dẫn:</strong>
                        <p className="text-sm mt-1">
                          1. Di chuyển đến <strong>{currentPick.locationCode}</strong>
                          <br />
                          2. Quét mã vị trí để xác nhận
                          <br />
                          3. Quét barcode sản phẩm (optional)
                          <br />
                          4. Xác nhận số lượng đã lấy
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowConfirmDialog(true);
                          setPickQuantity(currentPick.requiredQty.toString());
                        }}
                      >
                        Nhập thủ công
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Pick List */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách lấy hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {picking.pickList.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 transition-all ${
                      item.status === 'completed' ? 'bg-green-50 border-green-200' :
                      item.status === 'current' ? 'bg-blue-50 border-blue-300 border-2' :
                      item.status === 'skipped' ? 'bg-gray-50 border-gray-200' :
                      'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'current' ? 'bg-blue-500 ring-4 ring-blue-100' :
                        item.status === 'skipped' ? 'bg-gray-400' :
                        'bg-gray-200'
                      }`}>
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : item.status === 'current' ? (
                          <span className="text-white font-bold">{item.seq}</span>
                        ) : item.status === 'skipped' ? (
                          <X className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-gray-500 font-bold">{item.seq}</span>
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{item.productName}</h4>
                            <p className="text-sm text-gray-500">{item.productCode}</p>
                          </div>
                          <Badge className={
                            item.status === 'completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'current' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'skipped' ? 'bg-gray-100 text-gray-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {item.status === 'completed' ? 'Hoàn thành' :
                             item.status === 'current' ? 'Đang lấy' :
                             item.status === 'skipped' ? 'Bỏ qua' : 'Chờ'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-5 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500">Vị trí</p>
                            <p className="font-medium text-blue-600">{item.locationCode}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Số lượng</p>
                            <p className="font-medium">
                              {item.pickedQty > 0 ? (
                                <span className="text-green-600">{item.pickedQty}</span>
                              ) : (
                                item.requiredQty
                              )} {item.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Lot/Batch</p>
                            <code className="text-xs">{item.lotNumber}</code>
                          </div>
                          <div>
                            <p className="text-gray-500">Khoảng cách</p>
                            <p className="font-medium">{item.distance}m</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Lưu kho</p>
                            <p className="font-medium">{item.storageTime} ngày</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tiến độ picking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Hoàn thành</p>
                <p className="text-3xl font-bold text-blue-600">
                  {progress.toFixed(0)}%
                </p>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Đã lấy:</span>
                <span className="text-green-600" style={{ fontWeight: '600' }}>
                  {completedItems}/{picking.pickList.length}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Còn lại:</span>
                <span style={{ fontWeight: '600' }}>
                  {picking.pickList.length - completedItems}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Tổng khoảng cách:</span>
                <span className="text-orange-600" style={{ fontWeight: '600' }}>
                  {totalDistance}m
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-sm text-gray-600">Đã lấy:</p>
                <p className="text-2xl font-bold text-green-600">
                  {picking.pickList.reduce((sum, item) => sum + item.pickedQty, 0)}
                  <span className="text-sm text-gray-500 ml-1">PCS</span>
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Tổng cần lấy:</p>
                <p className="text-2xl font-bold text-gray-700">
                  {picking.pickList.reduce((sum, item) => sum + item.requiredQty, 0)}
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
                <MapPin className="w-4 h-4 mr-2" />
                Xem bản đồ kho
              </Button>
              <Button className="w-full" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                In pick list
              </Button>
              <Button 
                className="w-full" 
                style={{ backgroundColor: '#0057FF' }}
                disabled={progress < 100}
              >
                <Check className="w-4 h-4 mr-2" />
                Hoàn tất picking
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
                <li>• Quét mã vị trí trước khi lấy hàng</li>
                <li>• Kiểm tra Lot/Batch khớp với yêu cầu</li>
                <li>• Xác nhận số lượng chính xác</li>
                <li>• Theo thứ tự để giảm khoảng cách di chuyển</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Pick Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Xác nhận số lượng đã lấy</DialogTitle>
          </DialogHeader>
          {currentPick && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">{currentPick.productName}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Vị trí:</span>
                    <span className="ml-2 font-medium">{currentPick.locationCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Lot:</span>
                    <span className="ml-2 font-medium">{currentPick.lotNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cần lấy:</span>
                    <span className="ml-2 font-medium text-blue-600">
                      {currentPick.requiredQty} {currentPick.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">HSD:</span>
                    <span className="ml-2 font-medium">{currentPick.expiryDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Số lượng đã lấy *</Label>
                <Input
                  type="number"
                  value={pickQuantity}
                  onChange={(e) => setPickQuantity(e.target.value)}
                  placeholder="Nhập số lượng"
                  max={currentPick.requiredQty}
                  autoFocus
                />
                <p className="text-xs text-gray-500">
                  Tối đa: {currentPick.requiredQty} {currentPick.unit}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={skipPick}>
                  Bỏ qua
                </Button>
                <Button
                  style={{ backgroundColor: '#0057FF' }}
                  onClick={confirmPick}
                  disabled={!pickQuantity || parseInt(pickQuantity) <= 0}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Xác nhận
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
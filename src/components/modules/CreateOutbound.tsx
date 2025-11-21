import React, { useState } from 'react';
import { Plus, Trash2, Save, X, Package, Search, Building2, Truck, ShoppingCart, Calendar, User, ScanBarcode, FileUp, Copy, Edit2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';

export function CreateOutbound() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState('sale');
  const [pickingStrategy, setPickingStrategy] = useState('FIFO');
  const [addMode, setAddMode] = useState<'scan' | 'search' | 'bulk'>('scan');
  const [scanInput, setScanInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Sample customers
  const customers = [
    { id: 1, code: 'KH-001', name: 'Công ty TNHH ABC', priority: 'high' },
    { id: 2, code: 'KH-002', name: 'Công ty Cổ phần XYZ', priority: 'medium' },
    { id: 3, code: 'KH-003', name: 'Doanh nghiệp DEF', priority: 'normal' },
  ];

  // Products with inventory details
  const availableProducts = [
    {
      id: 1,
      code: 'ITM-001',
      name: 'iPhone 15 Pro Max',
      category: 'Điện tử',
      barcode: '8934567890123',
      baseUnit: 'PCS',
      currentStock: 150,
      availableStock: 135, // After reserved
      allocatedQty: 15,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Cái/Chiếc' },
        { unit: 'CASE', rate: 12, label: 'Thùng (12 pcs)' },
      ],
      locations: [
        { 
          locationCode: 'A-01-001', 
          zone: 'A', 
          qty: 60, 
          lotNumber: 'LOT-2024-001',
          expiryDate: '2025-12-31',
          receivedDate: '2024-01-15',
          storageTime: 310, // days
        },
        { 
          locationCode: 'A-01-002', 
          zone: 'A', 
          qty: 45, 
          lotNumber: 'LOT-2024-005',
          expiryDate: '2025-06-30',
          receivedDate: '2024-05-20',
          storageTime: 185,
        },
        { 
          locationCode: 'A-02-001', 
          zone: 'A', 
          qty: 30, 
          lotNumber: 'LOT-2024-008',
          expiryDate: '2026-03-31',
          receivedDate: '2024-08-10',
          storageTime: 103,
        },
      ],
    },
    {
      id: 2,
      code: 'ITM-003',
      name: 'Coca Cola 330ml',
      category: 'Đồ uống',
      barcode: '8934567890789',
      baseUnit: 'PCS',
      currentStock: 2400,
      availableStock: 2200,
      allocatedQty: 200,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Lon' },
        { unit: 'CASE', rate: 24, label: 'Thùng (24 lon)' },
      ],
      locations: [
        { 
          locationCode: 'B-01-001', 
          zone: 'B', 
          qty: 800, 
          lotNumber: 'LOT-2024-010',
          expiryDate: '2025-01-31',
          receivedDate: '2024-10-01',
          storageTime: 51,
        },
        { 
          locationCode: 'B-01-002', 
          zone: 'B', 
          qty: 900, 
          lotNumber: 'LOT-2024-012',
          expiryDate: '2025-03-15',
          receivedDate: '2024-10-15',
          storageTime: 37,
        },
        { 
          locationCode: 'B-02-001', 
          zone: 'B', 
          qty: 700, 
          lotNumber: 'LOT-2024-015',
          expiryDate: '2025-05-30',
          receivedDate: '2024-11-01',
          storageTime: 20,
        },
      ],
    },
  ];

  const orderTypes = [
    { 
      id: 'sale', 
      label: 'Bán hàng', 
      icon: <ShoppingCart className="w-4 h-4" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    { 
      id: 'transfer', 
      label: 'Chuyển kho', 
      icon: <Truck className="w-4 h-4" />,
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    { 
      id: 'return', 
      label: 'Trả NCC', 
      icon: <Package className="w-4 h-4" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
  ];

  const pickingStrategies = [
    { value: 'FIFO', label: 'FIFO - First In First Out', description: 'Xuất hàng nhập trước' },
    { value: 'FEFO', label: 'FEFO - First Expired First Out', description: 'Xuất hàng hết hạn trước' },
    { value: 'LIFO', label: 'LIFO - Last In First Out', description: 'Xuất hàng nhập sau' },
    { value: 'LOT', label: 'By Lot/Batch', description: 'Xuất theo Lot cụ thể' },
    { value: 'LOCATION', label: 'By Location', description: 'Xuất theo vị trí gần nhất' },
  ];

  // Calculate suggested locations based on strategy
  const getSuggestedLocations = (product: any, quantity: number, strategy: string) => {
    let sortedLocations = [...product.locations];
    
    switch (strategy) {
      case 'FIFO':
        sortedLocations.sort((a, b) => new Date(a.receivedDate).getTime() - new Date(b.receivedDate).getTime());
        break;
      case 'FEFO':
        sortedLocations.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
        break;
      case 'LIFO':
        sortedLocations.sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime());
        break;
      case 'LOCATION':
        sortedLocations.sort((a, b) => a.locationCode.localeCompare(b.locationCode));
        break;
    }

    // Allocate quantity across locations
    const allocations = [];
    let remaining = quantity;

    for (const location of sortedLocations) {
      if (remaining <= 0) break;
      
      const pickQty = Math.min(remaining, location.qty);
      if (pickQty > 0) {
        allocations.push({
          ...location,
          pickQty,
        });
        remaining -= pickQty;
      }
    }

    return { allocations, canFulfill: remaining === 0 };
  };

  const handleScanAdd = (barcode: string) => {
    const product = availableProducts.find(p => p.barcode === barcode || p.code === barcode);
    if (product) {
      const defaultUnit = product.conversions[0].unit;
      const conversion = product.conversions.find(c => c.unit === defaultUnit);
      
      addOrUpdateProduct({
        ...product,
        selectedUnit: defaultUnit,
        quantity: 1,
        qtyInBase: 1 * (conversion?.rate || 1),
        pickingStrategy,
        suggestedLocations: getSuggestedLocations(product, 1, pickingStrategy),
      });
      
      setScanInput('');
    } else {
      alert('Không tìm thấy sản phẩm với mã: ' + barcode);
      setScanInput('');
    }
  };

  const handleQuickAdd = (product: any, unit: string, quantity: number) => {
    const conversion = product.conversions.find((c: any) => c.unit === unit);
    const qtyInBase = quantity * (conversion?.rate || 1);
    
    addOrUpdateProduct({
      ...product,
      selectedUnit: unit,
      quantity,
      qtyInBase,
      pickingStrategy,
      suggestedLocations: getSuggestedLocations(product, qtyInBase, pickingStrategy),
    });
  };

  const addOrUpdateProduct = (newProduct: any) => {
    const existingIndex = selectedProducts.findIndex(p => p.id === newProduct.id && p.selectedUnit === newProduct.selectedUnit);
    
    if (existingIndex >= 0) {
      const updated = [...selectedProducts];
      updated[existingIndex].quantity += newProduct.quantity;
      updated[existingIndex].qtyInBase += newProduct.qtyInBase;
      updated[existingIndex].suggestedLocations = getSuggestedLocations(
        newProduct,
        updated[existingIndex].qtyInBase,
        pickingStrategy
      );
      setSelectedProducts(updated);
    } else {
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const updated = [...selectedProducts];
    updated[index][field] = value;
    
    if (field === 'quantity' || field === 'selectedUnit') {
      const product = availableProducts.find(p => p.id === updated[index].id);
      const conversion = product?.conversions.find((c: any) => c.unit === updated[index].selectedUnit);
      updated[index].qtyInBase = updated[index].quantity * (conversion?.rate || 1);
      
      // Recalculate suggested locations
      updated[index].suggestedLocations = getSuggestedLocations(
        updated[index],
        updated[index].qtyInBase,
        pickingStrategy
      );
    }
    
    setSelectedProducts(updated);
  };

  const updatePickingStrategy = (newStrategy: string) => {
    setPickingStrategy(newStrategy);
    
    // Recalculate all suggested locations
    const updated = selectedProducts.map(product => ({
      ...product,
      pickingStrategy: newStrategy,
      suggestedLocations: getSuggestedLocations(product, product.qtyInBase, newStrategy),
    }));
    
    setSelectedProducts(updated);
  };

  const calculateTotal = () => {
    return {
      totalItems: selectedProducts.length,
      totalQty: selectedProducts.reduce((sum, p) => sum + p.qtyInBase, 0),
      totalAllocations: selectedProducts.reduce((sum, p) => 
        sum + (p.suggestedLocations?.allocations?.length || 0), 0),
      allCanFulfill: selectedProducts.every(p => p.suggestedLocations?.canFulfill),
    };
  };

  const totals = calculateTotal();
  const recentProducts = availableProducts.slice(0, 2);
  const searchResults = searchQuery 
    ? availableProducts.filter(p => 
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery)
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Tạo phiếu xuất kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Lập kế hoạch xuất hàng với chiến lược picking tối ưu
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <X className="w-4 h-4 mr-2" />
            Hủy bỏ
          </Button>
          <Button style={{ backgroundColor: '#0057FF' }} disabled={!totals.allCanFulfill}>
            <Save className="w-4 h-4 mr-2" />
            Tạo phiếu xuất
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Loại phiếu xuất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {orderTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedOrderType(type.id)}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                      selectedOrderType === type.id
                        ? type.color + ' border-current'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {type.icon}
                    <span className="text-sm text-center" style={{ fontWeight: '500' }}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outbound Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phiếu xuất</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mã phiếu xuất *</Label>
                  <Input 
                    placeholder="Tự động tạo: OUT-2024-XXXX" 
                    defaultValue="OUT-2024-0089"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ngày xuất dự kiến *</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              {selectedOrderType === 'sale' && (
                <div className="space-y-2">
                  <Label>Khách hàng *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.code}>
                          {c.code} - {c.name}
                          {c.priority === 'high' && (
                            <Badge className="ml-2 bg-red-100 text-red-800">VIP</Badge>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedOrderType === 'transfer' && (
                <div className="space-y-2">
                  <Label>Kho đích *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho đích" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WH-HN">WH-HN - Kho Hà Nội</SelectItem>
                      <SelectItem value="WH-DN">WH-DN - Kho Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Chiến lược Picking *</Label>
                <Select value={pickingStrategy} onValueChange={updatePickingStrategy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pickingStrategies.map((strategy) => (
                      <SelectItem key={strategy.value} value={strategy.value}>
                        <div>
                          <p style={{ fontWeight: '500' }}>{strategy.label}</p>
                          <p className="text-xs text-gray-500">{strategy.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Chiến lược này sẽ quyết định vị trí lấy hàng tối ưu
                </p>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea 
                  placeholder="Nhập ghi chú về đơn hàng..." 
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Danh sách sản phẩm ({selectedProducts.length})</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setAddMode('scan');
                    }}
                  >
                    <ScanBarcode className="w-4 h-4 mr-2" />
                    Quét mã
                  </Button>
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: '#0057FF' }}
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setAddMode('search');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sản phẩm
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProducts.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-2" style={{ fontWeight: '500' }}>
                    Chưa có sản phẩm nào
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Thêm sản phẩm để bắt đầu tạo phiếu xuất
                  </p>
                  <Button
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setAddMode('search');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm sản phẩm
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((product, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      {/* Product Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 style={{ fontWeight: '600' }}>{product.name}</h4>
                            {!product.suggestedLocations?.canFulfill && (
                              <Badge className="bg-red-100 text-red-800">
                                Không đủ hàng
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{product.code}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm">
                              Tồn kho: <span className="font-medium text-green-600">{product.availableStock}</span>
                            </span>
                            <span className="text-sm">
                              Yêu cầu: <span className="font-medium text-blue-600">{product.qtyInBase}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(index)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Quantity Input */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Số lượng</Label>
                          <Input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value || '0'))}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Đơn vị</Label>
                          <Select
                            value={product.selectedUnit}
                            onValueChange={(value) => updateProduct(index, 'selectedUnit', value)}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {product.conversions.map((conv: any) => (
                                <SelectItem key={conv.unit} value={conv.unit}>
                                  {conv.unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Quy đổi</Label>
                          <div className="h-9 flex items-center">
                            <span className="text-sm font-medium text-blue-600">
                              = {product.qtyInBase} {product.baseUnit}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Vị trí lấy</Label>
                          <div className="h-9 flex items-center">
                            <Badge variant="outline">
                              {product.suggestedLocations?.allocations?.length || 0} vị trí
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Suggested Locations */}
                      {product.suggestedLocations?.allocations && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium mb-2">
                            📍 Đề xuất lấy hàng ({pickingStrategy}):
                          </p>
                          <div className="space-y-2">
                            {product.suggestedLocations.allocations.map((loc: any, locIndex: number) => (
                              <div key={locIndex} className="flex items-center justify-between text-sm bg-white p-2 rounded border">
                                <div className="flex items-center gap-3">
                                  <Badge className="bg-blue-100 text-blue-800">
                                    {loc.locationCode}
                                  </Badge>
                                  <span className="font-medium">{loc.pickQty} {product.baseUnit}</span>
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {loc.lotNumber}
                                  </code>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span>HSD: {loc.expiryDate}</span>
                                  <span>Lưu kho: {loc.storageTime} ngày</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!product.suggestedLocations?.canFulfill && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertDescription className="text-red-800 text-sm">
                            ⚠️ Không đủ hàng trong kho. Thiếu {product.qtyInBase - product.availableStock} {product.baseUnit}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}

                  {/* Summary Bar */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Tổng SKU</p>
                        <p className="text-lg font-semibold text-blue-900">{totals.totalItems}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tổng số lượng</p>
                        <p className="text-lg font-semibold text-blue-900">
                          {totals.totalQty.toLocaleString()} PCS
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Vị trí lấy hàng</p>
                        <p className="text-lg font-semibold text-blue-900">{totals.totalAllocations}</p>
                      </div>
                    </div>
                    {!totals.allCanFulfill && (
                      <Badge className="bg-red-100 text-red-800">
                        Có sản phẩm thiếu hàng
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan phiếu xuất</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Loại phiếu:</span>
                <Badge className={orderTypes.find(t => t.id === selectedOrderType)?.color}>
                  {orderTypes.find(t => t.id === selectedOrderType)?.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Picking:</span>
                <Badge variant="outline">{pickingStrategy}</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Trạng thái:</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Nháp
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Tổng SKU:</span>
                <span style={{ fontWeight: '600' }}>{totals.totalItems}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Tổng số lượng:</span>
                <span className="text-blue-600" style={{ fontWeight: '600' }}>
                  {totals.totalQty.toLocaleString()} PCS
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Vị trí lấy:</span>
                <span style={{ fontWeight: '600' }}>{totals.totalAllocations}</span>
              </div>
            </CardContent>
          </Card>

          {/* Picking Strategy Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">📋 Chiến lược: {pickingStrategy}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {pickingStrategies.find(s => s.value === pickingStrategy)?.description}
              </p>
              <ul className="mt-3 space-y-2 text-xs text-gray-600">
                {pickingStrategy === 'FIFO' && (
                  <>
                    <li>✓ Xuất hàng nhập kho sớm nhất</li>
                    <li>✓ Giảm tồn kho lâu</li>
                    <li>✓ Phù hợp hàng thời trang</li>
                  </>
                )}
                {pickingStrategy === 'FEFO' && (
                  <>
                    <li>✓ Xuất hàng hết hạn sớm nhất</li>
                    <li>✓ Giảm hàng quá hạn</li>
                    <li>✓ Phù hợp thực phẩm, dược phẩm</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg"
              style={{ backgroundColor: '#0057FF' }}
              disabled={selectedProducts.length === 0 || !totals.allCanFulfill}
            >
              <Save className="w-4 h-4 mr-2" />
              Tạo phiếu xuất
            </Button>
            <Button variant="outline" className="w-full">
              <X className="w-4 h-4 mr-2" />
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm vào phiếu xuất</DialogTitle>
          </DialogHeader>

          <Tabs value={addMode} onValueChange={(v) => setAddMode(v as any)} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scan">
                <ScanBarcode className="w-4 h-4 mr-2" />
                Quét mã
              </TabsTrigger>
              <TabsTrigger value="search">
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </TabsTrigger>
            </TabsList>

            {/* SCAN MODE */}
            <TabsContent value="scan" className="flex-1 overflow-auto">
              <div className="space-y-4 py-4">
                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <ScanBarcode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Quét barcode để thêm nhanh</h3>
                      <p className="text-sm text-blue-700">
                        Quét mã hoặc nhập thủ công, nhấn Enter để thêm
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && scanInput) {
                          handleScanAdd(scanInput);
                        }
                      }}
                      placeholder="Quét hoặc nhập barcode/mã sản phẩm..."
                      className="text-lg h-14 bg-white pr-12"
                      autoFocus
                    />
                    <ScanBarcode className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Sản phẩm thường xuất</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {recentProducts.map((product) => (
                      <QuickProductCard
                        key={product.id}
                        product={product}
                        onAdd={handleQuickAdd}
                        showStock
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SEARCH MODE */}
            <TabsContent value="search" className="flex-1 overflow-auto">
              <div className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo mã, tên sản phẩm, barcode..."
                    className="pl-10 h-12"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {(searchQuery ? searchResults : availableProducts).map((product) => (
                    <QuickProductCard
                      key={product.id}
                      product={product}
                      onAdd={handleQuickAdd}
                      showStock
                    />
                  ))}
                </div>

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Không tìm thấy sản phẩm</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Quick Product Card Component
function QuickProductCard({ product, onAdd, showStock = false }: any) {
  const [selectedUnit, setSelectedUnit] = useState(product.conversions[0].unit);
  const [quantity, setQuantity] = useState(1);

  const conversion = product.conversions.find((c: any) => c.unit === selectedUnit);
  const qtyInBase = quantity * (conversion?.rate || 1);
  const canFulfill = qtyInBase <= product.availableStock;

  return (
    <div className={`border rounded-lg p-4 transition-all ${
      canFulfill ? 'hover:border-blue-300 hover:bg-blue-50' : 'border-red-200 bg-red-50'
    }`}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold">{product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{product.code}</code>
                <Badge variant="secondary" className="text-xs">{product.category}</Badge>
              </div>
            </div>
            {showStock && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Tồn kho khả dụng</p>
                <p className={`font-semibold ${
                  product.availableStock > 100 ? 'text-green-600' :
                  product.availableStock > 20 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {product.availableStock}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-end gap-2 mt-3">
            <div className="flex-1">
              <Label className="text-xs">Số lượng</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                className="h-9"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs">Đơn vị</Label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.conversions.map((conv: any) => (
                    <SelectItem key={conv.unit} value={conv.unit}>
                      {conv.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs">Quy đổi</Label>
              <div className="h-9 flex items-center">
                <span className={`text-sm font-medium ${
                  canFulfill ? 'text-blue-600' : 'text-red-600'
                }`}>
                  = {qtyInBase} {product.baseUnit}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                if (canFulfill) {
                  onAdd(product, selectedUnit, quantity);
                  setQuantity(1);
                }
              }}
              disabled={!canFulfill}
              style={canFulfill ? { backgroundColor: '#0057FF' } : {}}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>

          {!canFulfill && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ Không đủ hàng (thiếu {qtyInBase - product.availableStock} {product.baseUnit})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

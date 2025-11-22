import React, { useState } from 'react';
import { Plus, Trash2, Save, X, Package, Search, Building2, Factory, Truck, ArrowLeftRight, Globe, ScanBarcode, FileUp, Copy, ShoppingCart, Edit2, Check } from 'lucide-react';
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

export function CreateInbound() {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('customer');
  const [addMode, setAddMode] = useState<'scan' | 'search' | 'bulk'>('scan');
  const [scanInput, setScanInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Sample customers
  const customers = [
    { id: 1, code: 'KH-001', name: 'Công ty TNHH ABC' },
    { id: 2, code: 'KH-002', name: 'Công ty Cổ phần XYZ' },
    { id: 3, code: 'KH-003', name: 'Doanh nghiệp DEF' },
  ];

  // Sample warehouses
  const warehouses = [
    { id: 1, code: 'WH-HCM', name: 'Kho TP.HCM' },
    { id: 2, code: 'WH-HN', name: 'Kho Hà Nội' },
    { id: 3, code: 'WH-DN', name: 'Kho Đà Nẵng' },
  ];

  // Expanded products with more info
  const availableProducts = [
    {
      id: 1,
      code: 'ITM-001',
      name: 'iPhone 15 Pro Max',
      category: 'Điện tử',
      barcode: '8934567890123',
      baseUnit: 'PCS',
      weight: '221g',
      currentStock: 150,
      recentQty: 120,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Cái/Chiếc' },
        { unit: 'CASE', rate: 12, label: 'Thùng (12 pcs)' },
        { unit: 'PALLET', rate: 600, label: 'Pallet (50 thùng)' },
      ],
    },
    {
      id: 2,
      code: 'ITM-002',
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Điện tử',
      barcode: '8934567890456',
      baseUnit: 'PCS',
      weight: '234g',
      currentStock: 89,
      recentQty: 60,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Cái/Chiếc' },
        { unit: 'CASE', rate: 10, label: 'Thùng (10 pcs)' },
        { unit: 'PALLET', rate: 500, label: 'Pallet (50 thùng)' },
      ],
    },
    {
      id: 3,
      code: 'ITM-003',
      name: 'Coca Cola 330ml',
      category: 'Đồ uống',
      barcode: '8934567890789',
      baseUnit: 'PCS',
      weight: '330ml',
      currentStock: 2400,
      recentQty: 480,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Lon' },
        { unit: 'CASE', rate: 24, label: 'Thùng (24 lon)' },
        { unit: 'PALLET', rate: 1728, label: 'Pallet (72 thùng)' },
      ],
    },
    {
      id: 4,
      code: 'ITM-004',
      name: 'Áo thun Nam Cotton',
      category: 'Thời trang',
      barcode: '8934567891012',
      baseUnit: 'PCS',
      weight: '200g',
      currentStock: 450,
      recentQty: 200,
      conversions: [
        { unit: 'PCS', rate: 1, label: 'Cái' },
        { unit: 'BOX', rate: 20, label: 'Hộp (20 cái)' },
        { unit: 'CASE', rate: 100, label: 'Thùng (5 hộp)' },
      ],
    },
    {
      id: 5,
      code: 'ITM-005',
      name: 'Gạo ST25',
      category: 'Thực phẩm',
      barcode: '8934567891345',
      baseUnit: 'KG',
      weight: '5kg/bao',
      currentStock: 1000,
      recentQty: 500,
      conversions: [
        { unit: 'KG', rate: 1, label: 'Kilogram' },
        { unit: 'BAG', rate: 5, label: 'Bao (5kg)' },
        { unit: 'CASE', rate: 50, label: 'Thùng (10 bao)' },
      ],
    },
  ];

  const sourceTypes = [
    { 
      id: 'customer', 
      label: 'Khách hàng gửi kho', 
      icon: <Building2 className="w-4 h-4" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    { 
      id: 'factory', 
      label: 'Nhà máy/Sản xuất', 
      icon: <Factory className="w-4 h-4" />,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    { 
      id: 'import', 
      label: 'Nhập khẩu', 
      icon: <Globe className="w-4 h-4" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    { 
      id: 'return', 
      label: 'Hàng trả lại/Thu hồi', 
      icon: <Truck className="w-4 h-4" />,
      color: 'bg-red-50 text-red-700 border-red-200'
    },
  ];

  // Quick add by scanning
  const handleScanAdd = (barcode: string) => {
    const product = availableProducts.find(p => p.barcode === barcode || p.code === barcode);
    if (product) {
      // Auto-add with default values
      const defaultUnit = product.conversions[1]?.unit || product.conversions[0].unit; // Prefer CASE
      const conversion = product.conversions.find(c => c.unit === defaultUnit);
      
      addOrUpdateProduct({
        ...product,
        selectedUnit: defaultUnit,
        quantity: 1,
        qtyInBase: 1 * (conversion?.rate || 1),
        lotNumber: '',
        batchNumber: '',
        expiryDate: '',
        notes: '',
      });
      
      setScanInput('');
      // Keep dialog open for next scan
    } else {
      alert('Không tìm thấy sản phẩm với mã: ' + barcode);
      setScanInput('');
    }
  };

  // Quick add from search
  const handleQuickAdd = (product: any, unit: string, quantity: number) => {
    const conversion = product.conversions.find((c: any) => c.unit === unit);
    const qtyInBase = quantity * (conversion?.rate || 1);
    
    addOrUpdateProduct({
      ...product,
      selectedUnit: unit,
      quantity,
      qtyInBase,
      lotNumber: '',
      batchNumber: '',
      expiryDate: '',
      notes: '',
    });
  };

  const addOrUpdateProduct = (newProduct: any) => {
    // Check if product already exists
    const existingIndex = selectedProducts.findIndex(p => p.id === newProduct.id && p.selectedUnit === newProduct.selectedUnit);
    
    if (existingIndex >= 0) {
      // Update quantity
      const updated = [...selectedProducts];
      updated[existingIndex].quantity += newProduct.quantity;
      updated[existingIndex].qtyInBase += newProduct.qtyInBase;
      setSelectedProducts(updated);
    } else {
      // Add new
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const updated = [...selectedProducts];
    updated[index][field] = value;
    
    // Recalculate base quantity if quantity or unit changed
    if (field === 'quantity' || field === 'selectedUnit') {
      const product = availableProducts.find(p => p.id === updated[index].id);
      const conversion = product?.conversions.find((c: any) => c.unit === updated[index].selectedUnit);
      updated[index].qtyInBase = updated[index].quantity * (conversion?.rate || 1);
    }
    
    setSelectedProducts(updated);
  };

  const duplicateProduct = (index: number) => {
    const product = selectedProducts[index];
    setSelectedProducts([...selectedProducts, { ...product }]);
  };

  const calculateTotal = () => {
    return {
      totalItems: selectedProducts.length,
      totalQty: selectedProducts.reduce((sum, p) => sum + p.qtyInBase, 0),
      totalCases: selectedProducts.reduce((sum, p) => 
        sum + (p.selectedUnit === 'CASE' ? p.quantity : 0), 0),
      totalPallets: selectedProducts.reduce((sum, p) => 
        sum + (p.selectedUnit === 'PALLET' ? p.quantity : 0), 0),
    };
  };

  const totals = calculateTotal();

  // Recent/Favorite products
  const recentProducts = availableProducts.slice(0, 3);

  // Filtered search results
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
          <h1 className="text-gray-900 mb-1">Tạo phiếu nhập kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Lập kế hoạch nhập hàng vào kho
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <X className="w-4 h-4 mr-2" />
            Hủy bỏ
          </Button>
          <Button style={{ backgroundColor: '#0057FF' }}>
            <Save className="w-4 h-4 mr-2" />
            Lưu & Tạo phiếu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Source Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Loại hình nhập kho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sourceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSource(type.id)}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                      selectedSource === type.id
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

          {/* Inbound Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin phiếu nhập</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mã phiếu nhập *</Label>
                  <Input 
                    placeholder="Tự động tạo: IN-2024-XXXX" 
                    defaultValue="IN-2024-0156"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ngày dự kiến nhập *</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              {/* Dynamic Source Field */}
              {selectedSource === 'customer' && (
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
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedSource === 'factory' && (
                <div className="space-y-2">
                  <Label>Nhà máy/Nhà cung cấp *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà máy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NM-001">NM-001 - Nhà máy Bình Dương</SelectItem>
                      <SelectItem value="NM-002">NM-002 - Nhà máy Đồng Nai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedSource === 'import' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số container *</Label>
                    <Input placeholder="VD: ABCU1234567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quốc gia xuất xứ *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quốc gia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CN">Trung Quốc</SelectItem>
                        <SelectItem value="US">Hoa Kỳ</SelectItem>
                        <SelectItem value="JP">Nhật Bản</SelectItem>
                        <SelectItem value="KR">Hàn Quốc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Kho nhận *</Label>
                <Select defaultValue="WH-HCM">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((w) => (
                      <SelectItem key={w.id} value={w.code}>
                        {w.code} - {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea 
                  placeholder="Nhập ghi chú về lô hàng này..." 
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
                    variant="outline"
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setAddMode('search');
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Tìm & Thêm
                  </Button>
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: '#0057FF' }}
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setAddMode('bulk');
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm nhiều
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
                    Quét mã, tìm kiếm hoặc thêm sản phẩm để bắt đầu
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
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
                      onClick={() => {
                        setIsAddProductOpen(true);
                        setAddMode('search');
                      }}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Tìm kiếm
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>Đơn vị</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Quy đổi</TableHead>
                        <TableHead>Lot/Batch</TableHead>
                        <TableHead>HSD</TableHead>
                        <TableHead className="w-24"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProducts.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-gray-500">{index + 1}</TableCell>
                          <TableCell>
                            {editingIndex === index ? (
                              <div className="space-y-1">
                                <Input
                                  value={product.name}
                                  disabled
                                  className="font-medium"
                                />
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {product.code}
                                </code>
                              </div>
                            ) : (
                              <div>
                                <p style={{ fontWeight: '500' }}>{product.name}</p>
                                <p className="text-sm text-gray-500">{product.code}</p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingIndex === index ? (
                              <Select
                                value={product.selectedUnit}
                                onValueChange={(value) => updateProduct(index, 'selectedUnit', value)}
                              >
                                <SelectTrigger className="w-32">
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
                            ) : (
                              <Badge variant="outline">{product.selectedUnit}</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingIndex === index ? (
                              <Input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value || '0'))}
                                className="w-24"
                              />
                            ) : (
                              <span className="font-medium">{product.quantity}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="text-blue-600 font-medium">
                                {product.qtyInBase.toLocaleString()} {product.baseUnit}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {product.conversions.find((c: any) => c.unit === product.selectedUnit)?.label}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="LOT-XXXX"
                              className="w-28 text-sm"
                              value={product.lotNumber}
                              onChange={(e) => updateProduct(index, 'lotNumber', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="date"
                              className="w-36 text-sm"
                              value={product.expiryDate}
                              onChange={(e) => updateProduct(index, 'expiryDate', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {editingIndex === index ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingIndex(null)}
                                  className="text-green-600"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingIndex(index)}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => duplicateProduct(index)}
                                title="Nhân bản"
                              >
                                <Copy className="w-4 h-4" />
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Quick Summary */}
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
                      {totals.totalCases > 0 && (
                        <div>
                          <p className="text-sm text-gray-600">Tổng Cases</p>
                          <p className="text-lg font-semibold text-blue-900">{totals.totalCases}</p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => setIsAddProductOpen(true)}
                      style={{ backgroundColor: '#0057FF' }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm sản phẩm
                    </Button>
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
              <CardTitle>Tổng quan phiếu nhập</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Loại hình:</span>
                <Badge className={sourceTypes.find(t => t.id === selectedSource)?.color}>
                  {sourceTypes.find(t => t.id === selectedSource)?.label}
                </Badge>
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
              {totals.totalCases > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Tổng Cases:</span>
                  <span style={{ fontWeight: '600' }}>{totals.totalCases}</span>
                </div>
              )}
              {totals.totalPallets > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Tổng Pallets:</span>
                  <span style={{ fontWeight: '600' }}>{totals.totalPallets}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => {
                  setIsAddProductOpen(true);
                  setAddMode('scan');
                }}
              >
                <ScanBarcode className="w-4 h-4 mr-2" />
                Quét barcode
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <FileUp className="w-4 h-4 mr-2" />
                Import Excel
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Dùng template
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Hướng dẫn nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Quét mã:</strong> Thêm nhanh bằng barcode</li>
                <li>• <strong>Tìm kiếm:</strong> Tìm theo mã/tên sản phẩm</li>
                <li>• <strong>Inline edit:</strong> Click icon bút để sửa</li>
                <li>• <strong>Nhân bản:</strong> Copy nhanh sản phẩm</li>
                <li>• <strong>Excel:</strong> Import hàng loạt</li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg"
              style={{ backgroundColor: '#0057FF' }}
              disabled={selectedProducts.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu & Tạo phiếu nhập
            </Button>
            <Button variant="outline" className="w-full">
              <X className="w-4 h-4 mr-2" />
              Hủy bỏ
            </Button>
          </div>
        </div>
      </div>

      {/* Add Product Dialog - Multi-mode */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm vào phiếu nhập</DialogTitle>
          </DialogHeader>

          <Tabs value={addMode} onValueChange={(v) => setAddMode(v as any)} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scan">
                <ScanBarcode className="w-4 h-4 mr-2" />
                Quét mã
              </TabsTrigger>
              <TabsTrigger value="search">
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </TabsTrigger>
              <TabsTrigger value="bulk">
                <Package className="w-4 h-4 mr-2" />
                Thêm nhiều
              </TabsTrigger>
            </TabsList>

            {/* SCAN MODE */}
            <TabsContent value="scan" className="flex-1 overflow-auto">
              <div className="space-y-4 py-4">
                {/* Scanner UI */}
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
                  <div className="flex gap-2 mt-3">
                    <Button
                      className="flex-1"
                      style={{ backgroundColor: '#0057FF' }}
                      onClick={() => scanInput && handleScanAdd(scanInput)}
                    >
                      Thêm sản phẩm
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setScanInput('')}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>

                {/* Recent Products */}
                <div>
                  <h4 className="font-medium mb-3">Sản phẩm thường dùng</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {recentProducts.map((product) => (
                      <QuickProductCard
                        key={product.id}
                        product={product}
                        onAdd={handleQuickAdd}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SEARCH MODE */}
            <TabsContent value="search" className="flex-1 overflow-auto">
              <div className="space-y-4 py-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo mã, tên sản phẩm, barcode..."
                    className="pl-10 h-12"
                  />
                </div>

                {/* Search Results or All Products */}
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

            {/* BULK MODE */}
            <TabsContent value="bulk" className="flex-1 overflow-auto">
              <div className="space-y-4 py-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-900">
                    <strong>Chế độ thêm nhiều:</strong> Chọn nhiều sản phẩm và điền số lượng, sau đó nhấn "Thêm tất cả"
                  </p>
                </div>

                <BulkAddProducts
                  products={availableProducts}
                  onAddAll={(products) => {
                    products.forEach(p => handleQuickAdd(p.product, p.unit, p.quantity));
                    setIsAddProductOpen(false);
                  }}
                />
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
  const [selectedUnit, setSelectedUnit] = useState(product.conversions[1]?.unit || product.conversions[0].unit);
  const [quantity, setQuantity] = useState(1);

  const conversion = product.conversions.find((c: any) => c.unit === selectedUnit);

  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all">
      <div className="flex items-start gap-4">
        {/* Product Info */}
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
                <p className="text-sm text-gray-500">Tồn kho</p>
                <p className="font-semibold text-green-600">{product.currentStock}</p>
              </div>
            )}
          </div>
          
          {/* Quick Add Form */}
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
                <span className="text-sm font-medium text-blue-600">
                  = {(quantity * (conversion?.rate || 1)).toLocaleString()} {product.baseUnit}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                onAdd(product, selectedUnit, quantity);
                setQuantity(1);
              }}
              style={{ backgroundColor: '#0057FF' }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bulk Add Component
function BulkAddProducts({ products, onAddAll }: any) {
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const toggleProduct = (product: any) => {
    const exists = selectedProducts.find(p => p.product.id === product.id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter(p => p.product.id !== product.id));
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          product,
          unit: product.conversions[1]?.unit || product.conversions[0].unit,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map(p =>
        p.product.id === productId ? { ...p, quantity } : p
      )
    );
  };

  const updateUnit = (productId: number, unit: string) => {
    setSelectedProducts(
      selectedProducts.map(p =>
        p.product.id === productId ? { ...p, unit } : p
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Product Selection */}
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {products.map((product: any) => {
          const isSelected = selectedProducts.find(p => p.product.id === product.id);
          const selectedData = selectedProducts.find(p => p.product.id === product.id);

          return (
            <div
              key={product.id}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
              }`}
              onClick={() => toggleProduct(product)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!isSelected}
                  onChange={() => {}}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.code}</p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                      type="number"
                      value={selectedData.quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                      className="w-20 h-8"
                      min="1"
                    />
                    <Select
                      value={selectedData.unit}
                      onValueChange={(value) => updateUnit(product.id, value)}
                    >
                      <SelectTrigger className="w-24 h-8">
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
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {selectedProducts.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã chọn {selectedProducts.length} sản phẩm</p>
              <p className="text-xs text-gray-500 mt-1">
                Tổng:{' '}
                {selectedProducts
                  .reduce((sum, p) => {
                    const conv = p.product.conversions.find((c: any) => c.unit === p.unit);
                    return sum + p.quantity * (conv?.rate || 1);
                  }, 0)
                  .toLocaleString()}{' '}
                PCS
              </p>
            </div>
            <Button
              onClick={() => {
                onAddAll(selectedProducts);
                setSelectedProducts([]);
              }}
              style={{ backgroundColor: '#0057FF' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm tất cả ({selectedProducts.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, MapPin, Grid3x3, Save, Maximize2, Box, Move, Grab, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Resizable } from 're-resizable';

interface Zone {
  id: string;
  name: string;
  type: 'aisle' | 'rack' | 'bin' | 'staging' | 'loading';
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  capacity: number;
  occupied: number;
  color: string;
}

export function WarehouseLocations() {
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [isLayoutDesignerOpen, setIsLayoutDesignerOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 30 });
  const [zones, setZones] = useState<Zone[]>([
    { id: 'z1', name: 'A-01', type: 'rack', row: 2, col: 2, rowSpan: 3, colSpan: 4, capacity: 120, occupied: 85, color: '#0057FF' },
    { id: 'z2', name: 'A-02', type: 'rack', row: 2, col: 7, rowSpan: 3, colSpan: 4, capacity: 120, occupied: 92, color: '#0057FF' },
    { id: 'z3', name: 'B-01', type: 'rack', row: 6, col: 2, rowSpan: 3, colSpan: 4, capacity: 120, occupied: 67, color: '#10B981' },
    { id: 'z4', name: 'B-02', type: 'rack', row: 6, col: 7, rowSpan: 3, colSpan: 4, capacity: 120, occupied: 103, color: '#10B981' },
    { id: 'z5', name: 'Loading', type: 'loading', row: 10, col: 2, rowSpan: 2, colSpan: 9, capacity: 50, occupied: 12, color: '#F59E0B' },
    { id: 'z6', name: 'Staging', type: 'staging', row: 13, col: 2, rowSpan: 2, colSpan: 5, capacity: 40, occupied: 23, color: '#8B5CF6' },
  ]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [draggedZone, setDraggedZone] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom percentage
  const cellSize = Math.round((30 * zoomLevel) / 100); // Size of each grid cell in pixels based on zoom
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Add native wheel event listener for better ctrl+wheel handling
  useEffect(() => {
    const gridElement = gridContainerRef.current;
    if (!gridElement) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const zoomStep = 25;
      
      if (delta < 0) {
        // Scroll up = Zoom in
        setZoomLevel(prev => Math.min(200, prev + zoomStep));
      } else {
        // Scroll down = Zoom out
        setZoomLevel(prev => Math.max(25, prev - zoomStep));
      }
    };

    gridElement.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      gridElement.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  const warehouses = [
    {
      id: 1,
      code: 'WH-A',
      name: 'Kho A - Hà Nội',
      address: '123 Đường Láng, Đống Đa, Hà Nội',
      manager: 'Nguyễn Văn A',
      phone: '024 1234 5678',
      status: 'Hoạt động',
      totalArea: 10000,
      usedArea: 7500,
      palletCapacity: 2000,
      palletUsed: 1500,
      volumeCapacity: 15000,
      volumeUsed: 11250,
      skuLimit: 5000,
      skuCount: 3200,
      zones: 45,
      activeOrders: 23,
    },
    {
      id: 2,
      code: 'WH-B',
      name: 'Kho B - TP.HCM',
      address: '456 Quốc lộ 1A, Bình Chánh, TP.HCM',
      manager: 'Trần Thị B',
      phone: '028 9876 5432',
      status: 'Hoạt động',
      totalArea: 15000,
      usedArea: 9300,
      palletCapacity: 3000,
      palletUsed: 1860,
      volumeCapacity: 22500,
      volumeUsed: 13950,
      skuLimit: 8000,
      skuCount: 4800,
      zones: 68,
      activeOrders: 34,
    },
    {
      id: 3,
      code: 'WH-C',
      name: 'Kho C - Đà Nẵng',
      address: '789 Đường 2/9, Hải Châu, Đà Nẵng',
      manager: 'Lê Văn C',
      phone: '0236 3456 789',
      status: 'Bảo trì',
      totalArea: 8000,
      usedArea: 3600,
      palletCapacity: 1500,
      palletUsed: 675,
      volumeCapacity: 12000,
      volumeUsed: 5400,
      skuLimit: 4000,
      skuCount: 1800,
      zones: 32,
      activeOrders: 8,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hoạt động':
        return 'bg-green-100 text-green-800';
      case 'Bảo trì':
        return 'bg-orange-100 text-orange-800';
      case 'Tạm ngưng':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getZoneTypeLabel = (type: string) => {
    const labels: any = {
      aisle: 'Lối đi',
      rack: 'Kệ hàng',
      bin: 'Bin',
      staging: 'Khu tập kết',
      loading: 'Bãi bốc dỡ',
    };
    return labels[type] || type;
  };

  const openLayoutDesigner = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setIsLayoutDesignerOpen(true);
  };

  const handleAddZone = () => {
    const newZone: Zone = {
      id: `z${zones.length + 1}`,
      name: `Zone-${zones.length + 1}`,
      type: 'rack',
      row: 1,
      col: 1,
      rowSpan: 2,
      colSpan: 3,
      capacity: 100,
      occupied: 0,
      color: '#0057FF',
    };
    setZones([...zones, newZone]);
    setSelectedZone(newZone.id);
    setIsAddingZone(false);
  };

  const handleDeleteZone = (zoneId: string) => {
    setZones(zones.filter(z => z.id !== zoneId));
    if (selectedZone === zoneId) {
      setSelectedZone(null);
    }
  };

  const updateZone = (zoneId: string, updates: Partial<Zone>) => {
    setZones(zones.map(z => z.id === zoneId ? { ...z, ...updates } : z));
  };

  const handleZoneDragStart = (e: React.DragEvent, zone: Zone) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('zoneId', zone.id);
    setDraggedZone(zone.id);
  };

  const handleGridCellDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    const zoneId = e.dataTransfer.getData('zoneId');
    if (zoneId) {
      updateZone(zoneId, { row, col });
    }
    setDraggedZone(null);
  };

  const handleGridCellDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Quản lý kho & vị trí</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Quản lý thông tin kho bãi và bố trí vị trí lưu kho
          </p>
        </div>
        <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm kho mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Thêm kho mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mã kho *</Label>
                  <Input placeholder="WH-D" />
                </div>
                <div className="space-y-2">
                  <Label>Tên kho *</Label>
                  <Input placeholder="Kho D - Thành phố" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Địa chỉ *</Label>
                <Textarea placeholder="Nhập địa chỉ chi tiết..." rows={2} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Người quản lý</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn người quản lý" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager1">Nguyễn Văn A</SelectItem>
                      <SelectItem value="manager2">Trần Thị B</SelectItem>
                      <SelectItem value="manager3">Lê Văn C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input placeholder="024 1234 5678" />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: '500' }}>
                  Thông số công suất
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diện tích (m²)</Label>
                    <Input type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Thể tích (m³)</Label>
                    <Input type="number" placeholder="15000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số pallet tối đa</Label>
                    <Input type="number" placeholder="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Số SKU tối đa</Label>
                    <Input type="number" placeholder="5000" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea placeholder="Nhập ghi chú..." rows={3} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddWarehouseOpen(false)}>
                  Hủy
                </Button>
                <Button style={{ backgroundColor: '#0057FF' }}>
                  Thêm kho
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <Card key={warehouse.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-1">{warehouse.name}</CardTitle>
                  <p className="text-gray-500" style={{ fontSize: '12px' }}>
                    {warehouse.code}
                  </p>
                </div>
                <Badge className={getStatusColor(warehouse.status)} variant="secondary">
                  {warehouse.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Area */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600" style={{ fontSize: '13px' }}>
                      Diện tích (m²)
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>
                      {warehouse.usedArea.toLocaleString()} / {warehouse.totalArea.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(warehouse.usedArea / warehouse.totalArea) * 100}%`,
                        backgroundColor: '#0057FF',
                      }}
                    />
                  </div>
                </div>

                {/* Pallets */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600" style={{ fontSize: '13px' }}>
                      Pallet
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>
                      {warehouse.palletUsed.toLocaleString()} / {warehouse.palletCapacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(warehouse.palletUsed / warehouse.palletCapacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600" style={{ fontSize: '13px' }}>
                      Thể tích (m³)
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>
                      {warehouse.volumeUsed.toLocaleString()} / {warehouse.volumeCapacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(warehouse.volumeUsed / warehouse.volumeCapacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600" style={{ fontSize: '13px' }}>
                      SKU
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>
                      {warehouse.skuCount.toLocaleString()} / {warehouse.skuLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(warehouse.skuCount / warehouse.skuLimit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500" style={{ fontSize: '12px' }}>Zones</p>
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>{warehouse.zones}</p>
                </div>
                <div>
                  <p className="text-gray-500" style={{ fontSize: '12px' }}>Đơn hàng</p>
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>{warehouse.activeOrders}</p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="sm"
                  onClick={() => openLayoutDesigner(warehouse)}
                >
                  <Grid3x3 className="w-4 h-4 mr-1" />
                  Bố trí vị trí
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách kho</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã kho</TableHead>
                <TableHead>Tên kho</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Người quản lý</TableHead>
                <TableHead>Diện tích</TableHead>
                <TableHead>Công suất</TableHead>
                <TableHead>Zones</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell>
                    <span className="text-blue-600" style={{ fontWeight: '500' }}>
                      {warehouse.code}
                    </span>
                  </TableCell>
                  <TableCell style={{ fontWeight: '500' }}>{warehouse.name}</TableCell>
                  <TableCell className="text-gray-600">{warehouse.address}</TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontSize: '13px' }}>{warehouse.manager}</p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        {warehouse.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                        {warehouse.totalArea.toLocaleString()} m²
                      </p>
                      <p className="text-gray-500" style={{ fontSize: '12px' }}>
                        Dùng: {((warehouse.usedArea / warehouse.totalArea) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p style={{ fontSize: '12px' }}>
                        🎯 {warehouse.palletUsed}/{warehouse.palletCapacity} pallet
                      </p>
                      <p style={{ fontSize: '12px' }}>
                        📦 {warehouse.skuCount}/{warehouse.skuLimit} SKU
                      </p>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: '500' }}>{warehouse.zones}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(warehouse.status)} variant="secondary">
                      {warehouse.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openLayoutDesigner(warehouse)}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Location Layout Designer Modal */}
      <Dialog open={isLayoutDesignerOpen} onOpenChange={setIsLayoutDesignerOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] overflow-hidden p-0 flex flex-col" aria-describedby={undefined}>
          <DialogHeader className="pb-2 px-4 pt-4">
            <DialogTitle>
              Bố trí vị trí kho - {selectedWarehouse?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-4 flex-1 overflow-hidden px-4">
            {/* Toggle Sidebar Button */}
            {!isSidebarOpen && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="absolute left-6 top-16 z-10 shadow-lg"
                title="Hiện danh sách zones"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {/* Left Sidebar - Zone List (Collapsible) */}
            {isSidebarOpen && (
              <div className="w-64 border-r pr-4 overflow-y-auto flex-shrink-0 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Danh sách zones ({zones.length})</h3>
                    <div className="flex gap-1">
                      <Button size="sm" onClick={handleAddZone} style={{ backgroundColor: '#0057FF' }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSidebarOpen(false)}
                        title="Ẩn sidebar"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {zones.map((zone) => (
                      <div
                        key={zone.id}
                        className={`p-2 border rounded-lg cursor-pointer transition-all ${
                          selectedZone === zone.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedZone(zone.id)}
                        draggable
                        onDragStart={(e) => handleZoneDragStart(e, zone)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: zone.color }}
                            />
                            <span style={{ fontSize: '13px', fontWeight: '500' }}>{zone.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteZone(zone.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-gray-600">
                          <span style={{ fontSize: '11px' }}>{getZoneTypeLabel(zone.type)}</span>
                          <span style={{ fontSize: '11px' }}>
                            {zone.occupied}/{zone.capacity}
                          </span>
                        </div>
                        <div className="mt-1.5 w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="h-1 rounded-full"
                            style={{
                              width: `${(zone.occupied / zone.capacity) * 100}%`,
                              backgroundColor: zone.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Floating Zone Editor Panel */}
            {selectedZone && (() => {
              const zone = zones.find(z => z.id === selectedZone);
              if (!zone) return null;
              return (
                <div
                  className="absolute right-6 top-16 z-20 w-72 bg-white border-2 border-blue-500 rounded-lg shadow-2xl p-4"
                  style={{ maxHeight: 'calc(85vh - 100px)', overflowY: 'auto' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: '14px', fontWeight: '600' }}>
                      Chỉnh sửa: {zone.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setSelectedZone(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label style={{ fontSize: '12px' }}>Tên zone</Label>
                      <Input
                        value={zone.name}
                        onChange={(e) => updateZone(zone.id, { name: e.target.value })}
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label style={{ fontSize: '12px' }}>Loại zone</Label>
                      <Select
                        value={zone.type}
                        onValueChange={(value: any) => updateZone(zone.id, { type: value })}
                      >
                        <SelectTrigger style={{ fontSize: '13px' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rack">Kệ hàng</SelectItem>
                          <SelectItem value="aisle">Lối đi</SelectItem>
                          <SelectItem value="bin">Bin</SelectItem>
                          <SelectItem value="staging">Khu tập kết</SelectItem>
                          <SelectItem value="loading">Bãi bốc dỡ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label style={{ fontSize: '12px' }}>Vị trí (R×C)</Label>
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            value={zone.row}
                            onChange={(e) => updateZone(zone.id, { row: parseInt(e.target.value) })}
                            style={{ fontSize: '12px' }}
                            className="w-full"
                          />
                          <Input
                            type="number"
                            value={zone.col}
                            onChange={(e) => updateZone(zone.id, { col: parseInt(e.target.value) })}
                            style={{ fontSize: '12px' }}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label style={{ fontSize: '12px' }}>Kích thước</Label>
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            value={zone.rowSpan}
                            onChange={(e) => updateZone(zone.id, { rowSpan: parseInt(e.target.value) })}
                            style={{ fontSize: '12px' }}
                            className="w-full"
                          />
                          <Input
                            type="number"
                            value={zone.colSpan}
                            onChange={(e) => updateZone(zone.id, { colSpan: parseInt(e.target.value) })}
                            style={{ fontSize: '12px' }}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label style={{ fontSize: '12px' }}>Công suất</Label>
                      <Input
                        type="number"
                        value={zone.capacity}
                        onChange={(e) => updateZone(zone.id, { capacity: parseInt(e.target.value) })}
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label style={{ fontSize: '12px' }}>Màu sắc</Label>
                      <div className="flex gap-2 flex-wrap">
                        {['#0057FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'].map((color) => (
                          <button
                            key={color}
                            className={`w-7 h-7 rounded border-2 ${
                              zone.color === color ? 'border-gray-900' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => updateZone(zone.id, { color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Main Grid Area */}
            <div className="flex-1 overflow-auto">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label style={{ fontSize: '13px' }}>Lưới:</Label>
                    <Input
                      type="number"
                      value={gridSize.rows}
                      onChange={(e) => setGridSize({ ...gridSize, rows: parseInt(e.target.value) || 20 })}
                      className="w-16"
                      style={{ fontSize: '13px' }}
                    />
                    <span>×</span>
                    <Input
                      type="number"
                      value={gridSize.cols}
                      onChange={(e) => setGridSize({ ...gridSize, cols: parseInt(e.target.value) || 30 })}
                      className="w-16"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2 border-l pl-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
                      disabled={zoomLevel <= 25}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <input
                        type="range"
                        min="25"
                        max="200"
                        step="25"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                        className="w-full"
                        style={{ accentColor: '#0057FF' }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: '500', minWidth: '45px' }}>
                        {zoomLevel}%
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                      disabled={zoomLevel >= 200}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel(100)}
                      title="Reset zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <Badge variant="outline">
                    <Maximize2 className="w-3 h-3 mr-1" />
                    {selectedWarehouse?.totalArea.toLocaleString()} m²
                  </Badge>
                </div>
              </div>

              {/* Grid Layout */}
              <div className="border-2 rounded-lg p-4 bg-gray-50 inline-block">
                <div
                  className="relative bg-white p-2 rounded"
                  style={{
                    width: `${gridSize.cols * cellSize}px`,
                    height: `${gridSize.rows * cellSize}px`,
                    backgroundImage: `
                      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                    `,
                    backgroundSize: `${cellSize}px ${cellSize}px`,
                  }}
                  ref={gridContainerRef}
                >
                  {/* Render zones as draggable and resizable elements */}
                  {zones.map((zone) => (
                    <Resizable
                      key={zone.id}
                      size={{
                        width: zone.colSpan * cellSize,
                        height: zone.rowSpan * cellSize,
                      }}
                      onResizeStop={(e, direction, ref, d) => {
                        const newColSpan = Math.round((zone.colSpan * cellSize + d.width) / cellSize);
                        const newRowSpan = Math.round((zone.rowSpan * cellSize + d.height) / cellSize);
                        updateZone(zone.id, {
                          colSpan: Math.max(1, newColSpan),
                          rowSpan: Math.max(1, newRowSpan),
                        });
                      }}
                      grid={[cellSize, cellSize]}
                      minWidth={cellSize}
                      minHeight={cellSize}
                      maxWidth={gridSize.cols * cellSize}
                      maxHeight={gridSize.rows * cellSize}
                      enable={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true,
                      }}
                      style={{
                        position: 'absolute',
                        left: `${zone.col * cellSize}px`,
                        top: `${zone.row * cellSize}px`,
                      }}
                      handleStyles={{
                        top: { cursor: 'ns-resize' },
                        right: { cursor: 'ew-resize' },
                        bottom: { cursor: 'ns-resize' },
                        left: { cursor: 'ew-resize' },
                        topRight: { cursor: 'nesw-resize' },
                        bottomRight: { cursor: 'nwse-resize' },
                        bottomLeft: { cursor: 'nesw-resize' },
                        topLeft: { cursor: 'nwse-resize' },
                      }}
                    >
                      <div
                        className={`h-full w-full border-2 rounded cursor-move flex items-center justify-center transition-all ${
                          selectedZone === zone.id
                            ? 'border-blue-600 shadow-lg'
                            : 'border-gray-400 hover:border-blue-400'
                        }`}
                        style={{
                          backgroundColor: `${zone.color}30`,
                        }}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = 'move';
                          e.dataTransfer.setData('zoneId', zone.id);
                          setDraggedZone(zone.id);
                        }}
                        onDragEnd={() => setDraggedZone(null)}
                        onDrag={(e) => {
                          if (e.clientX === 0 && e.clientY === 0) return; // Ignore final drag event
                          
                          const gridRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
                          if (!gridRect) return;

                          const relativeX = e.clientX - gridRect.left;
                          const relativeY = e.clientY - gridRect.top;

                          const newCol = Math.max(0, Math.min(gridSize.cols - zone.colSpan, Math.floor(relativeX / cellSize)));
                          const newRow = Math.max(0, Math.min(gridSize.rows - zone.rowSpan, Math.floor(relativeY / cellSize)));

                          if (newCol !== zone.col || newRow !== zone.row) {
                            updateZone(zone.id, { col: newCol, row: newRow });
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedZone(zone.id);
                        }}
                      >
                        <div className="text-center pointer-events-none select-none">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Grab className="w-3 h-3" style={{ color: zone.color }} />
                            <div
                              style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                color: zone.color,
                              }}
                            >
                              {zone.name}
                            </div>
                          </div>
                          <div style={{ fontSize: '9px', color: '#666' }}>
                            {zone.occupied}/{zone.capacity}
                          </div>
                          <div style={{ fontSize: '8px', color: '#999', marginTop: '2px' }}>
                            {zone.colSpan}×{zone.rowSpan}
                          </div>
                        </div>
                      </div>
                    </Resizable>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0057FF' }} />
                  <span style={{ fontSize: '12px' }}>Kệ hàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '12px' }}>Bin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
                  <span style={{ fontSize: '12px' }}>Bãi bốc dỡ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8B5CF6' }} />
                  <span style={{ fontSize: '12px' }}>Khu tập kết</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fixed Footer */}
          <div className="flex justify-end items-center px-4 py-3 border-t bg-white">
            <Button style={{ backgroundColor: '#0057FF' }}>
              <Save className="w-4 h-4 mr-2" />
              Lưu bố trí
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
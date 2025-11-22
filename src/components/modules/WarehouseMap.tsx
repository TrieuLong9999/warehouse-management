import React, { useState } from 'react';
import { MapPin, Search, Filter, Maximize2, ZoomIn, ZoomOut, Info, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Location {
  id: string;
  code: string;
  zone: string;
  row: number;
  col: number;
  status: 'empty' | 'occupied' | 'hold' | 'blocked';
  sku?: string;
  productName?: string;
  quantity?: number;
  unit?: string;
  lastUpdated?: string;
  capacity?: number;
  occupancy?: number;
}

export function WarehouseMap() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('wh-a');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock warehouse data
  const locations: Location[] = [
    // Zone A - Racks
    { id: 'a-01-01', code: 'A-01-A-01', zone: 'A', row: 2, col: 2, status: 'occupied', sku: 'SKU-12345', productName: 'Sản phẩm A', quantity: 120, unit: 'Thùng', lastUpdated: '21/11/2024 14:30', capacity: 150, occupancy: 80 },
    { id: 'a-01-02', code: 'A-01-A-02', zone: 'A', row: 2, col: 3, status: 'occupied', sku: 'SKU-12346', productName: 'Sản phẩm B', quantity: 95, unit: 'Kiện', lastUpdated: '21/11/2024 13:20', capacity: 150, occupancy: 63 },
    { id: 'a-01-03', code: 'A-01-A-03', zone: 'A', row: 2, col: 4, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-01-04', code: 'A-01-A-04', zone: 'A', row: 2, col: 5, status: 'occupied', sku: 'SKU-12347', productName: 'Sản phẩm C', quantity: 145, unit: 'Thùng', lastUpdated: '21/11/2024 10:15', capacity: 150, occupancy: 97 },
    
    { id: 'a-02-01', code: 'A-02-A-01', zone: 'A', row: 3, col: 2, status: 'hold', sku: 'SKU-12348', productName: 'Sản phẩm D', quantity: 80, unit: 'Pallet', lastUpdated: '20/11/2024 16:45', capacity: 150, occupancy: 53 },
    { id: 'a-02-02', code: 'A-02-A-02', zone: 'A', row: 3, col: 3, status: 'occupied', sku: 'SKU-12349', productName: 'Sản phẩm E', quantity: 110, unit: 'Kiện', lastUpdated: '21/11/2024 09:30', capacity: 150, occupancy: 73 },
    { id: 'a-02-03', code: 'A-02-A-03', zone: 'A', row: 3, col: 4, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-02-04', code: 'A-02-A-04', zone: 'A', row: 3, col: 5, status: 'blocked', capacity: 150, occupancy: 0 },

    { id: 'a-03-01', code: 'A-03-A-01', zone: 'A', row: 4, col: 2, status: 'occupied', sku: 'SKU-12350', productName: 'Sản phẩm F', quantity: 130, unit: 'Thùng', lastUpdated: '21/11/2024 11:00', capacity: 150, occupancy: 87 },
    { id: 'a-03-02', code: 'A-03-A-02', zone: 'A', row: 4, col: 3, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-03-03', code: 'A-03-A-03', zone: 'A', row: 4, col: 4, status: 'occupied', sku: 'SKU-12351', productName: 'Sản phẩm G', quantity: 75, unit: 'Pallet', lastUpdated: '20/11/2024 15:20', capacity: 150, occupancy: 50 },
    { id: 'a-03-04', code: 'A-03-A-04', zone: 'A', row: 4, col: 5, status: 'occupied', sku: 'SKU-12352', productName: 'Sản phẩm H', quantity: 140, unit: 'Kiện', lastUpdated: '21/11/2024 12:45', capacity: 150, occupancy: 93 },

    // Zone B - Racks
    { id: 'b-01-01', code: 'B-01-A-01', zone: 'B', row: 2, col: 7, status: 'occupied', sku: 'SKU-22345', productName: 'Sản phẩm I', quantity: 100, unit: 'Thùng', lastUpdated: '21/11/2024 08:15', capacity: 150, occupancy: 67 },
    { id: 'b-01-02', code: 'B-01-A-02', zone: 'B', row: 2, col: 8, status: 'occupied', sku: 'SKU-22346', productName: 'Sản phẩm J', quantity: 125, unit: 'Kiện', lastUpdated: '21/11/2024 14:00', capacity: 150, occupancy: 83 },
    { id: 'b-01-03', code: 'B-01-A-03', zone: 'B', row: 2, col: 9, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'b-01-04', code: 'B-01-A-04', zone: 'B', row: 2, col: 10, status: 'occupied', sku: 'SKU-22347', productName: 'Sản phẩm K', quantity: 90, unit: 'Pallet', lastUpdated: '21/11/2024 10:30', capacity: 150, occupancy: 60 },

    { id: 'b-02-01', code: 'B-02-A-01', zone: 'B', row: 3, col: 7, status: 'occupied', sku: 'SKU-22348', productName: 'Sản phẩm L', quantity: 115, unit: 'Thùng', lastUpdated: '21/11/2024 13:15', capacity: 150, occupancy: 77 },
    { id: 'b-02-02', code: 'B-02-A-02', zone: 'B', row: 3, col: 8, status: 'hold', sku: 'SKU-22349', productName: 'Sản phẩm M', quantity: 70, unit: 'Kiện', lastUpdated: '20/11/2024 17:00', capacity: 150, occupancy: 47 },
    { id: 'b-02-03', code: 'B-02-A-03', zone: 'B', row: 3, col: 9, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'b-02-04', code: 'B-02-A-04', zone: 'B', row: 3, col: 10, status: 'occupied', sku: 'SKU-22350', productName: 'Sản phẩm N', quantity: 135, unit: 'Pallet', lastUpdated: '21/11/2024 09:45', capacity: 150, occupancy: 90 },

    { id: 'b-03-01', code: 'B-03-A-01', zone: 'B', row: 4, col: 7, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'b-03-02', code: 'B-03-A-02', zone: 'B', row: 4, col: 8, status: 'occupied', sku: 'SKU-22351', productName: 'Sản phẩm O', quantity: 105, unit: 'Thùng', lastUpdated: '21/11/2024 11:30', capacity: 150, occupancy: 70 },
    { id: 'b-03-03', code: 'B-03-A-03', zone: 'B', row: 4, col: 9, status: 'blocked', capacity: 150, occupancy: 0 },
    { id: 'b-03-04', code: 'B-03-A-04', zone: 'B', row: 4, col: 10, status: 'occupied', sku: 'SKU-22352', productName: 'Sản phẩm P', quantity: 95, unit: 'Kiện', lastUpdated: '21/11/2024 15:00', capacity: 150, occupancy: 63 },

    // Staging Area
    { id: 'staging-01', code: 'STG-01', zone: 'Staging', row: 6, col: 2, status: 'occupied', sku: 'SKU-99001', productName: 'Hàng chờ xuất', quantity: 45, unit: 'Thùng', lastUpdated: '21/11/2024 15:30', capacity: 100, occupancy: 45 },
    { id: 'staging-02', code: 'STG-02', zone: 'Staging', row: 6, col: 3, status: 'occupied', sku: 'SKU-99002', productName: 'Hàng chờ xuất', quantity: 38, unit: 'Kiện', lastUpdated: '21/11/2024 15:25', capacity: 100, occupancy: 38 },
    { id: 'staging-03', code: 'STG-03', zone: 'Staging', row: 6, col: 4, status: 'empty', capacity: 100, occupancy: 0 },
    { id: 'staging-04', code: 'STG-04', zone: 'Staging', row: 6, col: 5, status: 'empty', capacity: 100, occupancy: 0 },

    // Loading Dock
    { id: 'dock-01', code: 'DOCK-01', zone: 'Loading', row: 8, col: 2, status: 'occupied', sku: 'OUT-2024-123', productName: 'Đơn hàng đang tải', quantity: 200, unit: 'Thùng', lastUpdated: '21/11/2024 16:00', capacity: 500, occupancy: 40 },
    { id: 'dock-02', code: 'DOCK-02', zone: 'Loading', row: 8, col: 4, status: 'empty', capacity: 500, occupancy: 0 },
    { id: 'dock-03', code: 'DOCK-03', zone: 'Loading', row: 8, col: 6, status: 'occupied', sku: 'IN-2024-456', productName: 'Hàng đang nhập', quantity: 180, unit: 'Kiện', lastUpdated: '21/11/2024 16:15', capacity: 500, occupancy: 36 },
  ];

  const getLocationColor = (status: string) => {
    switch (status) {
      case 'empty':
        return '#E5E7EB'; // Gray
      case 'occupied':
        return '#10B981'; // Green
      case 'hold':
        return '#F59E0B'; // Orange
      case 'blocked':
        return '#EF4444'; // Red
      default:
        return '#E5E7EB';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'empty':
        return 'Trống';
      case 'occupied':
        return 'Đang sử dụng';
      case 'hold':
        return 'Tạm giữ';
      case 'blocked':
        return 'Bị chặn';
      default:
        return status;
    }
  };

  const filteredLocations = locations.filter(loc => {
    const matchesStatus = filterStatus === 'all' || loc.status === filterStatus;
    const matchesSearch = !searchQuery || 
      loc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.productName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: locations.length,
    empty: locations.filter(l => l.status === 'empty').length,
    occupied: locations.filter(l => l.status === 'occupied').length,
    hold: locations.filter(l => l.status === 'hold').length,
    blocked: locations.filter(l => l.status === 'blocked').length,
  };

  const gridRows = 10;
  const gridCols = 12;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Sơ đồ bố trí kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Xem trực quan vị trí và trạng thái lưu kho
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wh-a">Kho A - Hà Nội</SelectItem>
              <SelectItem value="wh-b">Kho B - TP.HCM</SelectItem>
              <SelectItem value="wh-c">Kho C - Đà Nẵng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Tổng vị trí
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.total}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Trống
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.empty}
                </p>
              </div>
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#E5E7EB' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Đang sử dụng
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.occupied}
                </p>
              </div>
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#10B981' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Tạm giữ
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.hold}
                </p>
              </div>
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#F59E0B' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Bị chặn
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.blocked}
                </p>
              </div>
              <div className="w-8 h-8 rounded" style={{ backgroundColor: '#EF4444' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo mã vị trí, SKU, sản phẩm..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="empty">Trống</SelectItem>
                <SelectItem value="occupied">Đang sử dụng</SelectItem>
                <SelectItem value="hold">Tạm giữ</SelectItem>
                <SelectItem value="blocked">Bị chặn</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 border-l pl-4">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.6))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sơ đồ kho - {selectedWarehouse === 'wh-a' ? 'Kho A - Hà Nội' : selectedWarehouse === 'wh-b' ? 'Kho B - TP.HCM' : 'Kho C - Đà Nẵng'}</span>
              <Badge variant="outline">
                <Info className="w-3 h-3 mr-1" />
                Di chuột để xem chi tiết
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto bg-gray-50 p-6 rounded-lg" style={{ maxHeight: '600px' }}>
              <div
                className="inline-block"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              >
                {/* Zone Labels */}
                <div className="mb-4 flex gap-4">
                  <Badge className="bg-blue-100 text-blue-800">Zone A - Kệ hàng chính</Badge>
                  <Badge className="bg-green-100 text-green-800">Zone B - Kệ hàng phụ</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Khu tập kết</Badge>
                  <Badge className="bg-orange-100 text-orange-800">Bãi bốc dỡ</Badge>
                </div>

                {/* Grid */}
                <div
                  className="grid gap-1 bg-white p-4 rounded-lg border-2 border-gray-200"
                  style={{
                    gridTemplateColumns: `repeat(${gridCols}, 60px)`,
                    gridTemplateRows: `repeat(${gridRows}, 60px)`,
                  }}
                >
                  {Array.from({ length: gridRows * gridCols }).map((_, idx) => {
                    const row = Math.floor(idx / gridCols);
                    const col = idx % gridCols;

                    const location = filteredLocations.find(
                      l => l.row === row && l.col === col
                    );

                    if (!location) {
                      return (
                        <div
                          key={idx}
                          className="border border-gray-100 bg-gray-50"
                        />
                      );
                    }

                    const isHovered = hoveredLocation?.id === location.id;
                    const isSelected = selectedLocation?.id === location.id;

                    return (
                      <div
                        key={location.id}
                        className="relative border-2 cursor-pointer transition-all rounded"
                        style={{
                          backgroundColor: getLocationColor(location.status),
                          borderColor: isSelected ? '#0057FF' : isHovered ? '#60A5FA' : 'transparent',
                          boxShadow: isHovered || isSelected ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
                        }}
                        onMouseEnter={() => setHoveredLocation(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                          <div
                            className="text-center overflow-hidden"
                            style={{
                              fontSize: '9px',
                              fontWeight: '600',
                              color: location.status === 'empty' ? '#6B7280' : '#FFFFFF',
                            }}
                          >
                            {location.code}
                          </div>
                          {location.status === 'occupied' && (
                            <Package
                              className="mt-1"
                              style={{
                                width: '16px',
                                height: '16px',
                                color: '#FFFFFF',
                              }}
                            />
                          )}
                          {location.occupancy && location.occupancy > 0 && (
                            <div
                              style={{
                                fontSize: '8px',
                                color: location.status === 'empty' ? '#6B7280' : '#FFFFFF',
                                marginTop: '2px',
                              }}
                            >
                              {location.occupancy}%
                            </div>
                          )}
                        </div>

                        {/* Tooltip */}
                        {isHovered && (
                          <div
                            className="absolute z-50 bg-white border-2 rounded-lg shadow-xl p-3 pointer-events-none"
                            style={{
                              left: '70px',
                              top: '0',
                              width: '280px',
                              borderColor: '#0057FF',
                            }}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between pb-2 border-b">
                                <span style={{ fontSize: '14px', fontWeight: '600' }}>
                                  {location.code}
                                </span>
                                <Badge
                                  variant="secondary"
                                  style={{
                                    backgroundColor: `${getLocationColor(location.status)}20`,
                                    color: getLocationColor(location.status),
                                  }}
                                >
                                  {getStatusLabel(location.status)}
                                </Badge>
                              </div>

                              {location.status === 'occupied' && location.sku && (
                                <>
                                  <div>
                                    <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                      SKU
                                    </p>
                                    <p style={{ fontSize: '13px', fontWeight: '500' }}>
                                      {location.sku}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                      Sản phẩm
                                    </p>
                                    <p style={{ fontSize: '13px', fontWeight: '500' }}>
                                      {location.productName}
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                        Số lượng
                                      </p>
                                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                                        {location.quantity} {location.unit}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                        Công suất
                                      </p>
                                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                                        {location.occupancy}%
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                      Cập nhật
                                    </p>
                                    <p style={{ fontSize: '12px' }}>
                                      {location.lastUpdated}
                                    </p>
                                  </div>
                                </>
                              )}

                              {location.status === 'empty' && (
                                <div>
                                  <p className="text-gray-500" style={{ fontSize: '12px' }}>
                                    Vị trí trống - Sẵn sàng lưu kho
                                  </p>
                                  <p style={{ fontSize: '12px' }}>
                                    Công suất: {location.capacity} đơn vị
                                  </p>
                                </div>
                              )}

                              {location.status === 'hold' && (
                                <div>
                                  <p className="text-orange-600" style={{ fontSize: '12px', fontWeight: '500' }}>
                                    ⚠️ Vị trí đang tạm giữ
                                  </p>
                                  {location.productName && (
                                    <p style={{ fontSize: '12px' }}>
                                      {location.productName} - {location.quantity} {location.unit}
                                    </p>
                                  )}
                                </div>
                              )}

                              {location.status === 'blocked' && (
                                <div>
                                  <p className="text-red-600" style={{ fontSize: '12px', fontWeight: '500' }}>
                                    🚫 Vị trí bị chặn
                                  </p>
                                  <p className="text-gray-500" style={{ fontSize: '11px' }}>
                                    Không thể sử dụng
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E5E7EB' }} />
                    <span style={{ fontSize: '12px' }}>Trống</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }} />
                    <span style={{ fontSize: '12px' }}>Đang sử dụng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }} />
                    <span style={{ fontSize: '12px' }}>Tạm giữ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }} />
                    <span style={{ fontSize: '12px' }}>Bị chặn</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin vị trí</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLocation ? (
              <div className="space-y-4">
                <div className="pb-3 border-b">
                  <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                    Mã vị trí
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: '600' }}>
                    {selectedLocation.code}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                    Trạng thái
                  </p>
                  <Badge
                    style={{
                      backgroundColor: `${getLocationColor(selectedLocation.status)}20`,
                      color: getLocationColor(selectedLocation.status),
                    }}
                  >
                    {getStatusLabel(selectedLocation.status)}
                  </Badge>
                </div>

                {selectedLocation.status === 'occupied' && (
                  <>
                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                        SKU
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>
                        {selectedLocation.sku}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                        Sản phẩm
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>
                        {selectedLocation.productName}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                        Số lượng
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>
                        {selectedLocation.quantity} {selectedLocation.unit}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-2" style={{ fontSize: '12px' }}>
                        Công suất sử dụng
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${selectedLocation.occupancy}%`,
                            backgroundColor: '#10B981',
                          }}
                        />
                      </div>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>
                        {selectedLocation.occupancy}% ({selectedLocation.quantity}/{selectedLocation.capacity})
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                        Cập nhật lần cuối
                      </p>
                      <p style={{ fontSize: '13px' }}>
                        {selectedLocation.lastUpdated}
                      </p>
                    </div>
                  </>
                )}

                {selectedLocation.status === 'empty' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600" style={{ fontSize: '13px' }}>
                      Vị trí trống
                    </p>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>
                      Công suất: {selectedLocation.capacity} đơn vị
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t space-y-2">
                  <Button className="w-full" variant="outline">
                    Xem lịch sử
                  </Button>
                  <Button className="w-full" style={{ backgroundColor: '#0057FF' }}>
                    Di chuyển hàng
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500" style={{ fontSize: '14px' }}>
                  Chọn một vị trí trên bản đồ
                </p>
                <p className="text-gray-400" style={{ fontSize: '12px' }}>
                  Click vào vị trí để xem chi tiết
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MapPin, Zap, Edit3, Check, X, Package, Grid3x3, List, AlertCircle, RefreshCw, Save, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';

interface PutawayItem {
  id: string;
  inboundNo: string;
  sku: string;
  productName: string;
  quantity: number;
  unit: string;
  currentLocation: string;
  suggestedLocation: string;
  assignedLocation?: string;
  priority: 'high' | 'medium' | 'low';
  receivedDate: string;
  productType: string;
  status: 'pending' | 'assigned' | 'completed';
}

interface WarehouseLocation {
  id: string;
  code: string;
  zone: string;
  row: number;
  col: number;
  status: 'empty' | 'occupied' | 'suggested' | 'selected';
  capacity: number;
  occupancy: number;
  distance?: number;
}

export function PutawayAssignment() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedItem, setSelectedItem] = useState<PutawayItem | null>(null);
  const [isManualAssignOpen, setIsManualAssignOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Mock putaway items
  const [items, setItems] = useState<PutawayItem[]>([
    {
      id: 'PA-001',
      inboundNo: 'IN-2024-001',
      sku: 'SKU-12345',
      productName: 'Sản phẩm A - Điện tử',
      quantity: 120,
      unit: 'Thùng',
      currentLocation: 'STG-01',
      suggestedLocation: 'A-01-A-03',
      priority: 'high',
      receivedDate: '21/11/2024 14:30',
      productType: 'Điện tử',
      status: 'pending',
    },
    {
      id: 'PA-002',
      inboundNo: 'IN-2024-001',
      sku: 'SKU-12346',
      productName: 'Sản phẩm B - Gia dụng',
      quantity: 95,
      unit: 'Kiện',
      currentLocation: 'STG-01',
      suggestedLocation: 'A-01-A-02',
      priority: 'high',
      receivedDate: '21/11/2024 14:30',
      productType: 'Gia dụng',
      status: 'pending',
    },
    {
      id: 'PA-003',
      inboundNo: 'IN-2024-002',
      sku: 'SKU-22345',
      productName: 'Sản phẩm D - Đồ chơi',
      quantity: 80,
      unit: 'Pallet',
      currentLocation: 'STG-02',
      suggestedLocation: 'B-01-A-03',
      priority: 'medium',
      receivedDate: '21/11/2024 13:15',
      productType: 'Đồ chơi',
      status: 'pending',
    },
    {
      id: 'PA-004',
      inboundNo: 'IN-2024-002',
      sku: 'SKU-22346',
      productName: 'Sản phẩm E - Văn phòng phẩm',
      quantity: 110,
      unit: 'Kiện',
      currentLocation: 'STG-02',
      suggestedLocation: 'B-02-A-03',
      priority: 'medium',
      receivedDate: '21/11/2024 13:15',
      productType: 'Văn phòng phẩm',
      status: 'pending',
    },
    {
      id: 'PA-005',
      inboundNo: 'IN-2024-003',
      sku: 'SKU-12347',
      productName: 'Sản phẩm C - Thực phẩm',
      quantity: 145,
      unit: 'Thùng',
      currentLocation: 'STG-03',
      suggestedLocation: 'A-02-A-02',
      assignedLocation: 'A-02-A-02',
      priority: 'low',
      receivedDate: '20/11/2024 16:45',
      productType: 'Thực phẩm',
      status: 'assigned',
    },
    {
      id: 'PA-006',
      inboundNo: 'IN-2024-004',
      sku: 'SKU-12350',
      productName: 'Sản phẩm F - Điện tử',
      quantity: 130,
      unit: 'Thùng',
      currentLocation: 'STG-04',
      suggestedLocation: 'A-03-A-01',
      priority: 'high',
      receivedDate: '21/11/2024 15:00',
      productType: 'Điện tử',
      status: 'pending',
    },
  ]);

  // Mock warehouse locations for map view
  const [locations, setLocations] = useState<WarehouseLocation[]>([
    { id: 'a-01-01', code: 'A-01-A-01', zone: 'A', row: 2, col: 2, status: 'occupied', capacity: 150, occupancy: 80 },
    { id: 'a-01-02', code: 'A-01-A-02', zone: 'A', row: 2, col: 3, status: 'suggested', capacity: 150, occupancy: 63, distance: 5 },
    { id: 'a-01-03', code: 'A-01-A-03', zone: 'A', row: 2, col: 4, status: 'suggested', capacity: 150, occupancy: 0, distance: 3 },
    { id: 'a-01-04', code: 'A-01-A-04', zone: 'A', row: 2, col: 5, status: 'occupied', capacity: 150, occupancy: 97 },
    { id: 'a-02-01', code: 'A-02-A-01', zone: 'A', row: 3, col: 2, status: 'occupied', capacity: 150, occupancy: 53 },
    { id: 'a-02-02', code: 'A-02-A-02', zone: 'A', row: 3, col: 3, status: 'suggested', capacity: 150, occupancy: 73, distance: 7 },
    { id: 'a-02-03', code: 'A-02-A-03', zone: 'A', row: 3, col: 4, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-02-04', code: 'A-02-A-04', zone: 'A', row: 3, col: 5, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-03-01', code: 'A-03-A-01', zone: 'A', row: 4, col: 2, status: 'suggested', capacity: 150, occupancy: 87, distance: 8 },
    { id: 'a-03-02', code: 'A-03-A-02', zone: 'A', row: 4, col: 3, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-03-03', code: 'A-03-A-03', zone: 'A', row: 4, col: 4, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'a-03-04', code: 'A-03-A-04', zone: 'A', row: 4, col: 5, status: 'occupied', capacity: 150, occupancy: 93 },
    { id: 'b-01-01', code: 'B-01-A-01', zone: 'B', row: 2, col: 7, status: 'occupied', capacity: 150, occupancy: 67 },
    { id: 'b-01-02', code: 'B-01-A-02', zone: 'B', row: 2, col: 8, status: 'occupied', capacity: 150, occupancy: 83 },
    { id: 'b-01-03', code: 'B-01-A-03', zone: 'B', row: 2, col: 9, status: 'suggested', capacity: 150, occupancy: 0, distance: 12 },
    { id: 'b-01-04', code: 'B-01-A-04', zone: 'B', row: 2, col: 10, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'b-02-01', code: 'B-02-A-01', zone: 'B', row: 3, col: 7, status: 'occupied', capacity: 150, occupancy: 77 },
    { id: 'b-02-02', code: 'B-02-A-02', zone: 'B', row: 3, col: 8, status: 'empty', capacity: 150, occupancy: 0 },
    { id: 'b-02-03', code: 'B-02-A-03', zone: 'B', row: 3, col: 9, status: 'suggested', capacity: 150, occupancy: 0, distance: 14 },
    { id: 'b-02-04', code: 'B-02-A-04', zone: 'B', row: 3, col: 10, status: 'occupied', capacity: 150, occupancy: 90 },
    { id: 'staging-01', code: 'STG-01', zone: 'Staging', row: 6, col: 2, status: 'occupied', capacity: 100, occupancy: 45 },
    { id: 'staging-02', code: 'STG-02', zone: 'Staging', row: 6, col: 3, status: 'occupied', capacity: 100, occupancy: 38 },
    { id: 'staging-03', code: 'STG-03', zone: 'Staging', row: 6, col: 4, status: 'empty', capacity: 100, occupancy: 0 },
    { id: 'staging-04', code: 'STG-04', zone: 'Staging', row: 6, col: 5, status: 'occupied', capacity: 100, occupancy: 0 },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  const getLocationColor = (status: string) => {
    switch (status) {
      case 'empty':
        return '#E5E7EB';
      case 'occupied':
        return '#10B981';
      case 'suggested':
        return '#FFD700';
      case 'selected':
        return '#0057FF';
      default:
        return '#E5E7EB';
    }
  };

  const handleAutoAssign = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        toast.success(`Đã tự động xếp kho cho ${item.productName}`);
        return {
          ...item,
          assignedLocation: item.suggestedLocation,
          status: 'assigned' as const,
        };
      }
      return item;
    }));
  };

  const handleBulkAutoAssign = () => {
    const pendingItems = items.filter(item => item.status === 'pending');
    if (pendingItems.length === 0) {
      toast.error('Không có sản phẩm nào chờ xếp kho');
      return;
    }

    setItems(items.map(item => {
      if (item.status === 'pending') {
        return {
          ...item,
          assignedLocation: item.suggestedLocation,
          status: 'assigned' as const,
        };
      }
      return item;
    }));

    toast.success(`Đã tự động xếp kho cho ${pendingItems.length} sản phẩm`);
  };

  const handleManualAssign = () => {
    if (!selectedItem || !manualLocation) {
      toast.error('Vui lòng chọn vị trí');
      return;
    }

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          assignedLocation: manualLocation,
          status: 'assigned' as const,
        };
      }
      return item;
    }));

    toast.success(`Đã xếp kho thủ công cho ${selectedItem.productName}`);
    setIsManualAssignOpen(false);
    setManualLocation('');
    setSelectedItem(null);
  };

  const handleRefreshSuggestions = () => {
    toast.success('Đã làm mới đề xuất vị trí');
  };

  const handleCompleteAssignment = () => {
    const assignedItems = items.filter(item => item.status === 'assigned');
    if (assignedItems.length === 0) {
      toast.error('Không có sản phẩm nào đã được phân vị trí');
      return;
    }

    toast.success(`Đã hoàn tất xếp kho cho ${assignedItems.length} sản phẩm`);
  };

  const filteredItems = items.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const stats = {
    total: items.length,
    pending: items.filter(i => i.status === 'pending').length,
    assigned: items.filter(i => i.status === 'assigned').length,
    completed: items.filter(i => i.status === 'completed').length,
  };

  const gridRows = 8;
  const gridCols = 12;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Phân bổ vị trí lưu kho</h1>
          <p className="text-gray-500" style={{ fontSize: '14px' }}>
            Xếp hàng vào vị trí lưu kho sau khi tiếp nhận
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefreshSuggestions}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới đề xuất
          </Button>
          <Button variant="outline" style={{ borderColor: '#F59E0B', color: '#F59E0B' }}>
            <Edit3 className="w-4 h-4 mr-2" />
            Xếp kho thủ công
          </Button>
          <Button style={{ backgroundColor: '#10B981' }} onClick={handleBulkAutoAssign}>
            <Zap className="w-4 h-4 mr-2" />
            Tự động xếp kho tất cả
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Tổng sản phẩm
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.total}
                </p>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Chờ xếp kho
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.pending}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Đã phân vị trí
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.assigned}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>
                  Hoàn thành
                </p>
                <p className="text-gray-900" style={{ fontSize: '22px', fontWeight: '600' }}>
                  {stats.completed}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                style={viewMode === 'list' ? { backgroundColor: '#0057FF' } : {}}
              >
                <List className="w-4 h-4 mr-2" />
                Danh sách
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
                style={viewMode === 'map' ? { backgroundColor: '#0057FF' } : {}}
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Bản đồ
              </Button>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xếp kho</SelectItem>
                <SelectItem value="assigned">Đã phân vị trí</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm chờ xếp kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Phiếu nhập
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      SKU
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Sản phẩm
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Số lượng
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Vị trí hiện tại
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Vị trí đề xuất
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Vị trí phân bổ
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Độ ưu tiên
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Trạng thái
                    </th>
                    <th className="text-center p-3 text-gray-600" style={{ fontSize: '13px', fontWeight: '600' }}>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>
                          {item.inboundNo}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-gray-700" style={{ fontSize: '13px' }}>
                          {item.sku}
                        </span>
                      </td>
                      <td className="p-3">
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '500' }}>
                            {item.productName}
                          </p>
                          <p className="text-gray-500" style={{ fontSize: '12px' }}>
                            {item.productType}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>
                          {item.quantity} {item.unit}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="bg-gray-100">
                          {item.currentLocation}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: '#FFF7ED',
                              borderColor: '#FFD700',
                              color: '#92400E',
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            {item.suggestedLocation}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">
                        {item.assignedLocation ? (
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: '#DBEAFE',
                              borderColor: '#0057FF',
                              color: '#0057FF',
                            }}
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.assignedLocation}
                          </Badge>
                        ) : (
                          <span className="text-gray-400" style={{ fontSize: '12px' }}>
                            Chưa phân bổ
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          style={{
                            backgroundColor: `${getPriorityColor(item.priority)}20`,
                            color: getPriorityColor(item.priority),
                          }}
                        >
                          {getPriorityLabel(item.priority)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {item.status === 'pending' && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            Chờ xếp kho
                          </Badge>
                        )}
                        {item.status === 'assigned' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Đã phân vị trí
                          </Badge>
                        )}
                        {item.status === 'completed' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Hoàn thành
                          </Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          {item.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAutoAssign(item.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Zap className="w-4 h-4 mr-1" />
                                Tự động
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setIsManualAssignOpen(true);
                                }}
                                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Thủ công
                              </Button>
                            </>
                          )}
                          {item.status === 'assigned' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Đã phân vị trí
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">Không có sản phẩm nào</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Bản đồ kho - Vị trí đề xuất</span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-yellow-50 border-yellow-500 text-yellow-800">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    Vị trí đề xuất
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 border-blue-500 text-blue-800">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    Đã chọn
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto bg-gray-50 p-6 rounded-lg" style={{ maxHeight: '600px' }}>
                <div className="mb-4 flex gap-4">
                  <Badge className="bg-blue-100 text-blue-800">Zone A - Kệ hàng chính</Badge>
                  <Badge className="bg-green-100 text-green-800">Zone B - Kệ hàng phụ</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Khu tập kết</Badge>
                </div>

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

                    const location = locations.find(
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

                    const isSuggested = location.status === 'suggested';

                    return (
                      <div
                        key={location.id}
                        className="relative border-2 cursor-pointer transition-all rounded"
                        style={{
                          backgroundColor: getLocationColor(location.status),
                          borderColor: isSuggested ? '#FFD700' : 'transparent',
                          boxShadow: isSuggested ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
                        }}
                        onClick={() => {
                          if (location.status === 'suggested') {
                            setManualLocation(location.code);
                          }
                        }}
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
                          {isSuggested && (
                            <div className="mt-1">
                              <Zap
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  color: '#92400E',
                                }}
                              />
                            </div>
                          )}
                          {location.distance && (
                            <div
                              style={{
                                fontSize: '8px',
                                color: '#92400E',
                                fontWeight: '600',
                                marginTop: '2px',
                              }}
                            >
                              {location.distance}m
                            </div>
                          )}
                        </div>
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
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFD700' }} />
                    <span style={{ fontSize: '12px' }}>Vị trí đề xuất</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0057FF' }} />
                    <span style={{ fontSize: '12px' }}>Đã chọn</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Items Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm chờ xếp kho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.filter(i => i.status === 'pending').map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg hover:border-blue-500 cursor-pointer transition-all"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      borderColor: selectedItem?.id === item.id ? '#0057FF' : '#E5E7EB',
                      backgroundColor: selectedItem?.id === item.id ? '#F0F7FF' : 'white',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '600' }}>
                          {item.sku}
                        </p>
                        <p className="text-gray-600" style={{ fontSize: '11px' }}>
                          {item.productName}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: `${getPriorityColor(item.priority)}20`,
                          color: getPriorityColor(item.priority),
                          fontSize: '10px',
                        }}
                      >
                        {getPriorityLabel(item.priority)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Package className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600" style={{ fontSize: '11px' }}>
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600" style={{ fontSize: '11px' }}>
                          Từ: {item.currentLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-yellow-600" />
                        <span className="text-gray-600" style={{ fontSize: '11px' }}>
                          Đến: {item.suggestedLocation}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-green-600 hover:bg-green-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAutoAssign(item.id);
                        }}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Tự động
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-orange-600 hover:bg-orange-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                          setIsManualAssignOpen(true);
                        }}
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        Thủ công
                      </Button>
                    </div>
                  </div>
                ))}

                {items.filter(i => i.status === 'pending').length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-2" />
                    <p className="text-gray-500" style={{ fontSize: '13px' }}>
                      Không có sản phẩm chờ xếp kho
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Bar */}
      <Card className="border-2" style={{ borderColor: '#0057FF' }}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-500" style={{ fontSize: '12px' }}>
                  Chờ xếp kho
                </p>
                <p className="text-gray-900" style={{ fontSize: '20px', fontWeight: '600' }}>
                  {stats.pending}
                </p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '12px' }}>
                  Đã phân vị trí
                </p>
                <p className="text-gray-900" style={{ fontSize: '20px', fontWeight: '600' }}>
                  {stats.assigned}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
              <Button
                size="lg"
                style={{ backgroundColor: '#10B981' }}
                onClick={handleCompleteAssignment}
                disabled={stats.assigned === 0}
              >
                <Save className="w-4 h-4 mr-2" />
                Hoàn tất xếp kho ({stats.assigned})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Assignment Dialog */}
      <Dialog open={isManualAssignOpen} onOpenChange={setIsManualAssignOpen}>
        <DialogContent className="max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Xếp kho thủ công</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                  Sản phẩm
                </p>
                <p style={{ fontSize: '14px', fontWeight: '600' }}>
                  {selectedItem.productName}
                </p>
                <p className="text-gray-600" style={{ fontSize: '12px' }}>
                  SKU: {selectedItem.sku} | Số lượng: {selectedItem.quantity} {selectedItem.unit}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700" style={{ fontSize: '13px', fontWeight: '600' }}>
                  Vị trí đề xuất
                </label>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>
                      {selectedItem.suggestedLocation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700" style={{ fontSize: '13px', fontWeight: '600' }}>
                  Chọn vị trí thủ công
                </label>
                <Input
                  placeholder="Nhập mã vị trí (VD: A-01-A-03)"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                />
                <p className="text-gray-500" style={{ fontSize: '11px' }}>
                  Click vào vị trí trên bản đồ hoặc nhập thủ công
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsManualAssignOpen(false);
                    setManualLocation('');
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Hủy
                </Button>
                <Button
                  className="flex-1"
                  style={{ backgroundColor: '#0057FF' }}
                  onClick={handleManualAssign}
                  disabled={!manualLocation}
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

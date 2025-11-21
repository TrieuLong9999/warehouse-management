import React, { useState } from 'react';
import { FileDown, FileText, Eye, Search, Filter, Calendar, Download, Package, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export function InboundList() {
  const [selectedDateRange, setSelectedDateRange] = useState('this-month');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');

  // Sample inbound orders
  const inboundOrders = [
    {
      id: 1,
      code: 'IN-2024-0156',
      date: '21/11/2024',
      source: 'Khách hàng gửi kho',
      customer: 'KH-001 - Công ty TNHH ABC',
      warehouse: 'WH-HCM',
      totalSKU: 2,
      totalQty: 600,
      receivedQty: 600,
      status: 'completed',
      qcStatus: 'passed',
      putawayStatus: 'completed',
    },
    {
      id: 2,
      code: 'IN-2024-0157',
      date: '21/11/2024',
      source: 'Nhà máy',
      customer: 'NM-001 - Nhà máy Bình Dương',
      warehouse: 'WH-HCM',
      totalSKU: 5,
      totalQty: 1200,
      receivedQty: 1200,
      status: 'putaway',
      qcStatus: 'passed',
      putawayStatus: 'processing',
    },
    {
      id: 3,
      code: 'IN-2024-0158',
      date: '20/11/2024',
      source: 'Nhập khẩu',
      customer: 'Import - Container ABCU1234567',
      warehouse: 'WH-HCM',
      totalSKU: 10,
      totalQty: 5000,
      receivedQty: 3000,
      status: 'receiving',
      qcStatus: 'processing',
      putawayStatus: 'pending',
    },
    {
      id: 4,
      code: 'IN-2024-0159',
      date: '20/11/2024',
      source: 'Chuyển kho nội bộ',
      customer: 'WH-HN - Kho Hà Nội',
      warehouse: 'WH-HCM',
      totalSKU: 3,
      totalQty: 800,
      receivedQty: 0,
      status: 'pending',
      qcStatus: 'pending',
      putawayStatus: 'pending',
    },
    {
      id: 5,
      code: 'IN-2024-0160',
      date: '19/11/2024',
      source: 'Hàng trả lại',
      customer: 'KH-002 - Công ty Cổ phần XYZ',
      warehouse: 'WH-HCM',
      totalSKU: 4,
      totalQty: 300,
      receivedQty: 300,
      status: 'qc_failed',
      qcStatus: 'failed',
      putawayStatus: 'pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'putaway': return 'bg-blue-100 text-blue-800';
      case 'receiving': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'qc_failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'putaway': return 'Đang cất hàng';
      case 'receiving': return 'Đang tiếp nhận';
      case 'pending': return 'Chờ xử lý';
      case 'qc_failed': return 'QC không đạt';
      default: return status;
    }
  };

  const getQCStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const exportToPDF = () => {
    // Mock export to PDF
    console.log('Exporting to PDF...');
    alert('Xuất báo cáo PDF thành công!');
  };

  const exportToExcel = () => {
    // Mock export to Excel
    console.log('Exporting to Excel...');
    alert('Xuất báo cáo Excel thành công!');
  };

  const stats = {
    total: inboundOrders.length,
    pending: inboundOrders.filter(o => o.status === 'pending').length,
    processing: inboundOrders.filter(o => ['receiving', 'putaway'].includes(o.status)).length,
    completed: inboundOrders.filter(o => o.status === 'completed').length,
    failed: inboundOrders.filter(o => o.status === 'qc_failed').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Danh sách nhập kho</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Theo dõi và quản lý các phiếu nhập kho
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Chờ xử lý
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-gray-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đang xử lý
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-orange-600">
                  {stats.processing}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
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

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  QC không đạt
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-red-600">
                  {stats.failed}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm theo mã phiếu, khách hàng..." className="pl-9" />
            </div>

            <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="yesterday">Hôm qua</SelectItem>
                <SelectItem value="this-week">Tuần này</SelectItem>
                <SelectItem value="this-month">Tháng này</SelectItem>
                <SelectItem value="last-month">Tháng trước</SelectItem>
                <SelectItem value="custom">Tùy chỉnh</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="receiving">Đang tiếp nhận</SelectItem>
                <SelectItem value="putaway">Đang cất hàng</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="qc_failed">QC không đạt</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Khách hàng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khách hàng</SelectItem>
                <SelectItem value="KH-001">KH-001 - Công ty ABC</SelectItem>
                <SelectItem value="KH-002">KH-002 - Công ty XYZ</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inbound List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Phiếu nhập kho</CardTitle>
            <div className="flex gap-3">
              <Button variant="outline" onClick={exportToExcel}>
                <FileDown className="w-4 h-4 mr-2" />
                Xuất Excel
              </Button>
              <Button variant="outline" onClick={exportToPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Xuất PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Loại hình</TableHead>
                <TableHead>Khách hàng/Nguồn</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>QC</TableHead>
                <TableHead>Putaway</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="text-blue-600 font-medium">
                      {order.code}
                    </span>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p style={{ fontWeight: '500' }}>{order.customer.split(' - ')[0]}</p>
                      <p className="text-sm text-gray-500">
                        {order.customer.split(' - ')[1]}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.warehouse}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{order.totalSKU} SKU</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.receivedQty.toLocaleString()} PCS</p>
                      <p className="text-xs text-gray-500">
                        / {order.totalQty.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getQCStatusIcon(order.qcStatus)}
                      <span className="text-xs">
                        {order.qcStatus === 'passed' ? 'Đạt' : 
                         order.qcStatus === 'failed' ? 'Không đạt' :
                         order.qcStatus === 'processing' ? 'Đang kiểm tra' : 'Chờ'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={
                        order.putawayStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        order.putawayStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {order.putawayStatus === 'completed' ? 'Hoàn thành' :
                       order.putawayStatus === 'processing' ? 'Đang xử lý' : 'Chờ'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-gray-500" style={{ fontSize: '14px' }}>
              Hiển thị 1-{inboundOrders.length} của {inboundOrders.length} phiếu nhập
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" style={{ backgroundColor: '#0057FF', color: 'white' }}>
                1
              </Button>
              <Button variant="outline" size="sm">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

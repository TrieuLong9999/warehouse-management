import React, { useState } from 'react';
import { Check, X, AlertTriangle, Camera, Upload, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';

export function QualityCheck() {
  const [selectedInbound, setSelectedInbound] = useState<any>(null);

  // Sample inbound with products needing QC
  const inboundOrders = [
    {
      id: 1,
      code: 'IN-2024-0156',
      date: '21/11/2024',
      customer: 'KH-001 - Công ty TNHH ABC',
      totalItems: 2,
      qcStatus: 'pending',
      products: [
        {
          id: 1,
          code: 'ITM-001',
          name: 'iPhone 15 Pro Max',
          receivedQty: 120,
          lotNumber: 'LOT-2024-001',
          qcStatus: 'pending',
          qcResult: null,
        },
        {
          id: 2,
          code: 'ITM-003',
          name: 'Coca Cola 330ml',
          receivedQty: 480,
          lotNumber: 'LOT-2024-002',
          qcStatus: 'pending',
          qcResult: null,
        },
      ],
    },
  ];

  // QC Criteria Templates
  const qcCriteria = {
    'Điện tử': [
      { id: 1, name: 'Bao bì nguyên vẹn', required: true },
      { id: 2, name: 'Seal nhãn hiệu chính hãng', required: true },
      { id: 3, name: 'Không trầy xước, móp méo', required: true },
      { id: 4, name: 'Số serial khớp với đơn hàng', required: true },
      { id: 5, name: 'Phụ kiện đầy đủ', required: false },
    ],
    'Thực phẩm': [
      { id: 1, name: 'Bao bì nguyên vẹn, không rách', required: true },
      { id: 2, name: 'Tem phiếu, nhãn mác đầy đủ', required: true },
      { id: 3, name: 'Còn hạn sử dụng tối thiểu 6 tháng', required: true },
      { id: 4, name: 'Không có dấu hiệu ẩm mốc', required: true },
      { id: 5, name: 'Nhiệt độ bảo quản phù hợp', required: true },
    ],
    'Đồ uống': [
      { id: 1, name: 'Lon/chai không bị móp, rò rỉ', required: true },
      { id: 2, name: 'Nhãn mác rõ ràng, không bong tróc', required: true },
      { id: 3, name: 'Hạn sử dụng còn lại >= 3 tháng', required: true },
      { id: 4, name: 'Không có cặn lạ, màu sắc bất thường', required: true },
    ],
  };

  const performQC = (inbound: any, product: any) => {
    setSelectedInbound({ inbound, product });
  };

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'conditional': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Kiểm tra chất lượng</h1>
        <p className="text-gray-500" style={{ fontSize: '14px' }}>
          Kiểm tra chất lượng hàng hóa nhập kho
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Chờ kiểm tra
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>
                  2
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Đạt chuẩn
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-green-600">
                  0
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
                  Không đạt
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-red-600">
                  0
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>
                  Có điều kiện
                </p>
                <p style={{ fontSize: '24px', fontWeight: '600' }} className="text-orange-600">
                  0
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-50">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inbound Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiếu nhập cần kiểm tra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inboundOrders.map((inbound) => (
              <div key={inbound.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{inbound.code}</h4>
                    <p className="text-sm text-gray-500">{inbound.customer} • {inbound.date}</p>
                  </div>
                  <Badge className={getQCStatusColor(inbound.qcStatus)}>
                    {inbound.qcStatus === 'pending' ? 'Chờ kiểm tra' : inbound.qcStatus}
                  </Badge>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Lot/Batch</TableHead>
                      <TableHead>Trạng thái QC</TableHead>
                      <TableHead>Kết quả</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inbound.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <p style={{ fontWeight: '500' }}>{product.name}</p>
                            <p className="text-sm text-gray-500">{product.code}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{product.receivedQty} PCS</span>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product.lotNumber}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge className={getQCStatusColor(product.qcStatus)}>
                            {product.qcStatus === 'pending' ? 'Chờ kiểm tra' : 
                             product.qcStatus === 'passed' ? 'Đạt' :
                             product.qcStatus === 'failed' ? 'Không đạt' : 'Có điều kiện'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.qcResult ? (
                            <div className="text-sm">
                              <p>{product.qcResult.passedCriteria}/{product.qcResult.totalCriteria} tiêu chí</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => performQC(inbound, product)}
                            disabled={product.qcStatus !== 'pending'}
                          >
                            {product.qcStatus === 'pending' ? 'Kiểm tra' : 'Xem chi tiết'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QC Form Dialog */}
      {selectedInbound && (
        <QCFormDialog
          data={selectedInbound}
          criteria={qcCriteria}
          onClose={() => setSelectedInbound(null)}
        />
      )}
    </div>
  );
}

// QC Form Dialog Component
function QCFormDialog({ data, criteria, onClose }: any) {
  const [checkedCriteria, setCheckedCriteria] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const { inbound, product } = data;
  const productCriteria = criteria['Điện tử'] || []; // Default to electronics

  const handleCheckCriteria = (id: number) => {
    if (checkedCriteria.includes(id)) {
      setCheckedCriteria(checkedCriteria.filter(c => c !== id));
    } else {
      setCheckedCriteria([...checkedCriteria, id]);
    }
  };

  const requiredCriteria = productCriteria.filter((c: any) => c.required);
  const allRequiredChecked = requiredCriteria.every((c: any) => checkedCriteria.includes(c.id));
  const passRate = (checkedCriteria.length / productCriteria.length) * 100;

  const getQCResult = () => {
    if (!allRequiredChecked) return 'failed';
    if (passRate === 100) return 'passed';
    return 'conditional';
  };

  const qcResult = getQCResult();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Kiểm tra chất lượng</h2>
              <p className="text-sm text-gray-500 mt-1">
                {inbound.code} • {product.code}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Sản phẩm</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số lượng</p>
                  <p className="font-medium">{product.receivedQty} PCS</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lot Number</p>
                  <p className="font-medium">{product.lotNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Người kiểm tra</p>
                  <p className="font-medium">Nguyễn Văn A</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QC Criteria Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Tiêu chí kiểm tra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productCriteria.map((criterion: any) => (
                  <div
                    key={criterion.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedCriteria.includes(criterion.id)}
                        onCheckedChange={() => handleCheckCriteria(criterion.id)}
                      />
                      <div>
                        <p className="font-medium">{criterion.name}</p>
                        {criterion.required && (
                          <Badge variant="secondary" className="bg-red-50 text-red-700 text-xs">
                            Bắt buộc
                          </Badge>
                        )}
                      </div>
                    </div>
                    {checkedCriteria.includes(criterion.id) && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tiến độ kiểm tra:</span>
                  <span className="font-semibold">
                    {checkedCriteria.length}/{productCriteria.length} tiêu chí
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${passRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hình ảnh minh họa</CardTitle>
                <Button size="sm" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Chụp ảnh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {photos.length === 0 ? (
                  <div className="col-span-4 border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Chưa có hình ảnh. Nhấn "Chụp ảnh" để thêm
                    </p>
                  </div>
                ) : (
                  photos.map((photo, idx) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-lg"></div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Ghi chú kiểm tra</Label>
            <Textarea
              placeholder="Nhập ghi chú chi tiết về quá trình kiểm tra..."
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* QC Result Preview */}
          {checkedCriteria.length > 0 && (
            <Card className={
              qcResult === 'passed' ? 'border-green-200 bg-green-50' :
              qcResult === 'failed' ? 'border-red-200 bg-red-50' :
              'border-orange-200 bg-orange-50'
            }>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  {qcResult === 'passed' ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Đạt chuẩn</p>
                        <p className="text-sm text-green-700">
                          Hàng hóa đạt tất cả tiêu chí kiểm tra
                        </p>
                      </div>
                    </>
                  ) : qcResult === 'failed' ? (
                    <>
                      <XCircle className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-900">Không đạt</p>
                        <p className="text-sm text-red-700">
                          Hàng hóa chưa đạt các tiêu chí bắt buộc
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="font-semibold text-orange-900">Đạt có điều kiện</p>
                        <p className="text-sm text-orange-700">
                          Hàng hóa đạt tiêu chí bắt buộc nhưng chưa hoàn hảo
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            style={{ backgroundColor: '#0057FF' }}
            disabled={checkedCriteria.length === 0}
          >
            <Check className="w-4 h-4 mr-2" />
            Hoàn tất kiểm tra
          </Button>
        </div>
      </div>
    </div>
  );
}

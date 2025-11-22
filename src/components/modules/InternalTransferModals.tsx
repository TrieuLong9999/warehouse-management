import React from 'react';
import { CheckCircle, X, ScanBarcode, Package, MapPin, AlertTriangle, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  transfer: any;
  notes: string;
  setNotes: (notes: string) => void;
}

export function ApprovalModal({ isOpen, onClose, transfer, notes, setNotes }: ApprovalModalProps) {
  if (!transfer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Phê duyệt phiếu chuyển kho</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transfer Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Mã phiếu chuyển</p>
                  <p className="text-lg font-semibold text-blue-600">{transfer.code}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Từ kho</p>
                    <p className="font-medium">{transfer.fromWarehouse.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đến kho</p>
                    <p className="font-medium">{transfer.toWarehouse.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Người yêu cầu</p>
                    <p className="font-medium">{transfer.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium">{transfer.requestDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <p className="font-medium">Danh sách sản phẩm</p>
                <div className="space-y-2">
                  {transfer.products.map((product: any) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.code}</p>
                      </div>
                      <p className="font-semibold">{product.quantity} {product.unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval Notes */}
          <div className="space-y-2">
            <Label>Ghi chú phê duyệt</Label>
            <Textarea
              placeholder="Nhập ghi chú về việc phê duyệt..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              style={{ backgroundColor: '#0057FF' }}
              onClick={() => {
                console.log('Approve transfer:', transfer.code, notes);
                onClose();
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Phê duyệt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PickingModalProps {
  isOpen: boolean;
  onClose: () => void;
  transfer: any;
  pickingProgress: any[];
  setPickingProgress: (progress: any[]) => void;
}

export function PickingModal({ isOpen, onClose, transfer, pickingProgress, setPickingProgress }: PickingModalProps) {
  if (!transfer) return null;

  const totalPicked = pickingProgress.reduce((sum, p) => sum + p.pickedQty, 0);
  const totalRequired = pickingProgress.reduce((sum, p) => sum + p.quantity, 0);
  const isComplete = totalPicked === totalRequired && totalRequired > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Lấy hàng - {transfer.code}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Kho nguồn</p>
                  <p className="text-lg font-semibold text-blue-900">{transfer.fromWarehouse.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-700">Tiến độ lấy hàng</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {totalPicked} / {totalRequired}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Picking List */}
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Cần lấy</TableHead>
                    <TableHead>Đã lấy</TableHead>
                    <TableHead>Scan/Nhập</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pickingProgress.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50">
                          A-01-02
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{product.quantity} {product.unit}</span>
                      </TableCell>
                      <TableCell>
                        <span className={product.pickedQty === product.quantity ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                          {product.pickedQty} {product.unit}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-24"
                          placeholder="0"
                          max={product.quantity}
                          value={product.pickedQty || ''}
                          onChange={(e) => {
                            const newProgress = [...pickingProgress];
                            const value = parseInt(e.target.value) || 0;
                            newProgress[index].pickedQty = Math.min(value, product.quantity);
                            setPickingProgress(newProgress);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {product.pickedQty === product.quantity ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <ScanBarcode className="w-5 h-5 text-gray-400" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Thao tác nhanh</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newProgress = pickingProgress.map(p => ({
                      ...p,
                      pickedQty: p.quantity
                    }));
                    setPickingProgress(newProgress);
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Đánh dấu đã lấy toàn bộ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Warning if incomplete */}
          {!isComplete && totalPicked > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Chưa lấy đủ hàng</p>
                    <p className="text-sm text-orange-700">
                      Bạn cần lấy đủ {totalRequired} sản phẩm trước khi hoàn thành
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              style={{ backgroundColor: '#0057FF' }}
              disabled={!isComplete}
              onClick={() => {
                console.log('Complete picking:', transfer.code, pickingProgress);
                onClose();
              }}
            >
              <Truck className="w-4 h-4 mr-2" />
              Hoàn thành lấy hàng & Bắt đầu vận chuyển
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ReceivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  transfer: any;
}

export function ReceivingModal({ isOpen, onClose, transfer }: ReceivingModalProps) {
  if (!transfer) return null;

  const [receivingProgress, setReceivingProgress] = React.useState(
    transfer.products.map((p: any) => ({ ...p, receivedQty: 0, damaged: 0 }))
  );

  const totalReceived = receivingProgress.reduce((sum: number, p: any) => sum + p.receivedQty, 0);
  const totalExpected = receivingProgress.reduce((sum: number, p: any) => sum + p.quantity, 0);
  const isComplete = totalReceived === totalExpected && totalExpected > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Tiếp nhận hàng - {transfer.code}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Info */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Kho đích</p>
                  <p className="text-lg font-semibold text-green-900">{transfer.toWarehouse.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700">Tiến độ tiếp nhận</p>
                  <p className="text-2xl font-bold text-green-900">
                    {totalReceived} / {totalExpected}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Linked Inbound Info */}
          {transfer.inboundCode && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-700">Phiếu nhập liên kết</p>
                    <p className="text-lg font-semibold text-blue-900">{transfer.inboundCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Receiving List */}
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Đã gửi</TableHead>
                    <TableHead>Đã nhận</TableHead>
                    <TableHead>Scan/Nhập</TableHead>
                    <TableHead>Hư hỏng</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivingProgress.map((product: any, index: number) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.code}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{product.pickedQty} {product.unit}</span>
                      </TableCell>
                      <TableCell>
                        <span className={product.receivedQty === product.pickedQty ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                          {product.receivedQty} {product.unit}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-24"
                          placeholder="0"
                          max={product.pickedQty}
                          value={product.receivedQty || ''}
                          onChange={(e) => {
                            const newProgress = [...receivingProgress];
                            const value = parseInt(e.target.value) || 0;
                            newProgress[index].receivedQty = Math.min(value, product.pickedQty);
                            setReceivingProgress(newProgress);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          className="w-24"
                          placeholder="0"
                          value={product.damaged || ''}
                          onChange={(e) => {
                            const newProgress = [...receivingProgress];
                            newProgress[index].damaged = parseInt(e.target.value) || 0;
                            setReceivingProgress(newProgress);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {product.receivedQty === product.pickedQty ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <MapPin className="w-5 h-5 text-gray-400" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Thao tác nhanh</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newProgress = receivingProgress.map((p: any) => ({
                      ...p,
                      receivedQty: p.pickedQty
                    }));
                    setReceivingProgress(newProgress);
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Đánh dấu đã nhận toàn bộ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Warning if incomplete */}
          {!isComplete && totalReceived > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Chưa nhận đủ hàng</p>
                    <p className="text-sm text-orange-700">
                      Bạn cần xác nhận nhận đủ {totalExpected} sản phẩm trước khi hoàn thành
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              style={{ backgroundColor: '#0057FF' }}
              disabled={!isComplete}
              onClick={() => {
                console.log('Complete receiving:', transfer.code, receivingProgress);
                onClose();
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Hoàn thành tiếp nhận
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
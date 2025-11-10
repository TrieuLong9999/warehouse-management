import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Shield, Users, FileText, Globe, CheckCircle, XCircle } from 'lucide-react';

export function ABACGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hướng dẫn sử dụng ABAC</h2>
        <p className="text-muted-foreground mt-2">
          ABAC (Attribute-Based Access Control) là mô hình phân quyền nâng cao dựa trên các thuộc tính
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0046FF]" />
              <CardTitle>Thuộc tính người dùng</CardTitle>
            </div>
            <CardDescription>Các thông tin về người dùng thực hiện hành động</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Chức vụ:</strong> Giám đốc, Quản lý, Nhân viên</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Phòng ban:</strong> Kho vận, Kế toán, IT</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Cấp bậc:</strong> Thứ bậc trong tổ chức</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Khu vực:</strong> Miền Bắc, Miền Trung, Miền Nam</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#FFBE00]" />
              <CardTitle>Thuộc tính tài nguyên</CardTitle>
            </div>
            <CardDescription>Các thông tin về tài nguyên được truy cập</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Trạng thái duyệt:</strong> Draft, Pending, Approved</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Giá trị đơn hàng:</strong> Số tiền của đơn hàng</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Người tạo:</strong> Người tạo tài nguyên</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Khu vực kho:</strong> Vị trí kho hàng</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle>Thuộc tính môi trường</CardTitle>
            </div>
            <CardDescription>Các điều kiện về thời gian và ngữ cảnh</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Thời gian:</strong> Giờ hành chính, ca làm việc</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Thứ trong tuần:</strong> T2-T6, cuối tuần</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Địa chỉ IP:</strong> Vị trí truy cập</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Thiết bị:</strong> Desktop, Mobile, Tablet</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <CardTitle>Hiệu lực chính sách</CardTitle>
            </div>
            <CardDescription>Cách chính sách được áp dụng</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span><strong>Allow (Cho phép):</strong> Cấp quyền truy cập</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <span><strong>Deny (Từ chối):</strong> Chặn quyền truy cập</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline">Priority</Badge>
                <span className="ml-2">Độ ưu tiên từ 1-10 (1 cao nhất)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#0046FF] border-2">
        <CardHeader>
          <CardTitle>Ví dụ chính sách ABAC</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#0046FF]">CS001</Badge>
              <h4 className="font-semibold">Quản lý kho xem tồn kho trong khu vực</h4>
            </div>
            <div className="pl-4 space-y-1 text-sm">
              <p><strong>Điều kiện người dùng:</strong></p>
              <ul className="list-disc list-inside pl-4 text-muted-foreground">
                <li>Chức vụ = "Quản lý kho"</li>
                <li>Phòng ban = "Kho vận"</li>
              </ul>
              <p className="mt-2"><strong>Điều kiện tài nguyên:</strong></p>
              <ul className="list-disc list-inside pl-4 text-muted-foreground">
                <li>Khu vực kho thuộc khu vực quản lý của user</li>
              </ul>
              <p className="mt-2"><strong>Hành động:</strong> <Badge variant="secondary">View</Badge></p>
              <p className="mt-2"><strong>Hiệu lực:</strong> <Badge variant="default">Allow</Badge></p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500">CS002</Badge>
              <h4 className="font-semibold">Chặn xóa phiếu đã duyệt</h4>
            </div>
            <div className="pl-4 space-y-1 text-sm">
              <p><strong>Điều kiện tài nguyên:</strong></p>
              <ul className="list-disc list-inside pl-4 text-muted-foreground">
                <li>Trạng thái duyệt = "Approved"</li>
              </ul>
              <p className="mt-2"><strong>Hành động:</strong> <Badge variant="secondary">Delete</Badge></p>
              <p className="mt-2"><strong>Hiệu lực:</strong> <Badge variant="destructive">Deny</Badge></p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#FFBE00] text-black">CS003</Badge>
              <h4 className="font-semibold">Kế toán tính phí trong giờ hành chính</h4>
            </div>
            <div className="pl-4 space-y-1 text-sm">
              <p><strong>Điều kiện người dùng:</strong></p>
              <ul className="list-disc list-inside pl-4 text-muted-foreground">
                <li>Chức vụ = "Kế toán"</li>
              </ul>
              <p className="mt-2"><strong>Điều kiện môi trường:</strong></p>
              <ul className="list-disc list-inside pl-4 text-muted-foreground">
                <li>Thời gian: 08:00 - 17:30</li>
                <li>Thứ trong tuần: T2, T3, T4, T5, T6</li>
              </ul>
              <p className="mt-2"><strong>Hành động:</strong> <Badge variant="secondary">View, Create, Edit</Badge></p>
              <p className="mt-2"><strong>Hiệu lực:</strong> <Badge variant="default">Allow</Badge></p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quy trình đánh giá chính sách</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <div>
                <strong>Thu thập thuộc tính</strong>
                <p className="text-muted-foreground">Hệ thống thu thập các thuộc tính của người dùng, tài nguyên và môi trường</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <div>
                <strong>Tìm chính sách phù hợp</strong>
                <p className="text-muted-foreground">Tìm tất cả chính sách có điều kiện khớp với thuộc tính hiện tại</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <div>
                <strong>Sắp xếp theo độ ưu tiên</strong>
                <p className="text-muted-foreground">Các chính sách được sắp xếp theo priority (1 cao nhất)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <div>
                <strong>Áp dụng chính sách</strong>
                <p className="text-muted-foreground">Chính sách <strong>Deny</strong> luôn ưu tiên hơn <strong>Allow</strong></p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <div>
                <strong>Trả về kết quả</strong>
                <p className="text-muted-foreground">Cho phép hoặc từ chối quyền truy cập dựa trên kết quả đánh giá</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

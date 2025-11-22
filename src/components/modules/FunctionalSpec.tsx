import React, { useState } from 'react';
import { 
  BookOpen, Search, Download, Settings, Package, 
  ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, 
  FileCheck, ShoppingCart, Users, Warehouse, DollarSign,
  BarChart3, UserCog, Box, FileText, ChevronRight,
  CheckCircle, AlertCircle, Info, Printer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function FunctionalSpec() {
  const [selectedModule, setSelectedModule] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const modules = [
    {
      id: 'overview',
      name: 'Tổng quan hệ thống',
      icon: <BookOpen className="w-5 h-5" />,
      category: 'general'
    },
    {
      id: 'system-config',
      name: 'Cấu hình hệ thống',
      icon: <Settings className="w-5 h-5" />,
      category: 'config'
    },
    {
      id: 'inbound',
      name: 'Nhập kho',
      icon: <ArrowDownToLine className="w-5 h-5" />,
      category: 'operation'
    },
    {
      id: 'outbound',
      name: 'Xuất kho',
      icon: <ArrowUpFromLine className="w-5 h-5" />,
      category: 'operation'
    },
    {
      id: 'internal-transfer',
      name: 'Chuyển kho nội bộ',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      category: 'operation'
    },
    {
      id: 'pod-management',
      name: 'Quản lý POD',
      icon: <FileCheck className="w-5 h-5" />,
      category: 'operation'
    },
    {
      id: 'order-management',
      name: 'Quản lý đơn hàng',
      icon: <ShoppingCart className="w-5 h-5" />,
      category: 'operation'
    },
    {
      id: 'customer-management',
      name: 'Quản lý khách hàng',
      icon: <Users className="w-5 h-5" />,
      category: 'master-data'
    },
    {
      id: 'warehouse-management',
      name: 'Quản lý kho & vị trí',
      icon: <Warehouse className="w-5 h-5" />,
      category: 'master-data'
    },
    {
      id: 'inventory-management',
      name: 'Quản trị tồn kho',
      icon: <Box className="w-5 h-5" />,
      category: 'master-data'
    },
    {
      id: 'service-fee',
      name: 'Phí dịch vụ kho',
      icon: <DollarSign className="w-5 h-5" />,
      category: 'finance'
    },
    {
      id: 'reports',
      name: 'Dashboard & Báo cáo',
      icon: <BarChart3 className="w-5 h-5" />,
      category: 'reporting'
    },
    {
      id: 'user-permissions',
      name: 'Quản lý người dùng',
      icon: <UserCog className="w-5 h-5" />,
      category: 'admin'
    },
  ];

  const getModuleContent = (moduleId: string) => {
    const contents: any = {
      'overview': {
        title: 'Hệ thống Quản lý Kho Vận (WMS) - THÀNH ĐẠT EXPRESS',
        description: 'Hệ thống quản lý kho vận toàn diện cho doanh nghiệp logistics',
        sections: [
          {
            title: 'Giới thiệu chung',
            content: `Hệ thống WMS THÀNH ĐẠT EXPRESS là giải pháp quản lý kho vận toàn diện, được thiết kế để tối ưu hóa quy trình vận hành kho bãi từ nhập hàng, lưu trữ, quản lý tồn kho đến xuất hàng và giao nhận.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Các module chính',
            content: `Hệ thống bao gồm 17 module chức năng được phân chia thành 5 nhóm:
• Cấu hình hệ thống: Thiết lập dữ liệu gốc
• Vận hành kho: Nhập/Xuất/Chuyển kho, POD, Đơn hàng
• Dữ liệu chính: Khách hàng, Kho bãi, Tồn kho
• Tài chính: Phí dịch vụ kho
• Báo cáo & Quản trị: Dashboard, Báo cáo, Phân quyền`,
            icon: <Package className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Đặc điểm nổi bật',
            content: `• Workflow chuẩn hóa cho từng quy trình
• Tự động tạo phiếu liên kết giữa các module
• Quản lý đa kho, đa vị trí
• Tracking real-time với timeline
• Hệ thống cảnh báo thông minh
• Báo cáo và phân tích đa chiều
• Giao diện thân thiện, dễ sử dụng`,
            icon: <CheckCircle className="w-5 h-5 text-green-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│           LUỒNG NGHIỆP VỤ TỔNG QUAN                      │
└─────────────────────────────────────────────────────────┘

1. CÀI ĐẶT BAN ĐẦU
   └─ Cấu hình hệ thống
      ├─ Quản lý mặt hàng
      ├─ Đơn vị tính & Quy đổi
      ├─ Thiết lập kho & vị trí
      └─ Tạo tài khoản người dùng

2. NHẬP KHO
   └─ Tạo phiếu nhập → Tiếp nhận → Kiểm định → Lưu kho
      └─ Cập nhật tồn kho tự động

3. QUẢN LÝ TỒN KHO
   └─ Theo dõi tồn kho theo sản phẩm/kho/vị trí
   └─ Cảnh báo tồn kho min/max

4. XUẤT KHO
   └─ Tạo phiếu xuất → Picking → Shipping
      └─ Cập nhật tồn kho tự động
      └─ Tạo POD giao hàng

5. CHUYỂN KHO NỘI BỘ
   └─ Tạo phiếu → Phê duyệt → Picking → Vận chuyển → Tiếp nhận
      └─ Tự động tạo phiếu nhập tại kho đích

6. BÁO CÁO & PHÂN TÍCH
   └─ Dashboard tổng quan
   └─ Báo cáo chi tiết theo module
   └─ Phân tích hiệu suất`,
        guide: [
          {
            step: 1,
            title: 'Đăng nhập hệ thống',
            description: 'Sử dụng tài khoản được cấp để đăng nhập vào hệ thống WMS'
          },
          {
            step: 2,
            title: 'Cấu hình ban đầu',
            description: 'Thiết lập dữ liệu gốc: mặt hàng, kho bãi, khách hàng, đơn vị tính'
          },
          {
            step: 3,
            title: 'Vận hành hàng ngày',
            description: 'Thực hiện các nghiệp vụ: Nhập kho, Xuất kho, Chuyển kho'
          },
          {
            step: 4,
            title: 'Theo dõi và báo cáo',
            description: 'Sử dụng Dashboard và Báo cáo để giám sát hoạt động kho'
          }
        ]
      },
      'inbound': {
        title: 'Module Nhập Kho',
        description: 'Quản lý toàn bộ quy trình nhập hàng vào kho từ tạo phiếu đến lưu kho',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Nhập Kho giúp quản lý và theo dõi toàn bộ quy trình nhập hàng hóa vào kho từ nhà cung cấp hoặc từ các nguồn khác. Đảm bảo tính chính xác, minh bạch và truy xuất nguồn gốc hàng hóa.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Chức năng chính',
            content: `• Tạo và quản lý phiếu nhập kho
• Tiếp nhận hàng hóa (Receiving)
• Kiểm định chất lượng (Quality Check)
• Phân bổ vị trí lưu kho (Putaway)
• Tracking real-time với timeline
• In phiếu nhập kho
• Báo cáo nhập kho chi tiết`,
            icon: <Package className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Trạng thái phiếu nhập',
            content: `• Draft: Phiếu nháp chưa xác nhận
• Pending: Chờ tiếp nhận hàng
• Receiving: Đang tiếp nhận
• Quality Check: Đang kiểm định
• Putaway: Đang lưu kho
• Completed: Hoàn thành
• Cancelled: Đã hủy`,
            icon: <CheckCircle className="w-5 h-5 text-orange-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         WORKFLOW NHẬP KHO - 5 BƯỚC                       │
└─────────────────────────────────────────────────────────┘

1️⃣ TẠO PHIẾU NHẬP (CREATE INBOUND)
   • Vào menu "Nhập kho" → Click "Tạo phiếu nhập"
   • Chọn nhà cung cấp
   • Chọn kho đích
   • Thêm danh sách sản phẩm + số lượng
   • Nhập thông tin bổ sung (ngày dự kiến, ghi chú)
   • Click "Tạo phiếu nhập"
   → Status: PENDING

2️⃣ TIẾP NHẬN HÀNG (RECEIVING)
   • Mở chi tiết phiếu nhập
   • Click "Bắt đầu tiếp nhận"
   • Scan/Nhập số lượng thực tế nhận được
   • Ghi nhận hàng hư hỏng (nếu có)
   • Upload ảnh hàng hóa
   • Click "Hoàn thành tiếp nhận"
   → Status: QUALITY CHECK

3️⃣ KIỂM ĐỊNH CHẤT LƯỢNG (QUALITY CHECK)
   • Modal kiểm định tự động mở
   • Kiểm tra từng sản phẩm
   • Chọn: Pass / Fail / Hold
   • Nhập lý do nếu Fail/Hold
   • Upload ảnh kiểm định
   • Click "Hoàn thành kiểm định"
   → Status: PUTAWAY

4️⃣ PHÂN BỔ VỊ TRÍ (PUTAWAY)
   • Modal phân bổ tự động mở
   • Hệ thống gợi ý vị trí tối ưu
   • Chọn vị trí lưu kho cho từng sản phẩm
   • Nhập số lượng tại mỗi vị trí
   • Scan barcode vị trí
   • Click "Hoàn thành lưu kho"
   → Status: COMPLETED

5️⃣ HOÀN THÀNH (AUTO)
   • Tự động cập nhật tồn kho
   • Tạo lịch sử biến động
   • Gửi thông báo
   • In phiếu nhập kho`,
        guide: [
          {
            step: 1,
            title: 'Tạo phiếu nhập kho',
            description: 'Click "Tạo phiếu nhập" → Điền thông tin → Chọn sản phẩm → Submit'
          },
          {
            step: 2,
            title: 'Tiếp nhận hàng hóa',
            description: 'Mở phiếu Pending → Click "Bắt đầu tiếp nhận" → Scan/nhập số lượng thực tế'
          },
          {
            step: 3,
            title: 'Kiểm định chất lượng',
            description: 'Kiểm tra từng sản phẩm → Đánh giá Pass/Fail → Upload ảnh → Submit'
          },
          {
            step: 4,
            title: 'Lưu kho',
            description: 'Chọn vị trí lưu kho → Scan barcode → Xác nhận → Hoàn thành'
          }
        ]
      },
      'outbound': {
        title: 'Module Xuất Kho',
        description: 'Quản lý quy trình xuất hàng từ kho đến khách hàng',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Xuất Kho quản lý toàn bộ quy trình xuất hàng từ kho đến khách hàng, đảm bảo đúng sản phẩm, đúng số lượng, đúng thời gian. Tích hợp picking và packing trong một workflow liền mạch.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Chức năng chính',
            content: `• Tạo và quản lý phiếu xuất kho
• Lấy hàng và đóng gói (Picking - bao gồm cả packing)
• Quản lý vận chuyển (Shipping)
• Tracking real-time
• In phiếu xuất kho, phiếu giao hàng
• Tự động tạo POD
• Cập nhật tồn kho tự động`,
            icon: <Package className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Lưu ý quan trọng',
            content: `• Workflow chỉ có 3 bước: Tạo phiếu → Picking → Shipping
• Không có bước Packing riêng biệt
• Picking bao gồm cả việc đóng gói
• Tự động kiểm tra tồn kho trước khi tạo phiếu
• Tự động tạo POD khi hoàn thành shipping`,
            icon: <AlertCircle className="w-5 h-5 text-orange-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         WORKFLOW XUẤT KHO - 3 BƯỚC                       │
└─────────────────────────────────────────────────────────┘

1️⃣ TẠO PHIẾU XUẤT (CREATE OUTBOUND)
   • Vào menu "Xuất kho" → Click "Tạo phiếu xuất"
   • Chọn khách hàng
   • Chọn kho nguồn
   • Thêm danh sách sản phẩm
   • Hệ thống kiểm tra tồn kho
   • Nhập địa chỉ giao hàng
   • Click "Tạo phiếu xuất"
   → Status: PENDING

2️⃣ PICKING & PACKING (LẤY HÀNG & ĐÓNG GÓI)
   • Mở chi tiết phiếu xuất
   • Click "Bắt đầu picking"
   • Hệ thống hiển thị vị trí lấy hàng
   • Scan/Nhập số lượng đã lấy
   • Đóng gói sản phẩm (trong cùng bước)
   • Cân đo kiện hàng
   • In nhãn kiện hàng
   • Click "Hoàn thành picking"
   → Status: READY TO SHIP

3️⃣ SHIPPING (VẬN CHUYỂN)
   • Click "Bắt đầu vận chuyển"
   • Chọn đơn vị vận chuyển
   • Nhập thông tin tài xế, xe
   • Nhập mã vận đơn (tracking number)
   • Upload ảnh kiện hàng
   • Click "Xác nhận giao hàng"
   → Status: SHIPPED
   → Tự động tạo POD
   → Tự động cập nhật tồn kho`,
        guide: [
          {
            step: 1,
            title: 'Tạo phiếu xuất kho',
            description: 'Click "Tạo phiếu xuất" → Chọn khách hàng → Chọn sản phẩm → Kiểm tra tồn kho → Submit'
          },
          {
            step: 2,
            title: 'Picking & Packing',
            description: 'Mở phiếu Pending → Click "Bắt đầu picking" → Scan vị trí → Lấy hàng → Đóng gói → Submit'
          },
          {
            step: 3,
            title: 'Shipping',
            description: 'Click "Bắt đầu vận chuyển" → Nhập thông tin vận chuyển → Tạo tracking → Xác nhận'
          }
        ]
      },
      'internal-transfer': {
        title: 'Module Chuyển Kho Nội Bộ',
        description: 'Quản lý việc di chuyển hàng hóa giữa các kho trong hệ thống',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Chuyển Kho Nội Bộ quản lý việc di chuyển hàng hóa giữa các kho của công ty. Đảm bảo tracking chính xác, tự động tạo phiếu nhập tại kho đích, và cập nhật tồn kho đồng bộ.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Chức năng chính',
            content: `• Tạo phiếu chuyển kho
• Workflow phê duyệt
• Picking tại kho nguồn
• Tracking vận chuyển
• Receiving tại kho đích
• Tự động tạo phiếu nhập
• 2-way linking giữa phiếu chuyển kho và phiếu nhập
• Cập nhật tồn kho 2 bên kho tự động`,
            icon: <Package className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Đặc điểm nổi bật',
            content: `• Tự động tạo phiếu nhập tại kho đích khi picking hoàn thành
• Link 2 chiều giữa Transfer và Inbound
• Timeline tracking chi tiết 6 bước
• Validation kho nguồn ≠ kho đích
• Báo cáo chi tiết cho mỗi lần chuyển kho`,
            icon: <CheckCircle className="w-5 h-5 text-green-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│      WORKFLOW CHUYỂN KHO NỘI BỘ - 6 BƯỚC                │
└─────────────────────────────────────────────────────────┘

1️⃣ TẠO PHIẾU CHUYỂN KHO
   • Click "Tạo phiếu chuyển kho"
   • Chọn kho nguồn
   • Chọn kho đích (khác kho nguồn)
   • Thêm sản phẩm và số lượng
   • Chọn ngày dự kiến đến
   • Click "Tạo phiếu"
   → Status: PENDING

2️⃣ PHÊ DUYỆT
   • Quản lý mở chi tiết phiếu
   • Click "Phê duyệt"
   • Xem thông tin phiếu
   • Nhập ghi chú phê duyệt
   • Click "Phê duyệt"
   → Status: APPROVED

3️⃣ PICKING (LẤY HÀNG)
   • Click "Bắt đầu lấy hàng"
   • Hiển thị danh sách SP + vị trí
   • Scan/Nhập số lượng đã lấy
   • Đóng gói (bao gồm trong picking)
   • Click "Hoàn thành lấy hàng"
   → Status: IN_TRANSIT
   → ✨ Tự động tạo phiếu nhập tại kho đích

4️⃣ VẬN CHUYỂN (AUTO)
   • Hàng đang trên đường
   • Phiếu nhập đã sẵn sàng tại kho đích
   • Timeline tracking real-time
   (Không cần thao tác thủ công)

5️⃣ TIẾP NHẬN TẠI KHO ĐÍCH
   • Kho đích click "Xác nhận đã đến kho"
   • Hiển thị phiếu nhập liên kết
   • Scan/Nhập số lượng thực tế nhận
   • Ghi nhận hàng hư hỏng
   • Click "Hoàn thành tiếp nhận"
   → Status: RECEIVING

6️⃣ HOÀN THÀNH (AUTO)
   • Tự động cập nhật tồn kho kho nguồn (-X)
   • Tự động cập nhật tồn kho kho đích (+X)
   • Link 2 chiều Transfer ↔ Inbound
   • Gửi thông báo
   → Status: COMPLETED`,
        guide: [
          {
            step: 1,
            title: 'Tạo phiếu chuyển kho',
            description: 'Click "Tạo phiếu chuyển kho" → Chọn kho nguồn/đích → Chọn SP → Submit'
          },
          {
            step: 2,
            title: 'Phê duyệt',
            description: 'Mở chi tiết phiếu Pending → Click "Phê duyệt" → Nhập ghi chú → Xác nhận'
          },
          {
            step: 3,
            title: 'Picking',
            description: 'Click "Bắt đầu lấy hàng" → Scan vị trí → Lấy hàng → Đóng gói → Submit'
          },
          {
            step: 4,
            title: 'Tiếp nhận',
            description: 'Kho đích click "Xác nhận đã đến" → Scan SP → Nhập SL thực tế → Submit'
          }
        ]
      },
      'inventory-management': {
        title: 'Module Quản Trị Tồn Kho',
        description: 'Theo dõi và quản lý tồn kho real-time theo sản phẩm, kho và vị trí',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Quản Trị Tồn Kho cung cấp cái nhìn tổng quan và chi tiết về tồn kho trong toàn bộ hệ thống. Hỗ trợ tracking đa kho, cảnh báo tồn kho, và lịch sử biến động đầy đủ.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Chức năng chính',
            content: `• Dashboard tổng quan tồn kho
• Tồn kho theo sản phẩm
• Tồn kho theo vị trí
• Hệ thống cảnh báo (min/max/hết hàng)
• Lịch sử biến động chi tiết
• Tracking đa kho
• Export báo cáo Excel
• Real-time sync với các module khác`,
            icon: <Package className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Tabs chính',
            content: `• Tab Tổng quan: Stats cards và biểu đồ
• Tab Theo sản phẩm: Chi tiết từng SKU
• Tab Theo vị trí: Chi tiết từng location
• Tab Cảnh báo: Danh sách cảnh báo tồn kho`,
            icon: <CheckCircle className="w-5 h-5 text-green-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         TỔ CHỨC DỮ LIỆU TỒN KHO                          │
└─────────────────────────────────────────────────────────┘

📊 TAB TỔNG QUAN
   ├─ 6 Stats Cards:
   │  • Tổng giá trị tồn kho
   │  • Tổng số SKU
   │  • Cảnh báo tồn kho
   │  • Hàng tồn kho
   │  • Hàng dưới mức min
   │  • Hàng trên mức max
   │
   ├─ Biểu đồ:
   │  • Top 10 sản phẩm tồn nhiều
   │  • Tồn kho theo kho
   │  • Xu hướng tồn kho
   │
   └─ Filter: Tất cả kho / Từng kho riêng

📦 TAB THEO SẢN PHẨM
   ├─ Table columns:
   │  • Sản phẩm (Code + Name)
   │  • Danh mục
   │  • Tồn kho (Total)
   │  • Phân bổ theo kho
   │  • Giá trị
   │  • Trạng thái (badges)
   │
   ├─ Click "Xem chi tiết" → Modal:
   │  • Thông tin SP
   │  • Tồn kho tổng
   │  • Phân bổ theo kho
   │  • Phân bổ theo vị trí
   │  • Lịch sử biến động
   │
   └─ Actions:
      • Export Excel
      • In báo cáo

📍 TAB THEO VỊ TRÍ
   ├─ Hiển thị theo structure:
   │  Kho → Zone → Rack → Level
   │
   ├─ Table columns:
   │  • Mã vị trí
   │  • Kho
   │  • Sản phẩm hiện tại
   │  • Số lượng
   │  • Tỷ lệ lấp đầy
   │  • Trạng thái
   │
   └─ Visual indicators:
      • Xanh: Available
      • Vàng: Occupied
      • Đỏ: Full

⚠️ TAB CẢNH BÁO
   ├─ 3 loại cảnh báo:
   │  • Hết hàng (Out of stock)
   │  • Dưới mức min (Low stock)
   │  • Trên mức max (Overstock)
   │
   ├─ Thông tin cảnh báo:
   │  • Sản phẩm
   │  • Tồn hiện tại
   │  • Mức min/max
   │  • Khuyến nghị
   │
   └─ Actions:
      • Tạo phiếu nhập (nếu low)
      • Tạo phiếu xuất (nếu over)`,
        guide: [
          {
            step: 1,
            title: 'Xem tổng quan tồn kho',
            description: 'Vào "Quản lý kho" → Tab "Quản trị tồn kho" → Tab "Tổng quan"'
          },
          {
            step: 2,
            title: 'Tra cứu theo sản phẩm',
            description: 'Tab "Theo sản phẩm" → Search hoặc filter → Click "Xem chi tiết"'
          },
          {
            step: 3,
            title: 'Kiểm tra theo vị trí',
            description: 'Tab "Theo vị trí" → Chọn kho → Xem chi tiết từng vị trí'
          },
          {
            step: 4,
            title: 'Xử lý cảnh báo',
            description: 'Tab "Cảnh báo" → Xem danh sách → Thực hiện action khuyến nghị'
          }
        ]
      },
      'pod-management': {
        title: 'Module Quản Lý POD',
        description: 'Quản lý Proof of Delivery - chứng từ giao nhận hàng hóa',
        sections: [
          {
            title: 'Mục đích',
            content: `Module POD (Proof of Delivery) quản lý chứng từ giao nhận hàng hóa, bao gồm chữ ký người nhận, ảnh chụp hàng đã giao, và trạng thái giao hàng. Tự động tạo từ phiếu xuất kho khi hoàn thành shipping.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Chức năng chính',
            content: `• Tự động tạo POD từ phiếu xuất
• Cập nhật trạng thái giao hàng
• Upload ảnh giao hàng
• Chữ ký điện tử người nhận
• Ghi nhận lý do nếu giao thất bại
• Lên lịch giao lại
• In POD
• Link với phiếu xuất kho`,
            icon: <Package className="w-5 h-5 text-green-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         WORKFLOW POD                                     │
└─────────────────────────────────────────────────────────┘

1️⃣ TẠO POD (AUTO)
   • Khi phiếu xuất kho status = SHIPPED
   • Hệ thống tự động tạo POD
   • Link với mã vận đơn
   → Status: IN_TRANSIT

2️⃣ CẬP NHẬT TRẠNG THÁI
   • Tài xế cập nhật trạng thái:
     - In Transit: Đang vận chuyển
     - Out for Delivery: Đang giao
     - Delivered: Đã giao
     - Failed: Giao thất bại
     - Returned: Hoàn trả

3️⃣ GIAO HÀNG THÀNH CÔNG
   • Upload ảnh hàng đã giao
   • Chữ ký người nhận (tablet/điện thoại)
   • Ghi chú thêm (nếu có)
   • Click "Xác nhận đã giao"
   → Status: DELIVERED

4️⃣ GIAO HÀNG THẤT BẠI
   • Chọn lý do thất bại:
     - Không có người nhận
     - Từ chối nhận hàng
     - Địa chỉ sai
     - Khác
   • Nhập ghi chú chi tiết
   • Upload ảnh (nếu có)
   • Lên lịch giao lại
   → Status: FAILED
   → Tạo POD mới cho lần giao tiếp theo`,
        guide: [
          {
            step: 1,
            title: 'Xem danh sách POD',
            description: 'Vào menu "Quản lý POD" → Xem tất cả POD theo trạng thái'
          },
          {
            step: 2,
            title: 'Cập nhật trạng thái giao hàng',
            description: 'Click POD → Click "Cập nhật trạng thái" → Chọn status → Submit'
          },
          {
            step: 3,
            title: 'Xác nhận đã giao',
            description: 'Upload ảnh → Lấy chữ ký → Click "Xác nhận đã giao"'
          }
        ]
      },
      'service-fee': {
        title: 'Module Phí Dịch Vụ Kho',
        description: 'Quản lý và tính toán phí dịch vụ kho bãi cho khách hàng',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Phí Dịch Vụ Kho quản lý việc tính toán và thu phí các dịch vụ kho bãi như: phí lưu kho, phí bốc xếp, phí đóng gói, phí xử lý đơn hàng. Hỗ trợ nhiều phương thức tính phí linh hoạt.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Các loại phí',
            content: `• Phí lưu kho (Storage Fee): Theo ngày/pallet/m³
• Phí bốc xếp (Handling Fee): Theo lần/kg/pallet
• Phí picking: Theo đơn/dòng/sản phẩm
• Phí đóng gói (Packing Fee): Theo kiện/loại
• Phí quản lý đơn hàng: Theo đơn
• Phí phụ trội: Khác`,
            icon: <DollarSign className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Phương thức tính',
            content: `• Theo thời gian: Ngày, tuần, tháng
• Theo số lượng: PCS, kg, pallet, m³
• Theo giao dịch: Đơn hàng, phiếu nhập/xuất
• Combo: Kết hợp nhiều phương thức`,
            icon: <CheckCircle className="w-5 h-5 text-green-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         QUY TRÌNH TÍNH PHÍ DỊCH VỤ                       │
└─────────────────────────────────────────────────────────┘

1️⃣ CẤU HÌNH BẢNG GIÁ
   • Vào "Phí dịch vụ kho"
   • Tạo bảng giá mới
   • Chọn loại phí
   • Nhập đơn giá
   • Chọn phương thức tính
   • Áp dụng cho khách hàng/nhóm

2️⃣ TỰ ĐỘNG TÍNH PHÍ
   • Khi có giao dịch (nhập/xuất/lưu kho)
   • Hệ thống tự động tính phí
   • Dựa trên bảng giá đã cấu hình
   • Tạo bản ghi chi phí

3️⃣ XEM BÁO CÁO PHÍ
   • Báo cáo theo khách hàng
   • Báo cáo theo loại phí
   • Báo cáo theo thời gian
   • Chi tiết từng giao dịch

4️⃣ XUẤT HÓA ĐƠN
   • Chọn kỳ thanh toán
   • Tổng hợp phí theo khách hàng
   • Xuất báo cáo Excel
   • Tạo hóa đơn`,
        guide: [
          {
            step: 1,
            title: 'Cấu hình bảng giá',
            description: 'Vào "Phí dịch vụ kho" → Click "Tạo bảng giá" → Nhập thông tin → Submit'
          },
          {
            step: 2,
            title: 'Xem báo cáo phí',
            description: 'Tab "Báo cáo" → Chọn kỳ → Chọn khách hàng → Xem chi tiết'
          },
          {
            step: 3,
            title: 'Xuất hóa đơn',
            description: 'Chọn khách hàng → Chọn kỳ → Click "Xuất hóa đơn" → Download Excel'
          }
        ]
      },
      'reports': {
        title: 'Module Dashboard & Báo Cáo',
        description: 'Tổng quan và phân tích hoạt động kho bãi',
        sections: [
          {
            title: 'Mục đích',
            content: `Module Dashboard & Báo Cáo cung cấp cái nhìn tổng quan về hoạt động kho bãi, phân tích hiệu suất, và báo cáo chi tiết cho từng module. Hỗ trợ ra quyết định dựa trên dữ liệu.`,
            icon: <Info className="w-5 h-5 text-blue-600" />
          },
          {
            title: 'Dashboard tổng quan',
            content: `• KPIs chính: Tồn kho, Nhập/Xuất, Đơn hàng
• Biểu đồ xu hướng
• Top sản phẩm
• Tỷ lệ lấp đầy kho
• Hiệu suất nhân viên
• Cảnh báo và alerts`,
            icon: <BarChart3 className="w-5 h-5 text-green-600" />
          },
          {
            title: 'Các loại báo cáo',
            content: `• Báo cáo nhập kho
• Báo cáo xuất kho
• Báo cáo tồn kho
• Báo cáo chuyển kho
• Báo cáo đơn hàng
• Báo cáo POD
• Báo cáo phí dịch vụ
• Báo cáo hiệu suất`,
            icon: <FileText className="w-5 h-5 text-blue-600" />
          }
        ],
        workflow: `
┌─────────────────────────────────────────────────────────┐
│         SỬ DỤNG DASHBOARD & BÁO CÁO                      │
└─────────────────────────────────────────────────────────┘

📊 DASHBOARD TỔNG QUAN
   ├─ KPI Cards (8 cards):
   │  • Tổng tồn kho
   │  • Nhập kho hôm nay
   │  • Xuất kho hôm nay
   │  • Đơn hàng đang xử lý
   │  • Cảnh báo tồn kho
   │  • Tỷ lệ lấp đầy
   │  • Doanh thu dịch vụ
   │  • Hiệu suất trung bình
   │
   ├─ Biểu đồ:
   │  • Xu hướng nhập/xuất 30 ngày
   │  • Top 10 sản phẩm xuất nhiều
   │  • Tồn kho theo kho
   │  • Tỷ lệ hoàn thành đơn hàng
   │
   └─ Filters:
      • Chọn kho
      • Chọn khoảng thời gian
      • Chọn khách hàng

📈 BÁO CÁO CHI TIẾT
   ├─ Chọn loại báo cáo
   ├─ Chọn tham số:
   │  • Thời gian từ - đến
   │  • Kho
   │  • Khách hàng
   │  • Sản phẩm
   │
   ├─ Xem báo cáo:
   │  • Table với data
   │  • Charts/Graphs
   │  • Summary cards
   │
   └─ Actions:
      • Export Excel
      • Export PDF
      • In báo cáo
      • Lưu template`,
        guide: [
          {
            step: 1,
            title: 'Xem Dashboard',
            description: 'Vào menu "Dashboard" → Xem tổng quan → Chọn filters nếu cần'
          },
          {
            step: 2,
            title: 'Tạo báo cáo',
            description: 'Vào "Báo cáo" → Chọn loại → Nhập tham số → Click "Tạo báo cáo"'
          },
          {
            step: 3,
            title: 'Export báo cáo',
            description: 'Sau khi xem báo cáo → Click "Export Excel" hoặc "Export PDF"'
          }
        ]
      }
    };

    return contents[moduleId] || contents['overview'];
  };

  const selectedContent = getModuleContent(selectedModule);

  const filteredModules = modules.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Đặc tả chức năng</h1>
          <p className="text-gray-500 mt-1">Tài liệu hướng dẫn sử dụng và luồng nghiệp vụ hệ thống WMS</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            In tài liệu
          </Button>
          <Button style={{ backgroundColor: '#0057FF' }}>
            <Download className="w-4 h-4 mr-2" />
            Tải PDF
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Danh mục chức năng</CardTitle>
              <div className="mt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {filteredModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      selectedModule === module.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className={selectedModule === module.id ? 'text-blue-600' : 'text-gray-400'}>
                      {module.icon}
                    </span>
                    <span className="flex-1 text-sm">{module.name}</span>
                    {selectedModule === module.id && (
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedContent.title}</CardTitle>
                  <p className="text-gray-500 mt-2">{selectedContent.description}</p>
                </div>
                <Badge style={{ backgroundColor: '#0057FF' }} className="text-white">
                  {modules.find(m => m.id === selectedModule)?.category || 'general'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="workflow">Luồng nghiệp vụ</TabsTrigger>
                  <TabsTrigger value="guide">Hướng dẫn sử dụng</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  {selectedContent.sections?.map((section: any, index: number) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          {section.icon}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                            <div className="text-gray-600 whitespace-pre-line">
                              {section.content}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Workflow Tab */}
                <TabsContent value="workflow">
                  <Card>
                    <CardContent className="pt-6">
                      <pre className="bg-gray-50 p-6 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre">
                        {selectedContent.workflow}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Guide Tab */}
                <TabsContent value="guide" className="space-y-4">
                  {selectedContent.guide?.map((step: any, index: number) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tài liệu liên quan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <FileText className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="font-medium text-sm">Video hướng dẫn</p>
                  <p className="text-xs text-gray-500 mt-1">Xem video demo</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <BookOpen className="w-5 h-5 text-green-600 mb-2" />
                  <p className="font-medium text-sm">FAQs</p>
                  <p className="text-xs text-gray-500 mt-1">Câu hỏi thường gặp</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Users className="w-5 h-5 text-purple-600 mb-2" />
                  <p className="font-medium text-sm">Hỗ trợ</p>
                  <p className="text-xs text-gray-500 mt-1">Liên hệ team</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

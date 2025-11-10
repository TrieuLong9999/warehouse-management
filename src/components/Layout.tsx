import React, { useState } from 'react';
import { Bell, Search, User, Settings, Package, Truck, ArrowLeftRight, FileText, ShoppingCart, Archive, Calculator, BarChart3, ChevronDown, ChevronRight, Users as UsersIcon, Building2, Warehouse, UserCog, Shield } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: { id: string; label: string; icon: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Tổng hợp báo cáo', icon: BarChart3 },
  { id: 'warehouse-receipt', label: 'Nhập hàng', icon: Package },
  { id: 'warehouse-shipment', label: 'Xuất hàng', icon: Truck },
  { id: 'internal-transfer', label: 'Chuyển kho nội bộ', icon: ArrowLeftRight },
  { id: 'pod-management', label: 'Quản lý chứng từ POD', icon: FileText },
  { id: 'order-management', label: 'Quản lý đơn hàng', icon: ShoppingCart },
  { id: 'inventory-management', label: 'Quản trị tồn kho', icon: Archive },
  { id: 'pricing-management', label: 'Tính phí dịch vụ kho', icon: Calculator },
  { 
    id: 'system-config', 
    label: 'Cấu hình hệ thống', 
    icon: Settings,
    subItems: [
      { id: 'config-customer-groups', label: 'Nhóm khách hàng', icon: UsersIcon },
      { id: 'config-customers', label: 'Khách hàng', icon: Building2 },
      { id: 'config-suppliers', label: 'Nhà cung cấp', icon: Truck },
      { id: 'config-warehouses', label: 'Kho & Location', icon: Warehouse },
      { id: 'config-users', label: 'Người dùng', icon: UserCog },
      { id: 'config-abac', label: 'ABAC - Phân quyền', icon: Shield },
    ]
  },
];

export function Layout({ children, activeModule, onModuleChange }: LayoutProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['system-config']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isMenuActive = (item: MenuItem) => {
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === activeModule) || activeModule === item.id;
    }
    return activeModule === item.id;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0046FF] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#003ACC]">
          <h1 className="text-[20px] font-bold tracking-tight">THÀNH ĐẠT<br/>EXPRESS</h1>
          <p className="text-[12px] text-[#FFBE00] mt-1">Warehouse Management</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuActive(item);
            const isExpanded = expandedMenus.includes(item.id);
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleMenu(item.id);
                    } else {
                      onModuleChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-6 py-3 transition-colors cursor-pointer ${
                    isActive && !hasSubItems
                      ? 'bg-[#FFBE00] text-[#1a202c]'
                      : 'text-white hover:bg-[#003ACC]'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[14px] text-left flex-1">{item.label}</span>
                  {hasSubItems && (
                    isExpanded 
                      ? <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      : <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>

                {/* Submenu */}
                {hasSubItems && isExpanded && (
                  <div className="bg-[#003ACC]">
                    {item.subItems!.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeModule === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => onModuleChange(subItem.id)}
                          className={`w-full flex items-center gap-3 px-12 py-2.5 transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-[#FFBE00] text-[#1a202c]'
                              : 'text-white hover:bg-[#0046FF]'
                          }`}
                        >
                          <SubIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-[13px] text-left">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#003ACC] text-[12px] text-center opacity-70">
          © 2025 Thành Đạt Express
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 bg-input-background border-border"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#ef4444] text-[10px]">
                5
              </Badge>
            </Button>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[14px]">Nguyễn Văn A</div>
                <div className="text-[12px] text-muted-foreground">Quản lý kho</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0046FF] flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

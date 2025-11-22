import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Download,
  Upload,
  ArrowLeftRight,
  FileCheck,
  ShoppingCart,
  DollarSign,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  ChevronLeft,
  Menu,
  Users,
  Factory,
  Circle,
  Warehouse,
  UserCog,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  submenu?: { id: string; label: string }[];
}

export function Sidebar({ currentModule, onModuleChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['inbound', 'outbound']);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { 
      id: 'system-config', 
      label: 'Cấu hình hệ thống', 
      icon: <Settings className="w-5 h-5" />,
      submenu: [
        { id: 'system-config', label: 'Cấu hình chung' },
        { id: 'item-management', label: 'Quản lý mã hàng' },
        { id: 'unit-management', label: 'Đơn vị đo lường' },
        { id: 'unit-conversion', label: 'Quy đổi đơn vị' },
      ],
    },
    {
      id: 'warehouse',
      label: 'Quản lý kho',
      icon: <Warehouse className="w-5 h-5" />,
      submenu: [
        { id: 'warehouse-config', label: 'Danh sách kho & vị trí' },
        { id: 'warehouse-map', label: 'Sơ đồ bố trí kho' },
        { id: 'inventory-management', label: 'Quản trị tồn kho' },
      ],
    },
    {
      id: 'inbound',
      label: 'Nhập kho',
      icon: <Download className="w-5 h-5" />,
      submenu: [
        { id: 'create-inbound', label: 'Tạo phiếu nhập' },
        { id: 'receiving-inbound', label: 'Tiếp nhận hàng' },
        { id: 'quality-check', label: 'Kiểm tra chất lượng' },
        { id: 'putaway-assignment', label: 'Phân bổ vị trí' },
        { id: 'inbound-list', label: 'Danh sách nhập kho' },
      ],
    },
    {
      id: 'outbound',
      label: 'Xuất kho',
      icon: <Upload className="w-5 h-5" />,
      submenu: [
        { id: 'create-outbound', label: 'Tạo phiếu xuất' },
        { id: 'picking-execution', label: 'Picking - Lấy hàng' },
        { id: 'shipping-management', label: 'Shipping - Giao hàng' },
        { id: 'outbound', label: 'Danh sách xuất kho' },
      ],
    },
    { id: 'internal-transfer', label: 'Chuyển kho nội bộ', icon: <ArrowLeftRight className="w-5 h-5" /> },
    { id: 'pod-management', label: 'Quản lý POD', icon: <FileCheck className="w-5 h-5" /> },
    { id: 'order-management', label: 'Quản lý đơn hàng', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'customer-management', label: 'Quản lý khách hàng', icon: <Users className="w-5 h-5" /> },
    { id: 'supplier-management', label: 'Quản lý nhà cung cấp', icon: <Factory className="w-5 h-5" /> },
    { id: 'user-config', label: 'Quản lý người dùng', icon: <UserCog className="w-5 h-5" /> },
    { id: 'service-fee', label: 'Phí dịch vụ kho', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'reports', label: 'Dashboard & Báo cáo', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'functional-spec', label: 'Đặc tả chức năng', icon: <BookOpen className="w-5 h-5" /> },
    {
      id: 'user-permissions',
      label: 'Quản lý người dùng',
      icon: <UserCog className="w-5 h-5" />,
    },
  ];

  const toggleMenu = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter(id => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };

  return (
    <div
      className={`bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-white">
        {!isCollapsed && (
          <div className="flex items-center gap-2 transition-all duration-300">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md transform hover:scale-110 transition-transform duration-200" 
              style={{ 
                backgroundColor: '#0057FF',
                boxShadow: '0 4px 12px rgba(0, 87, 255, 0.3)'
              }}
            >
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-gray-900" style={{ fontSize: '14px', fontWeight: '600' }}>
                THÀNH ĐẠT
              </div>
              <div className="text-gray-500" style={{ fontSize: '11px' }}>
                EXPRESS
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ color: '#0057FF' }}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = currentModule === item.id || (item.submenu && item.submenu.some(sub => sub.id === currentModule));
            const isExpanded = expandedMenus.includes(item.id);
            
            return (
              <div key={item.id} className="relative">
                {/* Active indicator bar */}
                {isActive && !isCollapsed && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
                    style={{ backgroundColor: '#0057FF' }}
                  />
                )}
                
                <button
                  onClick={() => {
                    if (item.submenu) {
                      toggleMenu(item.id);
                      if (!expandedMenus.includes(item.id) && !isCollapsed) {
                        onModuleChange(item.submenu[0].id);
                      }
                    } else {
                      onModuleChange(item.id);
                    }
                  }}
                  className={`
                    group w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                    transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-white hover:shadow-md'
                    }
                  `}
                  style={{
                    backgroundColor: isActive ? '#0057FF' : 'transparent',
                    transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  {/* Hover shine effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`transform transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`}>
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <span 
                        style={{ fontSize: '14px', fontWeight: isActive ? '600' : '500' }}
                        className="transition-all duration-200"
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                  
                  {!isCollapsed && item.submenu && (
                    <div className={`transform transition-all duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {/* Submenu with slide animation */}
                {!isCollapsed && item.submenu && (
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-1 py-1">
                      {item.submenu.map((subItem, index) => {
                        const isSubActive = currentModule === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onModuleChange(subItem.id)}
                            className={`
                              group w-full text-left px-3 py-2 rounded-lg
                              transition-all duration-300 relative
                              ${isSubActive
                                ? 'text-blue-600 bg-blue-50 shadow-sm font-medium'
                                : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                              }
                            `}
                            style={{ 
                              fontSize: '13px',
                              animationDelay: `${index * 50}ms`,
                              animation: isExpanded ? 'slideIn 0.3s ease-out forwards' : 'none'
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Circle 
                                className={`w-1.5 h-1.5 transition-all duration-300 ${
                                  isSubActive 
                                    ? 'fill-blue-600 text-blue-600 scale-125' 
                                    : 'fill-gray-400 text-gray-400 group-hover:fill-blue-600 group-hover:text-blue-600'
                                }`}
                              />
                              <span className="transition-all duration-200">
                                {subItem.label}
                              </span>
                            </div>
                            
                            {/* Active indicator */}
                            {isSubActive && (
                              <div 
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: '#0057FF' }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      {/* Add keyframes animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Custom scrollbar */
        nav::-webkit-scrollbar {
          width: 6px;
        }
        
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        
        nav::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 3px;
        }
        
        nav::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}</style>
    </div>
  );
}
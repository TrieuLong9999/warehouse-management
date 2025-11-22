import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/modules/Dashboard';
import { SystemConfig } from './components/modules/SystemConfig';
import { ItemManagement } from './components/modules/ItemManagement';
import { UnitManagement } from './components/modules/UnitManagement';
import { UnitConversion } from './components/modules/UnitConversion';
import { InboundList } from './components/modules/InboundList';
import { CreateInbound } from './components/modules/CreateInbound';
import { ReceivingInbound } from './components/modules/ReceivingInbound';
import { QualityCheck } from './components/modules/QualityCheck';
import { PutawayAssignment } from './components/modules/PutawayAssignment';
import { InboundDetail } from './components/modules/InboundDetail';
import { Outbound } from './components/modules/Outbound';
import { CreateOutbound } from './components/modules/CreateOutbound';
import { PickingExecution } from './components/modules/PickingExecution';
import { ShippingManagement } from './components/modules/ShippingManagement';
import { InternalTransfer } from './components/modules/InternalTransfer';
import { PODManagement } from './components/modules/PODManagement';
import { OrderManagement } from './components/modules/OrderManagement';
import { ServiceFee } from './components/modules/ServiceFee';
import { Reports } from './components/modules/Reports';
import { CustomerManagementTabs } from './components/modules/CustomerManagementTabs';
import { SupplierManagement } from './components/modules/SupplierManagement';
import { WarehouseLocations } from './components/modules/WarehouseLocations';
import { InventoryManagement } from './components/modules/InventoryManagement';
import { UserPermissions } from './components/modules/UserPermissions';
import { WarehouseMap } from './components/modules/WarehouseMap';
import { FunctionalSpec } from './components/modules/FunctionalSpec';

export default function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'system-config':
        return <SystemConfig />;
      case 'item-management':
        return <ItemManagement />;
      case 'unit-management':
        return <UnitManagement />;
      case 'unit-conversion':
        return <UnitConversion />;
      case 'warehouse-config':
        return <WarehouseLocations />;
      case 'warehouse-map':
        return <WarehouseMap />;
      case 'inventory-management':
        return <InventoryManagement />;
      case 'user-config':
        return <UserPermissions />;
      case 'inbound':
        return <InboundList />;
      case 'create-inbound':
        return <CreateInbound />;
      case 'receiving-inbound':
        return <ReceivingInbound />;
      case 'quality-check':
        return <QualityCheck />;
      case 'putaway-assignment':
        return <PutawayAssignment />;
      case 'inbound-list':
        return <InboundList />;
      case 'inbound-detail':
        return <InboundDetail />;
      case 'outbound':
        return <Outbound />;
      case 'create-outbound':
        return <CreateOutbound />;
      case 'picking-execution':
        return <PickingExecution />;
      case 'shipping-management':
        return <ShippingManagement />;
      case 'internal-transfer':
        return <InternalTransfer />;
      case 'pod-management':
        return <PODManagement />;
      case 'order-management':
        return <OrderManagement />;
      case 'service-fee':
        return <ServiceFee />;
      case 'reports':
        return <Reports />;
      case 'customer-management':
        return <CustomerManagementTabs />;
      case 'supplier-management':
        return <SupplierManagement />;
      case 'functional-spec':
        return <FunctionalSpec />;
      default:
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
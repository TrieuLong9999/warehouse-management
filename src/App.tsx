import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/modules/Dashboard';
import { WarehouseReceipt } from './components/modules/WarehouseReceipt';
import { WarehouseShipment } from './components/modules/WarehouseShipment';
import { InternalTransfer } from './components/modules/InternalTransfer';
import { PODManagement } from './components/modules/PODManagement';
import { OrderManagement } from './components/modules/OrderManagement';
import { InventoryManagement } from './components/modules/InventoryManagement';
import { PricingManagement } from './components/modules/PricingManagement';
import { CustomerGroups } from './components/modules/config/CustomerGroups';
import { Customers } from './components/modules/config/Customers';
import { Suppliers } from './components/modules/config/Suppliers';
import { Warehouses } from './components/modules/config/Warehouses';
import { Users } from './components/modules/config/Users';
import { ABACPolicies } from './components/modules/config/ABACPolicies';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'warehouse-receipt':
        return <WarehouseReceipt />;
      case 'warehouse-shipment':
        return <WarehouseShipment />;
      case 'internal-transfer':
        return <InternalTransfer />;
      case 'pod-management':
        return <PODManagement />;
      case 'order-management':
        return <OrderManagement />;
      case 'inventory-management':
        return <InventoryManagement />;
      case 'pricing-management':
        return <PricingManagement />;
      case 'config-customer-groups':
        return <CustomerGroups />;
      case 'config-customers':
        return <Customers />;
      case 'config-suppliers':
        return <Suppliers />;
      case 'config-warehouses':
        return <Warehouses />;
      case 'config-users':
        return <Users />;
      case 'config-abac':
        return <ABACPolicies />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
        {renderModule()}
      </Layout>
      <Toaster />
    </>
  );
}

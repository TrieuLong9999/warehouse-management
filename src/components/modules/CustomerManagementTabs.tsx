import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { CustomerManagement } from "./CustomerManagement";
import { CustomerGroups } from "./CustomerGroups";
import { Users, Tag } from "lucide-react";

export function CustomerManagementTabs() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900 mb-1">
          Quản lý khách hàng
        </h1>
        <p
          className="text-gray-500"
          style={{ fontSize: "14px" }}
        >
          Quản lý thông tin khách hàng và nhóm khách hàng
        </p>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="customers"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Khách hàng
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="flex items-center gap-2"
          >
            <Tag className="w-4 h-4" />
            Nhóm khách hàng
          </TabsTrigger>
        </TabsList>

        {/* Customers List Tab */}
        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        {/* Customer Groups Tab */}
        <TabsContent value="groups">
          <CustomerGroups />
        </TabsContent>
      </Tabs>
    </div>
  );
}
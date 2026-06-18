"use client";

import React, { useState, useMemo } from "react";
import {
  Button,
  Input,
  Select,
  Tabs,
  Pagination,
  Badge,
  Typography,
  Tooltip,
  Space,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ExpandOutlined,
  CompressOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { MOCK_ORDERS } from "./data/mockData";
import { FilterState, Order, OrderStatus } from "./types";
import OrdersTable from "./components/OrdersTable";
import FilterModal from "./components/FilterModal";

const { Text } = Typography;
const PAGE_SIZE = 10;

export default function CTCOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    district: "",
    courtEstablishment: "",
    product: "all",
    testUsers: false,
  });
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [sortBy, setSortBy] = useState("ORDERS");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = search.toLowerCase();
      if (
        q &&
        !o.userInfo.name.toLowerCase().includes(q) &&
        !o.orderId.includes(q) &&
        !o.userInfo.caseNumber.toLowerCase().includes(q)
      ) return false;
      if (filters.district && !o.courtComplex.location.toLowerCase().includes(filters.district.toLowerCase())) return false;
      if (filters.product !== "all" && filters.product && !o.products.type.toLowerCase().includes(filters.product.toLowerCase())) return false;
      return true;
    });
  }, [orders, search, filters]);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, page]);

  const handleStatusChange = (orderId: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const tabItems = [
    { key: "orders", label: <span>Orders <Badge count={orders.length} style={{ background: "#4a2040", marginLeft: 4 }} /></span> },
    { key: "clerks", label: <span>Clerks <Badge count={40} style={{ background: "#888", marginLeft: 4 }} /></span> },
    { key: "courts", label: <span>Courts <Badge count={32} style={{ background: "#888", marginLeft: 4 }} /></span> },
    { key: "districts", label: <span>Districts <Badge count={14} style={{ background: "#888", marginLeft: 4 }} /></span> },
    { key: "eligible", label: <span>Eligible Users <Badge count={11} style={{ background: "#888", marginLeft: 4 }} /></span> },
  ];

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <Text strong style={{ fontSize: 20 }}>Certified True Copy (47834)</Text>
          <div style={{ color: "#888", fontSize: 13 }}>Manage your CTC Orders Here</div>
        </div>
        <Space>
          <Tooltip title="Export"><Button icon={<UploadOutlined />} /></Tooltip>
          <Tooltip title={expanded ? "Collapse" : "Expand"}>
            <Button icon={expanded ? <CompressOutlined /> : <ExpandOutlined />} onClick={() => setExpanded(!expanded)} />
          </Tooltip>
        </Space>
      </div>

      {/* Tabs + Search */}
      <div style={{ background: "white", borderRadius: "8px 8px 0 0", padding: "0 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          tabBarStyle={{ margin: 0 }}
          tabBarExtraContent={
            <div style={{ display: "flex", gap: 8, paddingBottom: 8 }}>
              <Input
                placeholder="Search here"
                prefix={<SearchOutlined style={{ color: "#bbb" }} />}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ width: 200 }}
                size="small"
              />
              <Select
                value={sortBy}
                onChange={setSortBy}
                size="small"
                style={{ width: 120 }}
                options={[
                  { value: "ORDERS", label: "Sort: ORDERS" },
                  { value: "DATE", label: "Sort: DATE" },
                  { value: "STATUS", label: "Sort: STATUS" },
                ]}
              />
            </div>
          }
        />
      </div>

      {/* Filter row */}
      <div style={{ background: "white", padding: "8px 16px", display: "flex", justifyContent: "flex-end", borderTop: "1px solid #f0f0f0" }}>
        <Button size="small" icon={<FilterOutlined />} onClick={() => setFilterOpen(true)}>Filter</Button>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "0 0 8px 8px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden", marginBottom: 24 }}>
        {activeTab === "orders" ? (
          <>
            <OrdersTable orders={paginatedOrders} expanded={expanded} onStatusChange={handleStatusChange} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "12px 16px", borderTop: "1px solid #f0f0f0" }}>
              <Pagination
                current={page}
                total={filteredOrders.length}
                pageSize={PAGE_SIZE}
                onChange={setPage}
                showSizeChanger={false}
                size="small"
              />
              <span style={{ fontSize: 12, color: "#888" }}>Go to</span>
              <Input size="small" style={{ width: 50 }} onPressEnter={(e) => {
                const val = parseInt((e.target as HTMLInputElement).value, 10);
                if (val >= 1 && val <= Math.ceil(filteredOrders.length / PAGE_SIZE)) setPage(val);
              }} />
              <span style={{ fontSize: 12, color: "#888" }}>Page</span>
            </div>
          </>
        ) : (
          <div style={{ padding: 48, textAlign: "center", color: "#888", fontSize: 14 }}>
            {activeTab === "clerks" && "Clerks management view"}
            {activeTab === "courts" && "Courts management view"}
            {activeTab === "districts" && "Districts management view"}
            {activeTab === "eligible" && "Eligible users view"}
          </div>
        )}
      </div>

      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} onApply={(f) => { setFilters(f); setPage(1); }} />
    </div>
  );
}

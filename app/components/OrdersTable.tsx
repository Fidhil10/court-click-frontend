"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "../types";
import OrderDetailsModal from "./OrderDetailsModal";
import ShareModal from "./ShareModal";
import AssignClerkModal from "./AssignClerkModal";
import AddClerkModal from "./AddClerkModal";
import CreateTagModal from "./CreateTagModal";
import OrderRow from "./OrderRow";

interface OrdersTableProps {
  orders: Order[];
  expanded: boolean;
  onStatusChange: (orderId: number, status: OrderStatus) => void;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "order placed", label: "Order Placed" },
  { value: "dispatched", label: "Dispatched" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "payment completed", label: "Payment Completed" },
];

export default function OrdersTable({
  orders,
  expanded,
  onStatusChange,
}: OrdersTableProps) {
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [shareOrder, setShareOrder] = useState<Order | null>(null);
  const [assignOrder, setAssignOrder] = useState<Order | null>(null);
  const [addClerkOpen, setAddClerkOpen] = useState(false);
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [tagPanelOrder, setTagPanelOrder] = useState<number | null>(null);

  const headerStyle: React.CSSProperties = {
    padding: "8px 10px",
    fontSize: 11,
    fontWeight: 600,
    color: "#666",
    background: "#fafafa",
    borderBottom: "1px solid #e8e8e8",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...headerStyle, width: 32 }}>#</th>
            <th style={headerStyle}>USER INFO</th>
            <th style={headerStyle}>COURT COMPLEX</th>
            <th style={headerStyle}>PRODUCTS</th>
            <th style={headerStyle}>ORDER DATE</th>
            <th style={headerStyle}>STATUS</th>
            {expanded && <th style={headerStyle}>ORDER DETAILS / E-SIGN</th>}
            <th style={headerStyle}>ORDER DETAILS / E-SIGN</th>
            <th style={headerStyle}>TAGS/NOTE</th>
            <th style={headerStyle}>CLERK</th>
            {expanded && <th style={headerStyle}>COPY</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <OrderRow
              key={order.id}
              order={order}
              idx={idx}
              expanded={expanded}
              onStatusChange={onStatusChange}
              setViewOrder={setViewOrder}
              setShareOrder={setShareOrder}
              setAssignOrder={setAssignOrder}
              tagPanelOrder={tagPanelOrder}
              setTagPanelOrder={setTagPanelOrder}
              statusOptions={STATUS_OPTIONS}
            />
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <OrderDetailsModal
        order={viewOrder}
        open={!!viewOrder}
        onClose={() => setViewOrder(null)}
      />
      <ShareModal
        order={shareOrder}
        open={!!shareOrder}
        onClose={() => setShareOrder(null)}
      />
      <AssignClerkModal
        open={!!assignOrder}
        onClose={() => setAssignOrder(null)}
        onAssign={(id) => console.log("Assign clerk", id)}
        onAddNew={() => {
          setAssignOrder(null);
          setAddClerkOpen(true);
        }}
      />
      <AddClerkModal
        open={addClerkOpen}
        onClose={() => setAddClerkOpen(false)}
        onAdd={(c) => console.log("Add clerk", c)}
      />
      <CreateTagModal
        open={createTagOpen}
        onClose={() => setCreateTagOpen(false)}
        onAdd={(t) => console.log("Add tag", t)}
      />
    </div>
  );
}

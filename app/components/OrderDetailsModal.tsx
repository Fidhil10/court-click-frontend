"use client";

import React, { useState } from "react";
import { Modal, Tabs, Button, Typography, Divider } from "antd";
import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import { Order } from "../types";

const { Text } = Typography;

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 6,
        fontSize: 12,
        lineHeight: "18px",
      }}
    >
      <span style={{ color: "#888", minWidth: 130, flexShrink: 0 }}>
        {label}:
      </span>
      <span style={{ color: "#222", fontWeight: 500 }}>{value || "—"}</span>
    </div>
  );
}

function CaseCustomerTab({ order }: { order: Order }) {
  const d = order.caseDetails;
  return (
    <div>
      <InfoRow label="Case Number" value={d.caseNumber} />
      <InfoRow label="Legal Name" value={d.legalName} />
      <InfoRow label="Name" value={d.name} />
      <InfoRow label="Email" value={d.email} />
      <InfoRow label="Phone" value={d.phone} />
      {d.deliveryFeedback && (
        <InfoRow label="Delivery Feedback" value={d.deliveryFeedback} />
      )}
      {d.issue && <InfoRow label="+ Issue" value={d.issue} />}
    </div>
  );
}

function AddressTab({ order }: { order: Order }) {
  const a = order.address;
  const fullAddress = `${a.addressLine1}, ${a.addressLine2}, ${a.city}, ${a.district}, ${a.state} - ${a.pincode}, ${a.country}`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <span style={{ color: "#888", fontSize: 12 }}>Pincode:</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 500, fontSize: 12 }}>{a.pincode}</span>
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={() => navigator.clipboard.writeText(fullAddress)}
            style={{ fontSize: 11 }}
          >
            Copy Address
          </Button>
        </div>
      </div>
      <InfoRow label="Address Line 1" value={a.addressLine1} />
      <InfoRow label="Address Line 2" value={a.addressLine2} />
      <InfoRow label="City" value={a.city} />
      <InfoRow label="District" value={a.district} />
      <InfoRow label="State" value={a.state} />
      <InfoRow label="Country" value={a.country} />
    </div>
  );
}

function ProductsTab({ order }: { order: Order }) {
  return (
    <div>
      {order.productList.map((p, i) => (
        <div key={i}>
          <Text strong style={{ fontSize: 13, marginBottom: 8, display: "block" }}>
            {p.name}
          </Text>
          <InfoRow label="Type" value={p.type} />
          <InfoRow label="Order Date" value={p.orderDate} />
          <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
            <span style={{ color: "#888", minWidth: 130 }}>File:</span>
            {p.file === "N/A" || !p.file ? (
              <span style={{ color: "#888" }}>N/A</span>
            ) : (
              <a href={p.file} style={{ color: "#4a2040" }}>
                View File <LinkOutlined />
              </a>
            )}
          </div>
        </div>
      ))}
      {order.productList.length === 0 && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          No products found
        </Text>
      )}
    </div>
  );
}

function DigiSignTab({ order }: { order: Order }) {
  return (
    <div>
      {order.digiDocuments.map((doc, i) => (
        <div key={i}>
          <Text strong style={{ fontSize: 13, marginBottom: 8, display: "block" }}>
            {doc.name}
          </Text>
          <InfoRow label="Digio ID" value={doc.digioId} />
          <InfoRow label="Status" value={doc.status} />
          <div style={{ display: "flex", gap: 8, fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: "#888", minWidth: 130 }}>Signed Document:</span>
            {doc.signedDocument ? (
              <a style={{ color: "#4a2040" }}>{doc.signedDocument}</a>
            ) : (
              <span style={{ color: "#888" }}>—</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
            <span style={{ color: "#888", minWidth: 130 }}>Audit Log:</span>
            {doc.auditLog ? (
              <a style={{ color: "#4a2040" }}>{doc.auditLog}</a>
            ) : (
              <span style={{ color: "#888" }}>—</span>
            )}
          </div>
        </div>
      ))}
      {order.digiDocuments.length === 0 && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          No documents found
        </Text>
      )}
    </div>
  );
}

export default function OrderDetailsModal({
  order,
  open,
  onClose,
}: OrderDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("case");

  if (!order) return null;

  const tabItems = [
    {
      key: "case",
      label: "Case & Customer Details",
      children: <CaseCustomerTab order={order} />,
    },
    {
      key: "address",
      label: "Address",
      children: <AddressTab order={order} />,
    },
    {
      key: "products",
      label: "Products",
      children: <ProductsTab order={order} />,
    },
    {
      key: "digi",
      label: "Digio eSign Documents",
      children: <DigiSignTab order={order} />,
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      title={
        <Text strong style={{ fontSize: 16 }}>
          Order Details
        </Text>
      }
      styles={{ body: { paddingTop: 0 } }}
    >
      {/* Order metadata */}
      <div style={{ marginBottom: 12 }}>
        <InfoRow label="Order ID" value={order.orderId} />
        <InfoRow label="Tracking ID" value={order.trackingId} />
        <InfoRow label="Payment completed" value={order.paymentCompleted} />
        <InfoRow label="Order placed" value={order.orderPlaced} />
        <InfoRow label="Assigned" value={order.assigned} />
        <InfoRow label="Applied" value={order.applied} />
        <InfoRow label="Dispatched" value={order.dispatched} />
        <InfoRow label="Delivered" value={order.delivered} />
      </div>

      <Divider style={{ margin: "12px 0" }} />

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        size="small"
        items={tabItems}
        tabBarStyle={{ marginBottom: 12 }}
        style={{
          "--ant-tabs-ink-bar-color": "#4a2040",
        } as React.CSSProperties}
      />
    </Modal>
  );
}

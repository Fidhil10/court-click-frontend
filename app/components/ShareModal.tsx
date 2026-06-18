"use client";

import React from "react";
import { Modal, Button, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Order } from "../types";

const { Text } = Typography;

interface ShareModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "8px 0",
        borderBottom: "1px solid #f0f0f0",
        fontSize: 13,
      }}
    >
      <span
        style={{ color: "#888", minWidth: 160, flexShrink: 0, fontWeight: 400 }}
      >
        {label}
      </span>
      <span style={{ color: "#222", fontWeight: 500 }}>{value || "—"}</span>
    </div>
  );
}

export default function ShareModal({ order, open, onClose }: ShareModalProps) {
  if (!order) return null;

  const handleCopy = () => {
    const text = `
Order Details
APPLICANT: ${order.caseDetails.legalName}
CASE NUMBER: WA 233/2024
CASE NAME: Laisamma George & Other vs State Of Kerala & Others
CNR NUMBER: KLHC010922112023
COURT ESTABLISHMENT: JPM 1 District Court Thrissur
DOCUMENT TYPE: Certified True Copy - Judgment
ORDER NUMBER: 1/2020
ORDER DATE: 22-Feb-2026
    `.trim();
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={560}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong style={{ fontSize: 16 }}>
            Order Details
          </Text>
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={handleCopy}
            style={{ marginRight: 32 }}
          >
            Copy Details
          </Button>
        </div>
      }
    >
      <div style={{ marginTop: 8 }}>
        <DetailRow label="APPLICANT" value={order.caseDetails.legalName} />
        <DetailRow label="CASE NUMBER" value="WA 233/2024" />
        <DetailRow
          label="CASE NAME"
          value="Laisamma George & Other vs State Of Kerala & Others"
        />
        <DetailRow label="CNR NUMBER" value="KLHC010922112023" />
        <DetailRow
          label="COURT ESTABLISHMENT"
          value="JPM 1 District Court Thrissur"
        />
        <DetailRow
          label="DOCUMENT TYPE"
          value="Certified True Copy - Judgment"
        />
        <DetailRow label="ORDER NUMBER" value="1/2020" />
        <DetailRow label="ORDER DATE" value="22-Feb-2026" />
      </div>
    </Modal>
  );
}

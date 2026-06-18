import React from "react";
import { OrderStatus } from "../types";

const statusConfig: Record<
  OrderStatus,
  { bg: string; color: string; border: string; label: string }
> = {
  cancelled: {
    bg: "#fff1f0",
    color: "#cf1322",
    border: "#ffa39e",
    label: "cancelled",
  },
  "order placed": {
    bg: "#f9f0ff",
    color: "#722ed1",
    border: "#d3adf7",
    label: "order placed",
  },
  "payment completed": {
    bg: "#f6ffed",
    color: "#389e0d",
    border: "#b7eb8f",
    label: "payment completed",
  },
  dispatched: {
    bg: "#e6f4ff",
    color: "#0958d9",
    border: "#91caff",
    label: "dispatched",
  },
  delivered: {
    bg: "#f6ffed",
    color: "#389e0d",
    border: "#b7eb8f",
    label: "delivered",
  },
};

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig["order placed"];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {config.label}
    </span>
  );
}

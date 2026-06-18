import React from "react";
import { Button, Select, Tooltip, Popover, Avatar } from "antd";
import { CopyOutlined, UserAddOutlined, UploadOutlined, ShareAltOutlined, FilterOutlined, TagOutlined, DownOutlined } from "@ant-design/icons";
import { Order, OrderStatus } from "../types";
import StatusBadge from "./StatusBadge";
import TagChip from "./TagChip";
import ChooseTagPanel from "./ChooseTagPanel";

interface OrderRowProps {
  order: Order;
  idx: number;
  expanded: boolean;
  onStatusChange: (orderId: number, status: OrderStatus) => void;
  setViewOrder: (order: Order) => void;
  setShareOrder: (order: Order) => void;
  setAssignOrder: (order: Order) => void;
  tagPanelOrder: number | null;
  setTagPanelOrder: (id: number | null) => void;
  statusOptions: { value: OrderStatus; label: string }[];
}

export default function OrderRow({
  order,
  idx,
  expanded,
  onStatusChange,
  setViewOrder,
  setShareOrder,
  setAssignOrder,
  tagPanelOrder,
  setTagPanelOrder,
  statusOptions
}: OrderRowProps) {
  const colStyle: React.CSSProperties = {
    padding: "8px 10px",
    fontSize: 12,
    verticalAlign: "top",
    borderBottom: "1px solid #f0f0f0",
  };

  return (
    <tr style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
      <td style={colStyle}>
        <span style={{ color: "#888" }}>{idx + 1}</span>
      </td>

      <td style={colStyle}>
        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>{order.userInfo.name}</div>
        <div style={{ color: "#888", fontSize: 11, marginBottom: 2 }}>{order.userInfo.phone}</div>
        <div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>{order.userInfo.caseNumber}</div>
        <div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>{order.userInfo.orderId}</div>
        <Button
          size="small"
          icon={<CopyOutlined />}
          style={{ fontSize: 10, height: 22 }}
          onClick={() => navigator.clipboard.writeText(order.address.addressLine1)}
        >
          Copy Address
        </Button>
      </td>

      <td style={colStyle}>
        <div style={{ fontWeight: 500, fontSize: 12 }}>{order.courtComplex.name}</div>
        <div style={{ color: "#888", fontSize: 11 }}>{order.courtComplex.location}</div>
      </td>

      <td style={colStyle}>
        <div style={{ fontWeight: 500, fontSize: 12 }}>{order.products.type}</div>
        <div style={{ color: "#444", fontSize: 12 }}>₹{order.products.amount.toLocaleString()}</div>
      </td>

      <td style={colStyle}>
        <div style={{ fontSize: 12 }}>{order.orderDate}</div>
        <div style={{ color: "#888", fontSize: 11 }}>{order.orderTime}</div>
      </td>

      <td style={colStyle}>
        <div style={{ marginBottom: 6 }}>
          <Select
            size="small"
            value={order.status}
            onChange={(val) => onStatusChange(order.id, val)}
            style={{ width: 130, fontSize: 11 }}
            options={statusOptions}
          />
        </div>
        <StatusBadge status={order.status} />
        {order.orderDetails.daysSince && (
          <div style={{ color: "#ff7875", fontSize: 10, marginTop: 4 }}>
            {order.orderDetails.daysSince}
          </div>
        )}
      </td>

      {expanded && (
        <td style={colStyle}>
          <div style={{ color: "#888", fontSize: 11 }}>₹{order.orderDetails.amount}</div>
          {order.orderDetails.paymentStatus && (
            <StatusBadge status={order.orderDetails.paymentStatus as OrderStatus} />
          )}
        </td>
      )}

      <td style={colStyle}>
        <Button size="small" style={{ fontSize: 11, marginBottom: 4, display: "block" }} onClick={() => setViewOrder(order)}>
          View
        </Button>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <Button size="small" style={{ fontSize: 11 }} onClick={() => setShareOrder(order)}>
            <ShareAltOutlined /> E-sign
          </Button>
          <Tooltip title="Edit">
            <Button size="small" icon={<FilterOutlined />} style={{ fontSize: 10 }} />
          </Tooltip>
          <Tooltip title="Share">
            <Button size="small" icon={<ShareAltOutlined />} style={{ fontSize: 10 }} onClick={() => setShareOrder(order)} />
          </Tooltip>
        </div>
      </td>

      <td style={colStyle}>
        <Popover
          content={<ChooseTagPanel onToggleTag={() => {}} />}
          trigger="click"
          placement="bottomLeft"
          open={tagPanelOrder === order.id}
          onOpenChange={(v) => setTagPanelOrder(v ? order.id : null)}
        >
          <Button size="small" icon={<TagOutlined />} style={{ fontSize: 11, marginBottom: 4 }}>
            Choose Tag <DownOutlined />
          </Button>
        </Popover>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {order.tags.slice(0, 2).map((tag) => (
            <TagChip key={tag.id} tag={tag} size="small" />
          ))}
        </div>
      </td>

      <td style={colStyle}>
        {order.clerk ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Avatar size={24} style={{ background: "#4a2040", fontSize: 10 }}>
              {order.clerk.name[0]}
            </Avatar>
            <span style={{ fontSize: 12 }}>{order.clerk.name}</span>
          </div>
        ) : (
          <Button
            size="small"
            style={{ fontSize: 11, color: "#4a2040", borderColor: "#4a2040" }}
            icon={<UserAddOutlined />}
            onClick={() => setAssignOrder(order)}
          >
            Assign
          </Button>
        )}
      </td>

      {expanded && (
        <td style={colStyle}>
          <Button size="small" icon={<UploadOutlined />} style={{ fontSize: 11 }}>
            Upload
          </Button>
        </td>
      )}
    </tr>
  );
}

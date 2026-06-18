"use client";

import { useState } from "react";
import { Modal, Checkbox, Avatar, Button, Select, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface AssignClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (clerkId: string) => void;
  onAddNew: () => void;
}

const CLERKS = [
  { id: "c1", name: "Shannet", avatar: "S" },
  { id: "c2", name: "Shannet", avatar: "S" },
  { id: "c3", name: "Shannet", avatar: "S" },
];

export default function AssignClerkModal({
  open,
  onClose,
  onAssign,
  onAddNew,
}: AssignClerkModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [moreClerk, setMoreClerk] = useState<string>("");

  const handleAssign = () => {
    if (selected.length > 0) onAssign(selected[0]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Text strong style={{ fontSize: 15 }}>
              Assign Authorized Personnel
            </Text>
            <div style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>
              Select the person who is authorized to collect CTC document.
            </div>
          </div>
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddNew}
            style={{ background: "#4a2040", borderColor: "#4a2040", marginRight: 24 }}
          >
            Add New
          </Button>
        </div>
      }
    >
      <div style={{ marginTop: 8 }}>
        {CLERKS.map((clerk) => (
          <div
            key={clerk.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
              borderBottom: "1px solid #f5f5f5",
            }}
          >
            <Checkbox
              checked={selected.includes(clerk.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelected([clerk.id]);
                } else {
                  setSelected(selected.filter((id) => id !== clerk.id));
                }
              }}
            />
            <Avatar size={32} style={{ background: "#4a2040" }}>
              {clerk.avatar}
            </Avatar>
            <Text style={{ fontSize: 13 }}>{clerk.name}</Text>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 6 }}>
            More Clerks
          </Text>
          <Select
            placeholder="Choose Clerk"
            style={{ width: "100%" }}
            value={moreClerk || undefined}
            onChange={setMoreClerk}
            options={[
              { value: "c4", label: "Clerk 4" },
              { value: "c5", label: "Clerk 5" },
            ]}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 20,
          }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleAssign}
            style={{ background: "#4a2040", borderColor: "#4a2040" }}
          >
            Assign Personnel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal, Input, Button, Typography, Select } from "antd";

const { Text } = Typography;

interface AddClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (clerk: { name: string; phone: string; clerkId: string }) => void;
}

export default function AddClerkModal({
  open,
  onClose,
  onAdd,
}: AddClerkModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clerkId, setClerkId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Clerk name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (!clerkId.trim()) e.clerkId = "Clerk ID is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    onAdd({ name, phone, clerkId });
    setName("");
    setPhone("");
    setClerkId("");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setClerkId("");
    setErrors({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={440}
      title={
        <div>
          <Text strong style={{ fontSize: 15 }}>
            Add Clerk
          </Text>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>
            Add a new authorized person by providing details.
          </div>
        </div>
      }
    >
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                display: "block",
                marginBottom: 4,
              }}
            >
              Clerk Name <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              placeholder="GangadHaran"
              value={name}
              onChange={(e) => setName(e.target.value)}
              status={errors.name ? "error" : ""}
            />
            {errors.name && (
              <Text type="danger" style={{ fontSize: 11 }}>
                {errors.name}
              </Text>
            )}
          </div>

          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                display: "block",
                marginBottom: 4,
              }}
            >
              Phone Number <span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: 4 }}>
              <Select
                defaultValue="+91"
                style={{ width: 80 }}
                options={[
                  { value: "+91", label: "🇮🇳 +91" },
                  { value: "+1", label: "🇺🇸 +1" },
                ]}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                status={errors.phone ? "error" : ""}
                style={{ flex: 1 }}
              />
            </div>
            {errors.phone && (
              <Text type="danger" style={{ fontSize: 11 }}>
                {errors.phone}
              </Text>
            )}
          </div>
        </div>

        <div>
          <label
            style={{
              fontSize: 12,
              fontWeight: 500,
              display: "block",
              marginBottom: 4,
            }}
          >
            Clerk ID <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            placeholder="Enter Clerk ID"
            value={clerkId}
            onChange={(e) => setClerkId(e.target.value)}
            status={errors.clerkId ? "error" : ""}
          />
          {errors.clerkId && (
            <Text type="danger" style={{ fontSize: 11 }}>
              {errors.clerkId}
            </Text>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 8,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleAdd}
            style={{ background: "#4a2040", borderColor: "#4a2040" }}
          >
            Add &amp; Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

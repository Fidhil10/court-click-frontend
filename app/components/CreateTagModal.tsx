"use client";

import React, { useState } from "react";
import { Modal, Input, Button, Typography } from "antd";
import { Tag } from "../types";
const { Text } = Typography;

const COLORS = [
  "#7ab3c4",
  "#a8c4a2",
  "#e07b6a",
  "#d4a96a",
  "#c4a87a",
  "#8a7ab5",
  "#c47a8a",
  "#a0b4c8",
  "#b8a0c8",
  "#7ab8a0",
  "#4a2040",
];

interface CreateTagModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (tag: Tag) => void;
}

export default function CreateTagModal({
  open,
  onClose,
  onAdd,
}: CreateTagModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Tag name is required");
      return;
    }
    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      color,
    });
    setName("");
    setColor(COLORS[0]);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setColor(COLORS[0]);
    setError("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={340}
      title={
        <div>
          <Text strong style={{ fontSize: 15 }}>
            Support Tags
          </Text>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>
            Create New tags here
          </div>
        </div>
      }
    >
      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 4 }}>
            New Tag Name
          </label>
          <Input
            placeholder="Enter Tag Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            status={error ? "error" : ""}
          />
          {error && <Text type="danger" style={{ fontSize: 11 }}>{error}</Text>}
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 8 }}>
            Choose Tag Color
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "2px solid #222" : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {name && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
              Preview
            </label>
            <span
              style={{
                display: "inline-block",
                padding: "3px 12px",
                borderRadius: 20,
                background: color + "22",
                border: `1px solid ${color}66`,
                color: color,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {name}
            </span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleAdd}
            style={{ background: "#4a2040", borderColor: "#4a2040" }}
          >
            Add Tag
          </Button>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import React, { useState } from "react";
import { Modal, Select, Checkbox, Button, Typography } from "antd";
import { FilterState } from "../types";

const { Text } = Typography;

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const DISTRICTS = [
  { value: "thrissur", label: "Thrissur" },
  { value: "ernakulam", label: "Ernakulam" },
  { value: "kozhikode", label: "Kozhikode" },
];

const COURTS = [
  { value: "jpcm1", label: "JPM 1 District Court" },
  { value: "district", label: "District Court Thrissur" },
];

const PRODUCTS = [
  { value: "all", label: "All" },
  { value: "judgement", label: "Judgement" },
  { value: "interim", label: "Interim Order" },
  { value: "other", label: "Other" },
];

export default function FilterModal({ open, onClose, onApply }: FilterModalProps) {
  const [district, setDistrict] = useState("");
  const [courtEstablishment, setCourtEstablishment] = useState("");
  const [product, setProduct] = useState("all");
  const [testUsers, setTestUsers] = useState(false);

  const handleReset = () => {
    setDistrict("");
    setCourtEstablishment("");
    setProduct("all");
    setTestUsers(false);
  };

  const handleApply = () => {
    onApply({ district, courtEstablishment, product, testUsers });
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={380}
      title={<Text strong style={{ fontSize: 15 }}>Filter Users</Text>}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
            District
          </label>
          <Select
            placeholder="Choose District"
            style={{ width: "100%" }}
            value={district || undefined}
            onChange={setDistrict}
            options={DISTRICTS}
            allowClear
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
            Court Establishment
          </label>
          <Select
            placeholder="Choose Court Establishment"
            style={{ width: "100%" }}
            value={courtEstablishment || undefined}
            onChange={setCourtEstablishment}
            options={COURTS}
            allowClear
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
            Product
          </label>
          <Select
            style={{ width: "100%" }}
            value={product}
            onChange={setProduct}
            options={PRODUCTS}
          />
        </div>

        <Checkbox
          checked={testUsers}
          onChange={(e) => setTestUsers(e.target.checked)}
          style={{ fontSize: 13 }}
        >
          Test Users
        </Checkbox>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button
            type="primary"
            onClick={handleApply}
            style={{ background: "#4a2040", borderColor: "#4a2040" }}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </Modal>
  );
}

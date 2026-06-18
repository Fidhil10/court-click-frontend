"use client";

import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  EllipsisOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";

const navItems = [
  { icon: <AppstoreOutlined />, label: "Dashboard", active: false },
  { icon: <TeamOutlined />, label: "CTC Orders", active: true },
  { icon: <UserOutlined />, label: "Users", active: false },
  { icon: <FileTextOutlined />, label: "Documents", active: false },
  { icon: <SettingOutlined />, label: "Settings", active: false },
  { icon: <EllipsisOutlined />, label: "More", active: false },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 56,
        minHeight: "100vh",
        background: "#1a0f17",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 0",
        gap: 4,
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 36,
          height: 36,
          background: "#4a2040",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          color: "white",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        CTC
      </div>

      {/* Nav items */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
      >
        {navItems.map((item, idx) => (
          <Tooltip key={idx} title={item.label} placement="right">
            <button
              style={{
                width: 40,
                height: 40,
                background: item.active ? "rgba(255,255,255,0.15)" : "none",
                border: "none",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.active ? "#ffffff" : "#9a7a94",
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!item.active)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!item.active)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "none";
              }}
            >
              {item.icon}
            </button>
          </Tooltip>
        ))}
      </div>

      {/* User avatar */}
      <Avatar
        size={32}
        style={{ background: "#4a2040", cursor: "pointer", marginTop: 8 }}
      >
        A
      </Avatar>
    </aside>
  );
}

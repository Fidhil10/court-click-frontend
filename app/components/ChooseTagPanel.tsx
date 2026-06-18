"use client";

import { useState } from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Tag as TagType } from "../types";
import { AVAILABLE_TAGS } from "../data/mockData";
import TagChip from "./TagChip";
import CreateTagModal from "./CreateTagModal";

interface ChooseTagPanelProps {
  onToggleTag: (tagId: string) => void;
}

export default function ChooseTagPanel({
  onToggleTag,
}: ChooseTagPanelProps) {
  const [tags, setTags] = useState<TagType[]>(AVAILABLE_TAGS);
  const [createOpen, setCreateOpen] = useState(false);

  const handleAddTag = (tag: TagType) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 8,
        padding: 12,
        minWidth: 200,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Button
        size="small"
        icon={<PlusOutlined />}
        onClick={() => setCreateOpen(true)}
        style={{
          background: "#4a2040",
          borderColor: "#4a2040",
          color: "white",
          borderRadius: 16,
          marginBottom: 12,
          fontSize: 12,
        }}
      >
        Create New Tag
      </Button>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tags.map((tag) => (
          <div
            key={tag.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              cursor: "pointer",
            }}
            onClick={() => onToggleTag(tag.id)}
          >
            <TagChip tag={tag} size="small" />
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              <Tooltip title="Edit">
                <EditOutlined
                  style={{ fontSize: 12, color: "#888", cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteOutlined
                  style={{ fontSize: 12, color: "#888", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTags((prev) => prev.filter((t) => t.id !== tag.id));
                  }}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      <CreateTagModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onAdd={handleAddTag}
      />
    </div>
  );
}

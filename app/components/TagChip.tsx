import React from "react";
import { Tag as AntTag } from "antd";
import { Tag as TagType } from "../types";

interface TagChipProps {
  tag: TagType;
  size?: "small" | "default";
}

export default function TagChip({ tag, size = "default" }: TagChipProps) {
  return (
    <AntTag
      style={{
        background: tag.color + "22",
        border: `1px solid ${tag.color}66`,
        color: tag.color,
        borderRadius: 20,
        fontSize: size === "small" ? 10 : 11,
        padding: size === "small" ? "1px 6px" : "2px 8px",
        fontWeight: 500,
        lineHeight: "18px",
        margin: "1px",
      }}
    >
      {tag.name}
    </AntTag>
  );
}

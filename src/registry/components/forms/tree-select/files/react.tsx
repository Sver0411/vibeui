import { useEffect, useMemo, useState } from "react";

const STYLES = `
.tr-react { width: min(320px, 84vw); padding: 12px; border: 1px solid #e4e4e7; border-radius: 14px; background: #fff;
  font-family: ui-sans-serif, system-ui, sans-serif; }
.tr-react__row { display: flex; align-items: center; gap: 4px; border-radius: 8px; }
.tr-react__row:hover { background: #f4f4f5; }
.tr-react__toggle { width: 20px; height: 20px; border: 0; border-radius: 6px; background: transparent; color: #a1a1aa;
  cursor: pointer; }
.tr-react__label { flex: 1; display: flex; align-items: center; gap: 8px; padding: 7px 8px; font-size: 14px; color: #3f3f46; cursor: pointer; }
.tr-react__check { width: 16px; height: 16px; accent-color: #0f766e; }
.tr-react__count { margin-left: auto; font-size: 11px; color: #a1a1aa; background: #f4f4f5; border-radius: 999px; padding: 1px 7px; }
.tr-react__summary { margin: 10px 0 0; font-size: 13px; color: #71717a; }
`;

interface TreeNode {
  name: string;
  count?: number;
  children?: TreeNode[];
}

const DATA: TreeNode[] = [
  {
    name: "组件库",
    children: [
      { name: "按钮", count: 6 },
      { name: "导航", count: 9 },
      { name: "卡片", count: 9 },
    ],
  },
  {
    name: "动效集",
    children: [
      { name: "文字动效", count: 5 },
      { name: "背景特效", count: 4 },
    ],
  },
];

type CheckState = "checked" | "indeterminate" | "unchecked";

function childStates(node: TreeNode, picked: Set<string>): CheckState {
  if (!node.children) return picked.has(node.name) ? "checked" : "unchecked";
  const states = node.children.map((c) => childStates(c, picked));
  if (states.every((s) => s === "checked")) return "checked";
  if (states.some((s) => s !== "unchecked")) return "indeterminate";
  return "unchecked";
}

function collectLeaves(node: TreeNode, acc: string[] = []): string[] {
  if (!node.children) acc.push(node.name);
  else node.children.forEach((c) => collectLeaves(c, acc));
  return acc;
}

function TreeItems({
  nodes,
  depth,
  picked,
  onToggle,
}: {
  nodes: TreeNode[];
  depth: number;
  picked: Set<string>;
  onToggle: (name: string) => void;
}) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  return (
    <div style={{ paddingLeft: depth ? 22 : 0 }}>
      {nodes.map((node) => {
        const state = childStates(node, picked);
        const isCollapsed = collapsed.has(node.name);
        return (
          <div key={node.name}>
            <div className="tr-react__row">
              {node.children && (
                <button
                  type="button"
                  className="tr-react__toggle"
                  aria-expanded={!isCollapsed}
                  onClick={() =>
                    setCollapsed((prev) => {
                      const next = new Set(prev);
                      if (next.has(node.name)) next.delete(node.name);
                      else next.add(node.name);
                      return next;
                    })
                  }
                >
                  {isCollapsed ? "▸" : "▾"}
                </button>
              )}
              <label className="tr-react__label">
                <input
                  type="checkbox"
                  className="tr-react__check"
                  checked={state === "checked"}
                  ref={(el) => {
                    if (el) el.indeterminate = state === "indeterminate";
                  }}
                  onChange={() => onToggle(node.name)}
                />
                <span>{node.name}</span>
                {node.count != null && <em className="tr-react__count">{node.count}</em>}
              </label>
            </div>
            {node.children && !isCollapsed && (
              <TreeItems nodes={node.children} depth={depth + 1} picked={picked} onToggle={onToggle} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TreeSelect() {
  const leaves = useMemo(() => DATA.flatMap((n) => collectLeaves(n)), []);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="tr-react">
      <TreeItems nodes={DATA} depth={0} picked={picked} onToggle={toggle} />
      <p className="tr-react__summary">已选 {picked.size} / {leaves.length} 项</p>
    </div>
  );
}

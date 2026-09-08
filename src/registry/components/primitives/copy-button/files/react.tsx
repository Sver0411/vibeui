import { useEffect, useRef, useState } from "react";

const STYLES = `
.cp-react { display: flex; align-items: center; gap: 10px; font-family: ui-sans-serif, system-ui, sans-serif; }
.cp-react__text { flex: 1; padding: 9px 12px; border: 1px solid #e4e4e7; border-radius: 10px; background: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; color: #18181b; }
.cp-react__btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px; border: 1px solid #d4d4d8;
  border-radius: 10px; background: #fff; font-size: 13px; color: #3f3f46; cursor: pointer; transition: all .15s ease; }
.cp-react__btn:hover { border-color: #0f766e; color: #0f766e; }
.cp-react__btn.is-copied { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
`;

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 沙箱环境可能拒绝剪贴板写入，静默失败 */
    }
  };

  return (
    <div className="cp-react">
      <code className="cp-react__text">{text}</code>
      <button
        type="button"
        className={`cp-react__btn${copied ? " is-copied" : ""}`}
        aria-label={`复制 ${text}`}
        aria-live="polite"
        onClick={copy}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
    </div>
  );
}

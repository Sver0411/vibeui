import { useEffect, useRef } from "react";

const STYLES = `
.magnetic-button-react {
  position: relative;
  border: 0;
  border-radius: 999px;
  background: #26262b;
  color: #fafafa;
  padding: 16px 38px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  will-change: transform;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease;
}
.magnetic-button-react:hover { box-shadow: 0 14px 30px rgba(38, 38, 43, 0.25); }
.magnetic-button-react > span { display: inline-block; will-change: transform; transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1); }
`;

const STRENGTH = 0.35;
const LABEL_STRENGTH = 0.55;

export default function MagneticButton({ label = "Pull me" }: { label?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleMove = (event: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    button.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    const span = button.firstElementChild as HTMLElement | null;
    if (span) span.style.transform = `translate(${x * LABEL_STRENGTH}px, ${y * LABEL_STRENGTH}px)`;
  };

  const handleLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transform = "";
    const span = button.firstElementChild as HTMLElement | null;
    if (span) span.style.transform = "";
  };

  return (
    <button ref={buttonRef} type="button" className="magnetic-button-react" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <span>{label}</span>
    </button>
  );
}

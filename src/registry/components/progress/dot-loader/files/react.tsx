import { useEffect } from "react";

const STYLES = `
.dl-react { display: inline-flex; gap: 7px; }
.dl-react__dot { width: 10px; height: 10px; border-radius: 50%; background: #26262b;
  animation: dl-bounce-react 1s ease-in-out infinite; }
.dl-react__dot:nth-child(2) { animation-delay: 0.15s; }
.dl-react__dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes dl-bounce-react { 0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
  30% { transform: translateY(-7px); opacity: 1; } }
.dl-react--inline .dl-react__dot { width: 5px; height: 5px; background: currentColor; }
`;

export default function DotLoader({ inline = false, label }: { inline?: boolean; label?: string }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <span
      className={inline ? "dl-react dl-react--inline" : "dl-react"}
      role="status"
      aria-label={label ?? "Loading"}
    >
      <span className="dl-react__dot" />
      <span className="dl-react__dot" />
      <span className="dl-react__dot" />
    </span>
  );
}

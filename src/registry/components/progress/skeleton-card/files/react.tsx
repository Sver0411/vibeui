import { useEffect } from "react";

const STYLES = `
.sk-react { width: 300px; display: grid; gap: 14px; padding: 16px;
  border: 1px solid #e4e4e7; border-radius: 14px; background: #ffffff; }
.sk-react .media { height: 130px; border-radius: 9px; }
.sk-react .row { display: flex; gap: 11px; align-items: center; }
.sk-react .avatar { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; }
.sk-react .lines { flex: 1; display: grid; gap: 7px; }
.sk-react .line { height: 10px; border-radius: 5px; }
.sk-react .line.title { width: 62%; height: 12px; }
.sk-react .line.full { width: 100%; }
.sk-react .line.wide { width: 82%; }
.sk-react .actions { display: flex; gap: 9px; justify-content: flex-end; }
.sk-react .pill { width: 64px; height: 28px; border-radius: 8px; }
.sk-react .pill.primary { width: 84px; }
.sk-react .shimmer { background: linear-gradient(100deg, #ececef 40%, #f7f7f8 50%, #ececef 60%);
  background-size: 220% 100%; animation: sk-sweep-react 1.5s ease-in-out infinite; }
@keyframes sk-sweep-react { from { background-position: 130% 0; } to { background-position: -90% 0; } }
`;

export default function SkeletonCard() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="sk-react" aria-hidden="true">
      <div className="media shimmer" />
      <div className="row">
        <div className="avatar shimmer" />
        <div className="lines">
          <div className="line title shimmer" />
          <div className="line shimmer" />
        </div>
      </div>
      <div className="line full shimmer" />
      <div className="line wide shimmer" />
      <div className="actions">
        <div className="pill shimmer" />
        <div className="pill primary shimmer" />
      </div>
    </div>
  );
}

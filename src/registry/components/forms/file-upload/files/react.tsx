import { useEffect, useRef, useState } from "react";

const STYLES = `
.fu-react { width: min(420px, 92vw); display: grid; gap: 12px; font-family: ui-sans-serif, system-ui, sans-serif; }
.fu-drop-react { display: grid; justify-items: center; gap: 6px; padding: 34px 20px; border: 1.5px dashed #c8c8cf;
  border-radius: 14px; background: #ffffff; color: #71717a; text-align: center; cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.15s ease; }
.fu-drop-react[data-dragover="true"] { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: scale(1.01); }
.fu-drop-react svg { width: 26px; height: 26px; color: #0f766e; }
.fu-item-react { display: flex; align-items: center; gap: 11px; padding: 11px 12px; border: 1px solid #e4e4e7;
  border-radius: 11px; background: #ffffff; }
.fu-item-react .icon { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 9px;
  background: rgba(15,118,110,0.1); color: #0f766e; font-size: 10px; font-weight: 700; flex-shrink: 0; }
.fu-item-react .track { height: 4px; border-radius: 999px; background: #e4e4e7; overflow: hidden; }
.fu-item-react .fill { height: 100%; width: 0; border-radius: inherit; background: #0f766e; transition: width 0.2s ease; }
.fu-item-react[data-state="done"] .fill { background: #15803d; }
`;

const MAX_BYTES = 10 * 1024 * 1024;
const formatSize = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
const extensionOf = (name: string) => {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.slice(0, 3).toUpperCase() : "FILE";
};

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  progress: number;
}

let fileId = 1;

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next: UploadedFile[] = [];
    for (const file of Array.from(incoming)) {
      if (file.size > MAX_BYTES) {
        console.warn(`${file.name} exceeds the 10 MB limit and was skipped.`);
        continue;
      }
      next.push({ id: fileId++, name: file.name, size: file.size, progress: 0 });
    }
    setFiles((prev) => [...prev, ...next]);
  };

  // Simulated per-file progress; swap for real XHR/fetch progress events.
  useEffect(() => {
    const uploading = files.filter((f) => f.progress < 100);
    if (uploading.length === 0) return;
    const timer = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.progress < 100 ? { ...f, progress: Math.min(f.progress + 8 + Math.random() * 14, 100) } : f,
        ),
      );
    }, 140);
    return () => clearInterval(timer);
  }, [files]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#fafafa" }}>
      <div className="fu-react">
        <div
          className="fu-drop-react"
          data-dragover={dragOver}
          role="button"
          tabIndex={0}
          aria-label="Upload files: click or drop files here"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            addFiles(event.dataTransfer.files);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 16V4m0 0 -4 4m4-4 4 4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          <p style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 500, color: "#26262b" }}>
            Drop files here or <span style={{ color: "#0f766e", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>browse</span>
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#a1a1aa" }}>Up to 10 MB per file — images, PDFs, documents</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          aria-label="File input"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }} aria-label="Uploaded files">
          {files.map((file) => (
            <li key={file.id} className="fu-item-react" data-state={file.progress >= 100 ? "done" : "uploading"}>
              <span className="icon" aria-hidden="true">{extensionOf(file.name)}</span>
              <span style={{ flex: 1, minWidth: 0, display: "grid", gap: 5 }}>
                <span style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12.5 }}>
                  <span style={{ fontWeight: 500, color: "#26262b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                  <span style={{ color: "#a1a1aa", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{formatSize(file.size)}</span>
                </span>
                <span className="track">
                  <span className="fill" style={{ width: `${file.progress}%` }} />
                </span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
                style={{ border: 0, background: "transparent", color: "#a1a1aa", width: 26, height: 26, borderRadius: 7, cursor: "pointer", flexShrink: 0, fontSize: 14, lineHeight: 1 }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

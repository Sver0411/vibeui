import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputRoot = path.join(projectRoot, "src", "registry", "generated", "functional-lab");
const manifestPath = path.join(projectRoot, "src", "registry", "generated", "functional-lab.ts");
const runtimeTemplate = fs.readFileSync(
  path.join(scriptDir, "functional-lab.template.js"),
  "utf8",
);

const tools = [
  {
    slug: "waveform-region-editor",
    name: "波形片段编辑器",
    kind: "waveform",
    category: "forms",
    engine: "Canvas 2D",
    hue: 174,
    description: "可播放的波形裁剪组件：双端点选择时间范围，实时显示片段时长并支持常用区间预设。",
    tags: ["音频", "波形", "时间范围", "裁剪"],
  },
  {
    slug: "brush-mask-editor",
    name: "AI 笔刷蒙版编辑器",
    kind: "mask",
    category: "forms",
    engine: "Canvas 2D",
    hue: 266,
    description: "用于 AI 修图和局部重绘的蒙版画布，支持画笔尺寸、撤销、反相、清空与 PNG 导出。",
    tags: ["AI 修图", "蒙版", "画笔", "图像编辑"],
  },
  {
    slug: "gradient-mesh-editor",
    name: "渐变网格编辑器",
    kind: "mesh",
    category: "forms",
    engine: "Canvas 2D",
    hue: 204,
    description: "拖动四个颜色控制点实时生成渐变网格，并可修改节点颜色、复制可落地的 CSS 背景。",
    tags: ["渐变", "颜色节点", "背景生成", "CSS 导出"],
  },
  {
    slug: "dual-range-histogram",
    name: "直方图双端筛选器",
    kind: "histogram",
    category: "forms",
    engine: "Canvas 2D",
    hue: 32,
    description: "把真实数值区间、数据分布和快捷预设合成一个筛选组件，适合价格、时长和指标过滤。",
    tags: ["筛选", "双端范围", "直方图", "数据输入"],
  },
  {
    slug: "timeline-keyframe-editor",
    name: "关键帧时间线编辑器",
    kind: "timeline",
    category: "forms",
    engine: "Canvas 2D",
    hue: 286,
    description: "可添加、选择、拖动和删除关键帧，带播放头、键盘微调与 JSON 复制输出。",
    tags: ["时间线", "关键帧", "动画编辑", "JSON 输出"],
  },
  {
    slug: "perceptual-color-picker",
    name: "可复制颜色选择器",
    kind: "color",
    category: "forms",
    engine: "Canvas 2D",
    hue: 342,
    description: "二维饱和度亮度场结合色相与透明度控制，实时输出 HEX、RGBA 并支持一键复制。",
    tags: ["颜色选择", "HEX", "RGBA", "设计工具"],
  },
  {
    slug: "bezier-motion-editor",
    name: "贝塞尔运动路径编辑器",
    kind: "bezier",
    category: "forms",
    engine: "Canvas 2D",
    hue: 196,
    description: "拖动两个控制点调整三次贝塞尔曲线，预览运动节奏并复制 cubic-bezier 参数。",
    tags: ["贝塞尔", "缓动", "路径编辑", "参数输出"],
  },
  {
    slug: "concurrent-upload-queue",
    name: "并发上传任务队列",
    kind: "upload",
    category: "progress",
    engine: "DOM",
    hue: 150,
    description: "接收真实本地文件并管理并发处理队列，包含进度、暂停、继续、取消、失败重试与完成清理。",
    tags: ["文件上传", "任务队列", "并发", "失败重试"],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function header(tool) {
  return `<header class="tool-head">
    <div><span>FUNCTIONAL LAB / ${escapeHtml(tool.tags[0])}</span><h2 id="tool-title">${escapeHtml(tool.name)}</h2></div>
    <output class="tool-status" aria-live="polite"></output>
  </header>`;
}

function canvas(tool, label) {
  return `<div class="tool-canvas-wrap"><canvas class="tool-canvas" aria-label="${escapeHtml(label)}"></canvas></div>`;
}

function buildHtml(tool) {
  const open = `<div class="tool-stage"><section class="tool" data-tool="${tool.kind}" aria-labelledby="tool-title">${header(tool)}`;
  const close = `</section></div>`;
  if (tool.kind === "waveform") {
    return `${open}
      ${canvas(tool, "可交互音频波形")}
      <div class="tool-fields tool-fields-2">
        <label>起点 <input class="wave-start" type="range" min="0" max="60" step="0.1" value="8"></label>
        <label>终点 <input class="wave-end" type="range" min="0" max="60" step="0.1" value="38"></label>
      </div>
      <div class="tool-actions"><button data-action="play">播放片段</button><button data-range="intro">前 15 秒</button><button data-range="middle">中间 20 秒</button></div>
    ${close}`;
  }
  if (tool.kind === "mask") {
    return `${open}
      ${canvas(tool, "可绘制蒙版画布")}
      <div class="tool-fields"><label>画笔 <input class="mask-size" type="range" min="6" max="64" value="28"></label></div>
      <div class="tool-actions"><button data-action="undo">撤销</button><button data-action="invert">反相</button><button data-action="clear">清空</button><button data-action="export" class="tool-primary">导出蒙版</button></div>
    ${close}`;
  }
  if (tool.kind === "mesh") {
    return `${open}
      ${canvas(tool, "可拖动颜色节点的渐变网格")}
      <div class="tool-fields tool-fields-2"><label>当前节点颜色 <input class="mesh-color" type="color" value="#38b2ac"></label><span class="tool-help">点击节点后拖动位置</span></div>
      <div class="tool-actions"><button data-action="reset">重置</button><button data-action="copy" class="tool-primary">复制 CSS</button></div>
    ${close}`;
  }
  if (tool.kind === "histogram") {
    return `${open}
      ${canvas(tool, "价格分布直方图")}
      <div class="tool-fields tool-fields-2">
        <label>最低价 <input class="hist-min" type="range" min="0" max="1000" step="10" value="180"></label>
        <label>最高价 <input class="hist-max" type="range" min="0" max="1000" step="10" value="780"></label>
      </div>
      <div class="tool-actions"><button data-preset="budget">¥0–300</button><button data-preset="popular">¥200–800</button><button data-preset="all">全部</button></div>
    ${close}`;
  }
  if (tool.kind === "timeline") {
    return `${open}
      ${canvas(tool, "可编辑关键帧时间线")}
      <p class="tool-help">点击空白处添加，拖动关键帧调整时间；Delete 删除，方向键微调。</p>
      <div class="tool-actions"><button data-action="play">播放</button><button data-action="add">添加关键帧</button><button data-action="delete">删除</button><button data-action="copy" class="tool-primary">复制 JSON</button></div>
    ${close}`;
  }
  if (tool.kind === "color") {
    return `${open}
      ${canvas(tool, "二维颜色选择区域")}
      <div class="tool-fields tool-fields-2"><label>色相 <input class="color-hue" type="range" min="0" max="360" value="342"></label><label>透明度 <input class="color-alpha" type="range" min="0" max="100" value="100"></label></div>
      <div class="color-result"><i aria-hidden="true"></i><code></code><button data-action="copy" class="tool-primary">复制颜色</button></div>
    ${close}`;
  }
  if (tool.kind === "bezier") {
    return `${open}
      ${canvas(tool, "可拖动控制点的贝塞尔曲线")}
      <p class="tool-help">拖动 P1、P2 调整缓动；方向键微调当前控制点。</p>
      <div class="tool-actions"><button data-action="play">重播</button><button data-preset="snappy">利落</button><button data-preset="soft">柔和</button><button data-action="copy" class="tool-primary">复制参数</button></div>
    ${close}`;
  }
  return `${open}
    <label class="upload-drop"><input class="upload-input" type="file" multiple><b>拖入文件或点击选择</b><span>本地演示并发数 2，可暂停、取消与重试</span></label>
    <ul class="upload-list" aria-label="上传任务"></ul>
    <div class="tool-actions"><button data-action="pause-all">暂停全部</button><button data-action="clear">清理已完成</button></div>
  ${close}`;
}

function buildCss(tool) {
  return `:root{--tool-hue:${tool.hue};--tool-accent:hsl(${tool.hue} 58% 38%);--tool-soft:hsl(${tool.hue} 56% 95%)}
html,body{min-height:100%;background:#fafafa}
*{box-sizing:border-box}
.tool-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.tool{width:min(390px,calc(100vw - 24px));padding:16px;border:1px solid rgba(24,24,27,.08);border-radius:22px;background:#fff;box-shadow:0 22px 54px rgba(24,24,27,.08)}
.tool-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}.tool-head span{color:#71717a;font-size:8px;font-weight:700;letter-spacing:.09em;text-transform:uppercase}.tool-head h2{margin:4px 0 0;font-size:18px;line-height:1.05;letter-spacing:-.035em}.tool-status{min-width:68px;color:var(--tool-accent);font-size:10px;font-weight:700;text-align:right}
.tool-canvas-wrap{position:relative;height:126px;overflow:hidden;border:1px solid rgba(24,24,27,.07);border-radius:14px;background:linear-gradient(145deg,#fbfcfc,var(--tool-soft));touch-action:none}.tool-canvas{display:block;width:100%;height:100%;outline:none}.tool-canvas:focus-visible{box-shadow:inset 0 0 0 3px hsl(var(--tool-hue) 60% 45%/.16)}
.tool-fields{display:grid;gap:8px;margin-top:11px}.tool-fields-2{grid-template-columns:1fr 1fr}.tool-fields label{display:grid;gap:5px;color:#52525b;font-size:9px;font-weight:650}.tool input[type=range]{width:100%;accent-color:var(--tool-accent)}.tool input[type=color]{width:44px;height:24px;padding:2px;border:1px solid #dedee3;border-radius:7px;background:#fff}.tool-help{margin:8px 0 0;color:#71717a;font-size:9px;line-height:1.45}
.tool-actions{display:flex;align-items:center;gap:6px;margin-top:11px;overflow-x:auto}.tool button{min-height:28px;padding:0 9px;border:1px solid #dedee3;border-radius:8px;background:#fff;color:#3f3f46;font-size:9px;font-weight:680;white-space:nowrap;cursor:pointer}.tool button:hover{border-color:#b8b8c0;color:#18181b}.tool button:focus-visible,.upload-drop:focus-within{outline:3px solid hsl(var(--tool-hue) 58% 44%/.15);outline-offset:2px}.tool button.tool-primary{border-color:var(--tool-accent);background:var(--tool-accent);color:#fff}
.color-result{display:flex;align-items:center;gap:8px;margin-top:11px}.color-result i{width:23px;height:23px;border:1px solid rgba(24,24,27,.08);border-radius:7px}.color-result code{flex:1;color:#3f3f46;font-size:10px}.upload-drop{display:grid;place-items:center;min-height:84px;padding:14px;border:1px dashed #cfcfd5;border-radius:14px;background:var(--tool-soft);text-align:center;cursor:pointer}.upload-drop input{position:absolute;width:1px;height:1px;opacity:0}.upload-drop b{font-size:11px}.upload-drop span{margin-top:4px;color:#71717a;font-size:9px}.upload-list{display:grid;gap:7px;max-height:118px;margin:10px 0 0;padding:0;overflow:auto;list-style:none}.upload-item{display:grid;grid-template-columns:1fr auto;gap:4px 8px;padding:8px 9px;border:1px solid #ededf0;border-radius:10px}.upload-item strong{overflow:hidden;font-size:9px;text-overflow:ellipsis;white-space:nowrap}.upload-item small{color:#71717a;font-size:8px}.upload-item progress{grid-column:1/-1;width:100%;height:4px;accent-color:var(--tool-accent)}.upload-item .row-actions{display:flex;gap:4px}.upload-item button{min-height:20px;padding:0 5px;font-size:8px}
@media(max-width:360px){.tool{padding:13px}.tool-fields-2{grid-template-columns:1fr}.tool-canvas-wrap{height:118px}}
@media(prefers-reduced-motion:reduce){.tool *{scroll-behavior:auto!important}}
`;
}

const metas = tools.map((tool, index) => ({
  id: tool.slug,
  slug: tool.slug,
  name: tool.name,
  description: tool.description,
  category: tool.category,
  subcategory: "Functional Advanced Tool",
  type: "component",
  tags: ["功能组件", "真实输入输出", ...tool.tags],
  technologies: ["HTML", "CSS", "JavaScript", ...(tool.engine === "Canvas 2D" ? ["Canvas 2D"] : [])],
  styles: ["工具型", "高级", "实用"],
  difficulty: "advanced",
  featured: true,
  isNew: true,
  popular: index < 4,
  responsive: true,
  previewBackground: "light",
  engine: tool.engine,
  performanceTier: tool.kind === "upload" ? "light" : "medium",
  reducedMotionFallback: "保留全部编辑功能，停止自动播放，仅在用户操作后重绘。",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: `generated/functional-lab/${tool.slug}`,
}));

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(
  manifestPath,
  `import type { UIResourceMeta } from "@/types/resource";\n\n/** Generated by scripts/generate-functional-lab.mjs. */\nexport const FUNCTIONAL_LAB: UIResourceMeta[] = ${JSON.stringify(metas, null, 2)};\n`,
);

tools.forEach((tool) => {
  const filesDir = path.join(outputRoot, tool.slug, "files");
  fs.mkdirSync(filesDir, { recursive: true });
  fs.writeFileSync(path.join(filesDir, "index.html"), `${buildHtml(tool)}\n`);
  fs.writeFileSync(path.join(filesDir, "styles.css"), buildCss(tool));
  fs.writeFileSync(
    path.join(filesDir, "script.js"),
    runtimeTemplate.replace(
      "__FUNCTION_CONFIG__",
      JSON.stringify({ kind: tool.kind, hue: tool.hue, slug: tool.slug }),
    ),
  );
});

console.log(`Generated ${tools.length} functional advanced components.`);

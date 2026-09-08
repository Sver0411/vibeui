import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "拖拽上传",
    "en": "Drag & Drop Upload",
    "aliases": [
      "拖放上传区",
      "文件上传",
      "Dropzone"
    ],
    "pattern": "File Upload · Dropzone",
    "principle": "dropzone 监听 dragenter/dragover/dragleave/drop 并全部 preventDefault，用 data-dragover 属性驱动高亮；drop 的 dataTransfer.files 与 input change 的 files 走同一个 addFile：超 10MB 跳过，逐文件 setInterval 模拟进度，× 移除时先 clearInterval 再移除节点。"
  },
  "prompts": {
    "short": "做一个拖拽上传区：拖入高亮、点击或回车打开文件选择、逐文件进度条列表、可移除、单文件限 10MB。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现拖拽上传：\n1. dropzone 设 tabindex=0 role=button，click 与 Enter/Space 都触发隐藏 file input 的 click()；\n2. dragenter/dragover/dragleave/drop 四个事件全部 preventDefault，用 data-dragover 属性切换高亮；drop 读 dataTransfer.files；\n3. addFile 校验 file.size ≤ 10MB（超限跳过并 console.warn），列表项显示扩展名徽标、文件名、格式化大小与进度条；\n4. 进度用 setInterval 每 140ms 递增 8–22 模拟，到 100% clearInterval 并置 done 态；× 移除先 clearInterval 再 remove；change 处理后清空 input.value 以便重复选同一文件。不要引入任何库。",
    "refined": "可配置拖拽上传：单文件上限 10MB、进度步进 +8–22 / 每 140ms、虚线边框 1.5px、拖入高亮 scale 1.01 + 背景 rgba(15,118,110,0.05)、进度条高 4px。验收：① 往页面非 dropzone 区域拖放不触发上传；② 12MB 文件被跳过且不出现在列表；③ 上传中点 × 后进度定时器停止；④ 同一文件可重复选择再次上传；⑤ 键盘 Enter/Space 能打开文件对话框。"
  },
  "knobs": [
    {
      "name": "单文件上限",
      "default": "10MB",
      "range": "1 – 100MB",
      "effect": "超限文件被跳过的阈值。"
    },
    {
      "name": "进度步进",
      "default": "+8–22 / 每 140ms",
      "range": "自定义",
      "effect": "模拟进度的快慢（接真实上传时替换为 XHR/fetch 进度）。"
    },
    {
      "name": "拖入高亮缩放",
      "default": "1.01",
      "range": "1.0 – 1.03",
      "effect": "拖悬时 dropzone 的放大反馈。"
    },
    {
      "name": "虚线边框",
      "default": "1.5px dashed",
      "range": "1 – 2.5px",
      "effect": "拖放区边界样式与醒目程度。"
    },
    {
      "name": "进度条高度",
      "default": "4px",
      "range": "3 – 8px",
      "effect": "列表项内进度条粗细。"
    }
  ],
  "pitfalls": [
    "只监听 drop 不对 dragover preventDefault，浏览器直接打开文件而不是交给页面处理。",
    "dragleave 在指针经过子元素时也触发，高亮疯狂闪烁；应配对 dragenter/dragleave 计数或用 pointer 判断。",
    "change 后没清空 input.value，再次选择同一个文件不触发 change 事件。",
    "addFile 不校验类型与大小，任何文件都进列表；超限只该跳过并提示。",
    "移除文件时没 clearInterval，进度定时器泄漏继续跑。",
    "dropzone 不可聚焦（没 tabindex 也没 role=button），键盘用户无法打开文件对话框。"
  ],
  "effectTags": [
    "上传",
    "拖拽",
    "文件列表",
    "进度条",
    "表单"
  ]
};

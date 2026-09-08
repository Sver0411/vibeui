import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "打字机文字",
    "en": "Typewriter Effect",
    "aliases": [
      "打字效果",
      "逐字输出",
      "Type Loop"
    ],
    "pattern": "Text · Type-Erase Loop",
    "principle": "setTimeout 链驱动状态机：打字 90ms/字、删完停 1600ms 后以 45ms/字回删，slice(0, visible) 截取文本重写 textContent，光标用 steps(1) 关键帧做方块硬切闪烁。"
  },
  "prompts": {
    "short": "做一个打字机效果：多段文案逐字打出、停顿、逐字删除后循环下一段，带闪烁光标，原生 JS。",
    "standard": "用原生 JavaScript 实现打字机循环：\n1. 文案数组 PHRASES，状态：phraseIndex / visible / erasing；\n2. setTimeout 链：打字 90ms/字，打满后停 1600ms，再以 45ms/字删除（删除比打字快一倍），删空后 350ms 切下一段；\n3. 每步 el.textContent = phrase.slice(0, visible)；\n4. 光标：2px 竖条，animation 0.9s steps(1) infinite，0%–55% 显示、56%–100% 隐藏（硬切无渐变）；\n5. 文本容器 min-height: 1em + white-space: nowrap 防空文本塌陷与换行跳动；\n6. visibilitychange 时清掉/重建 timer，切后台暂停。\n不引入动画库。",
    "refined": "实现可配置的打字机：\n- 打字速度：默认 90ms/字；删除速度：默认 45ms/字（必须快于打字）；\n- 段末停顿：默认 1600ms；段间切换：默认 350ms；\n- 光标：默认 0.9s steps(1)，静止态 1.4s；\n- 首字延迟：默认 500ms。\n实现约束：用 textContent 截断而非逐字插入 span；光标闪烁必须 steps(1) 硬切，用 ease 会变成呼吸灯；prefers-reduced-motion 下直接静态显示第一段完整文案、光标停闪。\n验收标准：① 循环多段不错乱不重入；② 页面切后台暂停、回前台继续无跳跃；③ 文本长度变化时布局不抖动。"
  },
  "knobs": [
    {
      "name": "打字速度 TYPE_MS",
      "default": "90ms",
      "range": "50 – 150 (ms)",
      "effect": "每打一个字的间隔，越小越接近真人急促敲击。"
    },
    {
      "name": "删除速度 ERASE_MS",
      "default": "45ms",
      "range": "20 – 80 (ms)",
      "effect": "回删间隔，通常设为打字的一半制造节奏差。"
    },
    {
      "name": "段末停顿 HOLD_MS",
      "default": "1600ms",
      "range": "800 – 3000 (ms)",
      "effect": "整句打完后停留的时间，给用户读完一句的窗口。"
    },
    {
      "name": "光标闪烁 caret blink",
      "default": "0.9s steps(1)（静止态 1.4s）",
      "range": "0.5s – 1.5s",
      "effect": "方块光标硬切闪烁周期，必须用 steps 保持二值透明度。"
    }
  ],
  "pitfalls": [
    "光标闪烁用 opacity 渐变过渡而不是 steps(1)，变成柔和呼吸灯，完全丢失打字机质感。",
    "文本容器没设 min-height，删除到空字符串瞬间行高塌陷，下方内容上下跳。",
    "visibilitychange 不清 setTimeout，切后台期间定时器堆积，回前台时打字连珠炮式补帧。",
    "删除速度慢于或等于打字速度，循环显得拖沓——回删应明显更快。",
    "递归 setTimeout 没保存 timer 句柄，无法暂停或清理，组件卸载后仍在改 DOM。",
    "prefers-reduced-motion 下仍循环打删，敏感用户被持续文字变化干扰。"
  ],
  "effectTags": [
    "打字机",
    "文字循环",
    "光标",
    "hero"
  ]
};

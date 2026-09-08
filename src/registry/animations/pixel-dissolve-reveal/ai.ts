import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "像素溶解显现",
    "en": "Pixel Dissolve Reveal",
    "aliases": [
      "像素揭示",
      "马赛克溶解",
      "Pixelate Reveal"
    ],
    "pattern": "Canvas · Pixel Dissolve",
    "principle": "Canvas 以 6px 网格逐格绘制，预生成哈希噪声扰动每个格子的溶解阈值，自动模式下溶解前沿沿对角线 ping-pong 推进，鼠标模式下以指针为圆心的半径揭示，边缘用 smoothstep 混出颗粒过渡带。"
  },
  "prompts": {
    "short": "用 Canvas 做一个像素溶解效果：画面由小方块网格组成，一道溶解前沿扫过时方块逐渐显现/消隐，鼠标移入时以指针为圆心揭示。",
    "standard": "用原生 Canvas 2D 实现像素溶解显现：\n1. 以 CELL 6px 划分网格，逐格 fillRect 绘制，格子多画 0.45px 防缝隙；\n2. 用 sin 哈希（x*127.1 + y*311.7）生成 Float32Array 噪声场，给每格溶解阈值加随机扰动，让前沿呈颗粒状而非直线；\n3. 前后两套 hsl 配色函数，reveal 值用 smoothstep 从底色混到目标色；\n4. 自动模式：5.2s 一轮 ping-pong，前沿沿对角线推进；\n5. 指针模式：以 pointer 为圆心、半径 0.42×max(w,h) 揭示；\n6. devicePixelRatio 上限 1.5，ResizeObserver 重建网格。",
    "refined": "实现可配置的像素溶解 Canvas：\n- CELL：默认 6px（3 – 12px，越小越细腻越耗性能）；\n- 噪声扰动幅度：默认 ±94px 投影到前沿（0 = 笔直对角线）；\n- 周期：默认 5200ms ping-pong；\n- 指针半径：默认 0.42 × max(w, h)。\n实现约束：噪声用预计算数组而非每帧 Math.random（保证逐帧稳定可复现）；globalAlpha 画完即复位；监听 visibilitychange 暂停 rAF；prefers-reduced-motion 下不开自动动画、仅指针移动时重绘单帧。\n验收标准：① 溶解边缘呈噪点颗粒而非锯齿直线；② 缩放窗口网格不错位；③ 页面隐藏时 rAF 暂停无空转。"
  },
  "knobs": [
    {
      "name": "格子尺寸 CELL",
      "default": "6",
      "range": "3 – 12 (px)",
      "effect": "像素颗粒粗细。越小画面越细腻，绘制格子数按平方增长。"
    },
    {
      "name": "溶解周期 cycle",
      "default": "5200ms",
      "range": "3000 – 10000 (ms)",
      "effect": "自动模式一轮往返时长，ping-pong 前半程溶解、后半程复原。"
    },
    {
      "name": "噪声扰动 grain jitter",
      "default": "±94px（自动）/ ±76px（指针）",
      "range": "0 – 150",
      "effect": "溶解前沿的颗粒破碎程度，0 时退化为整齐的几何推进。"
    },
    {
      "name": "指针揭示半径 radius",
      "default": "0.42 × max(width, height)",
      "range": "0.2 – 0.8",
      "effect": "鼠标模式下以指针为圆心的显现范围大小。"
    },
    {
      "name": "DPR 上限",
      "default": "1.5",
      "range": "1 – 2",
      "effect": "画布物理像素缩放上限，限制高 DPI 屏的绘制开销。"
    }
  ],
  "pitfalls": [
    "每帧用 Math.random 生成噪声，溶解边缘会疯狂闪烁——必须预计算噪声数组保证逐帧一致。",
    "格子只画 CELL 尺寸不留 0.45px 重叠，缩放时网格间出现发丝缝。",
    "globalAlpha 设置后忘记复位为 1，后续绘制全部变成半透明。",
    "canvas 尺寸只设 CSS 不乘 devicePixelRatio，高分屏上像素糊成一团。",
    "rAF 循环不监听 visibilitychange，切到后台标签页仍在全量重绘空转。",
    "resize 后不重建噪声数组，新格子拿到 undefined 阈值导致整块不显现。"
  ],
  "effectTags": [
    "像素",
    "溶解",
    "Canvas",
    "揭示"
  ]
};

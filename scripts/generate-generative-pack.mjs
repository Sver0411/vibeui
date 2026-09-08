import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputRoot = path.join(
  projectRoot,
  "src",
  "registry",
  "generated",
  "generative-pack",
);
const manifestPath = path.join(
  projectRoot,
  "src",
  "registry",
  "generated",
  "generative-pack.ts",
);
const engineTemplate = fs.readFileSync(
  path.join(scriptDir, "generative-engine.template.js"),
  "utf8",
);

/**
 * This catalog intentionally favors mechanisms that need math, simulation,
 * raster processing, or multi-stage timing. It is not a list of cosmetic
 * button variants. The generator keeps every preset independently copyable
 * while sharing one audited runtime template in the repository.
 */
const effects = [
  {
    slug: "reaction-diffusion-ink",
    name: "反应扩散墨迹",
    renderer: "reaction",
    label: "Reaction diffusion",
    description: "Gray–Scott 双物质反应在像素网格里持续长出珊瑚状墨迹，点击可注入新的生长核心。",
    hue: 168,
    mark: "LIVING INK",
  },
  {
    slug: "fluid-dye-vortex",
    name: "流体染料涡旋",
    renderer: "flow",
    label: "Velocity field",
    description: "低分辨率速度场与粒子平流共同形成染料涡旋，指针会改变局部流向和卷吸强度。",
    hue: 198,
    mark: "CURRENT",
  },
  {
    slug: "marching-metaball-contours",
    name: "等值线融球",
    renderer: "metaballs",
    label: "Scalar contours",
    description: "多个移动势场经过分层阈值采样，形成会连续融合、分裂的液态等值线雕塑。",
    hue: 266,
    mark: "MERGE",
  },
  {
    slug: "voronoi-prism-field",
    name: "棱镜 Voronoi 光场",
    renderer: "voronoi",
    label: "Voronoi prism",
    description: "动态种子点的最近与次近距离被映射为晶格边缘、折射色带和移动扫光。",
    hue: 186,
    mark: "PRISM",
  },
  {
    slug: "topographic-noise-slices",
    name: "地形噪声切片",
    renderer: "topography",
    label: "Noise contours",
    description: "多层程序噪声被量化成纸雕般的等高线切片，并随指针产生局部视差。",
    hue: 148,
    mark: "TERRAIN",
  },
  {
    slug: "pixel-sort-tide",
    name: "潮汐像素排序",
    renderer: "pixel-sort",
    label: "Pixel sorting",
    description: "程序化色带被移动波面按亮度分段拉伸，形成潮汐般起伏的像素长丝。",
    hue: 222,
    mark: "TIDE",
  },
  {
    slug: "chromatic-halftone-lens",
    name: "色差网点透镜",
    renderer: "halftone",
    label: "Halftone lens",
    description: "CMY 网点在指针透镜内改变点径、间距与通道偏移，产生放大和色差边缘。",
    hue: 328,
    mark: "FOCUS",
    type: "component",
    category: "primitives",
  },
  {
    slug: "recursive-feedback-portal",
    name: "递归反馈隧道",
    renderer: "feedback",
    label: "Recursive feedback",
    description: "上一层画面经过缩放、旋转与衰减后递归套入中心，形成可改变倾角的无限入口。",
    hue: 252,
    mark: "PORTAL",
  },
  {
    slug: "glyph-particle-morph",
    name: "字形粒子变形",
    renderer: "glyph",
    label: "Glyph particles",
    description: "从离屏文字掩膜采样目标点，数百粒子以弹簧寻位在字形和轨道阵列之间重组。",
    hue: 170,
    mark: "VIBE",
  },
  {
    slug: "electric-branch-field",
    name: "分形电弧网络",
    renderer: "electric",
    label: "Fractal lightning",
    description: "递归中点位移连接漂移锚点，并生成衰减支路、双层辉光与短暂残影。",
    hue: 214,
    mark: "ARC",
  },
  {
    slug: "boid-murmuration",
    name: "鸟群涌动",
    renderer: "boids",
    label: "Flocking system",
    description: "分离、对齐、聚合和避障规则让粒子群像鸟群一样收缩、展开并重新汇聚。",
    hue: 188,
    mark: "FLOCK",
  },
  {
    slug: "chromatic-gravity-orbits",
    name: "色散引力轨道",
    renderer: "gravity",
    label: "Gravity orbits",
    description: "双引力核心弯曲大量粒子轨迹，并用 RGB 错位与衰减形成交错发光轨道。",
    hue: 280,
    mark: "ORBIT",
  },
  {
    slug: "sandpile-spectrum",
    name: "沙堆光谱曼陀罗",
    renderer: "sandpile",
    label: "Cellular sandpile",
    description: "Abelian 沙堆邻域坍塌规则从中心生长出高密度、强对称的像素曼陀罗。",
    hue: 28,
    mark: "SPECTRUM",
  },
  {
    slug: "pixel-wave-interference",
    name: "像素波干涉场",
    renderer: "interference",
    label: "Wave interference",
    description: "多个波源叠加后共同控制像素阵列的尺寸、亮度和位移，形成清晰莫尔干涉。",
    hue: 204,
    mark: "PHASE",
  },
  {
    slug: "procedural-caustic-map",
    name: "程序化水波焦散",
    renderer: "caustic",
    label: "Caustic map",
    description: "移动波面的梯度与高亮阈值生成类似阳光穿过水面的聚焦网纹。",
    hue: 190,
    mark: "CAUSTIC",
  },
  {
    slug: "clifford-attractor-bloom",
    name: "Clifford 奇异吸引子",
    renderer: "attractor",
    label: "Strange attractor",
    description: "Clifford 方程的数千次迭代累积成带密度层次的对称数学花体。",
    hue: 314,
    mark: "ATTRACT",
  },
  {
    slug: "noise-ribbon-loom",
    name: "噪声丝带编织",
    renderer: "ribbons",
    label: "Curl ribbon loom",
    description: "多组贝塞尔线束受 curl 风场偏转，以透明度和前后层级编织出流动织物。",
    hue: 262,
    mark: "LOOM",
  },
  {
    slug: "sdf-glass-refraction",
    name: "SDF 玻璃折射体",
    renderer: "refraction",
    label: "SDF refraction",
    description: "可变形有符号距离场扭曲程序网格，并用边缘梯度制造厚玻璃和 RGB 棱镜光。",
    hue: 188,
    mark: "GLASS",
  },
  {
    slug: "refractive-glass-type",
    name: "折射玻璃文字",
    renderer: "typography",
    style: "glass",
    label: "Refractive type",
    description: "移动玻璃透镜只在局部扭曲标题，同时生成边缘放大、色散与高光扫过。",
    hue: 186,
    mark: "REFRACT",
  },
  {
    slug: "chrome-relief-lettering",
    name: "液态铬浮雕字",
    renderer: "typography",
    style: "chrome",
    label: "Chrome relief",
    description: "多层高度、镜面高光和流动反射带把文字塑造成液态金属浮雕。",
    hue: 220,
    mark: "CHROME",
  },
  {
    slug: "ink-bleed-lettering",
    name: "墨迹渗化字",
    renderer: "typography",
    style: "ink",
    label: "Ink bleed type",
    description: "噪声阈值与多重描边让字形边缘像湿墨一样扩散、聚拢并拉出细丝。",
    hue: 162,
    mark: "BLEED",
  },
  {
    slug: "prismatic-shadow-stack",
    name: "棱镜错色叠影",
    renderer: "typography",
    style: "prism",
    label: "Prismatic echo",
    description: "RGB 文字副本经过不同相位位移，以 Screen 叠加形成动态棱镜残影。",
    hue: 292,
    mark: "SPECTRA",
  },
  {
    slug: "halftone-focus-poster",
    name: "聚焦半调海报",
    renderer: "halftone",
    style: "poster",
    label: "Focus halftone",
    description: "标题被转换为点阵，一道移动焦点波让附近圆点依次放大、变色并恢复。",
    hue: 16,
    mark: "POSTER",
    type: "component",
    category: "cards",
  },
  {
    slug: "heat-haze-wordmark",
    name: "热浪扭曲字标",
    renderer: "typography",
    style: "heat",
    label: "Heat haze type",
    description: "狭窄热浪带横扫字标，仅在经过区域产生波纹折射与镜像拖尾。",
    hue: 18,
    mark: "MIRAGE",
  },
  {
    slug: "topographic-type-mask",
    name: "地形线文字",
    renderer: "topography-type",
    label: "Topographic type",
    description: "多层生成式等高线被裁进超大文字内部，以不同速度流动并产生视差。",
    hue: 154,
    mark: "TOPO",
  },
  {
    slug: "bezier-ribbon-monogram",
    name: "贝塞尔丝带字母",
    renderer: "ribbons",
    style: "monogram",
    label: "Ribbon monogram",
    description: "多条三次贝塞尔丝带持续改变控制点，并周期性汇聚成品牌字母。",
    hue: 342,
    mark: "V",
  },
  {
    slug: "symbol-morph-matrix",
    name: "符号形变矩阵",
    renderer: "morph",
    label: "Shape morphing",
    description: "网格中的等拓扑点集按相位差在圆、星、箭头和抽象符号间连续变形。",
    hue: 246,
    mark: "MORPH",
    type: "component",
    category: "primitives",
  },
  {
    slug: "woven-stroke-knot",
    name: "交织光轨结",
    renderer: "knot",
    label: "Woven light knot",
    description: "闭合光轨在交点交替遮盖上下层，形成真正具有穿插关系的动态光结。",
    hue: 176,
    mark: "KNOT",
  },
  {
    slug: "elastic-route-map",
    name: "弹性路线网络",
    renderer: "route",
    label: "Elastic routing",
    description: "节点缓慢漂移，连接它们的贝塞尔路线根据动量弯曲并以弹簧阻尼回弹。",
    hue: 208,
    mark: "ROUTE",
    type: "component",
    category: "navigation",
  },
  {
    slug: "contour-cut-poster",
    name: "等高切片海报",
    renderer: "poster",
    label: "Contour slices",
    description: "多条闭合轮廓把图文切成相邻区域，各切片沿法线错位后重新咬合。",
    hue: 8,
    mark: "CUT",
  },
  {
    slug: "sliced-wave-headline",
    name: "切片波浪标题",
    renderer: "typography",
    style: "slice",
    label: "Sliced headline",
    description: "标题被复制进十余条水平切片，各带按正弦相位横移并带有克制色边。",
    hue: 216,
    mark: "WAVELINE",
  },
  {
    slug: "echo-tunnel-type",
    name: "回声隧道字",
    renderer: "typography",
    style: "echo",
    label: "Type tunnel",
    description: "多层描边文字向画面深处连续缩放，亮度和线宽波沿层级传播。",
    hue: 268,
    mark: "ECHO",
  },
  {
    slug: "kinetic-kerning-field",
    name: "动态字距力场",
    renderer: "typography",
    style: "kerning",
    label: "Kerning field",
    description: "字符受移动力场影响，在字距、旋转、压缩和基线之间产生弹性传递。",
    hue: 172,
    mark: "KINETIC",
  },
  {
    slug: "glyph-shard-assembly",
    name: "字形碎片组装",
    renderer: "shards",
    label: "Glyph shards",
    description: "不规则多边形碎片携带旋转惯性散开，再错峰回到完整字形轮廓。",
    hue: 302,
    mark: "FORM",
  },
  {
    slug: "ascii-depth-portrait",
    name: "ASCII 景深肖像",
    renderer: "ascii",
    label: "ASCII depth",
    description: "程序亮度场映射为字符与字号，移动焦平面让字符从模糊小点跃迁为清晰字形。",
    hue: 196,
    mark: "ASCII",
  },
  {
    slug: "scanline-extrusion-type",
    name: "扫描线挤压字",
    renderer: "typography",
    style: "scanline",
    label: "Scan extrusion",
    description: "发光扫描线经过标题时，对应文字切片向前挤出并留下短暂阴影层。",
    hue: 126,
    mark: "SIGNAL",
  },
  {
    slug: "procedural-caustic-field",
    name: "程序焦散光场",
    renderer: "caustic",
    style: "field",
    label: "Optical caustics",
    description: "多组移动波源与高亮压缩形成大片折叠、聚散的程序焦散光纹。",
    hue: 184,
    mark: "LIGHT",
  },
  {
    slug: "volumetric-light-shafts",
    name: "体积光束穹顶",
    renderer: "light-shafts",
    label: "Volumetric shafts",
    description: "多层半透明光锥以加色混合、噪声抖动和动态遮挡构成有纵深的舞台光束。",
    hue: 46,
    mark: "VOLUME",
  },
  {
    slug: "chromatic-refraction-lens",
    name: "色散折射透镜",
    renderer: "refraction",
    style: "chromatic",
    label: "Chromatic lens",
    description: "指针透镜对程序背景做径向扭曲，并以不同偏移重绘 RGB 通道形成真实色散。",
    hue: 286,
    mark: "LENS",
  },
  {
    slug: "wave-interference-spectrum",
    name: "波干涉光谱",
    renderer: "interference",
    style: "spectrum",
    label: "Interference spectrum",
    description: "多个波源实时叠加相位，将相长与相消区域映射为流动的彩色干涉条纹。",
    hue: 324,
    mark: "WAVES",
  },
  {
    slug: "raymarched-glass-orb",
    name: "光线步进玻璃球",
    renderer: "glass-orb",
    label: "Glass raymarch study",
    description: "折射、菲涅耳、高光与程序背景采样共同塑造会随指针转动的厚玻璃雕塑。",
    hue: 188,
    mark: "ORBITAL",
  },
  {
    slug: "thin-film-iridescent-panel",
    name: "薄膜虹彩面板",
    renderer: "film",
    label: "Thin-film material",
    description: "多层锥形色场依据指针入射角漂移，让浅色面板呈现油膜般的连续光谱。",
    hue: 278,
    mark: "IRIS",
    type: "component",
    category: "cards",
  },
  {
    slug: "anisotropic-metal-dial",
    name: "各向异性金属旋钮",
    renderer: "dial",
    label: "Anisotropic dial",
    description: "密集径向拉丝、方向性高光和惯性角度共同模拟可拖动的精密金属旋钮。",
    hue: 216,
    mark: "DIAL",
    type: "component",
    category: "primitives",
  },
  {
    slug: "embossed-relief-surface",
    name: "动态浮雕压印",
    renderer: "relief",
    label: "Embossed surface",
    description: "多层位移与光源方向把纯文字和几何压成浮雕，光线会跟随指针扫过表面。",
    hue: 42,
    mark: "RELIEF",
  },
  {
    slug: "interactive-voronoi-mosaic",
    name: "动态 Voronoi 晶格",
    renderer: "voronoi",
    style: "mosaic",
    label: "Interactive mosaic",
    description: "动态胞元根据指针改变种子位置、视觉面积与色相，形成实时生长的晶格马赛克。",
    hue: 336,
    mark: "MOSAIC",
    type: "component",
    category: "cards",
  },
  {
    slug: "isometric-voxel-city",
    name: "等距体素光城",
    renderer: "voxel",
    label: "Isometric voxels",
    description: "程序立方柱按深度顺序绘制，指针控制光照方向并让高度以波阵传播。",
    hue: 200,
    mark: "VOXEL",
  },
  {
    slug: "hyperbolic-tile-disk",
    name: "双曲万花筒圆盘",
    renderer: "hyperbolic",
    label: "Hyperbolic tiling",
    description: "庞加莱圆盘中的递归几何随视觉焦点移动，产生保持边界的无限双曲铺砌。",
    hue: 258,
    mark: "INFINITE",
  },
  {
    slug: "spherical-dot-lattice",
    name: "球面点阵波",
    renderer: "sphere",
    label: "Spherical lattice",
    description: "Fibonacci 球面点集经手写 3D 投影与深度排序，并在球壳上产生局部凹陷波。",
    hue: 174,
    mark: "SPHERE",
  },
  {
    slug: "gray-scott-reaction-field",
    name: "反应扩散生命纹理",
    renderer: "reaction",
    style: "cellular",
    label: "Gray–Scott field",
    description: "双缓冲浓度网格持续运行 Gray–Scott 方程，播种后长出细胞和斑马纹结构。",
    hue: 314,
    mark: "LIFE",
  },
  {
    slug: "strange-attractor-trails",
    name: "奇异吸引子光轨",
    renderer: "attractor",
    style: "trail",
    label: "Attractor trails",
    description: "数千采样点迭代 De Jong 参数并以加色残影累积成精细数学云。",
    hue: 202,
    mark: "CHAOS",
  },
  {
    slug: "kinetic-guilloche-seal",
    name: "动力雕花印章",
    renderer: "guilloche",
    label: "Kinetic guilloche",
    description: "多组内外摆线与谐波曲线错相叠绘成钞票式雕花，参数会连续改变齿比。",
    hue: 164,
    mark: "SEAL",
  },
  {
    slug: "spring-patch-cable",
    name: "弹性接线面板",
    renderer: "cable",
    label: "Spring patch cable",
    description: "可拖动插头牵引带质量与阻尼的软线，靠近端口时磁性吸附并传递光脉冲。",
    hue: 204,
    mark: "PATCH",
    type: "component",
    category: "forms",
  },
  {
    slug: "origami-fold-controller",
    name: "折纸折叠控制器",
    renderer: "origami",
    label: "Origami controller",
    description: "多个面片围绕共享折线作透视铰链运动，使控制器像真实折纸一样展开与收拢。",
    hue: 20,
    mark: "FOLD",
    type: "component",
    category: "primitives",
  },
];

function hashSlug(slug) {
  let value = 2166136261;
  for (const char of slug) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildHtml(effect) {
  return `<div class="glab-stage">
  <section class="glab-demo" aria-labelledby="glab-title">
    <div class="glab-frame" data-renderer="${escapeHtml(effect.renderer)}">
      <canvas class="glab-canvas" aria-label="${escapeHtml(effect.name)}实时程序化预览"></canvas>
      <header class="glab-heading">
        <div>
          <span>GENERATIVE LAB / ${escapeHtml(effect.label)}</span>
          <h2 id="glab-title">${escapeHtml(effect.name)}</h2>
        </div>
        <i aria-hidden="true"></i>
      </header>
      <div class="glab-index" aria-hidden="true">
        <span>${String(effect.order).padStart(2, "0")}</span>
        <b></b>
        <span>pointer reactive</span>
      </div>
    </div>
    <footer class="glab-footer">
      <p>移动指针改变局部参数，点击可切换生成状态。</p>
      <button class="glab-shift" type="button">切换场景</button>
    </footer>
  </section>
</div>
`;
}

function buildCss(effect) {
  return `:root{--glab-hue:${effect.hue};--glab-accent:hsl(${effect.hue} 56% 38%);--glab-soft:hsl(${effect.hue} 52% 94%)}
html,body{min-height:100%;background:#fafafa}
.glab-stage{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:#fafafa;color:#18181b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.glab-demo{width:min(390px,calc(100vw - 24px))}
.glab-frame{position:relative;aspect-ratio:16/10;overflow:hidden;border:1px solid rgba(24,24,27,.08);border-radius:22px;background:linear-gradient(145deg,#fff,hsl(var(--glab-hue) 34% 97%));box-shadow:0 24px 58px rgba(24,24,27,.09),inset 0 1px 0 rgba(255,255,255,.85);cursor:crosshair;isolation:isolate}
.glab-canvas{display:block;width:100%;height:100%}
.glab-heading{position:absolute;inset:16px 17px auto;display:flex;align-items:flex-start;justify-content:space-between;gap:18px;pointer-events:none;mix-blend-mode:multiply}
.glab-heading span,.glab-index,.glab-footer p{color:#71717a;font-size:8px;font-weight:680;letter-spacing:.09em;text-transform:uppercase}
.glab-heading h2{max-width:270px;margin:5px 0 0;color:#18181b;font-size:23px;line-height:1;letter-spacing:-.045em}
.glab-heading i{width:9px;height:9px;margin-top:3px;border-radius:50%;background:var(--glab-accent);box-shadow:0 0 0 7px hsl(var(--glab-hue) 54% 44%/.08),0 0 22px hsl(var(--glab-hue) 60% 48%/.2)}
.glab-index{position:absolute;left:17px;right:17px;bottom:13px;display:flex;align-items:center;gap:7px;pointer-events:none;letter-spacing:.05em}
.glab-index b{height:1px;flex:1;background:linear-gradient(90deg,hsl(var(--glab-hue) 54% 42%/.45),transparent)}
.glab-footer{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:10px 4px 0}
.glab-footer p{margin:0;letter-spacing:.03em;text-transform:none}
.glab-footer button{padding:5px 0;border:0;border-bottom:1px solid #a1a1aa;background:transparent;color:#27272a;font-size:9px;font-weight:680;cursor:pointer}
.glab-footer button:hover{color:var(--glab-accent);border-color:var(--glab-accent)}
.glab-footer button:focus-visible{outline:3px solid hsl(var(--glab-hue) 55% 45%/.15);outline-offset:4px;border-radius:2px}
@media(max-width:360px){.glab-heading h2{font-size:20px}.glab-footer p{max-width:230px}}
@media(prefers-reduced-motion:reduce){.glab-frame{cursor:default}.glab-heading i{box-shadow:0 0 0 7px hsl(var(--glab-hue) 54% 44%/.08)}}
`;
}

const heavyRenderers = new Set(["reaction", "voronoi", "boids", "attractor"]);
const metas = effects.map((effect, index) => {
  effect.order = index + 1;
  // This pack is intentionally classified as motion/effects. Even when a
  // preset reacts to pointer input, it is not called a component unless it
  // produces useful application state or output.
  const type = "animation";
  const category = "animations";
  const heavy = heavyRenderers.has(effect.renderer);
  return {
    id: effect.slug,
    slug: effect.slug,
    name: effect.name,
    description: effect.description,
    category,
    subcategory: effect.label,
    type,
    tags: [
      "生成艺术",
      "程序化",
      effect.label,
      type === "component" ? "交互组件" : "高级动效",
      "指针响应",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Canvas 2D"],
    styles: ["生成艺术", "实验性", "高级"],
    difficulty: "advanced",
    featured: false,
    isNew: true,
    popular: index < 18 || index % 7 === 0,
    responsive: true,
    previewBackground: "light",
    engine: "Canvas 2D",
    performanceTier: heavy ? "heavy" : "medium",
    reducedMotionFallback: "停止循环并绘制一张包含核心结构的静态程序化画面。",
    compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
    author: "VibeUI Team",
    version: "1.0.0",
    createdAt: "2026-08-31",
    updatedAt: "2026-08-31",
    dir: `generated/generative-pack/${effect.slug}`,
  };
});

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(
  manifestPath,
  `import type { UIResourceMeta } from "@/types/resource";\n\n/** Generated by scripts/generate-generative-pack.mjs. */\nexport const GENERATIVE_PACK: UIResourceMeta[] = ${JSON.stringify(metas, null, 2)};\n`,
);

effects.forEach((effect) => {
  const filesDir = path.join(outputRoot, effect.slug, "files");
  fs.mkdirSync(filesDir, { recursive: true });
  const runtimeConfig = {
    slug: effect.slug,
    renderer: effect.renderer,
    style: effect.style ?? "default",
    hue: effect.hue,
    mark: effect.mark,
    seed: hashSlug(effect.slug),
    heavy: heavyRenderers.has(effect.renderer),
  };
  fs.writeFileSync(path.join(filesDir, "index.html"), buildHtml(effect));
  fs.writeFileSync(path.join(filesDir, "styles.css"), buildCss(effect));
  fs.writeFileSync(
    path.join(filesDir, "script.js"),
    engineTemplate.replace("__GENERATIVE_CONFIG__", JSON.stringify(runtimeConfig)),
  );
});

console.log(`Generated ${effects.length} advanced generative resources.`);

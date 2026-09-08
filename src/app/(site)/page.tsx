import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/registry/client";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Reveal } from "@/components/common/Reveal";
import { HeroGlow } from "@/components/home/HeroGlow";
import { HeroActions } from "@/components/home/HeroActions";
import { HomeBento } from "@/components/home/HomeBento";
import { LiveDemo } from "@/components/home/LiveDemo";

export default function HomePage() {
  const featured = RESOURCES.filter((r) => r.type === "component" && r.featured).slice(0, 6);
  const liveSlug = "dot-loader";
  const liveName = RESOURCES.find((r) => r.slug === liveSlug)?.name ?? "实时动效";

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      {/* Hero：一句话 + 两个动作，光晕跟随光标 */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <HeroGlow />
        <h1 className="max-w-3xl text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.95]">
          看见效果，
          <br />
          <span className="text-muted-foreground">直接上手。</span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-7 text-muted-foreground sm:text-base">
          {RESOURCES.length} 个能跑的界面素材。玩一玩，喜欢就带走。
        </p>
        <div className="mt-9">
          <HeroActions />
        </div>
      </section>

      {/* 互动入口 Bento */}
      <section aria-label="资源入口" className="pb-16">
        <Reveal>
          <HomeBento
            counts={{
              components: RESOURCES.filter((r) => r.type === "component").length,
              animations: RESOURCES.filter((r) => r.type === "animation").length,
              icons: RESOURCES.filter((r) => r.type === "icon").length,
              blocks: RESOURCES.filter((r) => r.type === "layout").length,
              templates: RESOURCES.filter((r) => r.type === "template").length,
            }}
            liveSlug={liveSlug}
            liveName={liveName}
          />
        </Reveal>
      </section>

      {/* 现场试玩：组件原尺寸直接跑在页面上 */}
      <section className="border-t border-border py-14" aria-label="现场试玩">
        <LiveDemo />
      </section>

      {/* 精选组件 */}
      <section className="border-t border-border py-14" aria-label="精选组件">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl">精选</h2>
          <Link
            href="/components"
            className="group inline-flex items-center gap-1 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            全部
            <ArrowRight
              size={14}
              className="transition-transform duration-normal group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((meta, index) => (
            <Reveal key={meta.slug} delay={index * 60}>
              <ResourceCard meta={meta} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

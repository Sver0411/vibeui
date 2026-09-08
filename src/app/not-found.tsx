import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-semibold tracking-tight text-muted-foreground/40">404</p>
      <div>
        <h1 className="text-lg font-semibold">页面不存在</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-6 text-muted-foreground">
          你要找的资源或页面可能已被移动、删除，或从未存在。资源库里还有很多其他内容等你探索。
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2.5">
        <Link
          href="/"
          className="rounded-md bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground"
        >
          返回首页
        </Link>
        <Link
          href="/explore"
          className="rounded-md border border-border px-4 py-2 text-[13px] font-medium hover:bg-surface-hover"
        >
          探索资源
        </Link>
      </div>
    </div>
  );
}

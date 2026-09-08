import { Sidebar } from "@/components/layout/Sidebar";
import { SiteFooter } from "@/components/layout/SiteFooter";

/** Chrome for all main site pages (embed pages opt out of this group). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:shadow-md"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:pl-[212px]">
        <main id="main" className="min-h-[calc(100vh-3.5rem)] pb-[76px] lg:pb-0">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

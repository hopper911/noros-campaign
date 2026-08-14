import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function AdminShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-site py-3">
          <h1 className="min-w-0 truncate text-sm font-medium tracking-tight text-white sm:text-base">
            {title}
          </h1>
          {actions}
        </div>
      </div>
      <main id="main-content" className="min-w-0 overflow-x-clip bg-black px-site py-site">{children}</main>
      <SiteFooter />
    </>
  );
}

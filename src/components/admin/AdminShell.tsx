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
      <div className="bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-site py-3 sm:flex-row sm:items-center">
          <h1 className="min-w-0 text-balance text-sm font-medium tracking-tight text-white sm:truncate sm:text-base">
            {title}
          </h1>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </div>
      <main id="main-content" className="min-w-0 overflow-x-clip bg-black px-site py-site">{children}</main>
      <SiteFooter />
    </>
  );
}

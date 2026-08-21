import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

function blockDownload(pathname: string): boolean {
  if (pathname === "/figma-kit.zip") return true;
  if (pathname.startsWith("/figma-kit/") && pathname.toLowerCase().endsWith(".zip")) {
    return true;
  }
  return false;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (blockDownload(pathname)) {
    return new NextResponse("Downloads disabled", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  // Serve kit previews inline only (discourage Save As as attachment)
  if (pathname.startsWith("/figma-kit/")) {
    const res = NextResponse.next();
    res.headers.set("Content-Disposition", "inline");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) return NextResponse.next();
  if (isLoginApi) return NextResponse.next();

  const ok = await isValidAdminSession(
    req.cookies.get(ADMIN_COOKIE)?.value,
    process.env.ADMIN_PASSWORD,
  );

  if (isLoginPage) {
    if (ok) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  if (!ok) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", req.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/figma-kit.zip",
    "/figma-kit/:path*",
  ],
};

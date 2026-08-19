import { proxy } from "./src/proxy";

export default proxy;

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};


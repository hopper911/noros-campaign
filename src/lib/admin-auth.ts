const encoder = new TextEncoder();

export const ADMIN_COOKIE = "noros_admin";

export async function adminSessionToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode("noros-admin-session"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminSession(
  cookie: string | undefined,
  password: string | undefined,
): Promise<boolean> {
  if (!cookie || !password) return false;
  const expected = await adminSessionToken(password);
  if (cookie.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < cookie.length; i += 1) {
    mismatch |= cookie.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}

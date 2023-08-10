import authMiddleware from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(...args: unknown[]) {
  const request = args[0] as NextRequest;
  const url = new URL(request.url);
  if (
    !["/login", "/forgot-password", "/reset-password", "/api"].find((path) =>
      url.pathname.startsWith(path)
    ) &&
    ![".svg", ".png", ".ttf", ".otf", ".ico"].find((ctype) =>
      url.pathname.endsWith(ctype)
    )
  ) {
    // @ts-expect-error args
    return authMiddleware(...args);
  }
  return NextResponse.next();
}

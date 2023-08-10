import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";
import {
  NextResponse,
  type NextFetchEvent,
} from "next/server";

export async function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const url = new URL(request.url);
  if (
    !["/login", "/forgot-password", "/reset-password", "/api"].find((path) =>
      url.pathname.startsWith(path)
    ) &&
    ![".svg", ".png", ".ttf", ".otf", ".ico"].find((ctype) =>
      url.pathname.endsWith(ctype)
    )
  ) {
    return withAuth({
      pages: {
        signIn: "/login",
      },
    })(request, event);
  }
  return NextResponse.next();
}

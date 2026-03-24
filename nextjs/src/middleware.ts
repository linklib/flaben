import { NextRequest, NextResponse } from "next/server";

const yandexClickIdParameterName = "yclid";
const yandexClickIdCookieName = "yclid";

export function middleware(request: NextRequest) {
  const yandexClickIdFromUrl = request.nextUrl.searchParams.get(
    yandexClickIdParameterName,
  );

  if (!yandexClickIdFromUrl) {
    return NextResponse.next();
  }

  const existingCookieValue = request.cookies.get(
    yandexClickIdCookieName,
  )?.value;
  if (existingCookieValue) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  response.cookies.set(yandexClickIdCookieName, yandexClickIdFromUrl, {
    path: "/",
    maxAge: 60 * 60 * 24 * 90, // 90 дней
    sameSite: "lax",
    secure: true,
    httpOnly: true, // серверу достаточно; если нужен JS-доступ — поставь false
  });

  return response;
}

export const config = {
  matcher: ["/:path*"],
};

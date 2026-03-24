import type { Metadata } from "next";
import "./globals.scss";

import React from "react";

export const metadata: Metadata = {
  title: "Fliben | 404",
  description: "Нет такой страницы",
};

export default function RootLayout({
  children,
  request,
}: Readonly<{
  children: React.ReactNode;

  request: React.ReactNode;
}>) {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10rem 0",
      }}
    >
      <h2>404</h2>
      <br />
      Страница не найдена
    </div>
  );
}

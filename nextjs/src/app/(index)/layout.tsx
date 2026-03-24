import React from "react";

export default function Layout({
  title,
  about,
  partnership,
  systems,
  advantages,
  projects,
  articles,
  children,
}: Readonly<{
  children: React.ReactNode;
  about: React.ReactNode;
  partnership: React.ReactNode;
  advantages: React.ReactNode;
  projects: React.ReactNode;
  articles: React.ReactNode;
  systems: React.ReactNode;
  title: React.ReactNode;
}>) {
  return (
    <>
      {title}
      {about}
      {partnership}
      {systems}
      {advantages}
      {projects}
      {articles}
      {children}
    </>
  );
}

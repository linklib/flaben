import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import React from "react";
import AppThemeProvider from "@/app/components/mui/app-theme-provider";
import AppLayout from "@/app/components/app-layout/app-layout";
import { ScrollProvider } from "./ScrollContext";
import { contentRepository } from "@/data/repositories/content.repository";
import Script from "next/script";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Fliben",
  description:
    "Fliben предлагает модульные системы воздухораспределения. Наши воздуховоды интегрируются в любые конструктивные решения вашего дома: перекрытия, фундамент, стены, стяжку пола. Все компоненты согласованы между собой, очень просто монтируются и позволяют реализовать вентиляцию на любой стадии строительства: общестрой или отделочные работы.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  request,
  video,
  // banner,
}: Readonly<{
  children: React.ReactNode;
  request: React.ReactNode;
  video: React.ReactNode;
  // banner: React.ReactNode;
}>) {
  const contactResponse = await contentRepository.getContactInfo();
  return (
    <html lang="ru">
      <head>
        <script
          type="text/javascript"
          async
          src="https://app.uiscom.ru/static/cs.min.js?k=BnOuGYYw_D2Bgsf1PGwxotVcCR5351bK"
        ></script>
        <Script
          id={"something"}
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,u){
          var s=d.createElement('script');s.defer=false;s.async=false;s.id='b242ya-script';s.src=u+'?'+(Date.now()/60000|0);
          var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://67p.b242ya.ru/static/js/b242ya.js');
        var b242yaScript = document.querySelector('#b242ya-script');
        b242yaScript.addEventListener('load', function() {
          B242YAInit({
            portal:'https://fliben.bitrix24.ru/',
            pid:'e3ca283adb46207e5a7f7730baa9f0a2'
          }); 
        });`,
          }}
        />
        <Script
          id={"metrika"}
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
              ym(92896294, 'init', {webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`,
          }}
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/92896294"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <AppThemeProvider>
          <ScrollProvider>
            <AppLayout contactInfo={contactResponse.data?.data}>
              {children}
            </AppLayout>
            {request}
            {video}
            {/*{banner}*/}
          </ScrollProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}

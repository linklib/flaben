"use client";

import * as React from "react";
import Header from "@/app/components/app-layout/components/header/header";
import Providers from "@/app/components/app-layout/components/providers/providers";
import Menu from "@/app/components/app-layout/components/menu/menu";
import HideOnscroll from "@/app/components/hide-onscroll/hide-onscroll";
import Footer from "@/app/components/app-layout/components/footer/footer";
import { ContactType } from "@/types/dto/contact/contact.type";

type Props = {
  children: React.ReactNode;
  contactInfo?: ContactType;
};

export default function AppLayout(props: Readonly<Props>) {
  const footerRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <Providers>
      <HideOnscroll>
        <Header footerRef={footerRef} />
      </HideOnscroll>
      <main>{props.children}</main>
      <Footer ref={footerRef} contactInfo={props.contactInfo} />
      <Menu footerRef={footerRef} />
    </Providers>
  );
}

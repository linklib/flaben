"use client";

import * as React from "react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function Providers(props: Readonly<Props>) {
  return <RecoilRoot>{props.children}</RecoilRoot>;
}

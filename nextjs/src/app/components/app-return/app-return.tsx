"use client";

import * as React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AppReturn(props: Props) {
  const router = useRouter();

  return (
    <button className={clsx(props.className)} onClick={() => router.back()}>
      {props.children}
    </button>
  );
}

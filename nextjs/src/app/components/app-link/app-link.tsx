"use client";

import * as React from "react";
import Link from "next/link";
import { NavLinkType } from "@/types/nav-link.type";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import css from "./app-link.module.scss";
import { useSelectedLayoutSegments } from "next/navigation";
import clsx from "clsx";

type Props = {
  text: string;
  link: NavLinkType;
};

export default function AppLink(props: Readonly<Props>) {
  const segments = useSelectedLayoutSegments();

  return (
    <Link {...props.link.props} replace={props.link.replace}>
      <button onClick={props.link.onClickCallback}>
        <AppTextSpinner
          className={clsx(
            css.container,
            segments.includes(props.link.siteLink.segment) &&
              css.container_active,
          )}
          text={props.text}
        />
      </button>
    </Link>
  );
}

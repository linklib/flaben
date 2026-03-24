import * as React from "react";
import clsx from "clsx";
import css from "./app-socials-icon.module.scss";
import Link from "next/link";

type Props = {
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function AppSocialsIcon(props: Readonly<Props>) {
  return (
    <Link href={props.href} target={"_blank"}>
      <div className={clsx(css.container)} onClick={props.onClick}>
        {props.icon}
      </div>
    </Link>
  );
}

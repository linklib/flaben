import * as React from "react";
import clsx from "clsx";
import css from "./app-nav-bar.module.scss";
import { NavLinkType } from "@/types/nav-link.type";
import AppLink from "@/app/components/app-link/app-link";

type Props = {
  links: NavLinkType[];
  vertical?: boolean;
};

export default function AppNavBar(props: Readonly<Props>) {
  return (
    <ul
      className={clsx(css.container, props.vertical && css.container_vertical)}
    >
      {props.links.map((navLink, index) => (
        <li key={`${navLink.name}_${index}`}>
          <AppLink text={navLink.name} link={navLink} />
        </li>
      ))}
    </ul>
  );
}

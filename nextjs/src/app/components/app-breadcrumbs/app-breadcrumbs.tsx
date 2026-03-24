import * as React from "react";
import clsx from "clsx";
import css from "./app-breadcrumbs.module.scss";
import { SiteLink } from "@/utils/links/site-links";
import Link from "next/link";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";

type Props = {
  links: {
    siteLink: SiteLink;
    title: string;
    active?: boolean;
  }[];
};

export default function AppBreadcrumbs(props: Props) {
  return (
    <div className={clsx(css.container)}>
      {props.links.map((link, index) => (
        <div
          key={`${link.siteLink.link()}_${index}`}
          className={css.breadcrumb}
        >
          {link.active ? (
            <Link
              href={link.siteLink.link()}
              className={clsx(css.active, css.link)}
            >
              <AppTextSpinner text={link.title} />
            </Link>
          ) : (
            <div className={css.link}>{link.title}</div>
          )}
          {index + 1 !== props.links.length && (
            <div className={css.separator}>/</div>
          )}
        </div>
      ))}
    </div>
  );
}

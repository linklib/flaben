import * as React from "react";
import clsx from "clsx";
import css from "./section-with-breadcrumbs.module.scss";
import { SiteLink } from "@/utils/links/site-links";
import AppBreadcrumbs from "@/app/components/app-breadcrumbs/app-breadcrumbs";
import AppSection from "@/app/components/app-section/app-section";
import AppContainer from "@/app/components/app-container/app-container";

type Props = {
  children: React.ReactNode;
  links: {
    siteLink: SiteLink;
    title: string;
    active?: boolean;
  }[];
};

export default function SectionWithBreadcrumbs(props: Props) {
  return (
    <AppContainer>
      <div className={clsx(css.container)}>
        <AppBreadcrumbs links={props.links} />
        <AppSection>{props.children}</AppSection>
      </div>
    </AppContainer>
  );
}

import { LinkProps } from "next/link";
import { SiteLink } from "@/utils/links/site-links";

export type NavLinkType = {
  name: string;
  siteLink: SiteLink;
  props: LinkProps;
  onClickCallback?: () => void;
  replace?: boolean;
};

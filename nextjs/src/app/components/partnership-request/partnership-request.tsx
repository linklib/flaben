import * as React from "react";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";

type Props = {
  children: React.ReactNode;
};

export default function PartnershipRequest(props: Readonly<Props>) {
  return <Link href={siteLinks.request.link()}>{props.children}</Link>;
}

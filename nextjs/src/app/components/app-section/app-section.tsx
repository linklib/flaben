import * as React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AppSection(props: Readonly<Props>) {
  return <section className={clsx(props.className)}></section>;
}

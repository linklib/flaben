import * as React from "react";

type Props = {
  description: React.ReactNode;
};

export default function Layout(props: Readonly<Props>) {
  return props.description;
}

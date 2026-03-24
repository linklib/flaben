import * as React from "react";

type Props = {
  details: React.ReactNode;
};

export default function Layout(props: Props) {
  return props.details;
}

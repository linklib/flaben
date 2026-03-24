import * as React from "react";

type Props = {
  about: React.ReactNode;
  systems: React.ReactNode;
  children: React.ReactNode;
};
export default function Layout(props: Props) {
  return (
    <>
      {props.about}
      {props.systems}
      {props.children}
    </>
  );
}

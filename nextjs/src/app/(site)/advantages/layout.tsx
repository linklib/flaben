import * as React from "react";

type Props = {
  systems: React.ReactNode;
  advantages: React.ReactNode;
  partnership: React.ReactNode;
  children: React.ReactNode;
};
export default function Layout(props: Props) {
  return (
    <>
      {props.children}
      {props.systems}
      {props.advantages}
      {props.partnership}
    </>
  );
}

import * as React from "react";

type Props = {
  description: React.ReactNode;
  projects: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      {props.description}
      {props.projects}
    </>
  );
}

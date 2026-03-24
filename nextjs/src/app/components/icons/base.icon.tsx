import * as React from "react";
import Image from "next/image";

type Props = {
  src: string;
};

export default function BaseIcon(props: Props) {
  return (
    <div
      style={{ position: "relative", width: "1.5625rem", height: "1.5625rem" }}
    >
      <Image src={props.src} alt={"icon"} fill quality={100} />
    </div>
  );
}

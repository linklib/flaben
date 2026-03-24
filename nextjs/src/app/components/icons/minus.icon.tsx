import * as React from "react";

type Props = {
  onClick?: () => void;
};

export default function MinusIcon(props: Props) {
  return (
    <svg
      onClick={props.onClick}
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 13.3549L6 11.6406L18 11.6406V13.3549L6 13.3549Z"
        fill="currentColor"
      />
    </svg>
  );
}

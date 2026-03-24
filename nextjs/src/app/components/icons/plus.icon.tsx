import * as React from "react";

type Props = {
  onClick?: () => void;
};
export default function PlusIcon(props: Props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8561 6.5H11.1418V11.643H6V13.3573H11.1418V18.5H12.8561V13.3573H18V11.643H12.8561V6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

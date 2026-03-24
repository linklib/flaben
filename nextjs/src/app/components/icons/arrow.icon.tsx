import * as React from "react";

type Props = {
  reverse?: boolean;
};

export default function ArrowIcon(props: Readonly<Props>) {
  return (
    <svg
      width="1.5625rem"
      height="1.5625rem"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: props.reverse ? "rotateZ(180deg)" : undefined }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2596 7.42734L13.3854 6.30161L19.5769 12.4931L19.5758 12.4941L19.576 12.4943L13.3845 18.6858L12.2588 17.5601L16.5185 13.3003L6.21918 13.3003L6.21918 11.7083L16.5406 11.7083L12.2596 7.42734Z"
        fill="currentColor"
      />
    </svg>
  );
}

import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  mask: string;
  name: string;
}

export const AppMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function PhoneMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    const normalizePhoneNumber = (value: string): string => {
      if (value.startsWith("8")) {
        return `+7${value.slice(1)}`;
      }
      return value;
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("Text");

      e.currentTarget.value = normalizePhoneNumber(pastedData);
      const inputElement = e.currentTarget as HTMLInputElement;
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    };

    return (
      <IMaskInput
        {...other}
        mask={other.mask}
        definitions={{
          "0": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any, maskRef: any) => {
          onChange({ target: { name: props.name, value: value || "" } });
        }}
        onPaste={handlePaste}
        overwrite
      />
    );
  },
);

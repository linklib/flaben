import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { AppMask } from "@/app/components/app-mask/app-mask";

type Props = {
  textfieldProps: TextFieldProps;
  mask?: string;
};

export default function AppTextInput(props: Readonly<Props>) {
  const [value, setValue] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      {...props.textfieldProps}
      inputProps={{
        ...props.textfieldProps.inputProps,
        onWheel: (e) => {
          e.currentTarget.blur();
        },
      }}
      value={value}
      onChange={handleChange}
      InputProps={
        props.mask
          ? {
              inputComponent: AppMask as any,
              inputProps: {
                mask: props.mask,
              },
            }
          : undefined
      }
    />
  );
}

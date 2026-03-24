import * as React from "react";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

type Props = {
  label: string;
  checkboxProps: CheckboxProps;
};

export default function AppCheckbox(props: Readonly<Props>) {
  return (
    <FormControlLabel
      control={<Checkbox {...props.checkboxProps} />}
      label={props.label}
    />
  );
}

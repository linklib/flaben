// AppRadio.tsx
import * as React from "react";
import { FormControlLabel } from "@mui/material";
import Radio from "./Radio";
import style from "./RadioButton.module.scss";

type Props = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AppRadio(props: Readonly<Props>) {
  return (
    <FormControlLabel
      className={style.label}
      control={
        <Radio
          name={props.name}
          value={props.value}
          checked={props.checked}
          disabled={props.disabled}
          onChange={props.onChange}
        />
      }
      label={props.label}
    />
  );
}

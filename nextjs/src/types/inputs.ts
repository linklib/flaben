import { TextFieldProps } from "@mui/material";

export interface AppInput {
  type: "text";
  props: TextFieldProps;
  mask?: string;
}

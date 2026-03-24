import * as React from "react";
import {
  FormControl,
  InputLabel,
  InputLabelProps,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { MenuItemProps } from "@mui/base";

type Props = {
  props: SelectProps;
  items: {
    value: string | number;
    title: string | undefined;
  }[];
  menuItemProps?: MenuItemProps;
  inputLabel?: {
    text: string;
    props?: InputLabelProps;
  };
};

export default function AppSelectInput(props: Props) {
  return (
    // <FormControl variant={"filled"} required={props.props?.required}>
    <FormControl variant={"outlined"}>
      {props.inputLabel && <InputLabel>{props.inputLabel.text}</InputLabel>}
      <Select
        {...props.props}
        // IconComponent={(props) => WorkspaceSelectArrow(props)}

        // defaultValue={defaultValue}
      >
        <MenuItem value={""} disabled style={{ display: "none" }}>
          Не выбрано
        </MenuItem>
        {props.items?.map((item, index) => (
          <MenuItem
            key={`${item.title}_${index}`}
            value={item.value}
            {...props.menuItemProps}
          >
            {item.title ?? "Нет данных"}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

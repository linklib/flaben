// Radio.tsx
import React from "react";
import styles from "./Radio.module.scss";

type RadioProps = {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio: React.FC<RadioProps> = ({ name, value, checked, disabled, onChange }) => {
  return (
    <input
      type="radio"
      className={styles.radioInput}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Radio;

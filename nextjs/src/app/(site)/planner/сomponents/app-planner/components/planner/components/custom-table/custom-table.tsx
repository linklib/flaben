import * as React from "react";
import clsx from "clsx";
import css from "./custom-table.module.scss";

type Props = {
  data: { key: React.ReactNode; value: React.ReactNode; error?: boolean }[];
};

export default function CustomTable(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      {props.data.map((row, index) => (
        <div key={`${row.key}_${index}_${row.value}`} className={css.row}>
          <div className={css.key}>{row.key}</div>
          <div className={clsx(css.value, row.error && css.value_error)}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}

import * as React from "react";
import css from "./page.module.scss";

export default function Page() {
  return (
    <div className={css.container}>
      Ваша заявка принята <span>Мы перезвоним в ближайшее время!</span>
    </div>
  );
}

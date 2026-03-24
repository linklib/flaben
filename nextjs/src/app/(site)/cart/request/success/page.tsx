import css from "./page.module.scss";
import AppPaper from "@/app/components/app-papper/app-paper";
import AppContainer from "@/app/components/app-container/app-container";

export default function Page() {
  return (
    <AppContainer>
      <div className={css.container}>
        <h2>Оформление заказа</h2>
        <AppPaper className={css.paper}>
          <h4>
            Спасибо за заказ! Наш менеджер в ближайшее время свяжется с Вами
          </h4>
        </AppPaper>
      </div>
    </AppContainer>
  );
}

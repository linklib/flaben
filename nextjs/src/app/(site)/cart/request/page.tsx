"use client";

import css from "./page.module.scss";
import { useCartValues } from "@/utils/hooks/cart-hook";
import { notFound, redirect, RedirectType } from "next/navigation";
import AppPaper from "@/app/components/app-papper/app-paper";
import CartInfo from "@/app/(site)/cart/cart-info/cart-info";
import AppContainer from "@/app/components/app-container/app-container";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import AppBreadcrumbs from "@/app/components/app-breadcrumbs/app-breadcrumbs";
import { siteLinks } from "@/utils/links/site-links";
import { phoneMask } from "@/utils/constants/constants";
import { useFormState } from "react-dom";
import { cartRequestsRepository } from "@/data/repositories/cart-request.repository";
import { useEffect, useState } from "react";
import { cartStorage } from "@/utils/features/cart-storage";
import AppRadio from "@/app/components/radio/RadioButton";

export default function Page() {
  const { amount, price, products, isPending } = useCartValues();

  const cartRequestAction = cartRequestsRepository.create.bind(
    null,
    cartStorage.getOrCreateCart(),
  );

  const [state, action] = useFormState(cartRequestAction, {
    data: null,
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  if (!products && !isPending) {
    notFound();
  }

  useEffect(() => {
    if (state.statusCode && state.statusCode < 400 && state.data) {
      cartStorage.emptyCart();
      redirect(siteLinks.cartRequestSuccess.link(), RedirectType.replace);
    }
  }, [state]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!paymentMethod) {
      setError(true);
    } else {
      const formData = new FormData(event.currentTarget);
      action(formData);
    }
  };

  return (
    <AppContainer>
      <form onSubmit={handleSubmit}>
        <div className={css.containerWithBreadcrumbs}>
          <AppBreadcrumbs
            links={[
              {
                siteLink: siteLinks.cart,
                title: "Корзина",
                active: true,
              },
              {
                siteLink: siteLinks.marketplace,
                title: "Оформление заказа",
              },
            ]}
          />
          <div className={css.container}>
            <h2>Оформление заказа</h2>
            <div className={css.page}>
              <AppPaper className={css.paper}>
                <div className={css.form}>
                  <div className={css.segment}>
                    <h4>Личные данные</h4>
                    <div className={css.row}>
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Имя",
                          name: "name",
                        }}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Фамилия",
                          name: "middleName",
                        }}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "tel",
                          label: "Телефон",
                          required: true,
                          name: "phone",
                        }}
                        mask={phoneMask}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "email",
                          label: "E-mail",
                          name: "email",
                        }}
                      />
                    </div>
                  </div>
                  <div className={css.segment}>
                    <h4>Адрес доставки</h4>
                    <div className={css.row}>
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Город",
                          name: "city",
                        }}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Улица",
                          name: "street",
                        }}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Квартира",
                          name: "flat",
                        }}
                      />
                      <AppTextInput
                        textfieldProps={{
                          type: "text",
                          label: "Дом",
                          name: "building",
                        }}
                      />
                    </div>
                  </div>
                  <div className={css.segment}>
                    <h4>Способ оплаты</h4>
                    <div className={css.segmentInner}>
                      <AppRadio
                        name="isCashPayment"
                        value="true"
                        checked={paymentMethod === "true"}
                        onChange={handlePaymentChange}
                        label="Безналичный расчет"
                      />
                      <AppRadio
                        name="isLegalPayment"
                        value="false"
                        checked={paymentMethod === "false"}
                        onChange={handlePaymentChange}
                        label="Оплата картой"
                      />
                    </div>
                    {error && (
                      <p className={css.error}>Выберите способ оплаты</p>
                    )}
                  </div>
                </div>
              </AppPaper>
              <div className={css.cart}>
                <AppPaper noOverflow>
                  <CartInfo amount={amount} price={price} request />
                </AppPaper>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AppContainer>
  );
}

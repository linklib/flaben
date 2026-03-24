import css from "./page.module.scss";
import * as React from "react";
import AppContainer from "@/app/components/app-container/app-container";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import AppPaper from "@/app/components/app-papper/app-paper";
import Image from "next/image";
import PartnershipRequest from "@/app/components/partnership-request/partnership-request";

export default async function Page() {
  return (
    <AppContainer>
      <div className={css.container}>
        <AppPaper className={css.paper}>
          <div className={css.title}>
            <h2>
              <strong>Преимущества</strong> наших систем
            </h2>
            <div className={css.title__text}>
              Мы являемся крупнейшим производителем и интегратором современных
              систем вентиляции, которые улучшают качество жизни
            </div>
          </div>
          <div className={css.footer}>
            <div className={css.footer__caption}>
              {/*Лучшие условия на рынке для наших партнеров*/}
            </div>
            <div>
              <PartnershipRequest>
                <AppButton
                  text={"Стать партнером"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </PartnershipRequest>
            </div>
          </div>
        </AppPaper>
        <AppPaper>
          <div className={css.image}>
            <Image
              src={"/images/projects-image.png"}
              alt={"projects-image"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </AppPaper>
      </div>
    </AppContainer>
  );
}

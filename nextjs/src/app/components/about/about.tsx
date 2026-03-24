import * as React from "react";
import css from "./about.module.scss";
import AppContainer from "@/app/components/app-container/app-container";
import Image from "next/image";
import AppButton from "@/app/components/app-button/app-button";
import { GeneralImageType } from "@/types/dto/general-image/general-image.type";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import PartnershipRequest from "@/app/components/partnership-request/partnership-request";

type Props = {
  generalImage?: GeneralImageType;
  title?: string;
  description?: string;
};

export default function About(props: Readonly<Props>) {
  const generalImage = props.generalImage;

  return (
    <div className={css.container}>
      <AppContainer>
        <div className={css.image}>
          <Image
            src={
              generalImage
                ? `/files${generalImage.attributes.image.data.attributes.url}`
                : "/images/general-placeholder/about-image.png"
            }
            fill
            style={{ objectFit: "cover" }}
            alt={"about-company-image"}
          />
        </div>
      </AppContainer>
      <AppContainer>
        <div className={css.sectionTitle}>
          <div className={css.about}>О компании</div>
          <div className={css.sectionInfo}>
            <div className={css.sectionInfo__text}>
              <h2 className={css.sectionInfo__title}>{props.title}</h2>
              <div className={css.sectionInfo__description}>
                {props.description}
              </div>
            </div>
            <div className={css.sectionInfo__button}>
              <PartnershipRequest>
                <AppButton
                  text={"Стать партнером"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </PartnershipRequest>
            </div>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./promotions-swiper.module.scss";
import { Scrollbar } from "swiper/modules";
import { PromotionType } from "@/types/dto/promotion/promotion.type";
import AppPaper from "@/app/components/app-papper/app-paper";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import { toLocalDate } from "@/utils/features/toLocalDate";
import dynamic from "next/dynamic";

const SwiperBase = dynamic(
  () => import("@/app/components/swiper-base/swiper-base"),
  { ssr: false },
);

type Props = {
  promotions: PromotionType[];
};

export default function PromotionsSwiper(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.container__inner}>
        <div className={css.container__swiper}>
          <SwiperBase
            swiperProps={{
              className: css.swiper,
              modules: [Scrollbar],
              spaceBetween: "20px",
              scrollbar: {
                el: `.${css.scrollbar}`,
                dragClass: css.scrollbar__draggable,
                draggable: true,
              },
            }}
          >
            {props.promotions?.map((promotion) => (
              <AppPaper
                key={`${promotion.attributes.title}_index`}
                className={css.promotion}
              >
                <div className={css.promotion__details}>
                  <div className={css.promotion__title}>
                    <h4>{promotion.attributes.title}</h4>
                    <div>{promotion.attributes.description}</div>
                  </div>
                  <div className={css.promotion__date}>
                    До {toLocalDate(promotion.attributes.until)}
                  </div>
                </div>
                <div className={css.promotion__image}>
                  <Image
                    src={getBackendImage(
                      promotion.attributes.image.data.attributes.url,
                    )}
                    alt={"promotion-image"}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </AppPaper>
            ))}
          </SwiperBase>
        </div>
      </div>
      <div className={css.scrollbar__container}>
        <div className={css.scrollbar} />
      </div>
    </div>
  );
}

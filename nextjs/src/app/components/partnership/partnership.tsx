"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./partnership.module.scss";
import { AdvantageType } from "@/types/dto/advantage/advantage.type";
import { Scrollbar } from "swiper/modules";
import dynamic from "next/dynamic";

const SwiperBase = dynamic(
  () => import("@/app/components/swiper-base/swiper-base"),
  { ssr: false },
);

type Props = {
  partnershipAdvantages?: AdvantageType[];
};

export default function Partnership(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.container__title}>
        <div className={css.container__titleText}>Сотрудничество с нами</div>
        <h2 className={css.container__subtitleText}>
          Ключевые преимущества и выгоды
        </h2>
      </div>
      <div className={css.container__swiper}>
        <SwiperBase
          swiperProps={{
            className: css.swiper,
            modules: [Scrollbar],
            spaceBetween: 20,
            scrollbar: {
              horizontalClass: css.scrollbar,
              verticalClass: css.scrollbar,
              dragClass: css.scrollbar__draggable,
            },
          }}
          laptopOptions={{ slidesPerView: 4 }}
          tabletOptions={{ slidesPerView: 3 }}
          phoneOptions={{ slidesPerView: 2 }}
        >
          {props.partnershipAdvantages?.map((advantage) => (
            <div
              key={`${advantage.attributes.name}_index`}
              className={css.advantage}
            >
              <div className={css.advantage__badge}>
                {advantage.attributes.order}
              </div>
              <div className={css.advantage__text}>
                <div className={css.advantage__title}>
                  {advantage.attributes.name}
                </div>
                <div className={css.advantage__description}>
                  {advantage.attributes.description}
                </div>
              </div>
            </div>
          ))}
        </SwiperBase>
      </div>
    </div>
  );
}

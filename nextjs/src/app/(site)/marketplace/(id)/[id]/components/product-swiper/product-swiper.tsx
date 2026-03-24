"use client";

import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import css from "./product-swiper.module.scss";
import { SwiperClass } from "swiper/react";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import dynamic from "next/dynamic";

const SwiperBase = dynamic(
  () => import("@/app/components/swiper-base/swiper-base"),
  { ssr: false },
);

type Props = {
  imagesUrl: string[];
};

export default function ProductSwiper(props: Readonly<Props>) {
  const [swiper, setSwiper] = useState(null as unknown as SwiperClass);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const setSlide = (index: number) => {
    swiper?.slideTo(index);
  };

  const setActiveSlide = (swiper: SwiperClass) => {
    setActiveSlideIndex(swiper.activeIndex);
  };
  return (
    <div className={clsx(css.container)}>
      <SwiperBase
        swiperProps={{
          className: css.swiper,
          onSwiper: (swiper) => setSwiper(swiper),
          onActiveIndexChange: (swiper) => setActiveSlide(swiper),
        }}
      >
        {props.imagesUrl.map((imageUrl, index) => (
          <div key={`${imageUrl}_${index}`} className={css.image}>
            <Image
              src={getBackendImage(imageUrl)}
              alt={"product-image"}
              fill
              style={{ objectFit: "contain" }}
              quality={100}
            />
          </div>
        ))}
      </SwiperBase>
      {props.imagesUrl.length > 1 && (
        <div className={css.gallery}>
          {props.imagesUrl.map((imageUrl, index) => (
            <button
              key={`gallery_${imageUrl}_${index}`}
              className={clsx(
                css.gallery__image,
                index === activeSlideIndex && css.gallery__image_active,
              )}
              onClick={() => setSlide(index)}
            >
              <Image
                src={getBackendImage(imageUrl)}
                alt={"gallery-product-image"}
                fill
                style={{ objectFit: "contain" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import css from "./swiper-base.module.scss";
import { SwiperOptions } from "swiper/types";

type Props = {
  swiperProps?: SwiperProps;
  children?: Array<React.ReactNode>;
  laptopOptions?: SwiperOptions;
  tabletOptions?: SwiperOptions;
  phoneOptions?: SwiperOptions;
};

export default function SwiperBase(props: Readonly<Props>) {
  return (
    props.children && (
      <Swiper
        {...props.swiperProps}
        className={clsx(props.swiperProps?.className, css.container)}
        wrapperClass={clsx(props.swiperProps?.wrapperClass, css.wrapper)}
        breakpoints={{
          1200: props.laptopOptions ?? {},
          900: props.tabletOptions ?? {},
          600: props.phoneOptions ?? {},
        }}
      >
        {props.children.map((slide: React.ReactNode, index: number) => (
          <SwiperSlide className={css.swiperSlide} key={`slide_${index}`}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

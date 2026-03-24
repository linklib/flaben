"use client"
import { useEffect, useRef } from "react";

import css from "./page.module.scss";
import AppPaper from "@/app/components/app-papper/app-paper";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import AppContainer from "@/app/components/app-container/app-container";
import Link from "next/link";
import { useScroll } from "@/app/ScrollContext";

export default function Page() {
  const bimSectionRef = useRef<HTMLDivElement | null>(null);
  const { shouldScroll, setShouldScroll } = useScroll();
  
  useEffect(() => {
    if (shouldScroll && bimSectionRef.current) {
      const top =
        bimSectionRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        130;
      window.scrollTo({ top, behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll, setShouldScroll]);

  return (
    <AppContainer>
      <div className={css.container}>
        <div className={css.segment}>
          <h2>Документы</h2>
          <div className={css.rows}>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>01</div>
              </div>
              <h4>Протокол испытаний ISEGA GERMANY</h4>
              <Link
                href={"/downloads/docs/testgermany.pdf"}
                target={"_blank"}
                className={css.button}
              >
                <AppButton
                  text={"Скачать PDF"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>02</div>
              </div>
              <h4>Сертификат РСТ воздуховодов Slim</h4>
              <Link
                href={"/downloads/docs/slim-certificate.pdf"}
                target={"_blank"}
              >
                <AppButton
                  text={"Скачать PDF"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>03</div>
              </div>
              <h4>Технические характеристики воздуховодов</h4>
              <Link href={"/downloads/docs/spec.pdf"} target={"_blank"}>
                <AppButton
                  text={"Скачать PDF"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
          </div>
        </div>
        <div className={css.segment} ref={bimSectionRef}>
          <h2>BIM модели</h2>
          <div className={css.rows}>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>01</div>
              </div>
              <h4>Библиотека FLIBEN гибкие воздуховоды</h4>
              <Link href={"/downloads/bim/FLIBEN_flex.zip"}>
                <AppButton
                  text={"Скачать"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>02</div>
              </div>
              <h4>Библиотека FLIBEN Thermo Duct</h4>
              <Link href={"/downloads/bim/library-thermo-duct.zip"}>
                <AppButton
                  text={"Скачать"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>03</div>
              </div>
              <h4>Библиотека FLIBEN Slim</h4>
              <Link href={"/downloads/bim/FLIBEN_SLIM.zip"}>
                <AppButton
                  text={"Скачать"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
            <AppPaper className={css.doc}>
              <div className={css.count}>
                <div className={css.count__number}>04</div>
              </div>
              <h4>Инструкции к Bim-моделям</h4>
              <Link href={"/downloads/bim/instructions-bim.zip"}>
                <AppButton
                  text={"Скачать"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </AppPaper>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

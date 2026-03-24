"use client";

import * as React from "react";
import AppMenu from "@/app/components/app-menu/app-menu";
import css from "./menu.module.scss";
import { NavLinkType } from "@/types/nav-link.type";
import { siteLinks } from "@/utils/links/site-links";
import AppNavBar from "@/app/components/app-nav-bar/app-nav-bar";
import { useRecoilState } from "recoil";
import { menuState } from "@/state/menu-state/menu-state";
import { useScroll } from "@/app/ScrollContext";
import AppButton from "@/app/components/app-button/app-button";
import Link from "next/link";

type HeaderProps = {
  footerRef: React.RefObject<HTMLDivElement>;
};

export default function Menu({ footerRef }: Readonly<HeaderProps>) {
  const [opened, setOpened] = useRecoilState(menuState);
  const { setShouldScroll } = useScroll();
  const closeMenu = () => setOpened(false);

  const handleScrollToFooter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBimModelsClick = () => {
    setShouldScroll(true);
    closeMenu();
  };

  const firstLinks: NavLinkType[][] = [
    [
      {
        name: "Главная",
        siteLink: siteLinks.root,
        onClickCallback: closeMenu,
        props: { href: siteLinks.root.link(), replace: true },
      },
      {
        name: "О компании",
        siteLink: siteLinks.about,
        onClickCallback: closeMenu,
        props: { href: siteLinks.about.link(), replace: true },
      },
      {
        name: "Преимущества",
        siteLink: siteLinks.advantages,
        onClickCallback: closeMenu,
        props: { href: siteLinks.advantages.link(), replace: true },
      },
      {
        name: "Контакты",
        siteLink: siteLinks.planner,
        onClickCallback: closeMenu,
        props: { href: "#contacts", onClick: handleScrollToFooter },
      },
    ],
    [
      {
        name: "Стать партнёром",
        siteLink: siteLinks.partnership,
        onClickCallback: closeMenu,
        props: { href: siteLinks.partnership.link(), replace: true },
      },
      {
        name: "Каталог",
        siteLink: siteLinks.marketplace,
        onClickCallback: closeMenu,
        props: { href: siteLinks.marketplace.link(), replace: true },
      },
      {
        name: "Доставка",
        siteLink: siteLinks.delivery,
        onClickCallback: closeMenu,
        props: { href: siteLinks.delivery.link(), replace: true },
      },
      {
        name: "Применение систем",
        siteLink: siteLinks.projects,
        onClickCallback: closeMenu,
        props: { href: siteLinks.projects.link(), replace: true },
      },
      {
        name: "Статьи",
        siteLink: siteLinks.articles,
        onClickCallback: closeMenu,
        props: { href: siteLinks.articles.link(), replace: true },
      },
    ],
  ];
  const secondLinks: NavLinkType[] = [
    {
      name: "BIM-модели",
      siteLink: siteLinks.projects,
      onClickCallback: handleBimModelsClick,
      props: { href: siteLinks.docs.link(), replace: true },
    },
    {
      name: "Документы",
      siteLink: siteLinks.docs,
      onClickCallback: closeMenu,
      props: { href: "/docs" },
    },
  ];

  return (
    <AppMenu title={"Меню"} open={opened} onClose={() => setOpened(false)}>
      <div className={css.container}>
        <div>
          <div className={css.firstGroup}>
            {firstLinks.map((navGroup, index) => (
              <AppNavBar key={`${index}_nav_group`} links={navGroup} vertical />
            ))}
          </div>
          <AppNavBar links={secondLinks} vertical />
        </div>
        <Link href={siteLinks.callbackRequest.link()} className={css.button}>
          <AppButton text={"Заказать обратный звонок"} />
        </Link>
      </div>
    </AppMenu>
  );
}

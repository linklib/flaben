// Header.js

import React from "react";
import css from "./header.module.scss";
import Logo from "@/app/components/logo/logo";
import AppContainer from "@/app/components/app-container/app-container";
import { Button } from "@mui/material";
import { NavLinkType } from "@/types/nav-link.type";
import { siteLinks } from "@/utils/links/site-links";
import AppNavBar from "@/app/components/app-nav-bar/app-nav-bar";
import BurgerIcon from "@/app/components/icons/burger.icon";
import { useRecoilState } from "recoil";
import { menuState } from "@/state/menu-state/menu-state";
import CartButton from "@/app/components/cart-button/cart-button";
import {useScroll} from "@/app/ScrollContext";

type HeaderProps = {
  footerRef: React.RefObject<HTMLDivElement>;
};

const scrollToElementWithOffset = (element: HTMLDivElement, offset: number) => {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export default function Header({ footerRef }: HeaderProps) {
  const [, setOpened] = useRecoilState(menuState);
  const { setShouldScroll } = useScroll();

  const handleScrollToFooter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (footerRef.current) {
      scrollToElementWithOffset(footerRef.current, 150);
    }
  };

  const handleBimModelsClick = () => {
    setShouldScroll(true);
  };

  const partnershipLink: NavLinkType = {
    name: "Стать партнером",
    siteLink: siteLinks.partnership,
    props: { href: siteLinks.partnership.link() },
  };

  const headerLinks: NavLinkType[] = [
    {
      name: "О компании",
      siteLink: siteLinks.about,
      props: { href: siteLinks.about.link() },
    },
    {
      name: "Каталог",
      siteLink: siteLinks.marketplace,
      props: { href: siteLinks.marketplace.link() },
    },
    {
      name: "BIM-модели",
      siteLink: siteLinks.projects,
      onClickCallback: handleBimModelsClick,
      props: { href: siteLinks.docs.link(), replace: true },
    },
    {
      name: "Контакты",
      siteLink: siteLinks.contacts,
      props: { href: "#contacts", onClick: handleScrollToFooter },
    },
  ];

  return (
    <header>
      <AppContainer>
        <div className={css.container}>
          <Logo />
          <div className={css.right}>
            <div className={css.nav}>
              <AppNavBar links={[partnershipLink]} />
              <AppNavBar links={headerLinks} />
            </div>
            <div className={css.actions}>
              <div className={css.actions__button}>
                <CartButton />
              </div>
              <Button
                variant={"outlined"}
                startIcon={<BurgerIcon />}
                onClick={() => setOpened(true)}
              >
                <span className={css.actions__menuButtonText}>Меню</span>
              </Button>
            </div>
          </div>
        </div>
      </AppContainer>
    </header>
  );
}

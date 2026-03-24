// Footer.tsx

import React, { forwardRef } from "react";
import clsx from "clsx";
import css from "./footer.module.scss";
import AppSocialsIcon from "@/app/components/app-social-icon/app-socials-icon";
import YoutubeIcon from "@/app/components/icons/youtube.icon";
import WaIcon from "@/app/components/icons/wa.icon";
import {
  copyrightText,
  policyAgreementlLink,
  policyCookiesLink,
  policyDocLink,
  yandexGoalsMap,
} from "@/utils/constants/constants";
import Link from "next/link";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import PhoneIcon from "@/app/components/icons/phone.icon";
import AtIcon from "@/app/components/icons/at.icon";
import AppContainer from "@/app/components/app-container/app-container";
import AppPaper from "@/app/components/app-papper/app-paper";
import Logo from "@/app/components/logo/logo";
import { NavLinkType } from "@/types/nav-link.type";
import { siteLinks } from "@/utils/links/site-links";
import AppNavBar from "@/app/components/app-nav-bar/app-nav-bar";
import FooterForm from "@/app/components/app-layout/components/footer/components/footer-form";
import TgIcon from "@/app/components/icons/tg.icon";
import { ContactType } from "@/types/dto/contact/contact.type";
import { useYandexGoal } from "@/hooks/use-yandex-goal";

const Footer = forwardRef<HTMLDivElement, { contactInfo?: ContactType }>(
  function Footer({ contactInfo }: { contactInfo?: ContactType }, ref) {
    const { trackGoal } = useYandexGoal();

    const firstGroupFooterNavLinks = [
      {
        name: "Главная",
        siteLink: siteLinks.root,
        props: { href: siteLinks.root.link() },
      },
      {
        name: "О компании",
        siteLink: siteLinks.about,
        props: { href: siteLinks.about.link() },
      },
      {
        name: "Преимущества",
        siteLink: siteLinks.advantages,
        props: { href: siteLinks.advantages.link() },
      },
    ];
    const secondGroupFooterNavLinks = [
      {
        name: "Стать партнёром",
        siteLink: siteLinks.partnership,
        props: { href: siteLinks.partnership.link() },
      },
      {
        name: "Каталог",
        siteLink: siteLinks.marketplace,
        props: { href: siteLinks.marketplace.link() },
      },
      {
        name: "Доставка",
        siteLink: siteLinks.delivery,
        props: { href: siteLinks.delivery.link() },
      },
    ];

    const thirdGroupFooterNavLinks: NavLinkType[] = [
      {
        name: "Применение систем",
        siteLink: siteLinks.projects,
        props: { href: siteLinks.projects.link() },
      },
      {
        name: "Статьи",
        siteLink: siteLinks.projects,
        props: { href: siteLinks.articles.link() },
      },
      {
        name: "Документы",
        siteLink: siteLinks.docs,
        props: { href: siteLinks.docs.link() },
      },
    ];
    return (
      <div className={clsx(css.container)}>
        <AppContainer>
          <AppPaper>
            <div className={css.feedback} ref={ref}>
              <div className={css.feedback__info}>
                <div className={css.feedback__title}>
                  По вопросам сотрудничества
                </div>
                <div className={css.feedback__contacts}>
                  <div>Доставка до объекта по РФ за наш счет</div>
                  <ul className={css.feedback__links}>
                    <li>
                      <PhoneIcon />
                      <Link href={`tel: ${contactInfo?.attributes.firstPhone}`}>
                        <AppTextSpinner
                          text={contactInfo?.attributes.firstPhone}
                        />
                      </Link>
                    </li>
                    <li>
                      <PhoneIcon />
                      <Link
                        href={`tel: ${contactInfo?.attributes.secondPhone}`}
                        onClick={() => trackGoal(yandexGoalsMap.PHONE)}
                      >
                        <AppTextSpinner
                          text={contactInfo?.attributes.secondPhone}
                        />
                      </Link>
                    </li>

                    <li>
                      <AtIcon />
                      <Link
                        href={`mailto: ${contactInfo?.attributes.email}`}
                        onClick={() => trackGoal(yandexGoalsMap.EMAIL)}
                      >
                        <AppTextSpinner text={contactInfo?.attributes.email} />
                      </Link>
                    </li>
                  </ul>
                  <div className={css.feedback__address}>
                    <span>Центральный офис</span>
                    {contactInfo?.attributes.address}
                  </div>
                  <div className={css.feedback__socials}>
                    <AppSocialsIcon
                      href={contactInfo?.attributes.youtubeLink ?? ""}
                      icon={<YoutubeIcon />}
                      onClick={() => trackGoal(yandexGoalsMap.SOCIAL)}
                    />
                    <AppSocialsIcon
                      href={contactInfo?.attributes.waLink ?? ""}
                      icon={<WaIcon />}
                      onClick={() => trackGoal(yandexGoalsMap.SOCIAL)}
                    />
                    <AppSocialsIcon
                      href={contactInfo?.attributes.tgLink ?? ""}
                      icon={<TgIcon />}
                      onClick={() => trackGoal(yandexGoalsMap.SOCIAL)}
                    />
                  </div>
                </div>
              </div>
              <FooterForm />
            </div>
          </AppPaper>
        </AppContainer>
        <AppContainer>
          <footer className={css.footer}>
            <div className={css.footer__top}>
              <div className={clsx(css.footer__firstColumn)}>
                <div>
                  <Logo />
                </div>
                <AppNavBar links={firstGroupFooterNavLinks} vertical />
              </div>
              <div className={css.footer__nav}>
                <AppNavBar links={secondGroupFooterNavLinks} vertical />
                <AppNavBar links={thirdGroupFooterNavLinks} vertical />
              </div>
            </div>
            <div className={css.footer__bottom}>
              <div
                className={clsx(
                  css.footer__firstColumn,
                  css.footer__bottomColumn,
                )}
              >
                <span
                  className={clsx(
                    css.footer__copyright,
                    css.footer__firstColumn,
                  )}
                >
                  {copyrightText}
                </span>
                <div className={css.footer__policy}>
                  <Link href={policyDocLink} target={"_blank"}>
                    <AppTextSpinner
                      text={"Согласие на обработку персональных данных"}
                    />{" "}
                  </Link>
                  <Link href={policyAgreementlLink} target={"_blank"}>
                    <AppTextSpinner
                      text={"Политика обработки персональных данных"}
                    />
                  </Link>
                  <Link href={policyCookiesLink} target={"_blank"}>
                    <AppTextSpinner text={"Политика работы с куки (cookies)"} />
                  </Link>
                </div>
              </div>
              <div className={css.footer__production}>
                <Link
                  href={"https://www.instat.pro/services/site-production/"}
                  target={"_blank"}
                >
                  <AppTextSpinner text={"Сделано в instat"} />
                </Link>
              </div>
            </div>
            <div className={css.footer__info}>
              <p>ООО «ВитальХаус»</p>
              <p>ИНН: 6658533739</p>
              <p>ОГРН: 1206600020967</p>
            </div>
          </footer>
        </AppContainer>
      </div>
    );
  },
);

Footer.displayName = "Footer";

export default Footer;

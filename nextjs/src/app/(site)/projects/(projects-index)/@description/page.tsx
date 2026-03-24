import css from "./page.module.scss";
import * as React from "react";
import AppContainer from "@/app/components/app-container/app-container";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import AppPaper from "@/app/components/app-papper/app-paper";
import Image from "next/image";
import PartnershipRequest from "@/app/components/partnership-request/partnership-request";
import { contentRepository } from "@/data/repositories/content.repository";
import { getBackendImage } from "@/utils/features/get-backend-image";

export default async function Page() {
  const contentResponse = await contentRepository.getProjectSectionContent();
  const content = contentResponse.data?.data.attributes;

  return (
    <AppContainer>
      <div className={css.container}>
        <AppPaper className={css.paper}>
          <div className={css.title}>
            <div className={css.title__section}>применение систем</div>
            <h2 className={css.title__text}>{content?.content.title}</h2>
            <div></div>
          </div>
          <div className={css.footer}>
            <div className={css.footer__caption}>
              {content?.content.description}
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
              src={getBackendImage(
                content?.content.image.data.attributes.url ?? "",
              )}
              alt={"projects-image"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </AppPaper>
      </div>
    </AppContainer>
  );
}

import * as React from "react";
import clsx from "clsx";
import css from "./systems-details.module.scss";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import AppRichText from "@/app/components/app-rich-text/app-rich-text";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import { siteLinks } from "@/utils/links/site-links";

type Props = {
  description: BlocksContent;
  imageUrl: string;
  imagesUrl: string[];
  categorySlug: string;
  categoryId: string;
  buttonName?: string;
  youtubeLink?: string;
};

export default function SystemsDetails(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.imageWrap}>
        <div className={css.image}>
          <Image
            src={getBackendImage(props.imageUrl)}
            alt={"category-image"}
            style={{ objectFit: "contain" }}
            fill
          />
        </div>
        <div className={css.images}>
          {props.imagesUrl.map((imageUrl) => (
            <div key={imageUrl} className={css.images__container}>
              <div className={css.images__image}>
                <Image
                  src={getBackendImage(imageUrl)}
                  alt={"category-image"}
                  style={{ objectFit: "contain" }}
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={css.description}>
        <div>
          <AppRichText content={props.description} />
        </div>
        <div className={css.description__actions}>
          {props.youtubeLink && (
            <Link href={siteLinks.video.link(props.categoryId)}>
              <div className={css.description__link}>
                <AppTextSpinner
                  text={props.buttonName ?? "Инструкция по сборке"}
                />
              </div>
            </Link>
          )}
          <Link
            href={`${siteLinks.marketplace.link()}/categories/${props.categorySlug}`}
          >
            <AppButton
              trailingComponent={<ArrowIcon />}
              text={"В каталог"}
              withDiagonalArrow
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

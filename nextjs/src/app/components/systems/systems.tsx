"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./systems.module.scss";
import { ProductCategoryType } from "@/types/dto/product-category/product-category.type";
import AppContainer from "@/app/components/app-container/app-container";
import AppAccordion from "@/app/components/app-accordion/app-accordion";
import SystemsSummary from "@/app/components/systems/components/systems-summary/systems-summary";
import SystemsDetails from "@/app/components/systems/components/systems-details/systems-details";

type Props = {
  productCategories?: ProductCategoryType[];
};

export default function Systems(props: Readonly<Props>) {
  const [expanded, setExpanded] = React.useState<string | false>(
    props.productCategories?.[0].attributes.name ?? false,
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <AppContainer>
      <div className={clsx(css.container)}>
        <div className={css.title}>
          <div className={css.title__titleSection}>наши системы</div>
          <h2 className={css.title__titleText}>
            <span>Системные решения Fliben</span> для качественной вентиляции
          </h2>
        </div>
        {props.productCategories && (
          <div className={css.systems}>
            {props.productCategories?.map((productCategory, index) => (
              <AppAccordion
                key={productCategory.attributes.name}
                props={{
                  disableGutters: true,
                  elevation: 0,
                  square: true,
                  expanded: expanded === productCategory.attributes.name,
                  onChange: handleChange(productCategory.attributes.name),
                }}
                summary={
                  <SystemsSummary
                    index={index}
                    text={productCategory.attributes.name}
                    expanded={expanded === productCategory.attributes.name}
                  />
                }
                details={
                  <SystemsDetails
                    description={productCategory.attributes.longDescription}
                    imageUrl={
                      productCategory.attributes.image.data.attributes.url
                    }
                    imagesUrl={productCategory.attributes.images.data.flatMap(
                      (image) => image.attributes.url,
                    )}
                    youtubeLink={productCategory.attributes.youtubeLink}
                    categorySlug={productCategory.attributes.slug}
                    categoryId={productCategory.id.toString()}
                    buttonName={productCategory.attributes.buttonName}
                  />
                }
              />
            ))}
          </div>
        )}
      </div>
    </AppContainer>
  );
}

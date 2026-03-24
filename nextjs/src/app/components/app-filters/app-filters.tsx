"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./app-filters.module.scss";
import Link from "next/link";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import { useParams, usePathname } from "next/navigation";

type Props = {
  activeFilterName?: string;
  filters: { field: string; title: string; name: string }[];
  scrollOnClick?: boolean;
  barEl?: React.ReactNode;
};

export default function AppFilters(props: Props) {
  const path = usePathname();
  const params = useParams();

  const category = params.category;

  return (
    <div className={clsx(css.container)}>
      <div className={css.container__links}>
        <Link
          href={"/marketplace/categories/all"}
          scroll={false}
          className={css.container__item}
        >
          <AppTextSpinner
            className={clsx(category === "all" && css.active)}
            text={"Все"}
          />
        </Link>
        {props.filters.map((filter, index) => (
          <Link
            key={`${filter.name}_${filter.title} + ${index}`}
            // href={`${path}?${filter.field}=${filter.name}`}
            href={`/marketplace/categories/${filter.name}`}
            scroll={false}
            className={css.container__item}
          >
            <AppTextSpinner
              className={clsx(filter.name === category && css.active)}
              text={filter.title}
            />
          </Link>
        ))}
      </div>
      <div className={css.el}>{props.barEl}</div>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import clsx from "clsx";
import css from "./search.module.scss";
import { productsRepository } from "@/data/repositories/products.repository";
import { ProductType } from "@/types/dto/product/product.type";
import StartSearchIcon from "@/app/components/icons/start-search.icon";
import NotFoundSearchIcon from "@/app/components/icons/not-found-search.icon";
import { CircularProgress } from "@mui/material";
import SearchProductCard from "@/app/(site)/marketplace/(marketplace-index)/categories/[category]/@products/components/search-product-card/search-product-card";

export default function Search() {
  const anchorEl = useRef<HTMLInputElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const [searchText, setSearchText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState([] as ProductType[]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePopoverOpen = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      anchorEl.current?.blur();
      setIsOpen(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (!searchText.trim()) {
      setProducts([]);
      return;
    }

    typingTimeoutRef.current = setTimeout(() => {
      startTransition(async () => {
        const productResponse = await productsRepository.findAll(undefined, {
          sku: searchText,
          name: searchText,
        });
        const products = productResponse.data?.data;

        if (products) {
          setProducts(products);
        }
      });
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={css.container} ref={popupRef}>
      {isOpen && (
        <div
          className={css.search}
          style={
            {
              "--input-height": anchorEl.current?.offsetHeight,
            } as CSSProperties
          }
        >
          {isPending ? (
            <div className={css.search__placeholder}>
              <CircularProgress size={"1lh"} />
              Загрузка
            </div>
          ) : products.length > 0 ? (
            <div className={css.search__results}>
              {products.map((product, index) => (
                <SearchProductCard
                  key={product.attributes.name + index}
                  product={product}
                  last={index === products.length - 1}
                />
              ))}
            </div>
          ) : searchText ? (
            <div className={css.search__placeholder}>
              <div>
                <NotFoundSearchIcon />
              </div>
              <span>Ничего не найдено</span>
            </div>
          ) : (
            <div className={css.search__placeholder}>
              <div>
                <StartSearchIcon />
              </div>
              <span>Начните поиск</span>
            </div>
          )}
        </div>
      )}
      <input
        className={clsx(css.container)}
        placeholder={"Введите артикул или название товара"}
        value={searchText}
        onChange={handleInputChange}
        onFocus={handlePopoverOpen}
        ref={anchorEl}
      />
    </div>
  );
}

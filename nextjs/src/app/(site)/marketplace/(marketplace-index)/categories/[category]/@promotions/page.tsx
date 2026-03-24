import * as React from "react";
import { promotionsRepository } from "@/data/repositories/promotions.repository";
import PromotionsSwiper from "@/app/(site)/marketplace/(marketplace-index)/categories/[category]/@promotions/components/promotions-swiper/promotions-swiper";

export default async function Page() {
  const promotions = await promotionsRepository.findAll();
  return promotions.data ? (
    <PromotionsSwiper promotions={promotions.data?.data} />
  ) : null;
}

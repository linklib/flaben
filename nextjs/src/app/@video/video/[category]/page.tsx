import * as React from "react";
import AppDialog from "@/app/components/app-dialog/app-dialog";
import { productCategoryRepository } from "@/data/repositories/product-category.repository";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
};

export default async function Page(props: Props) {
  const categoryResponse = await productCategoryRepository.findOne(
    props.params.category,
  );

  const link = categoryResponse.data?.data.attributes.youtubeLink;
  if (!link) {
    notFound();
  }
  return (
    <AppDialog title={"Видео"}>
      <iframe
        src={link}
        style={{
          // position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "18.75rem",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      />
    </AppDialog>
  );
}

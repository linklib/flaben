import { productsRepository } from "@/data/repositories/products.repository";
import { notFound } from "next/navigation";
import AppDialog from "@/app/components/app-dialog/app-dialog";
import AppRichText from "@/app/components/app-rich-text/app-rich-text";

type Props = {
  params: { id: string };
};

export default async function Page(props: Readonly<Props>) {
  const productResponse = await productsRepository.findOne(props.params.id);
  if (!productResponse.data) {
    notFound();
  }

  return (
    <AppDialog title={"Характеристики"}>
      <AppRichText
        content={productResponse.data.data.attributes.longDescription}
      />
    </AppDialog>
  );
}

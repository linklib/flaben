import * as React from "react";
import { productsRepository } from "@/data/repositories/products.repository";

type Props = {
  children: React.ReactNode;
  specification: React.ReactNode;
  other: React.ReactNode;
  params: { id: string };
};

export async function generateMetadata(props: Props) {
  const productResponse = await productsRepository.findOne(props.params.id);

  return {
    title: `Fliben | ${productResponse.data?.data.attributes.name}`,
    description: productResponse.data?.data.attributes.description,
  };
}

export default function Layout(props: Props) {
  return (
    <>
      {props.children}
      {props.other}
      {props.specification}
    </>
  );
}

import AppContainer from "@/app/components/app-container/app-container";
import * as React from "react";
import { notFound } from "next/navigation";
import ProjectDetails from "@/app/(site)/projects/(id)/[id]/@details/components/description/project-details";
import { articleRepository } from "@/data/repositories/article.repository";

type Props = { params: { id?: string } };

export default async function Page(props: Readonly<Props>) {
  const articleResponse = await articleRepository.findOne(props.params.id);

  if (!articleResponse.data) {
    notFound();
  }

  return (
    <AppContainer>
      <ProjectDetails project={articleResponse.data.data} />
    </AppContainer>
  );
}

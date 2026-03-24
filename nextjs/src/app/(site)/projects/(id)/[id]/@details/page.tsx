import { projectRepository } from "@/data/repositories/project.repository";
import AppContainer from "@/app/components/app-container/app-container";
import * as React from "react";
import { notFound } from "next/navigation";
import ProjectDetails from "@/app/(site)/projects/(id)/[id]/@details/components/description/project-details";

type Props = { params: { id?: string } };

export default async function Page(props: Readonly<Props>) {
  const projectsResponse = await projectRepository.findOne(props.params.id);

  if (!projectsResponse.data) {
    notFound();
  }

  return (
    <AppContainer>
      <ProjectDetails project={projectsResponse.data.data} />
    </AppContainer>
  );
}

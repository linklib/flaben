import css from "./page.module.scss";
import { projectRepository } from "@/data/repositories/project.repository";
import ProjectCard from "@/app/components/project-card/project-card";
import * as React from "react";
import AppContainer from "@/app/components/app-container/app-container";
import { productCategoryRepository } from "@/data/repositories/product-category.repository";
import AppFilters from "@/app/components/app-filters/app-filters";
import AnimatedContainer from "@/app/components/animated-container/animated-container";

type Props = {
  searchParams: { category?: string };
};

export default async function Page(props: Readonly<Props>) {
  const activeCategory = props.searchParams?.category;

  const projectsResponse = await projectRepository.findAll(activeCategory);
  const categoryResponse = await productCategoryRepository.findAll();

  return (
    <AppContainer>
      <div className={css.projects}>
        {categoryResponse.data && (
          <AppFilters
            activeFilterName={activeCategory}
            filters={categoryResponse.data.data.flatMap((category) => {
              return {
                name: category.attributes.slug,
                title: category.attributes.name,
                field: "category",
              };
            })}
          />
        )}
        <AnimatedContainer id={"projects"} className={css.projects__wrapper}>
          {
            projectsResponse.data?.data.map((project, index) => (
              <ProjectCard
                key={`${project.attributes.title}_${index}`}
                project={project}
              />
            )) as []
          }
        </AnimatedContainer>
      </div>
    </AppContainer>
  );
}

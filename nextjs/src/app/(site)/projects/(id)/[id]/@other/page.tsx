import css from "./page.module.scss";
import { projectRepository } from "@/data/repositories/project.repository";
import AppButton from "@/app/components/app-button/app-button";
import AppContainer from "@/app/components/app-container/app-container";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import SwiperProjects from "@/app/components/swiper-projects/swiper-projects";

type Props = { params: { id: string } };

export default async function Page(props: Readonly<Props>) {
  const projectsResponse = await projectRepository.findAll();

  return (
    <div className={css.container}>
      <AppContainer>
        <div className={css.header}>
          <h2>Остальные примеры</h2>
          <div>
            <div className={css.swiperButtons}>
              <div className={css.swiperButtons__previous}>
                <AppButton leadingComponent={<ArrowIcon reverse />} />
              </div>
              <div className={css.swiperButtons__next}>
                <AppButton leadingComponent={<ArrowIcon />} />
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
      {projectsResponse.data && (
        <SwiperProjects
          nextButtonClass={css.swiperButtons__next}
          previousButtonClass={css.swiperButtons__previous}
          projects={projectsResponse.data.data.filter(
            (project) => project.id !== Number(props.params.id),
          )}
          replace
        />
      )}
    </div>
  );
}

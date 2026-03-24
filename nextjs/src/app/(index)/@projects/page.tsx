import css from "./page.module.scss";
import { projectRepository } from "@/data/repositories/project.repository";
import AppButton from "@/app/components/app-button/app-button";
import AppContainer from "@/app/components/app-container/app-container";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import SwiperProjects from "@/app/components/swiper-projects/swiper-projects";

export default async function Page() {
  const projectsResponse = await projectRepository.findAll();

  return (
    <div className={css.container}>
      <AppContainer>
        <div className={css.header}>
          <div className={css.sectionTitle}>Применение систем</div>
          <div className={css.title}>
            <h2 className={css.title__titleText}>
              <span>От проекта до реализации: </span>
              Вентиляция как искусство создания комфортной среды
            </h2>
            <div className={css.actions}>
              <Link href={siteLinks.projects.link()}>
                <AppButton text={"Показать все проекты"} />
              </Link>
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
        </div>
      </AppContainer>
      {projectsResponse.data && (
        <SwiperProjects
          nextButtonClass={css.swiperButtons__next}
          previousButtonClass={css.swiperButtons__previous}
          projects={projectsResponse.data.data}
        />
      )}
    </div>
  );
}

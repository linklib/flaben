"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./app-planner.module.scss";

import AppPaper from "@/app/components/app-papper/app-paper";
import AppContainer from "@/app/components/app-container/app-container";
import Planner from "@/app/(site)/planner/сomponents/app-planner/components/planner/planner";
import Spec from "@/app/(site)/planner/сomponents/app-planner/components/spec/spec";

export default function AppPlanner() {
  return (
    <AppContainer>
      <div className={clsx(css.container)}>
        <section className={css.section}>
          <h2>Fliben planner</h2>
          <AppPaper noOverflow>
            <Planner />
          </AppPaper>
        </section>
        <section className={css.section}>
          <h2>Итоговая спецификация</h2>
          <Spec />
        </section>
      </div>
    </AppContainer>
  );
}

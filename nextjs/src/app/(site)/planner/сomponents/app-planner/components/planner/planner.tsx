"use client";
import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import css from "./planner.module.scss";
import AppPaper from "@/app/components/app-papper/app-paper";
import PlannerSection from "./components/planner-section/planner-section";
import ConsumptionRate from "./components/consumption-rate/consumption-rate";
import FloorsData from "./components/floors-data/floors-data";
import CommonFloorsData from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/common-floors-data/common-floors-data";
import VentType from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/vent-type/vent-type";
import SystemsConfig from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/systems-config/systems-config";

export default function Planner() {
  const [activeFloor, setActiveFloor] = useState(1);

  return (
    <AppPaper className={clsx(css.container)} noOverflow>
      <PlannerSection
        title={
          "В первую очередь, выберете норму расхода воздуха, затем выберете этаж и его высоту, после этого поочерёдно добавляйте помещения, указывая их параметры"
        }
      >
        <div className={css.generalData}>
          <ConsumptionRate />
          <FloorsData
            activeFloor={activeFloor}
            setActiveFloor={setActiveFloor}
          />
        </div>
      </PlannerSection>
      <PlannerSection
        title={
          "Ниже представлен список всех помещений с заданными параметрами. Если ваша потребность в воздухообмене выше, чем требуется стандартами,вы можете увеличить значение воздушного потока для каждой из выбранных помещений, изменив его параметры в таблице ниже"
        }
      >
        <CommonFloorsData />
      </PlannerSection>
      <PlannerSection
        title={
          "Для расчёта магистральных теплоизолированных воздуховодов и комплектующих к ним, выберете этаж на котором будет размещена вентиляционная установка, выберете тип шумоглушителя и область забора и выброса воздуха из дома"
        }
      >
        <SystemsConfig />
      </PlannerSection>
      <PlannerSection
        title={
          "По умолчанию программой выбрана гибкая система вентиляции, являющаяся оптимальной для стандартных проектов. В комбинированной системе используются гибкие воздуховоды для размещении вентиляции на потолке и плоские воздуховоды для размещение вентиляции в полу"
        }
      >
        <VentType />
      </PlannerSection>
    </AppPaper>
  );
}

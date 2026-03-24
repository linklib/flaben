import * as React from "react";
import { SetStateAction } from "react";
import clsx from "clsx";
import css from "./floors-data.module.scss";
import FloorSwitcher from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/floors-data/components/floor-switcher/floor-switcher";
import FloorHeight from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/floors-data/components/floor-height/floor-height";
import Rooms from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/floors-data/components/rooms/rooms";

type Props = {
  activeFloor: number;
  setActiveFloor: React.Dispatch<SetStateAction<number>>;
};

export default function FloorsData(props: Readonly<Props>) {
  const { activeFloor, setActiveFloor } = props;

  return (
    <div className={clsx(css.container)}>
      <FloorSwitcher
        activeFloor={activeFloor}
        setActiveFloor={setActiveFloor}
      />
      <FloorHeight activeFloor={activeFloor} />
      <Rooms activeFloor={activeFloor} />
    </div>
  );
}

import * as React from "react";
import { SetStateAction } from "react";
import clsx from "clsx";
import css from "./floor-switcher.module.scss";
import AppButton from "@/app/components/app-button/app-button";
import PlusIcon from "@/app/components/icons/plus.icon";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import GarbageIcon from "@/app/components/icons/garbage.icon";
import { baseRoom } from "@/utils/constants/constants";
import Switcher from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/switcher/switcher";

type Props = {
  activeFloor: number;
  setActiveFloor: React.Dispatch<SetStateAction<number>>;
};

export default function FloorSwitcher(props: Props) {
  const [state, setState] = useRecoilState(plannerState);

  return (
    <div className={clsx(css.container)}>
      <div className={css.header}>
        <h5>Выберите этаж</h5>
        {state.floors.length < 3 && (
          <AppButton
            trailingComponent={<PlusIcon />}
            buttonProps={{ className: css.button }}
            onClickCallback={() =>
              setState({
                ...state,
                floors: [
                  ...state.floors,
                  {
                    number: state.floors.length + 1,
                    height: 2.8,
                    rooms: [{ ...baseRoom, floor: state.floors.length + 1 }],
                  },
                ],
              })
            }
          />
        )}
      </div>
      <Switcher
        id={"floors"}
        switchers={Array.from(state.floors).map((floor, index) => {
          const isActive = props.activeFloor === floor.number;
          return {
            name: `${index + 1} этаж`,
            active: isActive,
            onClick: () => !isActive && props.setActiveFloor(floor.number),
            badge: index !== 0 && index === state.floors.length - 1 && (
              <button
                className={css.deleteIcon}
                onClick={() => {
                  setState({
                    ...state,
                    installationFloor: 1,
                    floors: state.floors.filter(
                      (resultFloor, floorIndex) =>
                        resultFloor.number !== floor.number,
                    ),
                  });
                  props.setActiveFloor(1);
                }}
              >
                <GarbageIcon />
              </button>
            ),
          };
        })}
      />
    </div>
  );
}

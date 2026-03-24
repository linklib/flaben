import * as React from "react";
import clsx from "clsx";
import css from "./systems-config.module.scss";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import CustomTable from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/custom-table/custom-table";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import { InputAdornment } from "@mui/material";
import AppSelectInput from "@/app/components/app-select-input/app-select-input";
import { SilencerTypeEnum } from "@/utils/enums/silencer-type.enum";
import { AirIntakePlacementTypeEnum } from "@/utils/enums/air-intake-placement-type.enum";

export default function SystemsConfig() {
  const [state, setState] = useRecoilState(plannerState);

  return (
    <div className={clsx(css.container)}>
      <div className={css.general}>
        <div className={css.general__row}>
          <h5>Этаж размещения вентиляционной установки</h5>
          <AppSelectInput
            items={state.floors.map((floor, index) => {
              return {
                title: `${floor.number} этаж`,
                value: floor.number,
              };
            })}
            props={{
              name: "installationFloor",
              value: state.installationFloor,
              onChange: (event) =>
                setState({
                  ...state,
                  installationFloor: Number(event.target.value),
                }),
            }}
          />
        </div>
        <div className={css.general__row}>
          <h5>Тип шумоглушителя</h5>
          <AppSelectInput
            items={(
              Object.keys(SilencerTypeEnum) as Array<
                keyof typeof SilencerTypeEnum
              >
            ).map((silencerType, index) => {
              return {
                title: SilencerTypeEnum[silencerType],
                value: SilencerTypeEnum[silencerType],
              };
            })}
            props={{
              name: "silencerType",
              value: state.silencerType,
              onChange: (event) =>
                setState({
                  ...state,
                  silencerType: event.target.value as SilencerTypeEnum,
                }),
            }}
          />
        </div>
        <div className={css.general__row}>
          <h5>Забор и выброс воздуха</h5>
          <AppSelectInput
            items={(
              Object.keys(AirIntakePlacementTypeEnum) as Array<
                keyof typeof AirIntakePlacementTypeEnum
              >
            ).map((placement, index) => {
              return {
                title: AirIntakePlacementTypeEnum[placement],
                value: AirIntakePlacementTypeEnum[placement],
              };
            })}
            props={{
              name: "placement",
              value: state.airIntakePlacement,
              onChange: (event) =>
                setState({
                  ...state,
                  airIntakePlacement: event.target
                    .value as AirIntakePlacementTypeEnum,
                }),
            }}
          />
        </div>
      </div>
      <div className={css.addition}>
        <div className={css.addition__title}>
          Если Вы располагаете информацией по размещению оборудования, то
          укажите следующие параметры:
        </div>
        <CustomTable
          data={[
            {
              key: "Укажите длину трассы теплоизолированных воздуховодов вентиляционной установки до коллектора приточки, м",
              value: (
                <AppTextInput
                  textfieldProps={{
                    name: "lengthFromVentilationUnitToIntakeManifold",
                    type: "number",
                    value: state.lengthFromVentilationUnitToIntakeManifold,
                    inputProps: {
                      min: 1,
                      max: 20,
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">м.</InputAdornment>
                      ),
                    },
                    onChange: (event) =>
                      setState({
                        ...state,
                        lengthFromVentilationUnitToIntakeManifold: Number(
                          event.target.value,
                        ),
                      }),
                  }}
                />
              ),
            },
            {
              key: "Укажите длину трассы теплоизолированных воздуховодов вентиляционной установки до коллектора вытяжки, м",
              value: (
                <AppTextInput
                  textfieldProps={{
                    name: "lengthFromVentilationUnitToExhaustManifold",
                    type: "number",
                    value: state.lengthFromVentilationUnitToExhaustManifold,
                    inputProps: {
                      min: 1,
                      max: 20,
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">м.</InputAdornment>
                      ),
                    },
                    onChange: (event) =>
                      setState({
                        ...state,
                        lengthFromVentilationUnitToExhaustManifold: Number(
                          event.target.value,
                        ),
                      }),
                  }}
                />
              ),
            },
            {
              key: "Укажите длину трассы теплоизолированных воздуховодов вентиляционной установки до точки выброса/забора воздуха, м",
              value: (
                <AppTextInput
                  textfieldProps={{
                    name: "lengthFromVentilationUnitToIntakePoint",
                    type: "number",
                    value: state.lengthFromVentilationUnitToIntakePoint,
                    inputProps: {
                      min: 1,
                      max: 20,
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">м.</InputAdornment>
                      ),
                    },
                    onChange: (event) =>
                      setState({
                        ...state,
                        lengthFromVentilationUnitToIntakePoint: Number(
                          event.target.value,
                        ),
                      }),
                  }}
                />
              ),
            },
            {
              key: "Укажите количество поворотов 90°, шт",
              value: (
                <AppTextInput
                  textfieldProps={{
                    name: "numberOf90degreesTurns",
                    type: "number",
                    value: state.numberOf90degreesTurns,
                    inputProps: {
                      min: 1,
                      max: 20,
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">шт.</InputAdornment>
                      ),
                    },
                    onChange: (event) =>
                      setState({
                        ...state,
                        numberOf90degreesTurns: Number(event.target.value),
                      }),
                  }}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

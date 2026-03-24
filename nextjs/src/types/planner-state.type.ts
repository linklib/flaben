import { SilencerTypeEnum } from "@/utils/enums/silencer-type.enum";
import { AirIntakePlacementTypeEnum } from "@/utils/enums/air-intake-placement-type.enum";
import { VentilationSystemTypeEnum } from "@/utils/enums/ventilation-system-type.enum";
import { FloorType } from "@/types/floor.type";

export type PlannerStateType = {
  installationFloor: number;
  silencerType: SilencerTypeEnum;
  airIntakePlacement: AirIntakePlacementTypeEnum;
  lengthFromVentilationUnitToIntakeManifold: number;
  lengthFromVentilationUnitToExhaustManifold: number;
  lengthFromVentilationUnitToIntakePoint: number;
  numberOf90degreesTurns: number;
  systemType: VentilationSystemTypeEnum;
  consumptionRate: number;
  floors: FloorType[];
};

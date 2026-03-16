import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const listShowRecordings = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);

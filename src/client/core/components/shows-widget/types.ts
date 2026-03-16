import type {
  ShowOrderByInput,
  ShowsModelsShowWhereInput,
} from "../../../../common/apis/beaver/types";

export type ShowsWidgetInput = {
  limit: number;
  order: ShowOrderByInput;
  where: ShowsModelsShowWhereInput;
};

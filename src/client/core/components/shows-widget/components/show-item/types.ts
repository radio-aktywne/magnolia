import type { ShowsModelsShow } from "../../../../../../common/apis/beaver/types";

export type ShowItemInput = {
  show: Omit<ShowsModelsShow, "events">;
};

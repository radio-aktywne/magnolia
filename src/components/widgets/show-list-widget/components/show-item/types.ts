import { ListShowsOutput } from "../../../../../lib/beaver/list-shows";

export type ShowItemInput = {
  show: ListShowsOutput["shows"]["shows"][number];
};

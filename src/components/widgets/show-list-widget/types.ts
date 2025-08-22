import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../lib/beaver/list-shows";

export type ShowListWidgetInput = {
  limit: NonNullable<ListShowsInput["limit"]>;
  shows: ListShowsOutput["shows"];
} & Omit<ListShowsInput, "limit">;

import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../lib/beaver/list-shows";

export type ShowListWidgetInput = {
  shows: ListShowsOutput["shows"];
} & ListShowsInput;

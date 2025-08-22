import { components } from "../../../services/beaver";

export type ListShowsInput = {
  include?: null | string;
  limit?: null | number;
  offset?: null | number;
  order?: null | string;
  where?: null | string;
};

export type ListShowsOutput = {
  shows: components["schemas"]["ShowList"];
};

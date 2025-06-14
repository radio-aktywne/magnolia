import { components } from "../../../services/beaver";

export type ListShowsInput = {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: string;
};

export type ListShowsOutput = {
  shows: components["schemas"]["ShowList"];
};

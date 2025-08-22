import { components } from "../../../services/beaver";

export type ListEventsInput = {
  include?: null | string;
  limit?: null | number;
  offset?: null | number;
  order?: null | string;
  query?: null | string;
  where?: null | string;
};

export type ListEventsOutput = {
  events: components["schemas"]["EventList"];
};

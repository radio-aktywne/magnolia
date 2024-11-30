import { components } from "../../../services/beaver";

export type ListEventsInput = {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  query?: string;
  where?: string;
};

export type ListEventsOutput = {
  events: components["schemas"]["EventList"];
};

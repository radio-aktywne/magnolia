import { components } from "../../api/emishows";

export type ListEventsData = components["schemas"]["EventList"];

export type ListEventsProps = {
  limit?: number;
  offset?: number;
  where?: string;
  query?: string;
  include?: string;
  order?: string;
};

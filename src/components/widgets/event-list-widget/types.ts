import {
  ListEventsInput,
  ListEventsOutput,
} from "../../../lib/beaver/list-events";

export type EventListWidgetInput = {
  events: ListEventsOutput["events"];
  perPage?: number;
  where?: ListEventsInput["where"];
};

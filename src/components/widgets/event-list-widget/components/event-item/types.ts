import { ListEventsOutput } from "../../../../../lib/beaver/list-events";

export type EventItemInput = {
  event: ListEventsOutput["events"]["events"][number];
};

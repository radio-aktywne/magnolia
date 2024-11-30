import { ListEventsOutput } from "../../../../../lib/beaver/list-events";

export type EventTileInput = {
  event: ListEventsOutput["events"]["events"][number];
};

import { ListEventsData } from "../../../../actions";

export type EventTileLabels = {
  text: (id: string) => string;
};

export type EventTileProps = {
  event: ListEventsData["events"][number];
  labels: EventTileLabels;
};

import { ListEventsData } from "../../../actions";

export type EventListWidgetProps = {
  events: ListEventsData;
  where: string;
  page: number;
  perPage: number;
};

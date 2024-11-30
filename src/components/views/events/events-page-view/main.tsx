import { listEvents } from "../../../../lib/beaver/list-events";
import { EventListWidget } from "../../../widgets/event-list-widget";
import { perPage, where } from "./constants";
import { EventsPageViewInput } from "./types";

export async function EventsPageView({}: EventsPageViewInput) {
  const { events } = await listEvents({ limit: perPage, where: where });

  return <EventListWidget events={events} perPage={perPage} where={where} />;
}

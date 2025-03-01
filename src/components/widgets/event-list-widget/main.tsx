"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Pagination, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { useListEvents } from "../../../hooks/beaver/use-list-events";
import { useToasts } from "../../../hooks/use-toasts";
import { EventTile } from "./components/event-tile";
import { EventListWidgetInput } from "./types";

export function EventListWidget({
  events: prefetchedEvents,
  perPage = 5,
  where,
}: EventListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentEvents, error } = useListEvents({
    limit: limit,
    offset: offset,
    where: where,
  });
  const events = currentEvents ?? prefetchedEvents;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (events.count === 0) {
    return <Title>{_(msg({ message: "No events." }))}</Title>;
  }

  const pages = Math.ceil(events.count / perPage);

  return (
    <Stack>
      <Stack>
        {events.events.map((event) => (
          <EventTile event={event} key={event.id} />
        ))}
      </Stack>
      <Center>
        <Pagination onChange={setPage} total={pages} value={page} withEdges />
      </Center>
    </Stack>
  );
}

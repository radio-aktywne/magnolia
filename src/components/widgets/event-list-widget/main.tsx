"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Stack, Title, UnstyledButton } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import { useListEvents } from "../../../hooks/beaver/use-list-events";
import { useToasts } from "../../../hooks/use-toasts";
import { EventItem } from "./components/event-item";
import { EventListWidgetInput } from "./types";

export function EventListWidget({
  events: prefetchedEvents,
  where,
}: EventListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentEvents, error } = useListEvents({ where: where });
  const events = currentEvents ?? prefetchedEvents;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (events.count === 0) {
    return <Title>{_(msg({ message: "No events." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <UnstyledButton component={Link} href="/events">
          <Title>{_(msg({ message: "Events" }))}</Title>
        </UnstyledButton>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {events.events.map((event) => (
          <UnstyledButton
            component={Link}
            href={`/records/${event.id}`}
            key={event.id}
          >
            <ListItem>
              <EventItem event={event} />
            </ListItem>
          </UnstyledButton>
        ))}
      </List>
    </Stack>
  );
}

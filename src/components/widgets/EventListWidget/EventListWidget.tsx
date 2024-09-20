"use client";

import {
  Center,
  Loader,
  Pagination,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { labels } from "../../../config/labels";
import { useHydrated, useListEvents } from "../../../hooks";
import { EventListWidgetProps } from "./EventListWidget.types";
import { EventTile } from "./EventTile";

export function EventListWidget({
  events: prefetchedEvents,
  where,
  page,
  perPage,
}: EventListWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hydrated = useHydrated();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentEvents } = useListEvents({ limit, offset, where });
  const events = currentEvents ?? prefetchedEvents;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage.toString());
      router.push(pathname + "?" + newSearchParams.toString());
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const pages = Math.ceil(events.count / perPage) || 1;
    if (page > pages) handlePageChange(pages);
  }, [events.count, page, perPage, handlePageChange]);

  if (!hydrated) return <Loader />;

  if (events.count === 0)
    return <Title>{labels.widgets.events.empty.text}</Title>;

  const pages = Math.ceil(events.count / perPage);

  return (
    <Stack>
      <Stack>
        {events.events.map((event) => (
          <UnstyledButton
            key={event.id}
            component={Link}
            href={`/records/${event.id}`}
          >
            <EventTile
              event={event}
              labels={labels.widgets.events.tiles.event}
            />
          </UnstyledButton>
        ))}
      </Stack>
      <Center>
        <Pagination
          value={page}
          onChange={handlePageChange}
          total={pages}
          withEdges
        />
      </Center>
    </Stack>
  );
}

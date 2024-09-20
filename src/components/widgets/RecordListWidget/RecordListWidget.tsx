"use client";

import { Center, Loader, Pagination, Stack, Title } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { labels } from "../../../config/labels";
import { useGetEvent, useHydrated, useListRecords } from "../../../hooks";
import { RecordListWidgetProps } from "./RecordListWidget.types";
import { RecordTile } from "./RecordTile";

export function RecordListWidget({
  event: prefetchedEvent,
  records: prefetchedRecords,
  page,
  perPage,
}: RecordListWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hydrated = useHydrated();

  const { data: currentEvent } = useGetEvent({ id: prefetchedEvent.id });
  const event = currentEvent ?? prefetchedEvent;

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentRecords } = useListRecords({
    event: event.id,
    limit,
    offset,
  });
  const records = currentRecords ?? prefetchedRecords;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage.toString());
      router.push(pathname + "?" + newSearchParams.toString());
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const pages = Math.ceil(records.count / perPage) || 1;
    if (page > pages) handlePageChange(pages);
  }, [records.count, page, perPage, handlePageChange]);

  if (!hydrated) return <Loader />;

  if (records.count === 0)
    return <Title>{labels.widgets.records.empty.text}</Title>;

  const pages = Math.ceil(records.count / perPage);

  return (
    <Stack>
      <Stack>
        {records.records.map((record) => (
          <RecordTile
            key={record.start}
            record={record}
            labels={labels.widgets.records.tiles.record}
          />
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

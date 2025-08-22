"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Stack, Text, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import dayjs from "../../../dayjs";
import { useToasts } from "../../../hooks/use-toasts";
import { useListEventsRecords } from "../../../hooks/wrappers/use-list-events-records";
import { DateRangeFilter } from "./components/date-range-filter";
import { RecordItem } from "./components/record-item";
import { RecordListWidgetInput } from "./types";

export function RecordListWidget({
  records: prefetchedRecords,
  show,
  ...props
}: RecordListWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentRecords, error, refresh } = useListEventsRecords(props);
  const records = currentRecords ?? prefetchedRecords;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleDateRangeChange = useCallback(
    (start: Date | null, end: Date | null, timezone: string | undefined) => {
      if (start == null && end == null)
        return router.push(`/shows/${show.id}/records`);

      if (start == null || end == null) return;

      const tz = timezone ?? dayjs.tz.guess();
      const after = dayjs.tz(start, tz);
      const before = dayjs.tz(end, tz);

      const params = new URLSearchParams({
        after: after.startOf("day").format("YYYY-MM-DD"),
        before: before.endOf("day").format("YYYY-MM-DD"),
        timezone: tz,
      });

      router.push(`/shows/${show.id}/records?${params}`);
    },
    [router, show.id],
  );

  return (
    <Stack mah="100%" w="100%">
      {records.events.length === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No events." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Records" }))}</Title>
          </Center>
          <DateRangeFilter
            end={
              props.before
                ? dayjs.tz(props.before, props.timezone).toDate()
                : undefined
            }
            onDateRangeChange={handleDateRangeChange}
            start={
              props.after
                ? dayjs.tz(props.after, props.timezone).toDate()
                : undefined
            }
            timezone={props.timezone}
          />
          {records.records.length === 0 ? (
            <Center py="sm">
              <Text size="xs">{_(msg({ message: "No records" }))}</Text>
            </Center>
          ) : (
            <List style={{ overflowY: "auto" }}>
              {records.records.map((record) => (
                <ListItem key={`${record.event.id}-${record.start}`}>
                  <RecordItem
                    onDelete={refresh}
                    record={record}
                    timezone={props.timezone}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Stack>
  );
}

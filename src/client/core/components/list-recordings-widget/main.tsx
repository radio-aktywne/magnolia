"use client";

import type { Dayjs } from "dayjs";

import { msg, plural } from "@lingui/core/macro";
import { Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ListRecordingsWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { dayjs } from "../../../../common/dates/vars/dayjs";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { Controls } from "./components/controls";
import { RecordingItem } from "./components/recording-item";

export function ListRecordingsWidget({ id }: ListRecordingsWidgetInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>([
    now.subtract(1, "month").startOf("day"),
    now.add(1, "month").endOf("day"),
  ]);

  const { notifications } = useNotifications();

  const listShowRecordingsInput = useMemo(
    () => ({
      after: range?.[0].utc().format("YYYY-MM-DDTHH:mm:ss"),
      before: range?.[1].utc().format("YYYY-MM-DDTHH:mm:ss"),
      id: id,
      limit: range?.[0].isSame(range[1], "day") ? null : 10,
      order: "desc" as const,
    }),
    [id, range],
  );

  const listShowRecordingsQuery = useQuery(
    orpcClientSideQueryClient.core.composites.listShowRecordings.queryOptions({
      input: listShowRecordingsInput,
    }),
  );

  const recordingsDeleteMutation = useMutation(
    orpcClientSideQueryClient.core.recordings.delete.mutationOptions({
      meta: {
        awaits: [
          orpcClientSideQueryClient.core.composites.listShowRecordings.key({
            input: listShowRecordingsInput,
          }),
        ],
      },
    }),
  );

  const handleDelete = useCallback(
    async (event: string, start: string) => {
      try {
        await recordingsDeleteMutation.mutateAsync({
          event: event,
          start: start,
        });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND") {
          notifications.warning({
            message: msg({ message: "Recording already deleted" }),
          });
          return;
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });
        throw error;
      }

      notifications.success({
        message: msg({ message: "Recording deleted" }),
      });
    },
    [
      notifications.error,
      notifications.success,
      notifications.warning,
      recordingsDeleteMutation.mutateAsync,
    ],
  );

  const handleRangeChange = useCallback((range: [Dayjs, Dayjs] | null) => {
    setRange(range);
  }, []);

  const count = listShowRecordingsQuery.data?.count;
  const results = listShowRecordingsQuery.data?.results;
  const remaining =
    count !== undefined && results !== undefined
      ? count - results.length
      : undefined;

  const deleteHandlers = useDeepCompareMemo(
    () =>
      results?.map(
        (result) => async () =>
          await handleDelete(result.event.id, result.recording.start),
      ),
    [results, handleDelete],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Recordings" }))}
      </Title>
      <Controls defaultRange={range} onRangeChange={handleRangeChange} />
      {count === undefined ||
      results === undefined ||
      remaining === undefined ? (
        <LoadingWidget />
      ) : count === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No recordings" }))}
        </Text>
      ) : (
        <>
          <List style={{ overflowY: "auto" }}>
            {results.map((result, index) => (
              <RecordingItem
                event={result.event}
                key={`${result.event.id}-${result.recording.start}`}
                onDelete={deleteHandlers?.[index]}
                recording={result.recording}
              />
            ))}
          </List>
          {remaining > 0 && (
            <Text c="dimmed" size="xs" ta="center">
              {localization.localize(
                msg({
                  message: plural(remaining, { other: "...and # more." }),
                }),
              )}
            </Text>
          )}
        </>
      )}
    </Stack>
  );
}

"use client";

import type { Dayjs } from "dayjs";

import { msg, plural } from "@lingui/core/macro";
import { Group, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ListRecordingsWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { createUrl } from "../../../../common/generic/lib/create-url";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { RangeFilter } from "./components/range-filter";
import { RecordingItem } from "./components/recording-item";
import { ShowFilter } from "./components/show-filter";

export function ListRecordingsWidget({ show }: ListRecordingsWidgetInput) {
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);

  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const listShowRecordingsInput = useMemo(
    () => ({
      after: range?.[0].utc().format("YYYY-MM-DDTHH:mm:ss"),
      before: range?.[1].utc().format("YYYY-MM-DDTHH:mm:ss"),
      limit: range?.[0].isSame(range[1], "day") ? null : 10,
      order: "desc" as const,
      show: show,
    }),
    [range, show],
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

  const handleShowChange = useCallback(
    (value: null | string) => {
      router.push(
        createUrl({
          path: "/recordings",
          query: value ? { show: value } : undefined,
        }).url,
      );
    },
    [router],
  );

  const handleRangeChange = useCallback((range: [Dayjs, Dayjs] | null) => {
    setRange(range);
  }, []);

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
      <Group>
        <ShowFilter onShowChange={handleShowChange} show={show} />
        <RangeFilter defaultRange={range} onRangeChange={handleRangeChange} />
      </Group>
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

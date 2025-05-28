"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import { useEffect } from "react";

import { useListRecords } from "../../../hooks/gecko/use-list-records";
import { useToasts } from "../../../hooks/use-toasts";
import { RecordItem } from "./components/record-item";
import { RecordListWidgetInput } from "./types";

export function RecordListWidget({
  event: event,
  records: prefetchedRecords,
}: RecordListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentRecords, error } = useListRecords({ event: event });
  const records = currentRecords ?? prefetchedRecords;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (records.count === 0) {
    return <Title>{_(msg({ message: "No records." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Title>{_(msg({ message: "Records" }))}</Title>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {records.records.map((record) => (
          <ListItem key={record.start}>
            <RecordItem record={record} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

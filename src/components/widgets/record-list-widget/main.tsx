"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import { useEffect } from "react";

import { useToasts } from "../../../hooks/use-toasts";
import { useListEventsRecords } from "../../../hooks/wrappers/use-list-events-records";
import { RecordItem } from "./components/record-item";
import { RecordListWidgetInput } from "./types";

export function RecordListWidget({
  records: prefetchedRecords,
  ...props
}: RecordListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentRecords, error, refresh } = useListEventsRecords(props);
  const records = currentRecords ?? prefetchedRecords;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (records.length === 0) {
    return <Title>{_(msg({ message: "No records." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Title>{_(msg({ message: "Records" }))}</Title>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {records.map((record) => (
          <ListItem key={`${record.event.id}-${record.start}`}>
            <RecordItem onDelete={refresh} record={record} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

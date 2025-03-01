"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

import { deleteRecord } from "../../../../../actions/gecko/delete-record";
import { useListRecords } from "../../../../../hooks/gecko/use-list-records";
import { useToasts } from "../../../../../hooks/use-toasts";
import { RecordTileInput } from "./types";

export function RecordTile({ record }: RecordTileInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { refresh } = useListRecords({ event: record.event });

  const handleDelete = useCallback(async () => {
    const { error } = await deleteRecord({
      event: record.event,
      start: record.start,
    });

    if (error) toasts.error(_(error));
    else toasts.success(_(msg({ message: "Record deleted." })));

    void refresh();
  }, [_, record, refresh, toasts]);

  return (
    <Group>
      <Title>{record.start}</Title>
      <ActionIcon
        component="a"
        download={`${record.event}-${record.start}`}
        href={`/api/records/${record.event}/${record.start}`}
        variant="transparent"
      >
        <IconDownload />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete} variant="transparent">
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}

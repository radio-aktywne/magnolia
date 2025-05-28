"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Text } from "@mantine/core";
import { useCallback } from "react";
import { MdDelete, MdDownload } from "react-icons/md";

import { deleteRecord } from "../../../../../actions/gecko/delete-record";
import { useListRecords } from "../../../../../hooks/gecko/use-list-records";
import { useToasts } from "../../../../../hooks/use-toasts";
import { RecordItemInput } from "./types";

export function RecordItem({ record }: RecordItemInput) {
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
    <>
      <Text fw="bold" size="xs">
        {record.start}
      </Text>
      <ActionIcon
        component="a"
        download={`${record.event}-${record.start}`}
        href={`/api/records/${record.event}/${record.start}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        color="ra-red"
        onClick={handleDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}

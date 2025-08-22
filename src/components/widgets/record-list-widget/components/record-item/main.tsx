"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { ActionIcon, Divider, Group, Text } from "@mantine/core";
import { useCallback } from "react";
import { MdDelete, MdDownload } from "react-icons/md";

import { deleteRecord } from "../../../../../actions/gecko/delete-record";
import { useLanguage } from "../../../../../hooks/use-language";
import { useToasts } from "../../../../../hooks/use-toasts";
import { RecordItemInput } from "./types";
import {
  formatFilename,
  formatSizeText,
  formatStartDateText,
  formatStartTimeText,
} from "./utils";

export function RecordItem({ onDelete, record, timezone }: RecordItemInput) {
  const { _ } = useLingui();
  const toasts = useToasts();
  const { language } = useLanguage();

  const handleDelete = useCallback(async () => {
    const { error } = await deleteRecord({
      event: record.event.id,
      start: record.start,
    });

    if (error) toasts.error(_(error));
    else toasts.success(_(msg({ message: "Record deleted." })));

    onDelete?.();
  }, [_, onDelete, record, toasts]);

  return (
    <Group gap="sm" w="100%">
      <Text flex={1} fw="bold" size="xs">
        {formatStartDateText(record, timezone)}
      </Text>
      <Divider orientation="vertical" size="sm" />
      <Text flex={1} fw="bold" size="xs" ta="center">
        {formatStartTimeText(record, timezone)}
      </Text>
      <Divider orientation="vertical" size="sm" />
      <Text flex={1} fw="bold" size="xs" ta="center">
        {formatSizeText(record, language)}
      </Text>
      <Divider orientation="vertical" size="sm" />
      <ActionIcon
        bd="none"
        component="a"
        download={formatFilename(record)}
        href={`/api/records/${record.event.id}/${record.start}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        bd="none"
        color="ra-red"
        onClick={handleDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </Group>
  );
}

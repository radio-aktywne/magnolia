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

export function RecordItem({ onDelete, record }: RecordItemInput) {
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
    <>
      <Group gap="xs">
        <Text fw="bold" size="xs">
          {formatStartDateText(record)}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text fw="bold" size="xs">
          {formatStartTimeText(record)}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text fw="bold" size="xs">
          {formatSizeText(record, language)}
        </Text>
      </Group>
      <ActionIcon
        component="a"
        download={formatFilename(record)}
        href={`/api/records/${record.event.id}/${record.start}`}
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

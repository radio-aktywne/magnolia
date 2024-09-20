import { ActionIcon, Group, Title } from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import { deleteRecord } from "../../../../actions";
import { useListRecords, useToasts } from "../../../../hooks";
import { RecordTileProps } from "./RecordTile.types";

export function RecordTile({ record, labels }: RecordTileProps) {
  const { success, error } = useToasts();

  const { fetchData } = useListRecords({ event: record.event });

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deleteRecord({
      event: record.event,
      start: record.start,
    });

    if (deleteError !== undefined)
      error(labels.toasts.delete.error(record.start));
    else success(labels.toasts.delete.success(record.start));

    fetchData();
  }, [
    record.event,
    record.start,
    error,
    success,
    labels.toasts.delete,
    fetchData,
  ]);

  return (
    <Group>
      <Title>{labels.text(record.start)}</Title>
      <ActionIcon
        variant="transparent"
        component="a"
        href={`/api/records/${record.event}/${record.start}`}
        download={`${record.event}-${record.start}`}
      >
        <IconDownload />
      </ActionIcon>
      <ActionIcon variant="transparent" color="red" onClick={handleDelete}>
        <IconTrash />
      </ActionIcon>
    </Group>
  );
}

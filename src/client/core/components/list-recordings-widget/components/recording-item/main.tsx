import { ActionIcon, Divider, Group, Text } from "@mantine/core";
import { ListItem } from "@radio-aktywne/ui";
import prettyBytes from "pretty-bytes";
import { useCallback, useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import slugify from "slugify";

import type { RecordingItemInput } from "./types";

import { dayjs } from "../../../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";

export function RecordingItem({
  event,
  onDelete,
  recording,
}: RecordingItemInput) {
  const [deleting, setDeleting] = useState(false);

  const { localization } = useLocalization();

  const handleDelete = useCallback(async () => {
    if (deleting || !onDelete) return;

    setDeleting(true);

    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }, [deleting, onDelete]);

  return (
    <ListItem>
      <Group gap="xs">
        <Text flex={1} fw="bold" size="xs">
          {dayjs
            .tz(recording.start, event.timezone)
            .locale(localization.locale)
            .format("LL")}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text flex={1} fw="bold" size="xs" ta="center">
          {dayjs
            .tz(recording.start, event.timezone)
            .locale(localization.locale)
            .format("LT")}
        </Text>
        <Divider orientation="vertical" size="sm" />
        <Text flex={1} fw="bold" size="xs" ta="center">
          {prettyBytes(recording.length, { locale: localization.locale })}
        </Text>
      </Group>
      <Divider orientation="vertical" size="sm" />
      <ActionIcon
        bd="none"
        component="a"
        download={`${slugify(event.show ? event.show.title : event.id)}_${dayjs.tz(recording.start, event.timezone).utc().format("YYYYMMDDTHHmmss[Z]")}`}
        href={`/api/recordings/${event.id}/${recording.start}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        bd="none"
        color="ra-red"
        disabled={deleting}
        onClick={handleDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </ListItem>
  );
}

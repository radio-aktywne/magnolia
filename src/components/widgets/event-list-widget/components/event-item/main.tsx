import { Text } from "@mantine/core";

import { EventItemInput } from "./types";

export function EventItem({ event }: EventItemInput) {
  return (
    <Text fw="bold" size="xs">
      {event.id}
    </Text>
  );
}

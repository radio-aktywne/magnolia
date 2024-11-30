import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { EventTileInput } from "./types";

export function EventTile({ event }: EventTileInput) {
  return (
    <Group>
      <UnstyledButton
        component={Link}
        href={`/records/${event.id}`}
        key={event.id}
      >
        <Title>{event.id}</Title>
      </UnstyledButton>
    </Group>
  );
}

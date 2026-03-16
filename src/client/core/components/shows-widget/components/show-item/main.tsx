import { Group, Text, UnstyledButton } from "@mantine/core";
import { ListItem } from "@radio-aktywne/ui";
import Link from "next/link";

import type { ShowItemInput } from "./types";

export function ShowItem({ show }: ShowItemInput) {
  return (
    <ListItem>
      <Group gap="xs">
        <UnstyledButton component={Link} href={`/shows/${show.id}/recordings`}>
          <Text fw="bold" size="xs">
            {show.title}
          </Text>
        </UnstyledButton>
      </Group>
    </ListItem>
  );
}

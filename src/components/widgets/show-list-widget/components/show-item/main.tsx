import { Text } from "@mantine/core";

import { ShowItemInput } from "./types";

export function ShowItem({ show }: ShowItemInput) {
  return (
    <Text fw="bold" size="xs">
      {show.title}
    </Text>
  );
}

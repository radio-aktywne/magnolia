import { Title } from "@mantine/core";
import { EventTileProps } from "./EventTile.types";

export function EventTile({ event, labels }: EventTileProps) {
  return <Title>{labels.text(event.id)}</Title>;
}

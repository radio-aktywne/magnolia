"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Stack, Title, UnstyledButton } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import { useListShows } from "../../../hooks/beaver/use-list-shows";
import { useToasts } from "../../../hooks/use-toasts";
import { ShowItem } from "./components/show-item";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  shows: prefetchedShows,
  ...props
}: ShowListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentShows, error } = useListShows(props);
  const shows = currentShows ?? prefetchedShows;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (shows.count === 0) {
    return <Title>{_(msg({ message: "No shows." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <UnstyledButton component={Link} href="/shows">
          <Title>{_(msg({ message: "Shows" }))}</Title>
        </UnstyledButton>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {shows.shows.map((show) => (
          <UnstyledButton
            component={Link}
            href={`/shows/${show.id}/records`}
            key={show.id}
          >
            <ListItem>
              <ShowItem show={show} />
            </ListItem>
          </UnstyledButton>
        ))}
      </List>
    </Stack>
  );
}

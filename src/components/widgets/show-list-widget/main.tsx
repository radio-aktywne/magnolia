"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Center,
  Loader,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { useListShows } from "../../../hooks/beaver/use-list-shows";
import { useToasts } from "../../../hooks/use-toasts";
import { Controls } from "./components/controls";
import { ShowItem } from "./components/show-item";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  shows: prefetchedShows,
  ...props
}: ShowListWidgetInput) {
  const [page, setPage] = useState<number>();
  const [query, setQuery] = useState<string>();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentShows, error } = useListShows({
    ...props,
    offset: page ? (page - 1) * props.limit : undefined,
    where: JSON.stringify({
      ...(props.where ? JSON.parse(props.where) : {}),
      ...(query
        ? {
            title: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {}),
    }),
  });
  const shows = query ? currentShows : (currentShows ?? prefetchedShows);

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  useEffect(() => {
    if (shows === undefined || page === undefined) return;

    const pages = Math.ceil(shows.count / props.limit);
    if (page > pages) setPage(Math.max(1, pages));
  }, [page, shows, props.limit]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleQueryChange = useCallback((query: string) => {
    setPage(undefined);
    setQuery(query || undefined);
  }, []);

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <UnstyledButton component={Link} href="/shows">
          <Title>{_(msg({ message: "Shows" }))}</Title>
        </UnstyledButton>
      </Center>
      <Controls
        onPageChange={handlePageChange}
        onQueryChange={handleQueryChange}
        page={page}
        pages={shows ? Math.ceil(shows.count / props.limit) : 0}
        query={query}
      />
      {shows === undefined ? (
        <Center py="sm">
          <Loader size="calc(var(--mantine-line-height-xs) * var(--mantine-font-size-xs))" />
        </Center>
      ) : shows.count === 0 ? (
        <Center py="sm">
          <Text size="xs">{_(msg({ message: "No shows" }))}</Text>
        </Center>
      ) : (
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
      )}
    </Stack>
  );
}

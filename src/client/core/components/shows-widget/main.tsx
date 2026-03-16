"use client";

import { msg } from "@lingui/core/macro";
import { Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { ShowsWidgetInput } from "./types";

import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { Controls } from "./components/controls";
import { ShowItem } from "./components/show-item";

export function ShowsWidget({ limit, order, where }: ShowsWidgetInput) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>();

  const { localization } = useLocalization();

  const showsListInput = useDeepCompareMemo(
    () => ({
      limit: limit,
      offset: (page - 1) * limit,
      order: order,
      where: {
        ...where,
        ...(query
          ? { title: { contains: query, mode: "insensitive" as const } }
          : {}),
      },
    }),
    [limit, order, page, query, where],
  );

  const queryClient = useQueryClient();

  const showsListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.shows.list.queryOptions({
      input: showsListInput,
    }),
  );

  const maxPage = Math.max(1, Math.ceil(showsListQuery.data.count / limit));

  if (page > maxPage) setPage(maxPage);

  const handlePageChange = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, maxPage));

      if (newPage > 1)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.shows.list.queryOptions({
            input: {
              ...showsListInput,
              offset: (newPage - 2) * limit,
            },
          }),
        );

      if (newPage < maxPage)
        void queryClient.prefetchQuery(
          orpcClientSideQueryClient.core.shows.list.queryOptions({
            input: {
              ...showsListInput,
              offset: newPage * limit,
            },
          }),
        );

      setPage(newPage);
    },
    [limit, maxPage, showsListInput, queryClient],
  );

  const handleQueryChange = useCallback((query: string) => {
    setQuery(query || undefined);
    setPage(1);
  }, []);

  return (
    <Stack h="100%" w="100%">
      <UnstyledButton component={Link} href="/shows">
        <Title ta="center">
          {localization.localize(msg({ message: "Shows" }))}
        </Title>
      </UnstyledButton>
      <Controls
        onPageChange={handlePageChange}
        onQueryChange={handleQueryChange}
        page={page}
        pages={Math.ceil(showsListQuery.data.count / limit)}
        query={query}
      />
      {showsListQuery.data.count === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No shows" }))}
        </Text>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {showsListQuery.data.shows.map((show) => (
            <ShowItem key={show.id} show={show} />
          ))}
        </List>
      )}
    </Stack>
  );
}

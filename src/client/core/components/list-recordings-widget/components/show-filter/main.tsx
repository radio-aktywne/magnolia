import { msg } from "@lingui/core/macro";
import { Select } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useCallback, useMemo } from "react";
import { MdOutlineRadio } from "react-icons/md";

import type { ShowFilterInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";

export function ShowFilter({ onShowChange, show }: ShowFilterInput) {
  const { localization } = useLocalization();

  const showsListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.shows.list.queryOptions({
      input: { limit: null, order: { title: "asc" } },
    }),
  );

  const shows = showsListQuery.data.shows;

  const data = useMemo(
    () => shows.map((show) => ({ label: show.title, value: show.id })),
    [shows],
  );

  const fuse = useMemo(() => new Fuse(data, { keys: ["label"] }), [data]);

  const handleSearch = useCallback(
    ({ search }: { search: string }) =>
      fuse.search(search).map((result) => result.item),
    [fuse],
  );

  return (
    <Select
      clearable={true}
      data={data}
      filter={handleSearch}
      flex={1}
      leftSection={<MdOutlineRadio />}
      leftSectionPointerEvents="none"
      nothingFoundMessage={localization.localize(msg({ message: "No shows" }))}
      onChange={onShowChange}
      placeholder={localization.localize(msg({ message: "Select show" }))}
      searchable={true}
      value={show ?? null}
    />
  );
}

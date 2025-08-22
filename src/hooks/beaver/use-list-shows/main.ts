import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listShows } from "../../../actions/beaver/list-shows";
import {
  UseListShowsInput,
  UseListShowsOutput,
  UseListShowsState,
} from "./types";

export function useListShows({
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  where,
}: UseListShowsInput = {}): UseListShowsOutput {
  const [state, setState] = useState<UseListShowsState>({ loading: true });

  useEffect(() => {
    setState({ loading: true });
  }, [include, limit, offset, order, where]);

  const refresh = useCallback(async () => {
    const { data, error } = await listShows({
      include: include,
      limit: limit,
      offset: offset,
      order: order,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [include, limit, offset, order, where]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}

import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listEvents } from "../../../actions/beaver/list-events";
import {
  UseListEventsInput,
  UseListEventsOutput,
  UseListEventsState,
} from "./types";

export function useListEvents({
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  query,
  where,
}: UseListEventsInput = {}): UseListEventsOutput {
  const [state, setState] = useState<UseListEventsState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await listEvents({
      include: include,
      limit: limit,
      offset: offset,
      order: order,
      query: query,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [include, limit, offset, order, query, where]);

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

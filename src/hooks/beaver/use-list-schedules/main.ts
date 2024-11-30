import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listSchedules } from "../../../actions/beaver/list-schedules";
import {
  UseListSchedulesInput,
  UseListSchedulesOutput,
  UseListSchedulesState,
} from "./types";

export function useListSchedules({
  end: rangeEnd,
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  start: rangeStart,
  where,
}: UseListSchedulesInput = {}): UseListSchedulesOutput {
  const [state, setState] = useState<UseListSchedulesState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await listSchedules({
      end: rangeEnd,
      include: include,
      limit: limit,
      offset: offset,
      order: order,
      start: rangeStart,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [rangeEnd, include, limit, offset, order, rangeStart, where]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}

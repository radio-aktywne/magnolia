import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listEventsRecords } from "../../../actions/wrappers/list-events-records";
import {
  UseListEventsRecordsInput,
  UseListEventsRecordsOutput,
  UseListEventsRecordsState,
} from "./types";

export function useListEventsRecords({
  after,
  before,
  include,
  interval = 1000 * 5,
  limit,
  order,
  timezone,
  where,
}: UseListEventsRecordsInput): UseListEventsRecordsOutput {
  const [state, setState] = useState<UseListEventsRecordsState>({
    loading: true,
  });

  useEffect(() => {
    setState({ loading: true });
  }, [after, before, include, limit, order, timezone, where]);

  const refresh = useCallback(async () => {
    const { data, error } = await listEventsRecords({
      after: after,
      before: before,
      include: include,
      limit: limit,
      order: order,
      timezone: timezone,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [after, before, include, limit, order, timezone, where]);

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

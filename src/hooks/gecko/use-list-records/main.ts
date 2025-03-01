import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listRecords } from "../../../actions/gecko/list-records";
import {
  UseListRecordsInput,
  UseListRecordsOutput,
  UseListRecordsState,
} from "./types";

export function useListRecords({
  after,
  before,
  event,
  interval = 1000 * 5,
  limit,
  offset,
  order,
}: UseListRecordsInput): UseListRecordsOutput {
  const [state, setState] = useState<UseListRecordsState>({
    loading: true,
  });

  const refresh = useCallback(async () => {
    const { data, error } = await listRecords({
      after: after,
      before: before,
      event: event,
      limit: limit,
      offset: offset,
      order: order,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [after, before, event, limit, offset, order]);

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

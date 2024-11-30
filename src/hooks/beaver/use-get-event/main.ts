import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getEvent } from "../../../actions/beaver/get-event";
import { UseGetEventInput, UseGetEventOutput, UseGetEventState } from "./types";

export function useGetEvent({
  id,
  include,
  interval = 1000 * 5,
}: UseGetEventInput): UseGetEventOutput {
  const [state, setState] = useState<UseGetEventState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await getEvent({ id: id, include: include });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [id, include]);

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

import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { ListEventsData, listEvents } from "../../actions";
import { UseListEventsProps } from "./useListEvents.types";

export function useListEvents({
  interval = 1000 * 5,
  ...listEventsProps
}: UseListEventsProps = {}) {
  const [data, setData] = useState<ListEventsData>();

  const serializedListEventsProps = JSON.stringify(listEventsProps);

  const fetchData = useCallback(async () => {
    try {
      const parsedListEventsProps = JSON.parse(serializedListEventsProps);
      const response = await listEvents(parsedListEventsProps);
      if (response.error !== undefined) throw new Error(response.error);
      setData(response.data);
    } catch (error) {
      setData(undefined);
    }
  }, [serializedListEventsProps]);

  const { start, stop } = useInterval(fetchData, interval);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { data, fetchData };
}

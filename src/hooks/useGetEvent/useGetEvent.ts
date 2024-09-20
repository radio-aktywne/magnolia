import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { GetEventData, getEvent } from "../../actions";
import { UseGetEventProps } from "./useGetEvent.types";

export function useGetEvent({
  interval = 1000 * 5,
  ...getEventProps
}: UseGetEventProps) {
  const [data, setData] = useState<GetEventData>();

  const serializedGetEventProps = JSON.stringify(getEventProps);

  const fetchData = useCallback(async () => {
    try {
      const parsedGetEventProps = JSON.parse(serializedGetEventProps);
      const response = await getEvent(parsedGetEventProps);
      if (response.error !== undefined) throw new Error(response.error);
      setData(response.data);
    } catch (error) {
      setData(undefined);
    }
  }, [serializedGetEventProps]);

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

import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { ListRecordsData, listRecords } from "../../actions";
import { UseListRecordsProps } from "./useListRecords.types";

export function useListRecords({
  interval = 1000 * 5,
  ...listRecordsProps
}: UseListRecordsProps) {
  const [data, setData] = useState<ListRecordsData>();

  const serializedListRecordsProps = JSON.stringify(listRecordsProps);

  const fetchData = useCallback(async () => {
    try {
      const parsedListRecordsProps = JSON.parse(serializedListRecordsProps);
      const response = await listRecords(parsedListRecordsProps);
      if (response.error !== undefined) throw new Error(response.error);
      setData(response.data);
    } catch (error) {
      setData(undefined);
    }
  }, [serializedListRecordsProps]);

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

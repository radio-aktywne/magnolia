"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Center, Pagination, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import { useListRecords } from "../../../hooks/gecko/use-list-records";
import { useToasts } from "../../../hooks/use-toasts";
import { RecordTile } from "./components/record-tile";
import { RecordListWidgetInput } from "./types";

export function RecordListWidget({
  event: event,
  perPage = 5,
  records: prefetchedRecords,
}: RecordListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentRecords, error } = useListRecords({
    event: event,
    limit: limit,
    offset: offset,
  });
  const records = currentRecords ?? prefetchedRecords;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (records.count === 0) {
    return <Title>{_(msg({ message: "No records." }))}</Title>;
  }

  const pages = Math.ceil(records.count / perPage);

  return (
    <Stack>
      <Stack>
        {records.records.map((record) => (
          <RecordTile key={record.start} record={record} />
        ))}
      </Stack>
      <Center>
        <Pagination onChange={setPage} total={pages} value={page} withEdges />
      </Center>
    </Stack>
  );
}

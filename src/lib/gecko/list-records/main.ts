import "server-only";

import { gecko } from "../../../services/gecko";
import { GeckoError } from "../errors";
import { EventNotFoundError } from "./errors";
import { ListRecordsInput, ListRecordsOutput } from "./types";

export async function listRecords({
  after,
  before,
  event,
  limit,
  offset,
  order,
}: ListRecordsInput): Promise<ListRecordsOutput> {
  const { data, error, response } = await gecko.GET("/records/{event}", {
    cache: "no-store",
    params: {
      path: {
        event: event,
      },
      query: {
        after: after,
        before: before,
        limit: limit,
        offset: offset,
        order: order,
      },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new EventNotFoundError();
    throw new GeckoError();
  }

  return { records: data };
}

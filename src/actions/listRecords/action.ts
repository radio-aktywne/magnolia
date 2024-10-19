"use server";

import { gecko } from "../../api";
import { ListRecordsData, ListRecordsProps } from "./types";

const errorMessage = "Listing records failed.";

export async function listRecords({
  event,
  after,
  before,
  limit,
  offset,
  order,
}: ListRecordsProps) {
  try {
    const { data, error, response } = await gecko.GET("/records/{event}", {
      params: {
        path: { event },
        query: { after, before, limit, offset, order },
      },
    });

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data: data as ListRecordsData, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}

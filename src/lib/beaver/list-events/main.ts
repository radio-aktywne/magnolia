import "server-only";

import { beaver } from "../../../services/beaver";
import { BeaverError } from "../errors";
import { ListEventsInput, ListEventsOutput } from "./types";

export async function listEvents({
  include,
  limit,
  offset,
  order,
  query,
  where,
}: ListEventsInput = {}): Promise<ListEventsOutput> {
  const { data, error } = await beaver.GET("/events", {
    params: {
      query: {
        include: include,
        limit: limit,
        offset: offset,
        order: order,
        query: query,
        where: where,
      },
    },
  });

  if (error) throw new BeaverError();

  return { events: data };
}

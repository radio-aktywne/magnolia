import "server-only";

import { beaver } from "../../../services/beaver";
import { BeaverError } from "../errors";
import { ListShowsInput, ListShowsOutput } from "./types";

export async function listShows({
  include,
  limit,
  offset,
  order,
  where,
}: ListShowsInput = {}): Promise<ListShowsOutput> {
  const { data, error, response } = await beaver.GET("/shows", {
    cache: "no-store",
    params: {
      query: {
        include: include,
        limit: limit,
        offset: offset,
        order: order,
        where: where,
      },
    },
  });

  if (error || !response.ok) throw new BeaverError();

  return { shows: data };
}

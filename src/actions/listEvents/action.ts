"use server";

import { beaver } from "../../api";
import { ListEventsData, ListEventsProps } from "./types";

const errorMessage = "Listing events failed.";

export async function listEvents({
  limit,
  offset,
  where,
  query,
  include,
  order,
}: ListEventsProps = {}) {
  try {
    const { data, error, response } = await beaver.GET("/events", {
      params: {
        query: { limit, offset, where, query, include, order },
      },
    });

    if (error || !response.ok) return { data: undefined, error: errorMessage };
    return { data: data as ListEventsData, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}

import "server-only";

import { beaver } from "../../../services/beaver";
import { BeaverError } from "../errors";
import { EventNotFoundError } from "./errors";
import { GetEventInput, GetEventOutput } from "./types";

export async function getEvent({
  id,
  include,
}: GetEventInput): Promise<GetEventOutput> {
  const { data, error, response } = await beaver.GET("/events/{id}", {
    cache: "no-store",
    params: {
      path: { id: id },
      query: { include: include },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new EventNotFoundError();
    throw new BeaverError();
  }

  return { event: data };
}

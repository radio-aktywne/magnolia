import "server-only";

import { beaver } from "../../../services/beaver";
import { BeaverError } from "../errors";
import { ShowNotFoundError } from "./errors";
import { GetShowInput, GetShowOutput } from "./types";

export async function getShow({
  id,
  include,
}: GetShowInput): Promise<GetShowOutput> {
  const { data, error, response } = await beaver.GET("/shows/{id}", {
    cache: "no-store",
    params: {
      path: { id: id },
      query: { include: include },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new ShowNotFoundError();
    throw new BeaverError();
  }

  return { show: data };
}

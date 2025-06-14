"use server";

import { getSession } from "../../../lib/auth/get-session";
import { BeaverError } from "../../../lib/beaver/errors";
import { listShows as internalListShows } from "../../../lib/beaver/list-shows";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListShowsInput, ListShowsOutput } from "./types";

export async function listShows(
  input: ListShowsInput = {},
): Promise<ListShowsOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { shows } = await internalListShows({
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: shows };
  } catch (error) {
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

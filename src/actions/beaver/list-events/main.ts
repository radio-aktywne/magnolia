"use server";

import { auth } from "../../../auth";
import { BeaverError } from "../../../lib/beaver/errors";
import { listEvents as internalListEvents } from "../../../lib/beaver/list-events";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListEventsInput, ListEventsOutput } from "./types";

export async function listEvents(
  input: ListEventsInput,
): Promise<ListEventsOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { events } = await internalListEvents({
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      query: parsed.data.query,
      where: parsed.data.where,
    });
    return { data: events };
  } catch (error) {
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

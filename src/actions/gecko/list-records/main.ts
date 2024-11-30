"use server";

import { GeckoError } from "../../../lib/gecko/errors";
import {
  EventNotFoundError,
  listRecords as internalListRecords,
} from "../../../lib/gecko/list-records";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListRecordsInput, ListRecordsOutput } from "./types";

export async function listRecords(
  input: ListRecordsInput,
): Promise<ListRecordsOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { records } = await internalListRecords({
      after: parsed.data.after,
      before: parsed.data.before,
      event: parsed.data.event,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
    });
    return { data: records };
  } catch (error) {
    if (error instanceof EventNotFoundError) return { error: errors.notFound };
    if (error instanceof GeckoError) return { error: errors.generic };
    throw error;
  }
}

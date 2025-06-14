"use server";

import { getSession } from "../../../lib/auth/get-session";
import {
  listEventsRecords as internalListEventsRecords,
  ListEventsRecordsError,
} from "../../../lib/wrappers/list-events-records";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListEventsRecordsInput, ListEventsRecordsOutput } from "./types";

export async function listEventsRecords(
  input: ListEventsRecordsInput,
): Promise<ListEventsRecordsOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { records } = await internalListEventsRecords({
      after: parsed.data.after,
      before: parsed.data.before,
      include: parsed.data.include,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: records };
  } catch (error) {
    if (error instanceof ListEventsRecordsError)
      return { error: errors.generic };
    throw error;
  }
}

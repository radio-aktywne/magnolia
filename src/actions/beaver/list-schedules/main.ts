"use server";

import { getSession } from "../../../lib/auth/get-session";
import { BeaverError } from "../../../lib/beaver/errors";
import { listSchedules as internalListSchedules } from "../../../lib/beaver/list-schedules";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListSchedulesInput, ListSchedulesOutput } from "./types";

export async function listSchedules(
  input: ListSchedulesInput = {},
): Promise<ListSchedulesOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { schedules } = await internalListSchedules({
      end: parsed.data.end,
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      start: parsed.data.start,
      where: parsed.data.where,
    });
    return { data: schedules };
  } catch (error) {
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

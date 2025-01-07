"use server";

import { getSession } from "../../../lib/auth/get-session";
import {
  deleteRecord as internalDeleteRecord,
  RecordNotFoundError,
} from "../../../lib/gecko/delete-record";
import { GeckoError } from "../../../lib/gecko/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteRecordInput, DeleteRecordOutput } from "./types";

export async function deleteRecord(
  input: DeleteRecordInput,
): Promise<DeleteRecordOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteRecord({
      event: parsed.data.event,
      start: parsed.data.start,
    });
    return {};
  } catch (error) {
    if (error instanceof RecordNotFoundError) return { error: errors.notFound };
    if (error instanceof GeckoError) return { error: errors.generic };
    throw error;
  }
}

import "server-only";

import { gecko } from "../../../services/gecko";
import { GeckoError } from "../errors";
import { RecordNotFoundError } from "./errors";
import { DeleteRecordInput } from "./types";

export async function deleteRecord({
  event,
  start,
}: DeleteRecordInput): Promise<void> {
  const { error, response } = await gecko.DELETE("/records/{event}/{start}", {
    params: {
      path: {
        event: event,
        start: start,
      },
    },
  });

  if (error) {
    if (response.status === 404) throw new RecordNotFoundError();
    throw new GeckoError();
  }
}

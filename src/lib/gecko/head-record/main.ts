import "server-only";

import { gecko } from "../../../services/gecko";
import { GeckoError } from "../errors";
import { RecordNotFoundError } from "./errors";
import { HeadRecordInput, HeadRecordOutput } from "./types";

export async function headRecord({
  event,
  start,
}: HeadRecordInput): Promise<HeadRecordOutput> {
  const { error, response } = await gecko.HEAD("/records/{event}/{start}", {
    cache: "no-store",
    params: {
      path: {
        event: event,
        start: start,
      },
    },
    parseAs: "stream",
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new RecordNotFoundError();
    throw new GeckoError();
  }

  const etag = response.headers.get("etag")!;
  const length = Number(response.headers.get("content-length")!);
  const modified = response.headers.get("last-modified")!;
  const type = response.headers.get("content-type")!;

  return {
    etag: etag,
    length: length,
    modified: modified,
    type: type,
  };
}

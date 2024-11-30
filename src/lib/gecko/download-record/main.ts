import "server-only";

import { gecko } from "../../../services/gecko";
import { GeckoError } from "../errors";
import { RecordNotFoundError } from "./errors";
import { DownloadRecordInput, DownloadRecordOutput } from "./types";

export async function downloadRecord({
  event,
  start,
}: DownloadRecordInput): Promise<DownloadRecordOutput> {
  const { data, error, response } = await gecko.GET(
    "/records/{event}/{start}",
    {
      params: {
        path: {
          event: event,
          start: start,
        },
      },
      parseAs: "stream",
    },
  );

  if (error) {
    if (response.status === 404) throw new RecordNotFoundError();
    throw new GeckoError();
  }

  const etag = response.headers.get("etag")!;
  const length = Number(response.headers.get("content-length")!);
  const modified = response.headers.get("last-modified")!;
  const type = response.headers.get("content-type")!;

  return {
    data: data!,
    etag: etag,
    length: length,
    modified: modified,
    type: type,
  };
}

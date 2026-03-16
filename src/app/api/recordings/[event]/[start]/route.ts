import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const { response: recordingsEventStartDownloadResponse } =
    await state.current.apis.gecko.recordingsEventStartDownload({
      path: { event: pathParameters.event, start: pathParameters.start },
    });

  if (recordingsEventStartDownloadResponse.status === 404)
    return new Response(STATUS_CODES[404], { status: 404 });

  return new Response(recordingsEventStartDownloadResponse.body, {
    headers: {
      "Content-Length":
        recordingsEventStartDownloadResponse.headers.get("Content-Length")!,
      "Content-Type":
        recordingsEventStartDownloadResponse.headers.get("Content-Type")!,
      ETag: recordingsEventStartDownloadResponse.headers.get("ETag")!,
      "Last-Modified":
        recordingsEventStartDownloadResponse.headers.get("Last-Modified")!,
    },
    status: 200,
  });
}

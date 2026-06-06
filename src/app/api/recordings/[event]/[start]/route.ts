import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { isAuthenticated } from "../../../../../common/access/lib/is-authenticated";
import { getIdentity } from "../../../../../server/identity/lib/get-identity";
import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const { identity } = await getIdentity();
  if (!isAuthenticated(identity.user))
    return new Response(STATUS_CODES[403], { status: 403 });

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const {
    data: recordingsEventStartDownloadData,
    response: recordingsEventStartDownloadResponse,
  } = await state.current.apis.gecko.recordingsEventStartDownload({
    path: { event: pathParameters.event, start: pathParameters.start },
  });

  if (recordingsEventStartDownloadData === undefined) {
    if (recordingsEventStartDownloadResponse.status === 400)
      return new Response(STATUS_CODES[400], { status: 400 });

    if (recordingsEventStartDownloadResponse.status === 404)
      return new Response(STATUS_CODES[404], { status: 404 });

    return new Response(STATUS_CODES[500], { status: 500 });
  }

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

import { NextRequest, NextResponse } from "next/server";

import {
  downloadRecord,
  RecordNotFoundError,
} from "../../../../../lib/gecko/download-record";
import { errors } from "./constants";
import { RouteContext } from "./types";

export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { event, start } = context.params;

    const { data, etag, length, modified, type } = await downloadRecord({
      event: event,
      start: start,
    });

    const headers = {
      "Content-Length": length.toString(),
      "Content-Type": type,
      ETag: etag,
      "Last-Modified": modified,
    };

    return new NextResponse(data, {
      headers: headers,
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    if (error instanceof RecordNotFoundError) {
      return NextResponse.json(
        { error: errors.download.notFound },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { error: errors.download.generic },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

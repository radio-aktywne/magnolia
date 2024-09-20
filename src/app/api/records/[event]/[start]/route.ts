import { emirecords } from "../../../../../api";

type Params = {
  event: string;
  start: string;
};

type Context = {
  params: Params;
};

function createGenericErrorResponse(error?: string) {
  return Response.json(
    { error: error || "Internal Server Error." },
    { status: 500, statusText: "Internal Server Error" },
  );
}

function createNotFoundResponse(error?: string) {
  return Response.json(
    { error: error || "Record not found." },
    { status: 404, statusText: "Not Found" },
  );
}

export async function GET(request: Request, { params }: Context) {
  try {
    const { data, error, response } = await emirecords.GET(
      "/records/{event}/{start}",
      {
        params: {
          path: { event: params.event, start: params.start },
        },
        parseAs: "stream",
      },
    );

    if (error) {
      if (response.status === 404) return createNotFoundResponse();
      return createGenericErrorResponse("Downloading record failed.");
    }

    const headers = new Headers();
    const keepHeaders = [
      "Content-Length",
      "Content-Type",
      "ETag",
      "Last-Modified",
    ];

    for (const key of keepHeaders) {
      const value = response.headers.get(key);
      if (value !== null) headers.set(key, value);
    }

    const options = { status: 200, statusText: "OK", headers: headers };

    return new Response(data, options);
  } catch (error) {
    return createGenericErrorResponse("Downloading record failed.");
  }
}

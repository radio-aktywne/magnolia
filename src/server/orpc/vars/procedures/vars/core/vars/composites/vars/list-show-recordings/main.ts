import { call } from "@orpc/server";
import { omit } from "es-toolkit/object";

import { dayjs } from "../../../../../../../../../../common/dates/vars/dayjs";
import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";
import { events as eventsProcedures } from "../../../events";
import { recordings } from "../../../recordings";

export const listShowRecordings =
  orpcServerRootBase.core.composites.listShowRecordings
    .use(authenticatedMiddleware)
    .handler(async ({ input }) => {
      const eventsList = await call(eventsProcedures.list, {
        include: { show: true },
        where: { showId: input.show ?? null, type: "live" as const },
      });

      const perEventData = await Promise.all(
        eventsList.events.map(async (event) => {
          const data = await call(recordings.list, {
            after:
              input.after &&
              dayjs
                .utc(input.after)
                .tz(event.timezone)
                .format("YYYY-MM-DDTHH:mm:ss"),
            before:
              input.before &&
              dayjs
                .utc(input.before)
                .tz(event.timezone)
                .format("YYYY-MM-DDTHH:mm:ss"),
            event: event.id,
            limit: input.limit,
            order: input.order,
          });

          return { data: data, event: event };
        }),
      );

      const count = perEventData.reduce((sum, { data }) => sum + data.count, 0);

      const results = await Promise.all(
        perEventData
          .flatMap((item) =>
            item.data.recordings.map((recording) => ({
              event: item.event,
              start: dayjs.tz(recording.start, item.event.timezone),
            })),
          )
          .toSorted(
            (a, b) => a.start.diff(b.start) * (input.order === "asc" ? 1 : -1),
          )
          .slice(0, input.limit ?? undefined)
          .map(async (data) => {
            const start = data.start.format("YYYY-MM-DDTHH:mm:ss");

            const { response: recordingsEventStartHeaddownloadResponse } =
              await state.current.apis.gecko.recordingsEventStartHeaddownload({
                path: { event: data.event.id, start: start },
              });

            const headers = recordingsEventStartHeaddownloadResponse.headers;

            return {
              event: {
                ...data.event,
                show: data.event.show
                  ? omit(data.event.show, ["events"])
                  : null,
              },
              recording: {
                etag: headers.get("ETag")!,
                length: headers.get("Content-Length")!,
                modified: headers.get("Last-Modified")!,
                start: start,
                type: headers.get("Content-Type")!,
              },
            };
          }),
      );

      return { count: count, results: results };
    });

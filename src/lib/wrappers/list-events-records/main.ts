import "server-only";

import dayjs from "../../../dayjs";
import { BeaverError } from "../../beaver/errors";
import { listEvents } from "../../beaver/list-events";
import { GeckoError } from "../../gecko/errors";
import { headRecord } from "../../gecko/head-record";
import { listRecords } from "../../gecko/list-records";
import { ListEventsRecordsError } from "./errors";
import { ListEventsRecordsInput, ListEventsRecordsOutput } from "./types";

export async function listEventsRecords({
  after,
  before,
  include,
  order = "desc",
  where,
}: ListEventsRecordsInput): Promise<ListEventsRecordsOutput> {
  const { events } = await (async () => {
    try {
      return listEvents({ include: include, where: where });
    } catch (error) {
      if (error instanceof BeaverError) throw new ListEventsRecordsError();
      throw error;
    }
  })();

  const promises = events.events.map(async (event) => {
    const { records } = await (async () => {
      try {
        return await listRecords({
          after: after,
          before: before,
          event: event.id,
          order: order,
        });
      } catch (error) {
        if (error instanceof GeckoError) throw new ListEventsRecordsError();
        throw error;
      }
    })();

    const promises = records.records.map(async (record) => {
      const { etag, length, modified, type } = await (async () => {
        try {
          return await headRecord({ event: event.id, start: record.start });
        } catch (error) {
          if (error instanceof GeckoError) throw new ListEventsRecordsError();
          throw error;
        }
      })();

      return {
        etag: etag,
        event: event,
        length: length,
        modified: modified,
        start: dayjs.tz(record.start, event.timezone),
        type: type,
      };
    });

    return await Promise.all(promises);
  });

  const records = (await Promise.all(promises))
    .flat()
    .toSorted((a, b) => a.start.diff(b.start) * (order === "asc" ? 1 : -1))
    .map((record) => ({
      etag: record.etag,
      event: record.event,
      length: record.length,
      modified: record.modified,
      start: record.start.format("YYYY-MM-DDTHH:mm:ss"),
      type: record.type,
    }));

  return { records: records };
}

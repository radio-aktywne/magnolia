import prettyBytes from "pretty-bytes";
import slugify from "slugify";

import dayjs from "../../../../../dayjs";
import { RecordItemInput } from "./types";

export function formatStartDateText(
  record: RecordItemInput["record"],
  timezone?: string,
) {
  const start = dayjs.tz(record.start, record.event.timezone);
  return (timezone ? start.tz(timezone) : start.local()).format("LL");
}

export function formatStartTimeText(
  record: RecordItemInput["record"],
  timezone?: string,
) {
  const start = dayjs.tz(record.start, record.event.timezone);
  return (timezone ? start.tz(timezone) : start.local()).format("LT");
}

export function formatSizeText(
  record: RecordItemInput["record"],
  language: string,
) {
  return prettyBytes(record.length, { locale: language });
}

export function formatFilename(record: RecordItemInput["record"]) {
  const title = record.event.show?.title;
  const start = dayjs.tz(record.start, record.event.timezone);

  const formattedTitle = slugify(title || "Unknown");
  const formattedStart = start.utc().format("YYYYMMDDTHHmmss[Z]");

  return `${formattedTitle}_${formattedStart}`;
}

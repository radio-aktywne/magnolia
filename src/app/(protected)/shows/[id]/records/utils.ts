import { parseQueryParams } from "../../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { RecordListPageSearchParams } from "./types";

export function parseParams(params: RecordListPageSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}

import { components } from "../../../services/gecko";

export type ListRecordsInput = {
  after?: null | string;
  before?: null | string;
  event: string;
  limit?: null | number;
  offset?: null | number;
  order?: "asc" | "desc" | null;
};

export type ListRecordsOutput = {
  records: components["schemas"]["RecordList"];
};

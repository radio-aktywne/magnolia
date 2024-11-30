import { components } from "../../../services/gecko";

export type ListRecordsInput = {
  after?: string;
  before?: string;
  event: string;
  limit?: number;
  offset?: number;
  order?: "asc" | "desc";
};

export type ListRecordsOutput = {
  records: components["schemas"]["RecordList"];
};

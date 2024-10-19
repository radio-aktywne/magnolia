import { components } from "../../api/gecko";

export type ListRecordsData = components["schemas"]["RecordList"];

export type ListRecordsProps = {
  event: string;
  after?: string;
  before?: string;
  limit?: number;
  offset?: number;
  order?: "asc" | "desc";
};

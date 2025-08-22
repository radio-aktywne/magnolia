import { ListEventsInput, ListEventsOutput } from "../../beaver/list-events";
import { HeadRecordOutput } from "../../gecko/head-record";
import { ListRecordsInput, ListRecordsOutput } from "../../gecko/list-records";

export type ListEventsRecordsRecord = {
  etag: HeadRecordOutput["etag"];
  event: ListEventsOutput["events"]["events"][number];
  length: HeadRecordOutput["length"];
  modified: HeadRecordOutput["modified"];
  start: ListRecordsOutput["records"]["records"][number]["start"];
  type: HeadRecordOutput["type"];
};

export type ListEventsRecordsRecords = {
  events: ListEventsOutput["events"]["events"];
  records: ListEventsRecordsRecord[];
};

export type ListEventsRecordsInput = {
  after?: string;
  before?: string;
  include?: ListEventsInput["include"];
  limit?: ListRecordsInput["limit"];
  order?: NonNullable<ListRecordsInput["order"]>;
  timezone?: string;
  where?: ListEventsInput["where"];
};

export type ListEventsRecordsOutput = {
  records: ListEventsRecordsRecords;
};

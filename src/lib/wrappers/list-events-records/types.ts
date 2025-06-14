import { ListEventsInput, ListEventsOutput } from "../../beaver/list-events";
import { HeadRecordOutput } from "../../gecko/head-record";
import { ListRecordsInput, ListRecordsOutput } from "../../gecko/list-records";

export type Record = {
  etag: HeadRecordOutput["etag"];
  event: ListEventsOutput["events"]["events"][number];
  length: HeadRecordOutput["length"];
  modified: HeadRecordOutput["modified"];
  start: ListRecordsOutput["records"]["records"][number]["start"];
  type: HeadRecordOutput["type"];
};

export type ListEventsRecordsInput = {
  after?: ListRecordsInput["after"];
  before?: ListRecordsInput["before"];
  include?: ListEventsInput["include"];
  order?: ListRecordsInput["order"];
  where?: ListEventsInput["where"];
};

export type ListEventsRecordsOutput = {
  records: Record[];
};

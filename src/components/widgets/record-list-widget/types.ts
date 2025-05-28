import {
  ListRecordsInput,
  ListRecordsOutput,
} from "../../../lib/gecko/list-records";

export type RecordListWidgetInput = {
  event: ListRecordsInput["event"];
  records: ListRecordsOutput["records"];
};

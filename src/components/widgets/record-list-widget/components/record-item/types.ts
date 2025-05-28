import { ListRecordsOutput } from "../../../../../lib/gecko/list-records";

export type RecordItemInput = {
  record: ListRecordsOutput["records"]["records"][number];
};

import { ListRecordsOutput } from "../../../../../lib/gecko/list-records";

export type RecordTileInput = {
  record: ListRecordsOutput["records"]["records"][number];
};

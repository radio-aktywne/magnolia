import { ListEventsRecordsOutput } from "../../../../../lib/wrappers/list-events-records";

export type RecordItemInput = {
  onDelete?: () => void;
  record: ListEventsRecordsOutput["records"][number];
};

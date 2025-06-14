import { UseListEventsRecordsInput } from "../../../hooks/wrappers/use-list-events-records";
import { ListEventsRecordsOutput } from "../../../lib/wrappers/list-events-records";

export type RecordListWidgetInput = {
  records: ListEventsRecordsOutput["records"];
} & UseListEventsRecordsInput;

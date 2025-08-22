import { GetShowOutput } from "../../../lib/beaver/get-show";
import {
  ListEventsRecordsInput,
  ListEventsRecordsOutput,
} from "../../../lib/wrappers/list-events-records";

export type RecordListWidgetInput = {
  records: ListEventsRecordsOutput["records"];
  show: GetShowOutput["show"];
} & ListEventsRecordsInput;

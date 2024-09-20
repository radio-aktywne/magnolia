import { GetEventData, ListRecordsData } from "../../../actions";

export type RecordListWidgetProps = {
  event: GetEventData;
  records: ListRecordsData;
  page: number;
  perPage: number;
};

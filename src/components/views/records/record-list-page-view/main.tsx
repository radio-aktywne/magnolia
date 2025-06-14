import { listEventsRecords } from "../../../../lib/wrappers/list-events-records";
import { RecordListWidget } from "../../../widgets/record-list-widget";
import { RecordListPageViewInput } from "./types";

export async function RecordListPageView({ show }: RecordListPageViewInput) {
  const include = JSON.stringify({ show: true });
  const where = JSON.stringify({ show: { id: show }, type: "live" });
  const { records } = await listEventsRecords({
    include: include,
    where: where,
  });

  return <RecordListWidget include={include} records={records} where={where} />;
}

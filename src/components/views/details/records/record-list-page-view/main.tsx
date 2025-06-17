import { notFound } from "next/navigation";

import { getShow, ShowNotFoundError } from "../../../../../lib/beaver/get-show";
import { listEventsRecords } from "../../../../../lib/wrappers/list-events-records";
import { RecordListWidget } from "../../../../widgets/record-list-widget";
import { RecordListPageViewInput } from "./types";

export async function RecordListPageView({
  show: showId,
}: RecordListPageViewInput) {
  const { show } = await (async () => {
    try {
      return await getShow({ id: showId });
    } catch (error) {
      if (error instanceof ShowNotFoundError) notFound();
      throw error;
    }
  })();

  const include = JSON.stringify({ show: true });
  const where = JSON.stringify({ show: { id: show.id }, type: "live" });
  const { records } = await listEventsRecords({
    include: include,
    where: where,
  });

  return <RecordListWidget include={include} records={records} where={where} />;
}

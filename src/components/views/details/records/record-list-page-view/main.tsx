import { notFound } from "next/navigation";

import { getShow, ShowNotFoundError } from "../../../../../lib/beaver/get-show";
import { listEventsRecords } from "../../../../../lib/wrappers/list-events-records";
import { RecordListWidget } from "../../../../widgets/record-list-widget";
import { RecordListPageViewInput } from "./types";

export async function RecordListPageView({
  after,
  before,
  show: showId,
  timezone,
}: RecordListPageViewInput) {
  const { show } = await (async () => {
    try {
      return await getShow({ id: showId });
    } catch (error) {
      if (error instanceof ShowNotFoundError) notFound();
      throw error;
    }
  })();

  const props = {
    after: after && before && timezone ? after : undefined,
    before: after && before && timezone ? before : undefined,
    include: JSON.stringify({ show: true }),
    limit: 100,
    timezone: after && before && timezone ? timezone : undefined,
    where: JSON.stringify({
      show: { is: { id: show.id } },
      type: "live",
    }),
  };
  const { records } = await listEventsRecords(props);

  return <RecordListWidget records={records} show={show} {...props} />;
}

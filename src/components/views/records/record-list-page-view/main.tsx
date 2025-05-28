import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  listRecords,
} from "../../../../lib/gecko/list-records";
import { RecordListWidget } from "../../../widgets/record-list-widget";
import { RecordListPageViewInput } from "./types";

export async function RecordListPageView({ event }: RecordListPageViewInput) {
  try {
    const { records } = await listRecords({ event: event });

    return <RecordListWidget event={event} records={records} />;
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}

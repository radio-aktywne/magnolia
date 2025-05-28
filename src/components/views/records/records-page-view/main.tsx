import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  listRecords,
} from "../../../../lib/gecko/list-records";
import { RecordListWidget } from "../../../widgets/record-list-widget";
import { RecordsPageViewInput } from "./types";

export async function RecordsPageView({ event }: RecordsPageViewInput) {
  try {
    const { records } = await listRecords({ event: event });

    return <RecordListWidget event={event} records={records} />;
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}

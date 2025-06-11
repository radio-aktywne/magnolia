import { RecordListEventNotFoundMetadata } from "../../../../../components/metadata/records/record-list-event-not-found-metadata";
import { RecordListEventNotFoundView } from "../../../../../components/views/records/record-list-event-not-found-view";
import { RecordListEventNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function RecordListEventNotFound({}: RecordListEventNotFoundInput) {
  return (
    <>
      <RecordListEventNotFoundMetadata />
      <RecordListEventNotFoundView />
    </>
  );
}

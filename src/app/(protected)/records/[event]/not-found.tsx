import { RecordsEventNotFoundMetadata } from "../../../../components/metadata/records/records-event-not-found-metadata";
import { RecordsEventNotFoundView } from "../../../../components/views/records/records-event-not-found-view";
import { RecordsEventNotFoundInput } from "./types";

export default function RecordsEventNotFound({}: RecordsEventNotFoundInput) {
  return (
    <>
      <RecordsEventNotFoundMetadata />
      <RecordsEventNotFoundView />
    </>
  );
}

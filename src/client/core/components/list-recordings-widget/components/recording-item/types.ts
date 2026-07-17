import type { ORPCOutputs } from "../../../../../../common/orpc/types/inferred";

type ListShowRecordingsOutput =
  ORPCOutputs["core"]["composites"]["listShowRecordings"];

type RecordingItemEvent = ListShowRecordingsOutput["results"][number]["event"];

type RecordingItemRecording =
  ListShowRecordingsOutput["results"][number]["recording"];

export type RecordingItemInput = {
  event: RecordingItemEvent;
  onDelete?: () => Promise<unknown>;
  recording: RecordingItemRecording;
};

import type { SetNonNullableDeep } from "type-fest";

import type { ORPCOutputs } from "../../../../../../common/orpc/types/inferred";

type ListShowRecordingsOutput =
  ORPCOutputs["core"]["composites"]["listShowRecordings"];

type RecordingItemEvent = SetNonNullableDeep<
  ListShowRecordingsOutput["results"][number]["event"],
  "show"
>;

type RecordingItemRecording =
  ListShowRecordingsOutput["results"][number]["recording"];

export type RecordingItemInput = {
  event: RecordingItemEvent;
  onDelete?: () => Promise<unknown>;
  recording: RecordingItemRecording;
};

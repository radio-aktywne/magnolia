import { MessageDescriptor } from "@lingui/core";

import { DeleteRecordInput as InternalDeleteRecordInput } from "../../../lib/gecko/delete-record";

export type DeleteRecordInput = {
  event: InternalDeleteRecordInput["event"];
  start: InternalDeleteRecordInput["start"];
};

export type DeleteRecordSuccessOutput = {
  error?: never;
};

export type DeleteRecordErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteRecordOutput =
  | DeleteRecordErrorOutput
  | DeleteRecordSuccessOutput;

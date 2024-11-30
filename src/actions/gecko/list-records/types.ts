import { MessageDescriptor } from "@lingui/core";

import {
  ListRecordsInput as InternalListRecordsInput,
  ListRecordsOutput as InternalListRecordsOutput,
} from "../../../lib/gecko/list-records";

export type ListRecordsInput = {
  after?: InternalListRecordsInput["after"];
  before?: InternalListRecordsInput["before"];
  event: InternalListRecordsInput["event"];
  limit?: InternalListRecordsInput["limit"];
  offset?: InternalListRecordsInput["offset"];
  order?: InternalListRecordsInput["order"];
};

export type ListRecordsSuccessOutput = {
  data: InternalListRecordsOutput["records"];
  error?: never;
};

export type ListRecordsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListRecordsOutput =
  | ListRecordsErrorOutput
  | ListRecordsSuccessOutput;

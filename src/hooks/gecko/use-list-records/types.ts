import { MessageDescriptor } from "@lingui/core";

import {
  ListRecordsInput,
  ListRecordsOutput,
} from "../../../lib/gecko/list-records";

export type UseListRecordsInput = {
  after?: ListRecordsInput["after"];
  before?: ListRecordsInput["before"];
  event: ListRecordsInput["event"];
  interval?: number;
  limit?: ListRecordsInput["limit"];
  offset?: ListRecordsInput["offset"];
  order?: ListRecordsInput["order"];
};

export type UseListRecordsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListRecordsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListRecordsSuccessState = {
  data: ListRecordsOutput["records"];
  error?: never;
  loading: false;
};

export type UseListRecordsState =
  | UseListRecordsErrorState
  | UseListRecordsLoadingState
  | UseListRecordsSuccessState;

export type UseListRecordsOutput = {
  refresh: () => Promise<void>;
} & UseListRecordsState;

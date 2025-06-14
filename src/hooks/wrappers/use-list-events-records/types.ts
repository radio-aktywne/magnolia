import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsRecordsInput,
  ListEventsRecordsOutput,
} from "../../../lib/wrappers/list-events-records";

export type UseListEventsRecordsInput = {
  after?: ListEventsRecordsInput["after"];
  before?: ListEventsRecordsInput["before"];
  include?: ListEventsRecordsInput["include"];
  interval?: number;
  order?: ListEventsRecordsInput["order"];
  where?: ListEventsRecordsInput["where"];
};

export type UseListEventsRecordsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListEventsRecordsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListEventsRecordsSuccessState = {
  data: ListEventsRecordsOutput["records"];
  error?: never;
  loading: false;
};

export type UseListEventsRecordsState =
  | UseListEventsRecordsErrorState
  | UseListEventsRecordsLoadingState
  | UseListEventsRecordsSuccessState;

export type UseListEventsRecordsOutput = {
  refresh: () => Promise<void>;
} & UseListEventsRecordsState;

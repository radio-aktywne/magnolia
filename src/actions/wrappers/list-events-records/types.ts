import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsRecordsInput as InternalListEventsRecordsInput,
  ListEventsRecordsOutput as InternalListEventsRecordsOutput,
} from "../../../lib/wrappers/list-events-records";

export type ListEventsRecordsInput = {
  after?: InternalListEventsRecordsInput["after"];
  before?: InternalListEventsRecordsInput["before"];
  include?: InternalListEventsRecordsInput["include"];
  order?: InternalListEventsRecordsInput["order"];
  where?: InternalListEventsRecordsInput["where"];
};

export type ListEventsRecordsSuccessOutput = {
  data: InternalListEventsRecordsOutput["records"];
  error?: never;
};

export type ListEventsRecordsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListEventsRecordsOutput =
  | ListEventsRecordsErrorOutput
  | ListEventsRecordsSuccessOutput;

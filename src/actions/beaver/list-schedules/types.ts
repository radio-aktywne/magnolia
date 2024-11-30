import { MessageDescriptor } from "@lingui/core";

import {
  ListSchedulesInput as InternalListSchedulesInput,
  ListSchedulesOutput as InternalListSchedulesOutput,
} from "../../../lib/beaver/list-schedules";

export type ListSchedulesInput = {
  end?: InternalListSchedulesInput["end"];
  include?: InternalListSchedulesInput["include"];
  limit?: InternalListSchedulesInput["limit"];
  offset?: InternalListSchedulesInput["offset"];
  order?: InternalListSchedulesInput["order"];
  start?: InternalListSchedulesInput["start"];
  where?: InternalListSchedulesInput["where"];
};

export type ListSchedulesSuccessOutput = {
  data: InternalListSchedulesOutput["schedules"];
  error?: never;
};

export type ListSchedulesErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListSchedulesOutput =
  | ListSchedulesErrorOutput
  | ListSchedulesSuccessOutput;

import { MessageDescriptor } from "@lingui/core";

import {
  ListSchedulesInput,
  ListSchedulesOutput,
} from "../../../lib/beaver/list-schedules";

export type UseListSchedulesInput = {
  end?: ListSchedulesInput["end"];
  include?: ListSchedulesInput["include"];
  interval?: number;
  limit?: ListSchedulesInput["limit"];
  offset?: ListSchedulesInput["offset"];
  order?: ListSchedulesInput["order"];
  start?: ListSchedulesInput["start"];
  where?: ListSchedulesInput["where"];
};

export type UseListSchedulesLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListSchedulesErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListSchedulesSuccessState = {
  data: ListSchedulesOutput["schedules"];
  error?: never;
  loading: false;
};

export type UseListSchedulesState =
  | UseListSchedulesErrorState
  | UseListSchedulesLoadingState
  | UseListSchedulesSuccessState;

export type UseListSchedulesOutput = {
  refresh: () => Promise<void>;
} & UseListSchedulesState;

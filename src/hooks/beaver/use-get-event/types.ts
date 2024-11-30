import { MessageDescriptor } from "@lingui/core";

import { GetEventInput, GetEventOutput } from "../../../lib/beaver/get-event";

export type UseGetEventInput = {
  id: GetEventInput["id"];
  include?: GetEventInput["include"];
  interval?: number;
};

export type UseGetEventLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseGetEventErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseGetEventSuccessState = {
  data: GetEventOutput["event"];
  error?: never;
  loading: false;
};

export type UseGetEventState =
  | UseGetEventErrorState
  | UseGetEventLoadingState
  | UseGetEventSuccessState;

export type UseGetEventOutput = {
  refresh: () => Promise<void>;
} & UseGetEventState;

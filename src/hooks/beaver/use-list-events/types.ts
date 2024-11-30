import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsInput,
  ListEventsOutput,
} from "../../../lib/beaver/list-events";

export type UseListEventsInput = {
  include?: ListEventsInput["include"];
  interval?: number;
  limit?: ListEventsInput["limit"];
  offset?: ListEventsInput["offset"];
  order?: ListEventsInput["order"];
  query?: ListEventsInput["query"];
  where?: ListEventsInput["where"];
};

export type UseListEventsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListEventsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListEventsSuccessState = {
  data: ListEventsOutput["events"];
  error?: never;
  loading: false;
};

export type UseListEventsState =
  | UseListEventsErrorState
  | UseListEventsLoadingState
  | UseListEventsSuccessState;

export type UseListEventsOutput = {
  refresh: () => Promise<void>;
} & UseListEventsState;

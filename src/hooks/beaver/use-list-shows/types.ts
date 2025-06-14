import { MessageDescriptor } from "@lingui/core";

import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../lib/beaver/list-shows";

export type UseListShowsInput = {
  include?: ListShowsInput["include"];
  interval?: number;
  limit?: ListShowsInput["limit"];
  offset?: ListShowsInput["offset"];
  order?: ListShowsInput["order"];
  where?: ListShowsInput["where"];
};

export type UseListShowsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListShowsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListShowsSuccessState = {
  data: ListShowsOutput["shows"];
  error?: never;
  loading: false;
};

export type UseListShowsState =
  | UseListShowsErrorState
  | UseListShowsLoadingState
  | UseListShowsSuccessState;

export type UseListShowsOutput = {
  refresh: () => Promise<void>;
} & UseListShowsState;

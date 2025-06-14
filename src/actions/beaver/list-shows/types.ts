import { MessageDescriptor } from "@lingui/core";

import {
  ListShowsInput as InternalListShowsInput,
  ListShowsOutput as InternalListShowsOutput,
} from "../../../lib/beaver/list-shows";

export type ListShowsInput = {
  include?: InternalListShowsInput["include"];
  limit?: InternalListShowsInput["limit"];
  offset?: InternalListShowsInput["offset"];
  order?: InternalListShowsInput["order"];
  where?: InternalListShowsInput["where"];
};

export type ListShowsSuccessOutput = {
  data: InternalListShowsOutput["shows"];
  error?: never;
};

export type ListShowsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListShowsOutput = ListShowsErrorOutput | ListShowsSuccessOutput;

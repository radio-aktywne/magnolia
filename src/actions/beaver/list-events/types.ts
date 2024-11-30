import { MessageDescriptor } from "@lingui/core";

import {
  ListEventsInput as InternalListEventsInput,
  ListEventsOutput as InternalListEventsOutput,
} from "../../../lib/beaver/list-events";

export type ListEventsInput = {
  include?: InternalListEventsInput["include"];
  limit?: InternalListEventsInput["limit"];
  offset?: InternalListEventsInput["offset"];
  order?: InternalListEventsInput["order"];
  query?: InternalListEventsInput["query"];
  where?: InternalListEventsInput["where"];
};

export type ListEventsSuccessOutput = {
  data: InternalListEventsOutput["events"];
  error?: never;
};

export type ListEventsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListEventsOutput = ListEventsErrorOutput | ListEventsSuccessOutput;

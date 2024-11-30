import { MessageDescriptor } from "@lingui/core";

import {
  GetEventInput as InternalGetEventInput,
  GetEventOutput as InternalGetEventOutput,
} from "../../../lib/beaver/get-event";

export type GetEventInput = {
  id: InternalGetEventInput["id"];
  include?: InternalGetEventInput["include"];
};

export type GetEventSuccessOutput = {
  data: InternalGetEventOutput["event"];
  error?: never;
};

export type GetEventErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type GetEventOutput = GetEventErrorOutput | GetEventSuccessOutput;

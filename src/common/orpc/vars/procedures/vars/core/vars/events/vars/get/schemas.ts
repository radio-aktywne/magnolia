import * as z from "zod";

import {
  EventsIdGetRequestSchema,
  EventsIdGetResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...EventsIdGetRequestSchema.shape.path.shape,
    ...EventsIdGetRequestSchema.shape.query.unwrap().shape,
  }),
  Output: EventsIdGetResponseSchema,
};

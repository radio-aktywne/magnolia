import * as z from "zod";

import {
  ShowsIdGetRequestSchema,
  ShowsIdGetResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...ShowsIdGetRequestSchema.shape.path.shape,
    ...ShowsIdGetRequestSchema.shape.query.unwrap().shape,
  }),
  Output: ShowsIdGetResponseSchema,
};

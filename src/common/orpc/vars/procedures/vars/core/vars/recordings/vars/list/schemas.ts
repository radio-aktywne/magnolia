import * as z from "zod";

import {
  RecordingsEventListRequestSchema,
  RecordingsEventListResponseSchema,
} from "../../../../../../../../../apis/gecko/schemas";

export const Schemas = {
  Input: z.object({
    ...RecordingsEventListRequestSchema.shape.path.shape,
    ...RecordingsEventListRequestSchema.shape.query.unwrap().shape,
  }),
  Output: RecordingsEventListResponseSchema,
};

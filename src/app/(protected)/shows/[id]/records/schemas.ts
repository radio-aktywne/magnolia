import { z } from "zod";

export const searchParamsSchema = z.union([
  z.object({
    after: z.string().date(),
    before: z.string().date(),
    timezone: z.string(),
  }),
  z.object({
    after: z.undefined(),
    before: z.undefined(),
    timezone: z.undefined(),
  }),
]);

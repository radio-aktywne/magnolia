import { z } from "zod";

export const inputSchema = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  event: z.string(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

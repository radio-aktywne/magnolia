import { z } from "zod";

export const inputSchema = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  include: z.string().nullable().optional(),
  limit: z.number().nullable().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  timezone: z.string().optional(),
  where: z.string().nullable().optional(),
});

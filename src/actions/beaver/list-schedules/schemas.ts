import { z } from "zod";

export const inputSchema = z.object({
  end: z.string().optional(),
  include: z.string().optional(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
  order: z.string().optional(),
  start: z.string().optional(),
  where: z.string().optional(),
});

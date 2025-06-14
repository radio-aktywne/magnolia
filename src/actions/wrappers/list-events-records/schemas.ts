import { z } from "zod";

export const inputSchema = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  include: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  where: z.string().optional(),
});

import { z } from "zod";

export const inputSchema = z.object({
  event: z.string(),
  start: z.string(),
});

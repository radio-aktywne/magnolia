import * as z from "zod";

export const Schemas = {
  Path: z.object({
    event: z.uuidv4(),
    start: z.iso.datetime({ local: true }),
  }),
};

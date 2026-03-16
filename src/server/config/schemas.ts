import "server-only";
import * as z from "zod";

export const ConfigSchemas = {
  Config: z
    .object({
      apis: z
        .object({
          beaver: z
            .object({
              host: z.string().default("localhost"),
              path: z.string().nullish(),
              port: z.coerce
                .number()
                .min(0)
                .max(65535)
                .nullish()
                .default(10500),
              scheme: z.string().default("http"),
            })
            .prefault({}),
          gecko: z
            .object({
              host: z.string().default("localhost"),
              path: z.string().nullish(),
              port: z.coerce
                .number()
                .min(0)
                .max(65535)
                .nullish()
                .default(10700),
              scheme: z.string().default("http"),
            })
            .prefault({}),
          icanhazdadjoke: z
            .object({
              host: z.string().default("icanhazdadjoke.com"),
              path: z.string().nullish(),
              port: z.coerce.number().min(0).max(65535).nullish(),
              scheme: z.string().default("https"),
            })
            .prefault({}),
        })
        .prefault({}),
      debug: z.stringbool().default(true),
      server: z
        .object({
          host: z.string().default("0.0.0.0"),
          port: z.coerce.number().min(0).max(65535).default(10720),
        })
        .prefault({}),
    })
    .prefault({}),
};

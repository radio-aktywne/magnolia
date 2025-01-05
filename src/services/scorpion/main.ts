import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import { paths } from "./types";

const scheme = process.env.MAGNOLIA__SCORPION__PUBLIC__SCHEME || "http";
const host = process.env.MAGNOLIA__SCORPION__PUBLIC__HOST || "localhost";
const port =
  process.env.MAGNOLIA__SCORPION__PUBLIC__PORT === undefined
    ? 20000
    : process.env.MAGNOLIA__SCORPION__PUBLIC__PORT;
const path = (process.env.MAGNOLIA__SCORPION__PUBLIC__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

const client = process.env.MAGNOLIA__SCORPION__PUBLIC__CLIENT || "magnolia";
const secret = process.env.MAGNOLIA__SCORPION__PUBLIC__SECRET || "secret";

export const scorpionCredentials = {
  client: client,
  secret: secret,
};

export const scorpionConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const scorpion = createClient<paths>(scorpionConfig);

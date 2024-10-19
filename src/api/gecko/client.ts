import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./types";

const scheme = process.env.MAGNOLIA__GECKO__HTTP__SCHEME || "http";
const host = process.env.MAGNOLIA__GECKO__HTTP__HOST || "localhost";
const port =
  process.env.MAGNOLIA__GECKO__HTTP__PORT === undefined
    ? 31000
    : process.env.MAGNOLIA__GECKO__HTTP__PORT;
const path = (process.env.MAGNOLIA__GECKO__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const gecko = createClient<paths>({ baseUrl: url });

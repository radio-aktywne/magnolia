import type { PageViewInput } from "../../../../types";
import type { Schemas } from "./schemas";

export async function ShowsPageView({}: PageViewInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  return null;
}

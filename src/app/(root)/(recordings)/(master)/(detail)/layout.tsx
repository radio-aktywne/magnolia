import { connection } from "next/server";

import type { LayoutInput } from "../../../../types";
import type { Keys } from "./types";

import { RecordingsDetailLayoutView } from "./layout.view";

export default async function RecordingsDetailLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <RecordingsDetailLayoutView>{children}</RecordingsDetailLayoutView>;
}

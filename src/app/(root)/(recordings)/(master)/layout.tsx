import { connection } from "next/server";

import type { LayoutInput } from "../../../types";
import type { Keys } from "./types";

import { RecordingsMasterLayoutView } from "./layout.view";

export default async function RecordingsMasterLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <RecordingsMasterLayoutView>{children}</RecordingsMasterLayoutView>;
}

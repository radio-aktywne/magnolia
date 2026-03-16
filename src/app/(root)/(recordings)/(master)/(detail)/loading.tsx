import { connection } from "next/server";

import type { LoadingInput } from "../../../../types";

import { RecordingsDetailLoadingView } from "./loading.view";

export default async function RecordingsDetailLoading({}: LoadingInput) {
  await connection();

  return <RecordingsDetailLoadingView />;
}

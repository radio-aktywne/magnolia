"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../../../types";

import { Metadata } from "../../../../../isomorphic/metadata/components/metadata";
import { RecordingsDetailErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • magnolia" });
}

export default function RecordingsDetailError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <RecordingsDetailErrorView reset={reset} />
    </>
  );
}

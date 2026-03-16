"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../types";

import { Metadata } from "../../../isomorphic/metadata/components/metadata";
import { RecordingsErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • magnolia" });
}

export default function RecordingsError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <RecordingsErrorView reset={reset} />
    </>
  );
}

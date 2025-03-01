"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { RecordsEventNotFoundMetadataInput } from "./types";

export function RecordsEventNotFoundMetadata({}: RecordsEventNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "magnolia" })),
    title: _(msg({ message: "Event not found • magnolia" })),
  });

  return null;
}

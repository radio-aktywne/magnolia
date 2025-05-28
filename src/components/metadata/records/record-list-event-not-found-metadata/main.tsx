"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { RecordListEventNotFoundMetadataInput } from "./types";

export function RecordListEventNotFoundMetadata({}: RecordListEventNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "magnolia" })),
    title: _(msg({ message: "Event not found • magnolia" })),
  });

  return null;
}

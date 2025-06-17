"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { ShowNotFoundMetadataInput } from "./types";

export function ShowNotFoundMetadata({}: ShowNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "magnolia" })),
    title: _(msg({ message: "Show not found • magnolia" })),
  });

  return null;
}

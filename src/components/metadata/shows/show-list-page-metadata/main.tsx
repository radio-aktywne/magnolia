"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { ShowListPageMetadataInput } from "./types";

export function ShowListPageMetadata({}: ShowListPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "magnolia" })),
    title: _(msg({ message: "Shows • magnolia" })),
  });

  return null;
}

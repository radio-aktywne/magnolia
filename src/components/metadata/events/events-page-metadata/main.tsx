"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { EventsPageMetadataInput } from "./types";

export function EventsPageMetadata({}: EventsPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "magnolia" })),
    title: _(msg({ message: "Events • magnolia" })),
  });

  return null;
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { RecordsEventNotFoundViewInput } from "./types";

export function RecordsEventNotFoundView({}: RecordsEventNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Event not found." }))}</Title>;
}

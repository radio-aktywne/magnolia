"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { RecordListEventNotFoundViewInput } from "./types";

export function RecordListEventNotFoundView({}: RecordListEventNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Event not found." }))}</Title>;
}

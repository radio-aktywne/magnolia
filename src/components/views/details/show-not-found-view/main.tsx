"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { ShowNotFoundViewInput } from "./types";

export function ShowNotFoundView({}: ShowNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Show not found." }))}</Title>;
}

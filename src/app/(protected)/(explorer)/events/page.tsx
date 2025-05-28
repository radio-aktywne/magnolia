import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { EventListPageMetadata } from "../../../../components/metadata/events/event-list-page-metadata";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { EventListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "magnolia" })),
    title: i18n._(msg({ message: "Events • magnolia" })),
  };
}

export default function EventListPage({}: EventListPageInput) {
  return <EventListPageMetadata />;
}

import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { EventsPageMetadata } from "../../../components/metadata/events/events-page-metadata";
import { EventsPageView } from "../../../components/views/events/events-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { EventsPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "magnolia" })),
    title: i18n._(msg({ message: "Events • magnolia" })),
  };
}

export default function EventsPage({}: EventsPageInput) {
  return (
    <>
      <EventsPageMetadata />
      <EventsPageView />
    </>
  );
}

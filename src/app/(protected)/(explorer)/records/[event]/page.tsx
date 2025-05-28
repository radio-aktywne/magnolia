import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { RecordListPageMetadata } from "../../../../../components/metadata/records/record-list-page-metadata";
import { RecordListPageView } from "../../../../../components/views/records/record-list-page-view";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { RecordListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: RecordListPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "magnolia" })),
    title: i18n._(msg({ message: "Records • magnolia" })),
  };
}

export default function RecordListPage({ params }: RecordListPageInput) {
  const event = params.event;

  return (
    <>
      <RecordListPageMetadata event={event} />
      <RecordListPageView event={event} />
    </>
  );
}

import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { RecordsPageMetadata } from "../../../../components/metadata/records/records-page-metadata";
import { RecordsPageView } from "../../../../components/views/records/records-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { RecordsPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: RecordsPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "magnolia" })),
    title: t(i18n)(msg({ message: "Records • magnolia" })),
  };
}

export default function RecordsPage({ params }: RecordsPageInput) {
  const event = params.event;

  return (
    <>
      <RecordsPageMetadata event={event} />
      <RecordsPageView event={event} />
    </>
  );
}

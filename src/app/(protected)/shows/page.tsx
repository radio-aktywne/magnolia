import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { ShowListPageMetadata } from "../../../components/metadata/shows/show-list-page-metadata";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { ShowListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "magnolia" })),
    title: i18n._(msg({ message: "Shows • magnolia" })),
  };
}

export default function ShowListPage({}: ShowListPageInput) {
  return <ShowListPageMetadata />;
}

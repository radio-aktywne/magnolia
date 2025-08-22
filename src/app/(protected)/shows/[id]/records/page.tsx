import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { RecordListPageMetadata } from "../../../../../components/metadata/details/records/record-list-page-metadata";
import { RecordListPageView } from "../../../../../components/views/details/records/record-list-page-view";
import dayjs from "../../../../../dayjs";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { RecordListPageInput } from "./types";
import { parseParams } from "./utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: RecordListPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "magnolia" })),
    title: i18n._(msg({ message: "Records • magnolia" })),
  };
}

export default function RecordListPage({
  params,
  searchParams,
}: RecordListPageInput) {
  const { id: show } = params;

  const { data: parsedSearchParams, error: parsingSearchParamsError } =
    parseParams(searchParams);

  if (parsingSearchParamsError) throw new Error("Invalid query parameters");

  const { after, before, timezone } = parsedSearchParams;

  if (after && !dayjs.tz(after, timezone).isValid())
    throw new Error("Invalid query parameters");

  if (before && !dayjs.tz(before, timezone).isValid())
    throw new Error("Invalid query parameters");

  return (
    <>
      <RecordListPageMetadata show={show} />
      <RecordListPageView
        after={after}
        before={before}
        show={show}
        timezone={timezone}
      />
    </>
  );
}

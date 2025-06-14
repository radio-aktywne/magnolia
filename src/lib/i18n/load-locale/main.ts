import { defaultLocale } from "../../../constants";
import { defaultLocales } from "./constants";
import { LoadLocaleInput, LoadLocaleOutput } from "./types";
import { activate, getLocale, tryImport } from "./utils";

export async function loadLocale({
  i18n,
  language,
}: LoadLocaleInput): Promise<LoadLocaleOutput> {
  const locale = getLocale(language);

  const fullLocale = locale.baseName.toLowerCase();
  const fullImported = await tryImport(fullLocale);
  if (fullImported) {
    activate(i18n, fullLocale, fullImported);
    return { locale: fullLocale };
  }

  const languageLocale = locale.language.toLowerCase();
  const languageImported = await tryImport(languageLocale);
  if (languageImported) {
    activate(i18n, languageLocale, languageImported);
    return { locale: languageLocale };
  }

  activate(i18n, defaultLocale, defaultLocales);
  return { locale: defaultLocale };
}

import { I18n } from "@lingui/core";

import { defaultLocale } from "../../../constants";
import dayjs from "../../../dayjs";
import { I18NLocale, Locales } from "./types";

export function activate(i18n: I18n, locale: string, locales: Locales) {
  dayjs.locale(locale, locales.dayjs);
  i18n.load(locale, locales.i18n.messages);
  i18n.activate(locale);
}

export function getLocale(language: string) {
  try {
    return new Intl.Locale(language);
  } catch {
    return new Intl.Locale(defaultLocale);
  }
}

export async function tryImport(locale: string) {
  try {
    const dayjsLocale = (await import(`dayjs/locale/${locale}.js`)) as ILocale;
    const i18nLocale = (await import(
      `../../../locales/${locale}.po`
    )) as I18NLocale;

    return { dayjs: dayjsLocale, i18n: i18nLocale } as Locales;
  } catch {
    return null;
  }
}

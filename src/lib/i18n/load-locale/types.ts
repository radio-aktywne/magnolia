import { I18n, Messages } from "@lingui/core";

export type I18NLocale = {
  messages: Messages;
};

export type Locales = {
  dayjs: ILocale;
  i18n: I18NLocale;
};

export type LoadLocaleInput = {
  i18n: I18n;
  language: string;
};

export type LoadLocaleOutput = {
  locale: string;
};

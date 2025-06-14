import * as dayjsLocale from "dayjs/locale/en.js";

import * as i18nLocale from "../../../locales/en.po";
import { Locales } from "./types";

export const defaultLocales = {
  dayjs: dayjsLocale,
  i18n: i18nLocale,
} as Locales;

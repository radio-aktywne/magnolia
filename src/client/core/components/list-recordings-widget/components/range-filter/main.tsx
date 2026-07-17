import { msg } from "@lingui/core/macro";
import { DatePickerInput } from "@mantine/dates";
import { useCallback, useMemo } from "react";
import { MdCalendarToday } from "react-icons/md";

import type { RangeFilterInput } from "./types";

import { dayjs } from "../../../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";

export function RangeFilter({ defaultRange, onRangeChange }: RangeFilterInput) {
  const { localization } = useLocalization();

  const defaultValue = useMemo(
    () =>
      [
        defaultRange
          ? defaultRange[0]
              .locale(localization.locale)
              .local()
              .format("YYYY-MM-DD")
          : null,
        defaultRange
          ? defaultRange[1]
              .locale(localization.locale)
              .local()
              .format("YYYY-MM-DD")
          : null,
      ] as [null | string, null | string],
    [defaultRange, localization.locale],
  );

  const handleRangeChange = useCallback(
    (range: [null | string, null | string]) => {
      const [start, end] = range;

      if (!start && !end) onRangeChange?.(null);

      if (start && end)
        onRangeChange?.([
          dayjs(start).locale(localization.locale).local().startOf("day"),
          dayjs(end).locale(localization.locale).local().endOf("day"),
        ]);
    },
    [localization.locale, onRangeChange],
  );

  return (
    <DatePickerInput
      allowSingleDateInRange={true}
      clearable={true}
      defaultValue={defaultValue}
      dropdownType="modal"
      flex={1}
      highlightToday={true}
      leftSection={<MdCalendarToday />}
      leftSectionPointerEvents="none"
      onChange={handleRangeChange}
      placeholder={localization.localize(
        msg({ message: "Filter by date range" }),
      )}
      type="range"
      valueFormat="LL"
    />
  );
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  DatePickerInput,
  DatesProvider,
  DatesRangeValue,
} from "@mantine/dates";
import { useCallback } from "react";
import { MdCalendarToday } from "react-icons/md";

import dayjs from "../../../../../dayjs";
import { DateRangeFilterInput } from "./types";

export function DateRangeFilter({
  end,
  onDateRangeChange,
  start,
  timezone,
}: DateRangeFilterInput) {
  const { _ } = useLingui();

  const handleDateRangeChange = useCallback(
    ([newStart, newEnd]: DatesRangeValue) => {
      onDateRangeChange?.(newStart, newEnd, timezone);
    },
    [onDateRangeChange, timezone],
  );

  return (
    <DatesProvider settings={{ consistentWeeks: true, timezone: timezone }}>
      <DatePickerInput
        allowSingleDateInRange={true}
        clearable={true}
        defaultValue={
          start && end
            ? [
                dayjs.tz(start, timezone).toDate(),
                dayjs.tz(end, timezone).toDate(),
              ]
            : undefined
        }
        dropdownType="modal"
        highlightToday={true}
        leftSection={<MdCalendarToday />}
        leftSectionPointerEvents="none"
        onChange={handleDateRangeChange}
        placeholder={_(msg({ message: "Filter by date range" }))}
        type="range"
        valueFormat="LL"
      />
    </DatesProvider>
  );
}

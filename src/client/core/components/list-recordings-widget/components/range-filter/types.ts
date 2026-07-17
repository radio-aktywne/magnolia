import type { Dayjs } from "dayjs";

export type RangeFilterInput = {
  defaultRange?: [Dayjs, Dayjs] | null;
  onRangeChange?: (range: [Dayjs, Dayjs] | null) => void;
};

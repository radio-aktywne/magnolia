import type { Dayjs } from "dayjs";

export type ControlsInput = {
  defaultRange?: [Dayjs, Dayjs] | null;
  onRangeChange?: (range: [Dayjs, Dayjs] | null) => void;
};

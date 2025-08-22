export type DateRangeFilterInput = {
  end?: Date;
  onDateRangeChange?: (
    start: Date | null,
    end: Date | null,
    timezone: string | undefined,
  ) => void;
  start?: Date;
  timezone?: string;
};

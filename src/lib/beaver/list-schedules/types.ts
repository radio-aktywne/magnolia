import { components } from "../../../services/beaver";

export type ListSchedulesInput = {
  end?: string;
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  start?: string;
  where?: string;
};

export type ListSchedulesOutput = {
  schedules: components["schemas"]["ScheduleList"];
};

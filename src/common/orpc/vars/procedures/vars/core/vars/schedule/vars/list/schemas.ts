import {
  ScheduleListRequestSchema,
  ScheduleListResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: ScheduleListRequestSchema.shape.query,
  Output: ScheduleListResponseSchema,
};

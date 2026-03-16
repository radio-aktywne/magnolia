import {
  EventsListRequestSchema,
  EventsListResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: EventsListRequestSchema.shape.query,
  Output: EventsListResponseSchema,
};

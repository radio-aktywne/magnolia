import {
  ShowsListRequestSchema,
  ShowsListResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: ShowsListRequestSchema.shape.query,
  Output: ShowsListResponseSchema,
};

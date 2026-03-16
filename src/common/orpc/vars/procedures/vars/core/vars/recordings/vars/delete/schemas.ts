import {
  RecordingsEventStartDeleteRequestSchema,
  RecordingsEventStartDeleteResponseSchema,
} from "../../../../../../../../../apis/gecko/schemas";

export const Schemas = {
  Input: RecordingsEventStartDeleteRequestSchema.shape.path,
  Output: RecordingsEventStartDeleteResponseSchema,
};

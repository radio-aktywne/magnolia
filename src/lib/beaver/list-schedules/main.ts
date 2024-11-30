import "server-only";

import { beaver } from "../../../services/beaver";
import { BeaverError } from "../errors";
import { ListSchedulesInput, ListSchedulesOutput } from "./types";

export async function listSchedules({
  end,
  include,
  limit,
  offset,
  order,
  start,
  where,
}: ListSchedulesInput = {}): Promise<ListSchedulesOutput> {
  const { data, error } = await beaver.GET("/schedule", {
    params: {
      query: {
        end: end,
        include: include,
        limit: limit,
        offset: offset,
        order: order,
        start: start,
        where: where,
      },
    },
  });

  if (error) throw new BeaverError();

  return { schedules: data };
}

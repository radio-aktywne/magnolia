"use server";

import { emishows } from "../../api";
import { GetEventData, GetEventProps } from "./types";

const errorMessage = "Getting event failed.";

export async function getEvent({ id, include }: GetEventProps) {
  try {
    const { data, error, response } = await emishows.GET("/events/{id}", {
      params: {
        path: { id },
        query: { include },
      },
    });

    if (error || !response.ok) {
      if (response.status === 404) return { data: undefined, error: undefined };

      return { data: undefined, error: errorMessage };
    }
    return { data: data as GetEventData, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}

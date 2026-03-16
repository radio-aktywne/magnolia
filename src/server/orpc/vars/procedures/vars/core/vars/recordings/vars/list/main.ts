import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.recordings.list.handler(
  async ({ errors, input }) => {
    const { event, ...query } = input;

    const {
      data: recordingsEventListData,
      response: recordingsEventListResponse,
    } = await state.current.apis.gecko.recordingsEventList({
      path: { event: event },
      query: mapValues(query ?? {}, (value) =>
        isJSONValue(value) ? JSON.stringify(value) : value,
      ),
    });

    if (recordingsEventListData === undefined) {
      if (recordingsEventListResponse.status === 404) throw errors.NOT_FOUND();

      throw errors.INTERNAL_SERVER_ERROR();
    }

    return recordingsEventListData;
  },
);

import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.shows.list.handler(
  async ({ errors, input }) => {
    const { data: showsListData } = await state.current.apis.beaver.showsList({
      query: mapValues(input ?? {}, (value) =>
        isJSONValue(value) ? JSON.stringify(value) : value,
      ),
    });

    if (showsListData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return showsListData;
  },
);

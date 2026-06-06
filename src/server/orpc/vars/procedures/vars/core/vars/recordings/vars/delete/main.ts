import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";
import { authenticatedMiddleware } from "../../../../../../../middleware/authenticated";

export const delete_ = orpcServerRootBase.core.recordings.delete
  .use(authenticatedMiddleware)
  .handler(async ({ errors, input }) => {
    const { event, start } = input;

    const {
      data: recordingsEventStartDeleteData,
      response: recordingsEventStartDeleteResponse,
    } = await state.current.apis.gecko.recordingsEventStartDelete({
      path: { event: event, start: start },
    });

    if (recordingsEventStartDeleteData === undefined) {
      if (recordingsEventStartDeleteResponse.status === 404)
        throw errors.NOT_FOUND();

      throw errors.INTERNAL_SERVER_ERROR();
    }
  });

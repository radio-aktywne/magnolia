import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import type { PageViewInput } from "../../../types";
import type { Schemas } from "./schemas";

import { ListRecordingsWidget } from "../../../../client/core/components/list-recordings-widget";
import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { Hydrated } from "../../../../isomorphic/generic/components/hydrated";
import { orpcServerSideQueryClient } from "../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../server/query/lib/get-query-client";

export async function RecordingsPageView({
  queryParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  const { queryClient } = getQueryClient();

  if (queryParameters.show)
    await (async (id: string) => {
      try {
        return await queryClient.fetchQuery(
          orpcServerSideQueryClient.core.shows.get.queryOptions({
            input: { id: id },
          }),
        );
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "NOT_FOUND")
          redirect("/recordings");
        throw error;
      }
    })(queryParameters.show);

  void queryClient.prefetchQuery(
    orpcServerSideQueryClient.core.shows.list.queryOptions({
      input: { limit: null, order: { title: "asc" } },
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hydrated fallback={<LoadingWidget />}>
        <ListRecordingsWidget show={queryParameters.show} />
      </Hydrated>
    </HydrationBoundary>
  );
}

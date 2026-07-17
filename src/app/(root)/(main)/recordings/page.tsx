import { msg } from "@lingui/core/macro";
import { forbidden, redirect } from "next/navigation";
import { connection } from "next/server";

import type {
  PageInput,
  PageMetadataInput,
  PageMetadataUtilityInput,
} from "../../../types";
import type { Keys } from "./types";

import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { Metadata } from "../../../../isomorphic/metadata/components/metadata";
import { Authenticated } from "../../../../server/access/components/authenticated";
import { createMetadata } from "../../../../server/metadata/lib/create-metadata";
import { orpcServerSideQueryClient } from "../../../../server/orpc/vars/clients";
import { getQueryClient } from "../../../../server/query/lib/get-query-client";
import { RecordingsPageView } from "./page.view";
import { Schemas } from "./schemas";

async function getTitle({
  queryParameters,
}: PageMetadataUtilityInput<typeof Schemas.Path, typeof Schemas.Query>) {
  if (!queryParameters.show) return msg({ message: `Recordings • magnolia` });

  const { queryClient } = getQueryClient();

  const show = await (async (id: string) => {
    try {
      return await queryClient.fetchQuery(
        orpcServerSideQueryClient.core.shows.get.queryOptions({
          input: { id: id },
        }),
      );
    } catch (error) {
      if (isOrpcDefinedError(error) && error.code === "FORBIDDEN") forbidden();
      if (isOrpcDefinedError(error) && error.code === "NOT_FOUND")
        redirect("/recordings");
      throw error;
    }
  })(queryParameters.show);

  const showTitle = show.title;

  return msg({ message: `Recordings • ${showTitle} • magnolia` });
}

export async function generateMetadata({
  searchParams,
}: PageMetadataInput<Keys.Path, Keys.Query>) {
  const queryParameters = await Schemas.Query.parseAsync(await searchParams);

  return await createMetadata({
    title: await getTitle({ queryParameters: queryParameters }),
  });
}

export default async function RecordingsPage({
  searchParams,
}: PageInput<Keys.Path, Keys.Query>) {
  await connection();

  const queryParameters = await Schemas.Query.parseAsync(await searchParams);

  return (
    <Authenticated>
      <Metadata title={await getTitle({ queryParameters: queryParameters })} />
      <RecordingsPageView queryParameters={queryParameters} />
    </Authenticated>
  );
}

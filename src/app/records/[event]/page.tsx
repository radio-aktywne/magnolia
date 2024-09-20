import { notFound, redirect } from "next/navigation";
import { getEvent, listRecords } from "../../../actions";
import { RecordListWidget } from "../../../components";
import { createModifiedURLSearchParams } from "../../../utils/url";

type RecordsPageParams = Readonly<{
  event: string;
}>;

type RecordsPageSearchParams = Readonly<{
  page?: string | string[];
}>;

export type RecordsPageProps = Readonly<{
  params: RecordsPageParams;
  searchParams: RecordsPageSearchParams;
}>;

export const dynamic = "force-dynamic";

const perPage = 5;

function redirectWithParams(event: string, params: URLSearchParams): never {
  redirect(`/records/${event}?` + params.toString());
}

async function validatePage(
  params: RecordsPageParams,
  searchParams: RecordsPageSearchParams,
) {
  const page = searchParams.page;

  if (page === undefined)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: "1" }),
    );

  if (Array.isArray(page))
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: page[0] }),
    );

  const parsedPage = parseInt(page, 10);

  if (isNaN(parsedPage) || parsedPage < 1)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: "1" }),
    );

  const { data: checkRecords, error: checkError } = await listRecords({
    event: params.event,
    limit: 0,
  });

  if (checkError !== undefined) throw new Error(checkError);

  const offset = perPage * (parsedPage - 1);

  if (checkRecords.count > 0 && offset >= checkRecords.count)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, {
        page: (Math.ceil(checkRecords.count / perPage) || 1).toString(),
      }),
    );

  return parsedPage;
}

export default async function RecordsPage({
  params,
  searchParams,
}: RecordsPageProps) {
  const page = await validatePage(params, searchParams);
  const limit = perPage;
  const offset = perPage * (page - 1);

  const { data: event, error: eventError } = await getEvent({
    id: params.event,
  });

  if (eventError !== undefined) throw new Error(eventError);
  if (event === undefined) notFound();

  const { data: records, error } = await listRecords({
    event: event.id,
    limit,
    offset,
  });

  if (error !== undefined) throw new Error(error);

  return (
    <RecordListWidget
      event={event}
      records={records}
      page={page}
      perPage={perPage}
    />
  );
}

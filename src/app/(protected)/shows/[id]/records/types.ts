export type RecordListPageSearchParams = {
  after?: string;
  before?: string;
  timezone?: string;
};

type RecordListPageParams = {
  id: string;
};

export type RecordListPageInput = {
  params: RecordListPageParams;
  searchParams: RecordListPageSearchParams;
};

import { PropsWithChildren } from "react";

export type RecordListEventNotFoundInput = {
  [key: string]: never;
};

export type RecordListLayoutInput = PropsWithChildren;

type RecordListPageParams = {
  id: string;
};

export type RecordListPageInput = {
  params: RecordListPageParams;
};

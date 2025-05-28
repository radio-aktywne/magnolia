import { PropsWithChildren } from "react";

export type RecordsEventNotFoundInput = {
  [key: string]: never;
};

export type RecordsLayoutInput = PropsWithChildren;

type RecordsPageParams = {
  event: string;
};

export type RecordsPageInput = {
  params: RecordsPageParams;
};

import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

type RecordsLayoutParams = Readonly<{
  event: string;
}>;

export type RecordsLayoutProps = Readonly<{
  children: ReactNode;
  params: RecordsLayoutParams;
}>;

export async function generateMetadata({}: RecordsLayoutProps): Promise<Metadata> {
  return {
    title: labels.pages.records.title,
    description: labels.pages.records.description,
  };
}

export default function RecordsLayout({ children }: RecordsLayoutProps) {
  return children;
}

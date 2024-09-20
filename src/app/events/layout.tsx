import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.events.title,
  description: labels.pages.events.description,
};

export type EventsLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function EventsLayout({ children }: EventsLayoutProps) {
  return children;
}

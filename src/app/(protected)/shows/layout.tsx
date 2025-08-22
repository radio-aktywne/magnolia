import {
  MasterDetailLayout,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { ShowListWidget } from "../../../components/widgets/show-list-widget";
import { listShows } from "../../../lib/beaver/list-shows";
import { ShowListLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function ShowListLayout({
  children,
}: ShowListLayoutInput) {
  const props = {
    limit: 10,
    order: JSON.stringify({ title: "asc" }),
    where: JSON.stringify({ events: { some: { type: "live" } } }),
  };
  const { shows } = await listShows(props);

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <ShowListWidget shows={shows} {...props} />
      </MasterDetailLayoutMasterPanel>
      {children}
    </MasterDetailLayout>
  );
}

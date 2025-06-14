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
  const { shows } = await listShows();

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <ShowListWidget shows={shows} />
      </MasterDetailLayoutMasterPanel>
      {children}
    </MasterDetailLayout>
  );
}

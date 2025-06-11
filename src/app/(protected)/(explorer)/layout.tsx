import {
  MasterDetailLayout,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { EventListWidget } from "../../../components/widgets/event-list-widget";
import { listEvents } from "../../../lib/beaver/list-events";
import { ExplorerLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function ExplorerLayout({
  children,
}: ExplorerLayoutInput) {
  const where = JSON.stringify({ type: "live" });
  const { events } = await listEvents({ where: where });

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <EventListWidget events={events} where={where} />
      </MasterDetailLayoutMasterPanel>
      {children}
    </MasterDetailLayout>
  );
}

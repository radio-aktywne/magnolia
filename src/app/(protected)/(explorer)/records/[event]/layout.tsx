import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import { RecordsLayoutInput } from "./types";

export default function RecordsLayout({ children }: RecordsLayoutInput) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}

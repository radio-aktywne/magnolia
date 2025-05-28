import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import { RecordListLayoutInput } from "./types";

export default function RecordListLayout({ children }: RecordListLayoutInput) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}

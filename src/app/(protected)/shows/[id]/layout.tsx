import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import { DetailsLayoutInput } from "./types";

export default function DetailsLayout({ children }: DetailsLayoutInput) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}

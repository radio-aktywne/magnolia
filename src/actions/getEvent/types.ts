import { components } from "../../api/emishows";

export type GetEventData = components["schemas"]["events_models_Event"];

export type GetEventProps = {
  id: string;
  include?: string;
};

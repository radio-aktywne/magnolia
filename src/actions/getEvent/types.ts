import { components } from "../../api/beaver";

export type GetEventData = components["schemas"]["events_models_Event"];

export type GetEventProps = {
  id: string;
  include?: string;
};

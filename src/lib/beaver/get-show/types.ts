import { components } from "../../../services/beaver";

export type GetShowInput = {
  id: string;
  include?: null | string;
};

export type GetShowOutput = {
  show: components["schemas"]["shows_models_Show"];
};

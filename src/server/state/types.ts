import "server-only";

import type { Sdk as BeaverSDK } from "../../common/apis/beaver/sdk";
import type { Sdk as GeckoSDK } from "../../common/apis/gecko/sdk";
import type { Sdk as ICanHazDadJokeSDK } from "../../common/apis/icanhazdadjoke/sdk";
import type { Config } from "../config/types";

export type APIs = {
  beaver: BeaverSDK;
  gecko: GeckoSDK;
  icanhazdadjoke: ICanHazDadJokeSDK;
};

export type State = {
  apis: APIs;
  config: Config;
};

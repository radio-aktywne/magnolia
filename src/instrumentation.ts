import { createClient as createBeaverClient } from "./common/apis/beaver/client";
import { Sdk as BeaverSDK } from "./common/apis/beaver/sdk";
import { createClient as createGeckoClient } from "./common/apis/gecko/client";
import { Sdk as GeckoSDK } from "./common/apis/gecko/sdk";
import { createClient as createICanHazDadJokeClient } from "./common/apis/icanhazdadjoke/client";
import { Sdk as ICanHazDadJokeSDK } from "./common/apis/icanhazdadjoke/sdk";
import { createUrl } from "./common/generic/lib/create-url";
import { loadConfig } from "./server/config/lib/load-config";
import { state } from "./server/state/vars/state";

export async function register() {
  const { config } = await loadConfig();

  const apis = {
    beaver: new BeaverSDK({
      client: createBeaverClient({
        baseUrl: createUrl({
          host: config.apis.beaver.host,
          path: config.apis.beaver.path,
          port: config.apis.beaver.port,
          scheme: config.apis.beaver.scheme,
        }).url,
      }),
    }),

    gecko: new GeckoSDK({
      client: createGeckoClient({
        baseUrl: createUrl({
          host: config.apis.gecko.host,
          path: config.apis.gecko.path,
          port: config.apis.gecko.port,
          scheme: config.apis.gecko.scheme,
        }).url,
      }),
    }),

    icanhazdadjoke: new ICanHazDadJokeSDK({
      client: createICanHazDadJokeClient({
        baseUrl: createUrl({
          host: config.apis.icanhazdadjoke.host,
          path: config.apis.icanhazdadjoke.path,
          port: config.apis.icanhazdadjoke.port,
          scheme: config.apis.icanhazdadjoke.scheme,
        }).url,
      }),
    }),
  };

  state.current = {
    apis: apis,
    config: config,
  };
}

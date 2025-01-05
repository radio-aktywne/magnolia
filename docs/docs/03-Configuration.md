---
slug: /config
title: Configuration
---

## Environment variables

You can configure the app at runtime using various environment variables:

- `MAGNOLIA__SERVER__HOST` -
  host to run the server on
  (default: `0.0.0.0`)
- `MAGNOLIA__SERVER__PORT` -
  port to run the server on
  (default: `10720`)
- `MAGNOLIA__COOKIES__DOMAIN` -
  domain for the cookies
  (default: ``)
- `MAGNOLIA__SECRETS__AUTH` -
  secrets for encrypting auth cookies
  (default: `secret`)
- `MAGNOLIA__URLS__PUBLIC` -
  public URL of the app
  (default: `http://localhost:10720`)
- `MAGNOLIA__BEAVER__HTTP__SCHEME`
  scheme of the HTTP API of the beaver service
  (default: `http`)
- `MAGNOLIA__BEAVER__HTTP__HOST`
  host of the HTTP API of the beaver service
  (default: `localhost`)
- `MAGNOLIA__BEAVER__HTTP__PORT`
  port of the HTTP API of the beaver service
  (default: `10500`)
- `MAGNOLIA__BEAVER__HTTP__PATH`
  path of the HTTP API of the beaver service
  (default: ``)
- `MAGNOLIA__GECKO__HTTP__SCHEME`
  scheme of the HTTP API of the gecko service
  (default: `http`)
- `MAGNOLIA__GECKO__HTTP__HOST`
  host of the HTTP API of the gecko service
  (default: `localhost`)
- `MAGNOLIA__GECKO__HTTP__PORT`
  port of the HTTP API of the gecko service
  (default: `10700`)
- `MAGNOLIA__GECKO__HTTP__PATH`
  path of the HTTP API of the gecko service
  (default: ``)
- `MAGNOLIA__SCORPION__PUBLIC__SCHEME` -
  scheme of the public API of the scorpion service
  (default: `http`)
- `MAGNOLIA__SCORPION__PUBLIC__HOST` -
  host of the public API of the scorpion service
  (default: `localhost`)
- `MAGNOLIA__SCORPION__PUBLIC__PORT` -
  port of the public API of the scorpion service
  (default: `20000`)
- `MAGNOLIA__SCORPION__PUBLIC__PATH` -
  path of the public API of the scorpion service
  (default: ``)
- `MAGNOLIA__SCORPION__PUBLIC__CLIENT` -
  client ID to authenticate with the public API of the scorpion service
  (default: `magnolia`)
- `MAGNOLIA__SCORPION__PUBLIC__SECRET` -
  client secret to authenticate with the public API of the scorpion service
  (default: `secret`)
- `MAGNOLIA__DEBUG` -
  enable debug mode
  (default: `true`)

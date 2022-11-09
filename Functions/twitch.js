import fs from "fs";
import fetch from "node-fetch";

const BOT_OAUTH = process.env.BOT_OAUTH;
const COOKIE = process.env.COOKIE;

const BOT_NAME = process.env.BOT_NAME;
const CHANNEL_NAME = process.env.CHANNEL_NAME;
const CHANNEL_ID = process.env.CHANNEL_ID;
const BOT_ID = process.env.BOT_ID;

import * as ROBLOX_FUNCTIONS from "./roblox.js";

export const isLive = async () => {
    const r = await fetch("https://gql.twitch.tv/gql", {
      headers: {
        authorization: `OAuth ${BOT_OAUTH}`,
        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      },
      body: `[{"operationName":"VideoPlayerStreamInfoOverlayChannel","variables":{"channel":"${CHANNEL_NAME}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"a5f2e34d626a9f4f5c0204f910bab2194948a9502089be558bb6e779a9e1b3d2"}}}]`,
      method: "POST",
    });
  
    const json = await r.json().then((d) => {
      return d[0].data.user.stream;
    });
    const isLive = (() => {
      if (json == null) {
        return false;
      } else if (json != null) {
        return true;
      }
    })();
    return isLive;
};
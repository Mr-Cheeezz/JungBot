let chatByUser = {};

import "dotenv/config";

import fs, { link, readSync } from "fs";
import tmi from "tmi.js";
import fetch from "node-fetch";
import WebSocket from "ws";
import { setTimeout } from "timers/promises";
import stringSimilarity from "string-similarity";

import * as ROBLOX_FUNCTIONS from "./Functions/roblox.js";
import * as TWITCH_FUNCTIONS from "./Functions/twitch.js";

const jungId = 64292074;

import buddyList from "spotify-buddylist";
import { join } from "path";
import { setEngine, verify } from "crypto";
import { get } from "http";
import { uptime } from "process";
import { match } from "assert";
import { platform } from "os";
import { time } from "console";
import { channel } from "diagnostics_channel";
import { resourceLimits } from "worker_threads";
import { SERVFAIL } from "dns";

const COOKIE = process.env.COOKIE;

const BOT_OAUTH = process.env.BOT_OAUTH;
const BOT_NAME = process.env.BOT_NAME;

const ADMIN_ID = 505216805;

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const CHANNEL_ID = process.env.CHANNEL_ID;

const JOIN_TIMER = 4 * 1000;
const GAME_TIMER = 7 * 1000;

const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: BOT_NAME,
      password: `OAuth:${BOT_OAUTH}`,
    },
    channels: [CHANNEL_NAME]
});

console.log(client.connect());

client.on("connected", () => {
    client.say(CHANNEL_NAME, `Joined channel ${CHANNEL_NAME}. TriKool`)
}); 

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

setInterval(async () => {
    const location = await ROBLOX_FUNCTIONS.getPresence(jungId).then((r)=>{return r.lastLocation})
    if ((await TWITCH_FUNCTIONS.isLive() == true)) {
        client.say(CHANNEL_NAME, `Jung is currently playing ${location}`);
    }
}, 7 * 60 * 1000);

client.on("message", async (channel, userstate, message, self, viewers) => {

    const messageId = userstate["id"];
    const twitchUserId = userstate["user-id"];
    const twitchUsername = userstate["username"];
    const twitchDisplayName = userstate["display-name"];

      if (message.toLowerCase() == "!game" || message.toLowerCase() == "1game") {
      const location = await ROBLOX_FUNCTIONS.getPresence(jungId).then((r)=>{return r.lastLocation})
      const locationId = await ROBLOX_FUNCTIONS.getPresence(jungId).then((r)=>{return r.placeId})
      const onlineStatus = await ROBLOX_FUNCTIONS.getLastOnline(jungId).then((r)=>{return r.diffTimeMinutes})
  
  
      if (onlineStatus > 30) {
        return client.raw(
          `@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is not playing anything right now.`);
      }
      console.log(location)
      if (location != 'Website') {
       client.raw(
        `@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is currently playing ${location}.`); 
      return
      }
  
      return client.raw(`@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is currently switching games.`); 
      }
});

client.on("message", async (channel, userstate, message, self, viewers) => {
   
    if (
        message.includes("what game is this") ||
        message.includes("what game r u") ||
        message.includes("what game is that") ||
        message.includes("game called") ||
        message.includes("game name")
    ) {
        const location = await ROBLOX_FUNCTIONS.getPresence(jungId).then((r)=>{return r.lastLocation})
        const locationId = await ROBLOX_FUNCTIONS.getPresence(jungId).then((r)=>{return r.placeId})
        const onlineStatus = await ROBLOX_FUNCTIONS.getLastOnline(jungId).then((r)=>{return r.diffTimeMinutes})

        if (onlineStatus > 30) {
            return client.raw(
              `@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is not playing anything right now.`);
          }
          console.log(location)
          if (location != 'Website') {
           client.raw(
            `@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is currently playing ${location}.`); 
          return
          }
      
          return client.raw(`@client-nonce=${userstate['client-nonce']};reply-parent-msg-id=${userstate['id']} PRIVMSG #${CHANNEL_NAME} :Jung is currently switching games.`);
        
    }
});

client.on("message", async (channel, userstate, message, self, viewers) => {
    const twitchUsername = userstate["username"];
   
    if (
        message.includes("can i join") ||
        message.includes("how to play") ||
        message.includes("how do i join") ||
        message.includes("can i play") ||
        message.includes("can i join you") ||
        message.includes("how do we join") ||
        message.includes("how do I join")
    ) {
        client.say(CHANNEL_NAME, `!join @${twitchUsername}`)
    }
});

client.on("raided", (channel, username, viewers, method) => { 
    if (viewers > 5) {
    client.say(CHANNEL_NAME, `Thankyou so much @${username} for the raid of ${viewers}.`)
    }
});

client.on("subgift", (channel, username, viewers, method) => {
    client.say(CHANNEL_NAME, `Thanks for gifting a sub @${username}. xqcL`)
});

client.on("cheer", (channel, username, viewers, method, userstate) => { 
    client.say(CHANNEL_NAME, `Thank you @${username} for the Bits.`)
});

client.on("resub", (channel, username, viewers, method) => {
    client.say(CHANNEL_NAME, `Thanks for resubbing @${username}. xqcL`)
});

client.on("subscription", (channel, username, viewers, method) => {
    client.say(CHANNEL_NAME, `Thanks for subbing @${username}. xqcL`)
});

client.on("hosting", (channel, username, viewers, method, userstate) => {
    client.say(CHANNEL_NAME, `Jung is now hosting ${username}. xqcEZ`)
});
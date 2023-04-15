import { Events } from "discord.js";

export const event = {
  name: Events.Warn,
};

export const action = (warn) => {
  console.warn(`warn: ${warn}`);
};

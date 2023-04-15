import { Events } from "discord.js";

export const event = {
  name: Events.Error,
};

export const action = (error) => {
  console.error(`error: ${error}`);
};

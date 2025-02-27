import { getCampaignListHandler } from "./campaigns/getCampaignHandler";
import { updateCampaignHandler } from "./campaigns/updateCampaignHandler";
import { createUserHandler } from "./users/createUser";
import { emailCheckHandler } from "./users/emailCheckHandler";
import { getUserListHandler } from "./users/getUserHandler";
import { myUserInfoHandler } from "./users/MyUserInfoHandler";

export const handlers = [
  getUserListHandler,
  emailCheckHandler,
  myUserInfoHandler,
  getCampaignListHandler,
  updateCampaignHandler,
  createUserHandler,
  createUserHandler,
];

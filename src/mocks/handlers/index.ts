import { getCampaignListHandler } from "./campaigns/getCampaignHandler";
import { emailCheckHandler } from "./users/emailCheckHandler";
import { getUserListHandler } from "./users/getUserHandler";
import { myUserInfoHandler } from "./users/MyUserInfoHandler";

export const handlers = [
  getUserListHandler,
  emailCheckHandler,
  myUserInfoHandler,
  getCampaignListHandler,
];

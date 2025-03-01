import { delay, http, HttpResponse } from "msw";
import { Campaigns } from "../db/models/Campaign";

export const getCampaignListHandler = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/campaigns`,
  async () => {
    await delay(300);
    return HttpResponse.json(Campaigns, { status: 200 });
  }
);

import { delay, http, HttpResponse } from "msw";
import { Campaigns } from "../db/models/Campaign";

export const getCampaignListHandler = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/campaigns`,
  async (params) => {
    await delay(300);
    const url = new URL(params.request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 25;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedContent = Campaigns.content.slice(start, end);

    return HttpResponse.json(
      {
        content: paginatedContent,
        size: Campaigns.content.length,
        total_pages: Math.ceil(Campaigns.content.length / pageSize),
      },
      { status: 200 }
    );
  }
);

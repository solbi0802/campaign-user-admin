import { http, HttpResponse } from "msw";
import { Campaigns } from "../db/models/Campaign";

// PATCH /api/campaigns/{id}
export const updateCampaignHandler = http.patch(
  "/api/campaigns/:id",
  async ({ request }) => {
    // URL에서 id 값을 추출하기
    const match = request.url.match(/\/api\/campaigns\/(\d+)/);
    const campaignId = match ? match[1] : 1;

    const campaign = Campaigns.content.find(
      (campaign: { id: number }) => campaign.id === Number(campaignId)
    );

    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      result: true,
      id: campaign?.id,
    });
  }
);

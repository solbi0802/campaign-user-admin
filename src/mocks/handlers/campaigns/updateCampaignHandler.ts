import { http, HttpResponse } from "msw";
import { Campaigns } from "../db/models/Campaign";

// PATCH /api/campaigns/{id}
export const updateCampaignHandler = http.patch(
  "/api/campaigns/:id",
  async ({ request, params }) => {
    const { id } = params;
    const campaignId = Number(id);

    const body = (await request.json()) as { enabled: boolean };
    try {
      const campaign = Campaigns.content.find((c) => c.id === campaignId);

      if (!campaign) {
        return new HttpResponse(null, { status: 404 });
      }
      campaign.enabled = body.enabled;

      return HttpResponse.json({
        result: true,
        id: campaign.id,
        enabled: campaign.enabled,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return new HttpResponse(null, { status: 400 });
    }
  }
);

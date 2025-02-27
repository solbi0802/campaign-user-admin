import { http, HttpResponse } from "msw";
import { Users } from "../db/models/User";

// PATCH /api/users/{id}
export const updateUserhandler = http.patch(
  "/api/users/:id",
  async ({ request }) => {
    // URL에서 id 값을 추출하기
    const match = request.url.match(/\/api\/users\/(\d+)/);
    const userId = match ? match[1] : 1;

    const user = Users.content.find(
      (user: { id: number }) => user.id === Number(userId)
    );

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      result: true,
      id: user?.id,
    });
  }
);

import { http, HttpResponse } from "msw";
import { Users } from "../db/models/User";

// PATCH /api/users/{id}
export const updateUserhandler = http.patch(
  "/api/users/:id",
  async ({ params }) => {
    const { id } = params;
    const userId = Number(id);

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

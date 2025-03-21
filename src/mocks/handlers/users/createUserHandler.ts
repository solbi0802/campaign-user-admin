import { delay, http, HttpResponse } from "msw";
import { Users } from "../db/models/User";

export const createUserHandler = http.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/users`,
  async () => {
    await delay(300);
    return HttpResponse.json(
      { result: true, id: Users.size + 1 },
      { status: 200 }
    );
  }
);

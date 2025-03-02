import { http, HttpResponse } from "msw";
import { Users } from "../db/models/User";

export const emailCheckHandler = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/users/:email/exists`,
  (param) => {
    const { email } = param.params;

    const user = Users.content.find((u) => u.email === email);
    if (user) {
      return HttpResponse.json(
        {
          result: false,
        },
        { status: 409 }
      );
    }
    return HttpResponse.json(
      {
        result: true,
      },
      { status: 200 }
    );
  }
);

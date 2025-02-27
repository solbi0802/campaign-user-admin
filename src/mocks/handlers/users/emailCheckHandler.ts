import { http, HttpResponse } from "msw";

export const emailCheckHandler = http.get(
  `${import.meta.env.VITE_API_BASE_URL}/api/users/:email/sxists`,

  () => {
    return HttpResponse.json({ status: "success" }, { status: 200 });
  }
);

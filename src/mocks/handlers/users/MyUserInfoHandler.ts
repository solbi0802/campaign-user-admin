import { delay, http, HttpResponse } from "msw";
import { MyUserInfo } from "../db/models/User";

export const myUserInfoHandler = http.get(`/api/auth/me`, async () => {
  await delay(300);
  return HttpResponse.json(MyUserInfo, { status: 200 });
});

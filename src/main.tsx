import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider";

import { worker } from "./mocks/browser";

// 개발 환경에서만 MSW 실행
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider>
        <Suspense fallback={<h3>loading...</h3>}>
          <App />
        </Suspense>
      </Provider>
    </StrictMode>
  );
});

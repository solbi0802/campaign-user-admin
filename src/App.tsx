import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import MainPage from "./pages/MainPage";
import Campaign from "./pages/campaign";
import DefaultLayout from "./pages/DefaultLayout";
import { RecoilRoot } from "recoil";

import ErrorAlert from "./components/common/ErrorAlert.tsx";

function App() {
  return (
    <RecoilRoot>
      <ErrorAlert />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DefaultLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

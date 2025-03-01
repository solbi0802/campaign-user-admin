import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import MainPage from "./pages/MainPage";
import Campaign from "./pages/campaign";
import DefaultLayout from "./pages/DefaultLayout";
import PrivateRoute from "./pages/PrivateRoute";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DefaultLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route element={<PrivateRoute roles={["admin"]} />}>
              <Route path="/user" element={<User />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

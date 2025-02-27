import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import MainPage from "./pages/MainPage";
import Campaign from "./pages/campaign";
import DefaultLayout from "./pages/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/user" element={<User />} />
          <Route path="/campaign" element={<Campaign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

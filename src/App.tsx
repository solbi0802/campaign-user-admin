import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import MainPage from "./pages/MainPage";
import Campaign from "./pages/campaign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

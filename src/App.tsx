import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/user";
import MainPage from "./pages/MainPage";
import Campaign from "./pages/campaign";
import DefaultLayout from "./pages/DefaultLayout";
import PrivateRoute from "./pages/PrivateRoute";
import { useState } from "react";

function App() {
  const [userRoles] = useState<string[]>(() => {
    const savedRoles = localStorage.getItem("role");
    return savedRoles ? JSON.parse(savedRoles) : [];
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route
            element={<PrivateRoute roles={["admin"]} userRoles={userRoles} />}
          >
            <Route path="/user" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

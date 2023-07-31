import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/posts/Home";
import Detail from "../pages/posts/Detail";
import Profile from "../features/user/profile/Profile";
import Setting from "../features/user/setting/Setting";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

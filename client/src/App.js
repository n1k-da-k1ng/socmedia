import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import News from "./pages/news/News";
import UsersProfile from "./pages/usersProfile/UsersProfile"






function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        /* #TODO
        Execute verify token function before redirect on authorized pages
         */
        <Route path="/myprofile/:username" element={<Profile/>} />
        <Route path="/profile/:username" element={<UsersProfile/>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;

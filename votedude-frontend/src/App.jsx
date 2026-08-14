import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthBootstrap from "./components/AuthBootstrap";

import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import Law from "./pages/Law";
import Petitions from "./pages/Petitions";
import Vote from "./pages/Vote";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Discuss from "./pages/Discuss";
import DiscussDetail from "./pages/DiscussDetail";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import Sports from "./pages/Sports";
import Polls from "./pages/Polls";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import CandidateDetail from "./pages/CandidateDetail";

export default function App() {
  return (
    <AuthBootstrap>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/:id" element={<IssueDetail />} />
          <Route path="/laws" element={<Law />} />
          <Route path="/petitions" element={<Petitions />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/discuss" element={<Discuss />} />
          <Route path="/discuss/:id" element={<DiscussDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />{" "}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthBootstrap>
  );
}

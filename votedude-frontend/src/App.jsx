import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Candidates from "./pages/Candidates";
import Issues from "./pages/Issues";
import Law from "./pages/Law";
import Petitions from "./pages/Petitions";
import Vote from "./pages/Vote";
import News from "./pages/News";
import Discuss from "./pages/Discuss";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useGetMeQuery } from "./redux/services/authApi";

export default function App() {
  const data = useGetMeQuery();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/laws" element={<Law />} />
        <Route path="/petitions" element={<Petitions />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/news" element={<News />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/events" element={<Events />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

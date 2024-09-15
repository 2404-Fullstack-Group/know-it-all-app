// react imports
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// component imports
import Header from "./components/sections/Header";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import BrowsePage from "./components/pages/BrowsePage";
import CreateQuizPage from "./components/pages/CreateQuizPage";
import ProfilePage from "./components/pages/ProfilePage";
import RegistrationPage from "./components/pages/RegistrationPage";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quizzes" element={<BrowsePage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </main>
    </Router>
  );
}

// react imports
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// component imports
import NavBar from "./components/sections/NavBar";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import CreateQuizPage from "./components/pages/CreateQuizPage";

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz-creator" element={<CreateQuizPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}

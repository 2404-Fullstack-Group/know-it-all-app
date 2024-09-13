// react imports
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// component imports
import NavBar from "./components/sections/NavBar";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import CreateQuizPage from "./components/pages/CreateQuizPage";
import BrowsePage from "./components/pages/BrowsePage";
import AccountPage from "./components/pages/AccountPage";

export default function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/quiz-creator" element={<CreateQuizPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}

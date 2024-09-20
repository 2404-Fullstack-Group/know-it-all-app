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
import QuizPage from "./components/pages/QuizPage";

export default function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Header token={token} setToken={setToken} setUserId={setUserId}/>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/quizzes/:quiz_id" element={<QuizPage />} />
          {/* <Route path="/quizzes" element={<QuizPage />} /> */}
          <Route
            path="/create-quiz"
            element={<CreateQuizPage userId={userId} token={token} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} setUserId={setUserId} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </main>
    </Router>
  );
}

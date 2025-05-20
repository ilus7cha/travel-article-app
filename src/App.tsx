import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useAppSelector } from "./store/hooks";
import ArticleDetail from "./pages/ArticleDetail";
import ArticlesList from "./pages/ArticlesList";
import CategoriesList from "./pages/CategoriesList";
import CategoryDetail from "./pages/CategoryDetail";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route
          path="/login"
          element={!token ? <LoginForm /> : <Navigate to="/articles" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterForm /> : <Navigate to="/articles" />}
        />
        <Route
          path="/articles"
          element={
            token ? (
              <>
                <Navbar />
                <ArticlesList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/articles/:id"
          element={
            token ? (
              <>
                <Navbar />
                <ArticleDetail />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/categories"
          element={
            token ? (
              <>
                <Navbar />
                <CategoriesList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/categories/:id"
          element={
            token ? (
              <>
                <Navbar />
                <CategoryDetail />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;

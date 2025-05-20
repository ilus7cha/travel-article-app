import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ArticleForm from "./pages/ArticleForm";
import ArticleDetail from "./pages/ArticleDetail";
import CategoriesList from "./pages/CategoriesList";
import CategoryDetail from "./pages/CategoryDetail";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/categories",
        element: <CategoriesList />,
      },
      {
        path: "/categories/:id",
        element: <CategoryDetail />,
      },
      {
        path: "/articles/new",
        element: <ArticleForm />,
      },
      {
        path: "/articles/:id/edit",
        element: <ArticleForm />,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetail />,
      },
    ],
  },
]);

import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Landing from "./pages/Landing";
import NotFoundPage from "./pages/NotFoundPage";
import { SignupForm } from "./features/auth/pages/SignUp";
import { LoginForm } from "./features/auth/pages/Login";
import { BoardsDisplayMessage } from "./features/boards/pages/boards";

import { VerificationSent } from "./pages/VerificationSent";
import useRehydrateAuth from "./hooks/useRehydrateAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App: React.FC = () => {
  useRehydrateAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Landing />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoute />}>
              <Route path="/boards" element={<BoardsDisplayMessage />} />
        </Route>
        <Route path="/verification-sent" element={<VerificationSent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

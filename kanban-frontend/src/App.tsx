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
import { ProjectsDisplay } from "./features/projects/pages/projects";
import { VerificationSent } from "./features/auth/components/VerificationSent";
import useRehydrateAuth from "./hooks/useRehydrateAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EmailVerification from "./features/auth/pages/EmailVerification";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import PasswordResetRequest from "./features/auth/pages/PasswordResetRequest";
import ProfilePage from "./features/profile/pages/ProfilePage";


const App: React.FC = () => {
  useRehydrateAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Landing />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verification-sent" element={<VerificationSent />} />
        <Route path="/confirm-email/" element={<EmailVerification />} />
        <Route path="/reset-password" element={<PasswordResetRequest/>} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<ProjectsDisplay />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
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

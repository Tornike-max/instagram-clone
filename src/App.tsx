import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layouts/pageLayouts/PageLayout";
import ProfilePage from "./pages/profilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
export default function App() {
  const [authUser] = useAuthState(auth);

  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Require logged in
export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((s) => s.user);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

// Require admin role
export function AdminRoute({ children }) {
  const { isLoggedIn, user } = useSelector((s) => s.user);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/customer" replace />;
  return children;
}

// Redirect logged-in users to home page
export function GuestRoute({ children }) {
  const { isLoggedIn } = useSelector((s) => s.user);
  if (isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

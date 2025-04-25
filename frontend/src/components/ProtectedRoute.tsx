import { selectToken } from "@/features/slices/app";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const token = useSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

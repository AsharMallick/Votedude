// src/components/AuthBootstrap.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../redux/services/authApi";
import { setUser, logout } from "../redux/reducers/authSlice";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  // runs on app load if cookie exists
  const { data, isSuccess, isError } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [isSuccess, isError, data, dispatch]);

  return children;
}

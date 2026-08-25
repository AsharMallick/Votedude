import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../redux/services/authApi";
import { setUser, logout } from "../redux/reducers/authSlice";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const hasToken = !!localStorage.getItem("token");

  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
    if (isError) {
      localStorage.removeItem("token");
      dispatch(logout());
    }
  }, [isSuccess, isError, data, dispatch]);

  return children;
}

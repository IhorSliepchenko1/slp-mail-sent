import NavBar from "../nav-bar";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../protected";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { useEffect } from "react";
import { fetchCurrent } from "../../features/current/currentSlice";

const Layout = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const token = state.auth.current?.token;
  const userId = state.auth.current?.userId;

  useEffect(() => {
    if (token && userId) {
      dispatch(fetchCurrent({ id: userId, jwt: token }));
    }
  }, [dispatch, token, userId]);

  return (
    <ProtectedRoute>
      <NavBar />
      <div className={style.main}>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default Layout;

import { Link } from "react-router-dom";
import { logout } from "../../features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import style from "./index.module.scss";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.current.user?.role);
  const changeLogout = () => {
    dispatch(logout());
    location.reload();
  };

  return (
    <nav className={style.nav}>
      <div className={style.ul_container}>
        <ul>
          <Link to={`/campaign`} className={style.a}>
            Кампании
          </Link>
        </ul>
        <ul>
          <Link to={`/users`} className={style.a}>
            Пользователи
          </Link>
        </ul>
      </div>
      <div className={style.slotNav}>
        <p className={style.role}>{role}</p>
        <button onClick={() => changeLogout()} className={style.button}>
          Выход
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

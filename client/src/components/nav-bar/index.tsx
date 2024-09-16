import { Link } from "react-router-dom";
import { logout } from "../../features/login/loginSlice";
import { useAppDispatch } from "../../app/hook";
import style from "./index.module.scss";

const NavBar = () => {
  const dispatch = useAppDispatch();

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

      <button onClick={() => changeLogout()} className={style.button}>
        Выход
      </button>
    </nav>
  );
};

export default NavBar;

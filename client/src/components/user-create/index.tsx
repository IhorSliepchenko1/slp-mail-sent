import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { User } from "../../types/types";
import { fetchRegister } from "../../features/register/registerSlice";
import style from "./index.module.scss";
import { fetchUsers } from "../../features/users/usersSlice";

const UserCreate = () => {
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      login: "",
      password: "",
      role: "USER",
    },
  });
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: User) => {
    try {
      await dispatch(fetchRegister(data));
      await dispatch(fetchUsers({ jwt: state.auth.current?.token as string }));
      reset();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={style.wrapper}>
      <p className={style.p}>Форма регистрации новых пользователей</p>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.labelContainer}>
          <label htmlFor="login">Логин:</label>
          <input
            className={style.inputs}
            {...register("login", { required: true })}
            type="text"
            id="login"
          />
        </div>

        <div className={style.labelContainer}>
          <label htmlFor="password">Пароль:</label>
          <input
            className={style.inputs}
            {...register("password", { minLength: 6 })}
            type="text"
            id="password"
          />
        </div>

        <div className={style.labelContainer}>
          <label>Роль:</label>
          <select className={style.inputs} {...register("role")}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className={style.button}>
          Добавить
        </button>
      </form>
    </section>
  );
};

export default UserCreate;

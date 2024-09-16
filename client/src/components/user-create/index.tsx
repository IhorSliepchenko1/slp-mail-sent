import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { User } from "../../types/types";
import { fetchRegister } from "../../features/register/registerSlice";
import style from "./index.module.scss";
import { ErrorMessage } from "../error";

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
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <div className={style.labelContainer}>
        <label>Логин:</label>
        <input {...register("login", { required: true })} type="text" />
      </div>

      <div className={style.labelContainer}>
        <label>Пароль:</label>
        <input
          className={style.input_password}
          {...register("password", { minLength: 6 })}
          type="text"
        />
      </div>

      <div className={style.labelContainer}>
        <label>Роль:</label>
        <select {...register("role")}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button type="submit" className={style.button}>
        Добавить
      </button>

      <ErrorMessage error={state.auth.error} status={state.auth.status} />
    </form>
  );
};

export default UserCreate;

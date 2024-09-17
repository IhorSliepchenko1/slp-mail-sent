import { useForm } from "react-hook-form";
import style from "./auth.module.scss";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { fetchUser } from "../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

type User = {
  login: string;
  password: string;
};

const Auth = () => {
  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const [type, setType] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      await dispatch(fetchUser(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const changeType = () => {
    setType((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <input
        {...register("login", { required: true })}
        placeholder="Логин"
        type="text"
      />
      <div className={style.input_password_container}>
        <input
          className={style.input_password}
          {...register("password", { minLength: 6 })}
          type={type ? "text" : "password"}
          placeholder="Пароль"
        />
        <div onClick={() => changeType()}>
          {type ? (
            <FaEyeSlash className={style.icon} />
          ) : (
            <FaEye className={style.icon} />
          )}
        </div>
      </div>
      <button type="submit" className={style.button}>
        Войти
      </button>
    </form>
  );
};

export default Auth;

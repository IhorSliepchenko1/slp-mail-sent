import { useForm } from "react-hook-form";
import style from "./index.module.scss";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../../app/hook";
import { User } from "../../types/types";
import { fetchUpdateUserSlice } from "../../features/update-user/updateUserSlice";
// import { fetchUsers } from "../../features/users/usersSlice";
type Props = {
  closeModal: () => void;
  id: number;
  login: string;
  role: string;
};
const ModalUpdateUser = ({ closeModal, id, login, role }: Props) => {
  const { register, handleSubmit } = useForm<User>({
    defaultValues: {
      login: login,
      password: "",
      role: role,
    },
  });
  // const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // const jwt = state.auth.current?.token as string;

  const updateUser = async (data: User) => {
    try {
      // console.log(jwt);

      await dispatch(fetchUpdateUserSlice({ id, data }));
      // await dispatch(fetchUsers({ jwt }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.body}>
        <div className={style.close} onClick={() => closeModal()}>
          <IoClose className={style.closeBtn} />
        </div>

        <form onSubmit={handleSubmit(updateUser)} className={style.form}>
          <div className={style.labelContainer}>
            <label htmlFor="login">Логин:</label>
            <input
              className={style.inputs}
              {...register("login", { required: true })}
              type="text"
              id="login"
              defaultValue={login}
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
            <select
              className={style.inputs}
              {...register("role")}
              defaultValue={role}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className={style.buttonContainer}>
            <button type="submit">Изменить</button>
            <button onClick={() => closeModal()}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateUser;

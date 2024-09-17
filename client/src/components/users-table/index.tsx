import { useState } from "react";
import { DataUser } from "../../types/types";
import { formatToClientDate } from "../../utils/formatToClientDate";
import ModalDeleteUser from "../modal-delete-user";
import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchDeleteUserSlice } from "../../features/delete-user/deleteUserSlice";
import { fetchUsers } from "../../features/users/usersSlice";
import ModalUpdateUser from "../modal-update-user";

type Props = {
  users: DataUser[];
};

const UsersTable = ({ users }: Props) => {
  const body = document.querySelector(`body`);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [id, setId] = useState(0);
  const [userData, setUserData] = useState({
    login: "",
    role: "",
    id: 0,
  });

  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const jwt = state.auth.current?.token as string;
  const role = state.current.user?.role;

  const openModal = () => {
    body?.classList.add("no-scrol");
    setModalOpen(true);
  };

  const closeModal = () => {
    body?.classList.remove("no-scrol");

    setModalOpen(false);

    setUserData((prevState) => ({
      ...prevState,
      login: "",
      role: "",
      id: 0,
    }));
  };

  const handleBtn = (id: number, number: number) => {
    openModal();
    setId(id);
    setModalId(number);
  };

  const deleteUser = async () => {
    await dispatch(fetchDeleteUserSlice({ jwt, id }));
    // await dispatch(fetchUsers({ jwt }));

    closeModal();
    setId(0);
  };

  return (
    <>
      <div className={style.container}>
        <table>
          <thead className={style.header}>
            <tr>
              <th>№.</th>
              <th>Логин</th>
              <th>Имя роли</th>
              <th>Дата создания</th>
              <th>Дата изменения</th>
              {role === `ADMIN` ? <th>Действия</th> : <></>}
            </tr>
          </thead>

          <tbody>
            {users.map((user: DataUser, index: number) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td style={{ textAlign: `left` }}>{user.login}</td>
                <td style={{ color: user.role === `ADMIN` ? `green` : `red` }}>
                  {user.role}
                </td>
                <td>{formatToClientDate(user.createdAt)}</td>
                <td>
                  {formatToClientDate(user.createdAt) ===
                  formatToClientDate(user.updatedAt)
                    ? "-"
                    : formatToClientDate(user.updatedAt)}
                </td>

                {role === `ADMIN` ? (
                  <td className={style.slot_btn}>
                    <button
                      className={style.btn_edit}
                      onClick={() => {
                        handleBtn(user.id, 1);
                        setUserData((prevState) => ({
                          ...prevState,
                          login: user.login,
                          role: user.role,
                          id: user.id,
                        }));
                      }}
                    >
                      изменить
                    </button>
                    <button
                      className={style.btn_delete}
                      onClick={() => {
                        handleBtn(user.id, 2);
                      }}
                    >
                      удалить
                    </button>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen &&
        (modalId === 2 ? (
          <ModalDeleteUser closeModal={closeModal} deleteUser={deleteUser} />
        ) : (
          <ModalUpdateUser
            closeModal={closeModal}
            id={userData.id}
            login={userData.login}
            role={userData.role}
          />
        ))}
    </>
  );
};

export default UsersTable;

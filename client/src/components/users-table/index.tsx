import { DataUser } from "../../types/types";
import { formatToClientDate } from "../../utils/formatToClientDate";
import style from "./index.module.scss";

type Props = {
  users: DataUser[];
};

const UsersTable = ({ users }: Props) => {
  return (
    <div className={style.container}>
      <table>
        <thead className={style.header}>
          <tr>
            <th>№.</th>
            <th>Id.</th>
            <th>Логин</th>
            <th>Имя роли</th>
            <th>Дата создания</th>
            <th>Дата редактирования</th>
            <th className="align-center">Действия</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: DataUser, index: number) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td style={{ textAlign: `left` }}>{user.login}</td>
              <td style={{ color: user.role === `ADMIN` ? `green` : `red` }}>
                {user.role}
              </td>
              <td>{formatToClientDate(user.createdAt)}</td>
              <td>{formatToClientDate(user.updatedAt)}</td>
              <td className={style.slot_btn}>
                <button className={style.btn_edit}>изменить</button>
                <button className={style.btn_delete}>удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

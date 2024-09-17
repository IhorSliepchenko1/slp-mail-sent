import { useEffect, useMemo } from "react";
import UserCreate from "../../components/user-create";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUsers } from "../../features/users/usersSlice";
import UsersTable from "../../components/users-table";

const Users = () => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const token = state.auth.current?.token as string;

  useEffect(() => {
    dispatch(fetchUsers({ jwt: token }));
  }, [dispatch, token]);

  const users = useMemo(() => {
    return state.users.users;
  }, [state]);

  return (
    <div>
      <UserCreate />
      <UsersTable users={users} />
    </div>
  );
};

export default Users;

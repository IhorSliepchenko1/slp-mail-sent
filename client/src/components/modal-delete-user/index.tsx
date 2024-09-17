import style from "./index.module.scss";
import { IoClose } from "react-icons/io5";
type Props = {
  closeModal: () => void;
  deleteUser: () => Promise<void>;
};
const ModalDeleteUser = ({ closeModal, deleteUser }: Props) => {
  return (
    <div className={style.modal}>
      <div className={style.body}>
        <div className={style.close} onClick={() => closeModal()}>
          <IoClose className={style.closeBtn} />
        </div>

        <p className={style.p}>Вы уверены что хотите удалить пользователя?</p>

        <div className={style.buttonContainer}>
          <button onClick={() => deleteUser()}>Удалить</button>
          <button onClick={() => closeModal()}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;

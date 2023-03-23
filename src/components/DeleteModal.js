import { useDispatch } from "react-redux";
import styled from "styled-components";

import { ContactsActions } from "../store/Contacts";

const DeleteModal = ({ data, close }) => {

  const dispatch = useDispatch();

  const addChangeHandler = () => {
    dispatch(ContactsActions.DeleteContact(data.id));
    close();
  };

  return (
    <Modal onClick={close}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Вы хотите удалить {data?.name}?</h4>
        <WrapperButton>
          <button onClick={close} className="close">
            Нет
          </button>
          <button onClick={addChangeHandler} className="change">
            Да
          </button>
        </WrapperButton>
      </ModalInner>
    </Modal>
  );
};
export default DeleteModal;

const WrapperButton = styled.div`
  display: flex;
  gap: 10px;
  & > button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
  .change {
    background-color: #c6a4ff;
  }
  .close {
    background-color: aqua;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalInner = styled.div`
  width: 320px;
  padding: 15px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 5px;
  h4 {
    text-align: center;
  }
`;

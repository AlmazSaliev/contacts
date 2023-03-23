import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { ReactComponent as SearchSelectIcon } from "../assets/down.svg";
import { ContactsActions } from "../store/Contacts";

const GroupModal = ({ data, close }) => {
  const [addGroup, setaddGroup] = useState([]);
  const [nameGroup, setnameGroupe] = useState("");
  const [nameGroupShow, setnameGroupeShow] = useState("");
  const [openselect, setopenselect] = useState(false);

  const dispatch = useDispatch();

  const openOrClose = () => setopenselect(!openselect);

  const getGroupValue = (e) => setnameGroupe(e.target.value);

  const addNewGroup = (e) => {
    e.preventDefault();
    setnameGroupeShow(nameGroup);
    dispatch(
      ContactsActions.AddNewGroup({
        id: Math.random() * 1000,
        title: nameGroup,
      })
    );
    setnameGroupe("");
  };

  const addChangeHandler = () => {
    const arr = data.map((i) => {
      console.log(addGroup, data, "name");
      const addGroupTitle = addGroup.find((e) => e?.name === i?.name);
      if (addGroupTitle?.name) {
        return addGroupTitle;
      }
      return i;
    });
    dispatch(ContactsActions.AddGroupContacts(arr));
  };

  const render = data
    .map((i) => {
      const obj = addGroup.find((e) => e?.name === i.name);
      if (obj?.name) {
        return null;
      }
      return i;
    })
    .filter((i) => i !== null);
    
  return (
    <Modal onClick={close}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Создание группы</h4>
        <WrapperSearch>
          <p>Название группы </p>
          {nameGroupShow ? (
            <p>{nameGroupShow}</p>
          ) : (
            <form onSubmit={addNewGroup}>
              <input
                placeholder="Название группы"
                onChange={getGroupValue}
                value={nameGroup}
              />
            </form>
          )}
        </WrapperSearch>
        <WrapperBox>
          <WrapperSelect open={openselect} onClick={openOrClose}>
            <p>Доавить контакты</p>
            <SearchSelectIcon />
          </WrapperSelect>
          {openselect && !!nameGroupShow && (
            <WrapperSelectTitle>
              {render.map((i) => (
                <button
                  key={i.id}
                  onClick={() =>
                    setaddGroup([
                      ...addGroup,
                      { ...i, groupContact: nameGroupShow },
                    ])
                  }
                >
                  {i.name}
                </button>
              ))}
            </WrapperSelectTitle>
          )}
        </WrapperBox>
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
export default GroupModal;
const WrapperBox = styled.div`
  position: relative;
`;
const WrapperSearch = styled.div`
  padding: 10px;
  & > form {
    width: 100%;
    margin: 0 auto;
    position: relative;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
  & > form > input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border-color: aqua blue red blueviolet;
  }
`;
const WrapperInputText = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid black;
  & > input {
    padding: 2px 10px;
    border: none;
    background: none;
  }
`;
const WrapperSelectTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 10px;
  background-color: #cbaeff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  & > button {
    border: none;
    background: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
  & > button:hover {
    background-color: wheat;
  }
  @media screen and (max-width: 500px) {
    right: 30px;
  }
`;
const WrapperSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  & > p {
    color: grey;
  }
  & > svg {
    ${(num) =>
      num.open ? "transform: rotate(180deg)" : "transform: rotate(0deg)"};
  }
  @media screen and (max-width: 500px) {
    right: 40px;
    & > p {
      display: none;
    }
  }
`;
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
  position: relative;
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

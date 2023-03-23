import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { ContactsActions } from "../store/Contacts";

const EditAndAddModal = ({ data, close, type }) => {
  const [contact, setcontact] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.id) {
      setcontact(data);
    }
  }, [data]);

  const getvalue = (e) => {
    const value = e.target.value;
    if (
      e.target.name === "city" ||
      e.target.name === "street" ||
      e.target.name === "suite" ||
      e.target.name === "zipcode"
    ) {
      setcontact({
        ...contact,
        address: {
          ...contact.address,
          [e.target.name]: value,
        },
      });
      return;
    }
    if (
      e.target.name === "catchPhrase" ||
      e.target.name === "bs" ||
      e.target.name === "companyname"
    ) {
      if (e.target.name === "companyname") {
        setcontact({
          ...contact,
          company: {
            ...contact.company,
            name: value,
          },
        });
        return;
      }
      setcontact({
        ...contact,
        company: {
          ...contact.company,
          [e.target.name]: value,
        },
      });
      return;
    }
    setcontact({
      ...contact,
      [e.target.name]: value,
    });
  };

  const addChangeHandler = () => {
    dispatch(ContactsActions.EditContact(contact));
    close();
  };
  const addNewContact = () => {
    dispatch(
      ContactsActions.AddContacts({ ...contact, id: Math.random() * 1000 })
    );
    close();
  };

  return (
    <Modal onClick={close}>
      <ModalInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Редактировать</h4>
        <WrapperInputText>
          <p>Имя</p>
          <input
            placeholder="Имя"
            onChange={getvalue}
            name="name"
            value={contact?.name}
          />
        </WrapperInputText>
        <WrapperInputText>
          <p>Фамилия</p>
          <input
            onChange={getvalue}
            placeholder="Фамилия"
            name="username"
            value={contact?.username}
          />
        </WrapperInputText>
        <WrapperInputText>
          <p>Почта</p>
          <input
            onChange={getvalue}
            placeholder="Почта"
            name="email"
            value={contact?.email}
          />
        </WrapperInputText>
        <WrapperInputText>
          <p>Телефон</p>
          <input
            onChange={getvalue}
            placeholder="Телефон"
            name="phone"
            value={contact?.phone}
          />
        </WrapperInputText>
        <WrapperDiv>
          <h4>Адресс</h4>
          <WrapperInputText>
            <p>Город</p>
            <input
              placeholder="Город"
              onChange={getvalue}
              name="city"
              value={contact.address?.city}
            />
          </WrapperInputText>
          <WrapperInputText>
            <p>Улица</p>
            <input
              onChange={getvalue}
              name="street"
              placeholder="Улица"
              value={contact.address?.street}
            />
          </WrapperInputText>
          <WrapperInputText>
            <p>Квартира</p>
            <input
              onChange={getvalue}
              name="suite"
              placeholder="Квартира"
              value={contact.address?.suite}
            />
          </WrapperInputText>
          <WrapperInputText>
            <p>Почтовый индекс</p>
            <input
              placeholder="Почтовый индекс"
              onChange={getvalue}
              name="zipcode"
              value={contact.address?.zipcode}
            />
          </WrapperInputText>
        </WrapperDiv>
        <WrapperDiv>
          <h4>Компания</h4>
          <WrapperInputText>
            <p>Название</p>
            <input
              onChange={getvalue}
              placeholder="Название компании"
              name="companyname"
              value={contact.company?.name}
            />
          </WrapperInputText>
          <WrapperInputText>
            <p>Отрасль</p>
            <input
              onChange={getvalue}
              name="catchPhrase"
              placeholder="Отрасль"
              value={contact.company?.catchPhrase}
            />
          </WrapperInputText>
          <WrapperInputText>
            <p>Деятельность</p>
            <input
              placeholder="Деятельность"
              onChange={getvalue}
              name="bs"
              value={contact.company?.bs}
            />
          </WrapperInputText>
        </WrapperDiv>
        <WrapperInputText>
          <p>Сайт компании</p>
          <input
            placeholder="Сайт компании"
            onChange={getvalue}
            name="website"
            value={contact?.website}
          />
        </WrapperInputText>
        <WrapperButton>
          <button onClick={close} className="close">
            Отменить
          </button>
          <button
            onClick={type === "edit" ? addChangeHandler : addNewContact}
            className="change"
          >
            {type === "edit" ? "Изменить" : "Добавить"}
          </button>
        </WrapperButton>
      </ModalInner>
    </Modal>
  );
};
export default EditAndAddModal;

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
const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h4 {
    text-align: center;
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
  @media screen and (max-height: 700px) {
    height: 90%;
    overflow: auto;
  }
`;

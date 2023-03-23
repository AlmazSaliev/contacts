import { useState } from "react";
import styled from "styled-components";

import EditAndAddModal from "./EditAndAddModal";
import DeleteModal from "./DeleteModal";

import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit (1).svg";

const ContactsCard = ({ data }) => {
  const [openEdit, setopenEdit] = useState({
    edit: false,
    delete: false,
  });

  const closeModal = () =>
    setopenEdit({
      edit: false,
      delete: false,
    });

  const openEditModal = (e) =>
    setopenEdit({
      [e]: true,
    });

  return (
    <>
      {openEdit.edit && <EditAndAddModal data={data} type="edit" close={closeModal} />}
      {openEdit.delete && <DeleteModal data={data} close={closeModal} />}
      <WrapperCard>
        <CardEdit>
          <EditIcon onClick={() => openEditModal("edit")} />
          <DeleteIcon onClick={() => openEditModal("delete")} />
        </CardEdit>
        <WrapperAvatarAndInfo>
          <WrapperAvatar>{data?.name?.slice(0, 1)}</WrapperAvatar>
          <WrapperInfo>
            <div>{data?.name}</div>
            <div>{data?.username}</div>
            <div>
              <a href={"mailto:" + data.email} target="_blank" rel="noreferrer">
                {data?.email}
              </a>
            </div>
            <div>
              <a href={"tel:" + data?.phone}>{data?.phone}</a>
            </div>
          </WrapperInfo>
        </WrapperAvatarAndInfo>
        <WrapperAddressCard>
          <div>
            <h4>Адресс</h4>
            <div>
              <p>Город: {data.address?.city}</p>
              <p>Улица: {data.address?.street}</p>
              <p>Квартира: {data.address?.suite}</p>
              <p>Почтовый индекс: {data.address?.zipcode}</p>
            </div>
          </div>
          <div>
            <h4>Компания</h4>
            <div>
              <p>Название: {data.company?.name}</p>
              <p>Отрасль: {data.company?.catchPhrase}</p>
              <p>Деятельность: {data.company?.bs}</p>
            </div>
          </div>
        </WrapperAddressCard>
        <WrapperLink>
          <p>Сайт:</p>
          <a href={"http://" + data?.website} target="_blank" rel="noreferrer">
            {data?.website}
          </a>
        </WrapperLink>
      </WrapperCard>
    </>
  );
};
export default ContactsCard;

const WrapperLink = styled.div`
  display: flex;
  justify-content: space-between;
`;
const WrapperAddressCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h4 {
    text-align: center;
    border-bottom: 3px solid rgb(149 168 255);
  }
  & > div > div {
    background-color: white;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const CardEdit = styled.div`
  position: absolute;
  top: 140px;
  right: 0px;
  width: 30px;
  padding: 10px;
  background-color: #003eff2e;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;
const WrapperCard = styled.div`
  display: flex;
  width: 24%;
  min-width: 290px;
  min-height: 420px;
  flex-direction: column;
  padding: 15px;
  background-color: #f5faff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding-right: 25px;
  gap: 10px;
  box-shadow: #81caf7 0px 3px 5px;
  @media screen and (max-width: 670px) {
    width: 100%;
  }
`;
const WrapperAvatarAndInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const WrapperInfo = styled.div`
  width: 180px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  a {
    text-decoration: none;
  }
  @media screen and (max-width: 900px) {
    width: 150px;
  }
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;
const WrapperAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ceabff;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

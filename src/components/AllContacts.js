import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ContactsActions } from "../store/Contacts";
import ContactsCard from "./ContactsCard";
import EditAndAddModal from "./EditAndAddModal";
import SearchContacts from "./SearchContacts";

import { ReactComponent as GroupIcon } from "../assets/menu.svg";
import GroupModal from "./GroupModal";

const AllContacts = () => {
  const { contacts, status, contactGroup } = useSelector((i) => i);
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [addNewContact, setAddNewContact] = useState({
    modal: false,
    newContacts: false,
  });

  const [filterGroup, setfilterGroup] = useState({
    modal: false,
    addgroup: false,
  });

  const addContact = () =>
    setAddNewContact({
      modal: true,
      newContacts: false,
    });

  const closeContact = () =>
    setAddNewContact({
      modal: false,
      newContacts: false,
    });

  const newContactLoad = () =>
    setAddNewContact({
      modal: false,
      newContacts: true,
    });

  const defaultContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  useEffect(() => {
    if (contacts?.length > 0) return;
    if (!addNewContact.newContacts) return;
    setTimeout(() => {
      dispatch(ContactsActions.InitailContacts());
      closeContact();
    }, 1000);
  }, [defaultContacts, addNewContact.newContacts]);

  const getSearchValue = (e) => setSearchValue(e);

  useEffect(() => {
    if (searchValue === "Сортировать от А-Я") {
      const sortA = contacts
        .map((i) => i.name)
        .sort()
        .map((i) => {
          const obj = contacts.find((e) => e.name === i);
          return obj;
        });
      setdata(sortA);
      return;
    }
    if (searchValue === "Сортировать от Я-А") {
      const sortB = contacts
        .map((i) => i.name)
        .sort()
        .reverse()
        .map((i) => {
          const obj = contacts.find((e) => e.name === i);
          return obj;
        });
      setdata(sortB);
      return;
    }
    if (
      searchValue &&
      searchValue !== "Сортировать от Я-А" &&
      searchValue !== "Сортировать от А-Я"
    ) {
      const findContact = contacts
        .map((i) => {
          if (`${searchValue}`.includes(...i.name)) {
            return i;
          }
          return null;
        })
        .filter((i) => i !== null);
      setdata(findContact);
      return;
    }
    setdata(contacts);
  }, [searchValue, status]);

  const filterByGroupClose = () => {
    setfilterGroup({
      modal: false,
      addgroup: false,
    });
  };

  const filterByGroupAddGroup = () =>
    setfilterGroup({
      modal: false,
      addgroup: true,
    });

  const filterByGroupAddContact = () =>
    setfilterGroup({
      modal: true,
      addgroup: false,
    });

  const filterByGroup = (e) => {
    const groupArr = contacts
      .map((i) => {
        if (i.groupContact === e) {
          return i;
        }
        return null;
      })
      .filter((i) => i !== null);
    setdata(groupArr);
    filterByGroupClose();
  };
  return (
    <>
      {addNewContact.modal && <EditAndAddModal close={closeContact} />}
      {filterGroup.modal && (
        <GroupModal data={data} close={filterByGroupClose} />
      )}
      <WrapperHeader>
        <WrapperAddContact size="true" onClick={addContact}>
          +
        </WrapperAddContact>
        <SearchContacts getSearchValue={getSearchValue} />
        <GroupIcon
          onClick={
            filterGroup.addgroup ? filterByGroupClose : filterByGroupAddGroup
          }
        />
        {filterGroup.addgroup && (
          <WrapperSelectTitle>
            {contactGroup.map((i) => (
              <button key={i.id} onClick={() => filterByGroup(i.title)}>
                {i.title}
              </button>
            ))}
            <button onClick={filterByGroupAddContact}>Создать группу</button>
          </WrapperSelectTitle>
        )}
      </WrapperHeader>
      <WrapperCard>
        {data?.length > 0 ? (
          data?.map((i) => <ContactsCard key={i.id} data={i} />)
        ) : (
          <WrapperNotFound>
            {searchValue ? (
              `По запросу "${searchValue}" ничего не найдено...`
            ) : (
              <>
                <p>Контакты пусты...</p>
                <WrapperAddContact onClick={newContactLoad}>
                  Загрузить данные с JSONPlaceholder?
                </WrapperAddContact>
              </>
            )}
          </WrapperNotFound>
        )}
      </WrapperCard>
    </>
  );
};
export default AllContacts;

const WrapperSelectTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 78px;
  min-height: 50px;
  min-width: 150px;
  right: 0px;
  gap: 10px;
  padding: 10px 10px;
  background-color: #cbaeff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 10;
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
const WrapperHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  max-width: 1300px;
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;
const WrapperAddContact = styled.button`
  padding: 2px 12px;
  background: none;
  border-color: aqua blue red blueviolet;
  background-color: aliceblue;
  border-radius: 10px;
  font-size: ${(num) => (num.size ? "28px" : "17px")};
`;

const WrapperNotFound = styled.p`
  font-size: 18px;
  text-align: center;
  width: 100%;
`;
const WrapperCard = styled.div`
  margin-top: 50px;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1300px;
  @media screen and (max-width: 1270px) {
    width: 80%;
  }
  @media screen and (max-width: 1130px) {
    width: 90%;
  }
  @media screen and (max-width: 1000px) {
    width: 98%;
  }
  @media screen and (max-width: 920px) {
    width: 80%;
  }
  @media screen and (max-width: 750px) {
    width: 90%;
  }
  @media screen and (max-width: 670px) {
    width: 70%;
  }
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;

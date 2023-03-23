import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/person_search.svg";
import { ReactComponent as SearchSelectIcon } from "../assets/down.svg";

const sort = [
  {
    id: 1,
    title: "Сортировать от А-Я",
  },
  {
    id: 2,
    title: "Сортировать от Я-А",
  },
];

const SearchContacts = ({ getSearchValue }) => {
  const [search, setsearch] = useState("");
  const [openselect, setopenselect] = useState(false);

  const openOrClose = () => setopenselect(!openselect);

  const getvalue = (e) => {
    setsearch(e.target.value);
  };

  const goSearchFunc = (e) => {
    e.preventDefault();
    getSearchValue(search);
  };

  const sortSearch = (e) => {
    setsearch(e);
    getSearchValue(e);
    openOrClose();
  };

  return (
    <WrapperSearch>
      <form onSubmit={goSearchFunc}>
        <input
          placeholder="Искать контакт..."
          value={search}
          onChange={getvalue}
        />
        <WrapperSelect open={openselect} onClick={openOrClose}>
          <p>Сортировать</p>
          <SearchSelectIcon />
        </WrapperSelect>
        {openselect && (
          <WrapperSelectTitle>
            {sort.map((i) => (
              <button key={i.id} onClick={() => sortSearch(i.title)}>
                {i.title}
              </button>
            ))}
          </WrapperSelectTitle>
        )}
        <WrapperSvg />
      </form>
    </WrapperSearch>
  );
};
export default SearchContacts;

const WrapperSelectTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 60px;
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
const WrapperSelect = styled.div`
  position: absolute;
  right: 70px;
  top: 7px;
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
  }
`;
const WrapperSvg = styled(SearchIcon)`
  position: absolute;
  right: 10px;
  top: 8px;
`;
const WrapperSearch = styled.div`
  width: 100%;
  margin: 30px auto;
  padding: 10px;
  max-width: 1300px;
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

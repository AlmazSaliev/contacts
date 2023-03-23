import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  status: false,
};

const Contacts = createSlice({
  name: "contact",
  initialState,
  reducers: {
    InitailContacts: (state) => {
      const getDefaultContacts =
        JSON.parse(localStorage.getItem("contacts")) || [];
      state.contacts = getDefaultContacts;
    },
    EditContact: (state, { payload }) => {
      const editContacts = state.contacts.map((i) => {
        if (i.id === payload.id) {
          return { ...payload };
        }
        return i;
      });
      state.contacts = editContacts;
      state.status = !state.status;
    },
    AddContacts: (state, { payload }) => {
      state.contacts.push(payload);
      state.status = !state.status;
    },
    DeleteContact: (state, { payload }) => {
      const deleteContacts = state.contacts.filter((i) => +i.id !== +payload);
      state.contacts = deleteContacts;
      state.status = !state.status;
    },
  },
});
export const ContactsActions = Contacts.actions;
export default Contacts;

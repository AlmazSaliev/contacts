import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  status: false,
  contactGroup: [],
};

const Contacts = createSlice({
  name: "contact",
  initialState,
  reducers: {
    InitailContacts: (state) => {
      const getDefaultContacts =
        JSON.parse(localStorage.getItem("contacts")) || [];
      state.contacts = getDefaultContacts;
      state.status = !state.status;
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
    AddNewGroup: (state, { payload }) => {
      state.contactGroup.push(payload);
    },
    AddGroupContacts: (state, { payload }) => {
      state.contacts = payload;
    },
  },
});
export const ContactsActions = Contacts.actions;
export default Contacts;

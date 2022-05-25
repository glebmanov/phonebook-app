import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const contactListSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    searchedQuery: null,
    searchedContacts: [],
    modals: {
      menu: { isActive: false },
      add: { isActive: false },
      edit: { isActive: false, id: null },
      import: { isActive: false },
    },
  },
  reducers: {
    addContact(state, action) {
      state.contacts.push({ id: _.uniqueId(), ...action.payload });
    },
    editContact(state, action) {
      Object.assign(
        state.contacts.find(contact => contact.id === action.payload.id),
        action.payload
      );
    },
    toggleModalMenu(state, action) {
      state.modals.menu.isActive = action.payload.isActive;
    },
    toggleModalAdd(state, action) {
      state.modals.add.isActive = action.payload.isActive;
    },
    toggleModalEdit(state, action) {
      state.modals.edit.isActive = action.payload.isActive;
      state.modals.edit.id = action.payload.id;
    },
    toggleModalImport(state, action) {
      state.modals.import.isActive = action.payload.isActive;
    },
    sortedContacts(state, action) {
      const { param } = action.payload;
      state.contacts.sort((a, b) => a[param].localeCompare(b[param]));
    },
    findContact(state, action) {
      if (action.payload.value !== '') {
        state.searchedQuery = action.payload.value;
        state.searchedContacts = [
          ...state.contacts.filter(contact =>
            Object.values(contact).find(field => field.toLowerCase().includes(action.payload.value.toLowerCase()))
          ),
        ];
      } else {
        state.searchedQuery = null;
      }
    },
    importFile(state, action) {
      action.payload.map(newContact => state.contacts.push({ id: _.uniqueId(), ...newContact }));
    },
  },
});

export const {
  addContact,
  editContact,
  toggleModalMenu,
  toggleModalAdd,
  toggleModalEdit,
  toggleModalImport,
  sortedContacts,
  findContact,
  importFile,
} = contactListSlice.actions;

export default contactListSlice.reducer;

import sortByField from '@/utils/sort-by-field';

const state = {
  contacts: null,
};

const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts;
  },
};

const actions = {
  getContacts(context) {
    const contacts = localStorage.getItem('contacts');
    if (!contacts || Object.keys(contacts).length === 0) {
      context.commit('setContacts', null);
      return;
    }
    context.commit('setContacts', JSON.parse(contacts));
  },

  setContacts(context, value) {
    context.commit('setContacts', value);
    localStorage.setItem('contacts', JSON.stringify(value));
  },
  deleteContact(context, id) {
    const contacts = JSON.parse(JSON.stringify(state.contacts));
    const index = contacts.contacts.findIndex((el) => el.id === id);
    contacts.contacts.splice(index, 1);
    context.commit('setContacts', contacts);
    context.dispatch('setContacts', contacts);
  },
};

const getters = {
  contacts(state) {
    if (!state.contacts) {
      return [];
    }
    const contacts = [...state.contacts.contacts];
    const regex = /[^a-zа-яё\d]/gi;
    const editContacts = contacts.map((item) => {
      const initials = item.firstName[0].toUpperCase() + item.lastName[0].toUpperCase();
      const searchString = item.lastName.toLowerCase()
        + item.firstName.toLowerCase()
        + item.middleName.toLowerCase()
        + item.phone;
      return {
        ...item,
        initials,
        searchString: searchString.replace(regex, ''),
      };
    });
    return editContacts.sort(sortByField('searchString'));
  },
};

export default {
  namespaced: true,
  strict: true,
  state,
  mutations,
  actions,
  getters,
};

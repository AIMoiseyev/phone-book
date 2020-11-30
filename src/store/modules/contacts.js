import sortByField from '@/utils/sort-by-field';

const initialContacts = {
  contacts: [
    {
      firstName: 'Киану',
      middleName: 'Борисович',
      lastName: 'Ривз',
      phone: '+19872377784',
      id: 'f5135b73',
      created: '2019-10-30T15:43:50.287Z',
      updated: '2019-11-30T15:43:50.287Z',
    },
    {
      firstName: 'Волтер',
      middleName: 'Блэкович',
      lastName: 'Вайт',
      phone: '+19871155500',
      id: 'f5ad1398',
      created: '2018-09-30T15:43:50.287Z',
      updated: '2018-12-30T15:43:50.287Z',
    },
  ],
};

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
      context.commit('setContacts', initialContacts);
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

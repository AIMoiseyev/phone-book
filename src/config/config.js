export const PAGE_TITLES = {
  main: 'Список контактов',
  addContact: 'Новый контакт',
  editContact: 'Редактировать контакт',
};

export const VALIDATION_FIELDS = {
  firstName: {
    title: 'имя',
    value: '',
  },
  middleName: {
    title: 'отчество',
    value: '',
  },
  lastName: {
    title: 'фамилия',
    value: '',
  },
  phone: {
    title: 'телефон',
    value: '',
  },
};

export const FILTER_FIELDS = [
  {
    title: 'ФИО',
    optionTitle: 'ФИО',
    options: [
      { text: 'Фамилия от А до Я', value: 1, sortName: 'lastName' },
      { text: 'Фамилия от Я до А', value: 0, sortName: 'lastName' },
      { text: 'Имя от А до Я', value: 1, sortName: 'firstName' },
      { text: 'Имя от Я до А', value: 0, sortName: 'firstName' },
    ],
  },
  {
    title: 'Дате',
    optionTitle: 'Дате',
    options: [
      { text: 'Добавлены раньше', value: 1, sortName: 'created' },
      { text: 'Добавлены позже', value: 0, sortName: 'created' },
      { text: 'Изменены раньше', value: 1, sortName: 'updated' },
      { text: 'Изменены позже', value: 0, sortName: 'updated' },
    ],
  },
];

export const CONTACTS_MODEL = {
  contacts: [],
};

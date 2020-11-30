<template>
  <layout
    @sideBarHandler="sideBarHandler"
    v-model="searchValue"
  >
    <template v-slot:sideBar>
      <transition name="slide">
        <SideBar
          v-if="open"
        />
      </transition>
    </template>
    <template v-slot:main>
      <p
        v-if="!contactsData.length"
        class="no-content"
      >
        У Вас пока нет контактов.
        <router-link
          class="no-content__link"
          :to="{name: 'AddContactPage'}"
        >
          Добавить первый.
        </router-link>
      </p>
      <p
        v-if="!contacts.length"
        class="no-content"
      >
        Контакт не найден.
      </p>
      <div
        v-else
        class="phone-book"
      >
        <div class="phone-book__filter">
          <p class="phone-book__filter-title">
            Сортировать по:
          </p>
          <Select
            v-for="field in filterFields"
            :key="field.title"
            :options="field.options"
            :selected="field.title"
            @select="sortContact"
          />
        </div>
        <div
          class="card__container"
        >
          <transition-group
            name="list-complete"
          >
            <PhoneCard
              v-for="item in contacts"
              :key="item.id"
              :contact="item"
              @onDelete="onDelete"
              @onEdit="onEdit"
              class="list-complete-item"
            />
          </transition-group>
        </div>
        <Modal
          v-if="isShowModal"
          title="Удалить ?"
          @close="closeModal"
          @onAccept="deleteContact"
          @onCancel="closeModal"
          accept-button-text="удалить"
          cancel-button-text="отменить"
        >
          <slot>
            <p>{{ contactFullName }}</p>
          </slot>
        </Modal>
      </div>
    </template>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import localeCompare from '@/utils/locale-compare';
import { debounce } from 'lodash';
import Layout from '@/layouts/MainLayout.vue';
import PhoneCard from '@/components/PhoneCard.vue';
import SideBar from '@/components/SideBar.vue';
import Select from '@/components/Select.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'PhoneBookPage',
  components: {
    Layout,
    PhoneCard,
    SideBar,
    Select,
    Modal,
  },
  data() {
    return {
      open: false,
      value: '',
      isShowModal: false,
      contactFullName: '',
      filterFields: [
        {
          title: 'ФИО',
          options: [
            { text: 'Фамилия от А до Я', value: 1, sortName: 'lastName' },
            { text: 'Фамилия от Я до А', value: 0, sortName: 'lastName' },
            { text: 'Имя от А до Я', value: 1, sortName: 'firstName' },
            { text: 'Имя от Я до А', value: 0, sortName: 'firstName' },
          ],
        },
        {
          title: 'Дате',
          options: [
            { text: 'Добавлены раньше', value: 1, sortName: 'created' },
            { text: 'Добавлены позже', value: 0, sortName: 'created' },
            { text: 'Изменены раньше', value: 1, sortName: 'updated' },
            { text: 'Изменены позже', value: 0, sortName: 'updated' },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters('contacts', {
      contactsData: 'contacts',
    }),
    searchValue: {
      get() {
        return this.value;
      },
      set: debounce(function setDebounce(value) {
        this.value = value;
      }, 500),
    },
    contacts() {
      if (!this.contactsData) {
        return null;
      }
      const contacts = [];
      this.contactsData.forEach((contact) => {
        if (contact.searchString.includes(this.searchValue.toLowerCase())) {
          contacts.push(contact);
        }
      });
      return contacts;
    },
  },
  created() {
    this.$store.dispatch('contacts/getContacts');
  },
  methods: {
    sortContact(option, selected) {
      this.filterFields.find((item) => item.title === selected).title = option.text;
      this.contacts.sort(localeCompare(option.sortName, option.value));
    },
    sideBarHandler() {
      this.open = !this.open;
    },
    onDelete(id) {
      this.contactId = id;
      const contact = this.contacts.find((item) => item.id === id);
      this.contactFullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
      this.isShowModal = true;
    },
    deleteContact() {
      this.$store.dispatch('contacts/deleteContact', this.contactId);
      this.isShowModal = false;
    },
    onEdit(id) {
      this.$router.push({ name: 'EditContactPage', params: { id } });
    },
    closeModal() {
      this.isShowModal = false;
    },
  },
};
</script>
<style scoped>
.phone-book {
  width: 100%;
}
.phone-book__filter {
  display: flex;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  margin: 0 auto;
}

.phone-book__filter-title {
  margin: 0;
  font-weight: bold;
}

.card__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 50vw;
  margin: 20px auto;
}

.slide-enter-active {
  transition: all .3s linear;
}
.slide-leave-active {
  transition: all .3s linear;
}
.slide-enter, .slide-leave-to {
  width: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  margin-bottom: 8px;
}

.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}

.list-complete-leave-active {
  position: absolute;
}

.no-content {
  color: black;
  font-size: 24px;
  align-self: center;
  margin: 0 auto;
}

.no-content__link {
  text-decoration: none;
  color: cadetblue;
}

.no-content__link:hover {
  text-decoration: underline;
}
</style>

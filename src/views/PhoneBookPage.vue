<template>
  <layout
    v-if="contactsData"
    @sideBarHandler="sideBarHandler"
    @openContactList="sideBarHandler"
    v-model="searchValue"
  >
    <template v-slot:sideBar>
      <transition name="slide">
        <SideBar
          v-if="open"
          :data="contacts"
          @onDelete="onDelete"
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
        v-else-if="!contacts.length && contactsData.length"
        class="no-content"
      >
        Контакт не найден.
      </p>
      <div
        v-else
        class="phone-book"
      >
        <div
          class="phone-book__filter"
        >
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
import { FILTER_FIELDS } from '@/config/config';
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
      filterFields: FILTER_FIELDS,
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
      if (!this.contactsData.length) {
        return [];
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
      this.filterFields.forEach((item) => {
        const field = item;
        if (field.title === selected) {
          field.title = option.text;
        } else {
          field.title = field.optionTitle;
        }
      });
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
  height: calc(100vh - 80px);
  height: -webkit-height;
  overflow: auto;
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
  max-width: 600px;
  margin: 20px auto;
}

.slide-enter-active {
  transition: all .3s linear;
  opacity: .3;
}
.slide-leave-active {
  transition: all .3s linear;
  opacity: .3;
}
.slide-enter, .slide-leave-to {
  width: 0;
  opacity: 0;
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
  transform: translateX(500px);
}

.list-complete-leave-active {
  position: absolute;
  transform: translateX(500px);
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

@media (max-width: 1024px) {
  .card__container {
    max-width: 500px;
  }
  .phone-book__filter {
    max-width: 500px;
    flex-direction: column;
    min-height: 100px;
  }
}

@media (max-width: 768px) {
  .card__container {
    max-width: 400px;
  }
}
</style>

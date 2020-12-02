<template>
  <div class="mobile-navbar">
    <div
      class="mobile-navbar__overlay"
      v-if="isOpen"
      @click="closeMenu"
    />
    <div class="mobile-navbar__wrapper">
      <div class="wrapper">
        <Button
          v-if="$route.path === '/'"
          class="mobile-navbar__button"
          :image-modifier="'menu'"
          @click="toggleMenu"
        />
        <h1
          class="mobile-navbar__title"
        >
          {{ pageTitle }}
        </h1>
        <Button
          v-if="$route.path === '/'"
          :image-modifier="'add-contact'"
          @click="goToAddContact"
        />
        <Button
          v-if="$route.path !== '/'"
          :image-modifier="'back'"
          @click="goToMain"
        />
      </div>
      <NavInput
        v-if="$route.path === '/' && !isOpen"
        class="mobile-navbar__input"
        :placeholder="'Поиск контакта'"
        :id="'mobile-search'"
        v-model="innerValue"
        :modifier="'input__field_padding_right'"
      >
        <template v-slot:validationMessage>
          <Button
            v-if="value"
            :image-modifier="'input__clear'"
            class="mobile-navbar__input-button"
            @click="clearInput"
          />
        </template>
      </NavInput>
    </div>
    <transition name="menu">
      <div
        v-if="isOpen"
        class="mobile-navbar__container"
      >
        <Button
          class="mobile-menu__button"
          :text="'Изменить отображение'"
          @click="openContactList"
        />
        <a
          :href="data"
          download="data.json"
          class="mobile-navbar__save"
        ><Button
          class="mobile-menu__button"
          @click="saveContacts"
          :text="'Сохранить контакты'"
        />
        </a>
      </div>
    </transition>
  </div>
</template>

<script>

import Button from '@/components/Button.vue';
import NavInput from '@/components/Input.vue';
import { mapGetters } from 'vuex';
import { PAGE_TITLES } from '@/config/config';

export default {
  name: 'MobileNavBar',
  components: {
    Button,
    NavInput,
  },
  data() {
    return {
      data: '',
      isOpen: false,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('contacts', {
      contacts: 'contacts',
    }),
    pageTitle() {
      if (this.$route.path === '/add') {
        return PAGE_TITLES.addContact;
      } if (this.$route.path.includes('/edit')) {
        return PAGE_TITLES.editContact;
      }
      return PAGE_TITLES.main;
    },
    innerValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    goToAddContact() {
      this.$router.push({ name: 'AddContactPage' });
    },
    goToMain() {
      this.$router.push({ name: 'contacts' });
    },
    saveContacts() {
      this.data = URL.createObjectURL(new Blob([JSON.stringify(this.contacts, null, 2)], {
        type: 'text/plain',
      }));
    },
    clearInput() {
      this.$emit('input', '');
    },
    openContactList() {
      this.isOpen = false;
      this.$emit('openContactList');
    },
  },
};
</script>

<style scoped>
.mobile-navbar__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .6);
  transition: opacity .35s ease;
  z-index: 101;
}
.mobile-navbar__input-button {
  position: absolute;
  right: 8px;
  top: 10px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.mobile-navbar {
  min-height: 80px;
  display: none;
  align-items: center;
  box-sizing: border-box;
  padding: 0 24px;
  justify-content: space-between;
  flex-direction: column;
  z-index: 110;
  width: 100vw;
}

.mobile-navbar__wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
  z-index: 111;
  background-color: lightblue;
  padding: 8px 16px 16px;
  box-sizing: border-box;
}

.mobile-navbar__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 16px 8px;
  box-sizing: border-box;
  background-color: lightblue;
  opacity: 1;
  z-index: 110;
  width: 100vw;
  transform: translateY(0);
}

.mobile-navbar__input {
  margin-right: 16px;
  width: 100%;
}

.mobile-navbar__title {
  font-size: 16px;
  margin: 0;
  color: black;
  background-color: lightblue;
  text-align: left;
}

.mobile-navbar__save {
  display: flex;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
}

.mobile-menu__button {
  width: 100%;
  border: 2px solid #222;
  background-color: #cccccc;
  margin-bottom: 8px;
}
.menu-enter-to {
  transition: all .3s ease-in-out;
}
.menu-leave {
  transition: all .3s ease-in-out;
}
.menu-enter, .menu-leave-to {
  opacity: 0;
  transform: translateY(-200px);
  z-index: 110;
  background-color: transparent;
}

@media (max-width: 500px) {
  .mobile-navbar {
    display: flex;
  }
}
</style>

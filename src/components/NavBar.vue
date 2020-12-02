<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <Button
        v-if="$route.path === '/'"
        class="navbar__button"
        :image-modifier="'menu'"
        @click="$emit('sideBarHandler')"
      />
      <h1
        class="navbar__title"
      >
        {{ pageTitle }}
      </h1>
    </div>
    <div
      class="navbar__container"
    >
      <NavInput
        v-if="$route.path === '/'"
        class="navbar__input"
        :placeholder="'Поиск контакта'"
        :id="'search'"
        v-model="innerValue"
        :modifier="'input__field_padding_right'"
      >
        <template v-slot:validationMessage>
          <Button
            v-if="value"
            :image-modifier="'input__clear'"
            class="navbar__input-button"
            @click="clearInput"
          />
        </template>
      </NavInput>
      <a
        :href="data"
        download="data.json"
        class="navbar__save"
      ><Button
        @click="saveContacts"
        :image-modifier="'save-contact'"
      />
      </a>
      <Button
        v-if="$route.path === '/'"
        :image-modifier="'add-contact'"
        @click="goToAddContact"
      />
      <Button
        v-else
        :image-modifier="'back'"
        @click="goToMain"
      />
    </div>
  </div>
</template>

<script>

import Button from '@/components/Button.vue';
import NavInput from '@/components/Input.vue';
import { mapGetters } from 'vuex';
import { PAGE_TITLES } from '@/config/config';

export default {
  name: 'NavBar',
  components: {
    Button,
    NavInput,
  },
  data() {
    return {
      data: '',
      href: '',
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
  },
};
</script>

<style scoped>
.navbar__input-button {
  position: absolute;
  right: 8px;
  top: 10px;
}
.navbar {
  min-height: 80px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 24px;
  justify-content: space-between;
}

.navbar__wrapper {
  display: flex;
  align-items: center;
}

.navbar__container {
  display: flex;
  align-items: center;
}

.navbar__input {
  margin-right: 16px;
  width: 300px;
}

.navbar__title {
  font-size: 32px;
  margin: 0;
  color: black;
}

.navbar__button {
  margin-right: 16px;
}

.navbar__save {
  display: flex;
  margin-right: 16px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .navbar__input {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .navbar__title {
    font-size: 20px;
  }
  .navbar__input {
    width: 200px;
  }
}

@media (max-width: 500px) {
  .navbar {
    display: none;
  }
}
</style>

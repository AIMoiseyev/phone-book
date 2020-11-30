<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <Button
        class="navbar__button"
        :image-modifier="'menu'"
        @click="$emit('sideBarHandler')"
      />
      <h1
        v-if="$route.path === '/'"
        class="navbar__title"
      >
        Список контактов
      </h1>
      <h1
        v-else-if="$route.path === '/add'"
        class="navbar__title"
      >
        Новый контакт
      </h1>
      <h1
        v-else-if="$route.path.includes('/edit')"
        class="navbar__title"
      >
        Редактировать контакт
      </h1>
    </div>
    <div
      class="navbar__container"
    >
      <Input
        v-if="$route.path === '/'"
        class="navbar__input"
        :placeholder="'Поиск контакта'"
        :id="'search'"
        v-model="innerValue"
      />
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
import Input from '@/components/Input.vue';

export default {
  name: 'NavBar',
  components: {
    Button,
    Input,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
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
  },
};
</script>

<style scoped>
.navbar {
  min-height: 80px;
  background-color: saddlebrown;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 24px;
  justify-content: space-between;
  //position: fixed;
  //left: 0;
  //top: 0;
  //right: 0;
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
</style>

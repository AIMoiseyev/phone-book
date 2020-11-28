<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <Button
        class="navbar__button"
        :image-modifier="'menu'"
        @click="$emit('sideBarHandler')"
      />
      <h1 class="navbar__title">
        Список контактов
      </h1>
    </div>
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
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'NavBar',
  components: {
    Button,
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
}

.navbar__title {
  font-size: 32px;
  margin: 0;
}

.navbar__button {
  margin-right: 16px;
}
</style>

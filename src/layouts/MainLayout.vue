<template>
  <div class="app__wrapper">
    <header class="header">
      <NavBar
        @sideBarHandler="$emit('sideBarHandler')"
        v-model="innerValue"
      />
      <MobileNavBar
        @openContactList="$emit('openContactList')"
        v-model="innerValue"
      />
    </header>
    <main class="page">
      <div
        class="page__wrapper"
      >
        <slot name="sideBar" />
        <slot name="main" />
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MobileNavBar from '@/components/MobileNavBar.vue';

export default {
  name: 'MainLayout',
  components: {
    NavBar,
    MobileNavBar,
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
};

</script>

<style scoped>
.header {
  z-index: 100;
}

.app__wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 1600px;
  margin: 0 auto;
}

.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

.page__wrapper {
    flex-grow: 1;
    display: flex;
    position: relative;
}
</style>

<template>
  <div class="app__wrapper">
    <header class="header">
      <NavBar
        @sideBarHandler="$emit('sideBarHandler')"
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

export default {
  name: 'MainLayout',
  components: {
    NavBar,
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
}

.page {
  display: flex;
  flex-direction: column;
  transition: filter 0.5s ease;
  //margin-top: 80px;
  //height: calc(100% - 80px);
  height: 100%;
  overflow: auto;
}

.page__wrapper {
    flex-grow: 1;
    //overflow: hidden;
    display: flex;
    position: relative;
}
</style>

<template>
  <div class="select">
    <p
      class="select__title"
      v-click-outside="hideSelect"
      @click="isVisible = !isVisible"
    >
      {{ selected }}
    </p>
    <div
      v-if="isVisible"
      class="select__options"
    >
      <p
        v-for="option in options"
        :key="option.text"
        class="select__value"
        @click="selectOption(option, selected)"
      >
        {{ option.text }}
      </p>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Select',
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: String,
      default: '',
    },
  },
  directives: {
    ClickOutside,
  },
  methods: {
    selectOption(option, selected) {
      this.$emit('select', option, selected);
      this.isVisible = false;
    },
    hideSelect() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.select {
  position: relative;
  width: 200px;
  margin: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.select__title {
  border: 1px solid black;
  border-radius: 4px;
  margin: 0;
  padding: 4px;
}

.select__options {
  position: absolute;
  width: 100%;
  top: 40px;
  left: 0;
  border: 1px solid black;
  background-color: white;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 7px 0 rgba(179, 179, 179, 1);
  z-index: 1;
}

.select__value {
  margin: 0;
  background-color: white;
  text-align: left;
  padding: 8px;
  transition: all .3s ease-in-out;
}

.select__value:hover {
  background-color: rgba(173, 216, 230, .2);
}
</style>

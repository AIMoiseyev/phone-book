<template>
  <div class="input">
    <label
      v-if="label"
      :for="id"
      class="input__label"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="innerValue"
      :type="type"
      :class="modifier"
      class="input__field"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    <slot name="validationMessage" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    validationMessage: {
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
        return this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>
.input {
  position: relative;
  display: flex;
  flex-direction: column;
  //margin-bottom: 24px;
  align-items: flex-start;
}

.input__label {
  display: inline-block;
  color: $color-icon;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 8px;
}

.input__field {
  padding: 11px 14px;
  width: 100%;
  border: 1px solid grey;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
}

.input__field::placeholder {
  font-size: 12px;
  opacity: .4;
}

.input__field:focus {
  outline: none;
  border-color: $color-icon;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
</style>

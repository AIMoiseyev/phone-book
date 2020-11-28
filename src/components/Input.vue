<template>
  <div class="input">
    <label
      :for="id"
      class="input__label"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="innerValue"
      :type="'date'"
      :class="modifier"
      class="input__field"
      :placeholder="placeholder"
      :disabled="disabled"
    >
  </div>
</template>

<script>
export default {
  name: 'Input',
};
</script>

<style scoped>

</style>

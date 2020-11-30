<template>
  <button
    class="button"
    :class="{'button__icon': imageModifier, 'button__text': text}"
    @click="$emit('click')"
    :type="type"
  >
    <span
      v-if="text"
    >{{ text }}</span>
    <div
      v-if="imageModifier"
      class="button__image"
      :class="imageModifier"
    />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    imageModifier: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style scoped>
.button {
  border: 1px solid darkgreen;
  background-color: darkgreen;
  color: white;
  fill: red;
  text-transform: uppercase;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 26px;
  cursor: pointer;
  font-weight: 500;
  height: max-content;
}

.button:active, button:focus {
  outline: none;
}

.button__text {
  opacity: 1;
  transition: opacity .3s ease-in-out;
}

.button__text:hover {
  opacity: .7;
}

.button__icon {
  padding: 0;
  background-color: transparent;
  border: none;
  transition: transform .3s ease-in-out;
}

.button__icon:hover {
  transform: scale(1.2);
}

.pencil {
  width: 20px;
  height: 20px;
  background-image: url(./../assets/images/pencil.png);
  background-size: cover;
}

.close {
  background-image: url(./../assets/images/close-image.png);
  background-size: cover;
  width: 20px;
  height: 20px;
}

.menu {
  background-image: url(./../assets/images/menu.png);
  background-size: cover;
  width: 40px;
  height: 40px;
}

.add-contact {
  background-image: url(./../assets/images/add-contact.png);
  background-size: cover;
  width: 40px;
  height: 40px;
}

.back {
  background-image: url(./../assets/images/back.png);
  background-size: cover;
  width: 40px;
  height: 40px;
}
</style>

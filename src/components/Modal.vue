<template>
  <transition
    name="modal"
    enter-class="modal--enter"
    leave-to-class="modal--leaveTo"
  >
    <div
      class="modal"
      @keyup="$emit('close')"
    >
      <div
        class="modal__overlay"
        @click="$emit('close')"
      />
      <div class="modal__container">
        <Button
          class="modal__close"
          :image-modifier="'close'"
          @click="$emit('close')"
        />
        <div
          v-if="title"
          class="modal__header"
        >
          <h2 class="modal__title">
            {{ title }}
          </h2>
        </div>
        <div class="modal__body">
          <slot />
        </div>
        <div class="modal__footer">
          <div class="modal__buttons">
            <Button
              class="modal__button"
              :text="cancelButtonText"
              @click="$emit('onCancel')"
            />
            <Button
              :text="acceptButtonText"
              @click="$emit('onAccept')"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Modal',
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    cancelButtonText: {
      type: String,
      default: '',
    },
    acceptButtonText: {
      type: String,
      default: '',
    },
  },
  beforeMount() {
    window.addEventListener('keyup', this.onEscapeKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEscapeKeyUp);
  },
  methods: {
    onEscapeKeyUp(event) {
      if (event.key === 'Escape') {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .35s ease;
}

.modal--enter, .modal--leaveTo .modal__container {
  opacity: 0;
  transform: scale(1.1) translateY(-50%);
}

.modal--enter, .modal--leaveTo .modal__overlay {
  opacity: 0;
}

.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  transition: opacity .35s ease;
  z-index: 101;
}

.modal__close {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 103;
  cursor: pointer;
  border: none;
  background: transparent;
}

.modal__container {
  width: 620px;
  position: absolute;
  z-index: 102;
  background-color: white;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 4px 34px rgba(0, 0, 0, 0.25);
  max-height: 60%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all .15s ease;
}

.modal__header {
  padding: 32px 40px;
  border-bottom: 1px solid grey;
}

.modal__title {
  font-size: 24px;
  line-height: 22px;
  margin: 0;
}

.modal__body {
  padding: 24px 40px;
  overflow: auto;
  background: linear-gradient(white 15px, hsla(0, 0%, 100%, 0)) 0 0 / 100% 50px,
  radial-gradient(at top, grey, transparent 70%) 0 0 / 100% 18px,
  linear-gradient(to top, white 15px, hsla(0, 0%, 100%, 0)) bottom / 100% 50px,
  radial-gradient(at bottom, grey, transparent 70%) bottom / 100% 18px;
  background-repeat: no-repeat;
  background-attachment: local, scroll, local, scroll;
}

.modal__header {
  padding: 32px 40px;
  border-bottom: 1px solid grey;
  z-index: 2;

}

.modal__footer {
  border-top: 1px solid grey;
  padding: 24px 40px;
}

.modal__buttons {
  display: flex;
  justify-content: flex-end;
}

.modal__button {
  margin-right: 8px;
}
</style>

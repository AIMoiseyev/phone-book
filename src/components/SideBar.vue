<template>
  <div class="side-bar">
    <ContactsListView
      :data="data"
      @click="openContact"
    />
    <Modal
      v-if="isShowModal && cardExists"
      title="Контакт"
      @close="closeModal"
      @onAccept="closeModal"
      accept-button-text="ОК"
    >
      <slot>
        <PhoneCard
          :contact="contact"
          @onDelete="onDelete"
          @onEdit="onEdit"
        />
      </slot>
    </Modal>
  </div>
</template>

<script>
import ContactsListView from '@/components/ContactsListView.vue';
import Modal from '@/components/Modal.vue';
import PhoneCard from '@/components/PhoneCard.vue';

export default {
  name: 'SideBar',
  components: {
    ContactsListView,
    Modal,
    PhoneCard,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowModal: false,
      contact: {},
      cardId: '',
    };
  },
  computed: {
    cardExists() {
      if (!this.cardId) {
        return true;
      }
      const contact = this.data.find((item) => item.id === this.cardId);
      return !!contact;
    },
  },
  methods: {
    openContact(id) {
      this.contact = this.data.find((item) => item.id === id);
      this.cardId = id;
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    onEdit(id) {
      this.$router.push({ name: 'EditContactPage', params: { id } });
    },
    onDelete(id) {
      this.$emit('onDelete', id);
      this.cardId = id;
    },
  },
};
</script>

<style scoped>
.side-bar {
  width: 400px;
  height: calc(100vh - 80px);
  overflow: auto;
  background-color: white;
  box-shadow: 0 0 7px 0 rgba(179, 179, 179, 1);
}

@media (max-width: 585px) {
  .side-bar {
    width: 100vw;
    position: absolute;
    z-index: 99;
  }
}
</style>

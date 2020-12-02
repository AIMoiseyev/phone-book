<template>
  <div class="card">
    <div class="card__content">
      <div class="card__avatar">
        <p class="card__abbreviation">
          {{ contact.initials }}
        </p>
      </div>
      <div>
        <p class="card__contact">
          {{ fullName }}
        </p>
        <span>телефон:&nbsp;<span class="card__span">{{ contact.phone }}</span></span>
      </div>
      <div class="card__buttons">
        <Button
          class="card__button"
          :image-modifier="'pencil'"
          @click="$emit('onEdit', contact.id)"
        />
        <Button
          class="card__button"
          :image-modifier="'close'"
          @click="$emit('onDelete', contact.id)"
        />
      </div>
    </div>
    <div class="card__footer">
      <p class="card__date">
        создан:&nbsp;<span>{{ dateOfCreate }}</span>
      </p>
      <p class="card__date">
        изменен:&nbsp;<span>{{ dateOfUpdate }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import dateToLocalString from '@/utils/date-to-local-string';
import Button from '@/components/Button.vue';

export default {
  name: 'PhoneCard',
  components: {
    Button,
  },
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.contact.firstName} ${this.contact.middleName} ${this.contact.lastName}`;
    },
    dateOfCreate() {
      return dateToLocalString(this.contact.created);
    },
    dateOfUpdate() {
      return dateToLocalString(this.contact.updated);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 7px 0 rgba(179, 179, 179, 1);
  flex-direction: column;
  min-height: 100px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 8px;
}

.card__content {
  display: flex;
  justify-content: space-between;
  margin: 0 0 8px;
}

.card__avatar {
  border: 1px solid #ccc;
  background-color: lightblue;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__abbreviation {
  margin: 0;
}

.card__contact {
  margin: 0 0 8px;
}

.card__footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card__date {
  margin: 0;
  font-size: 12px;
  line-height: 1.15;
  color: #2c3e50;
}

.card__buttons {
  display: flex;
}

.card__button {
  margin-right: 8px;
}

.card__button:last-of-type {
  margin-right: 0;
}

@media (max-width: 414px) {
  .card__span {
    display: block;
  }
}
</style>

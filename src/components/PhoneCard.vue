<template>
  <div class="card">
    <div class="card__content">
      <div class="card__avatar">
        <p class="card__abbreviation">
          AM
        </p>
      </div>
      <div>
        <p class="card__contact">
          Александр Игоревич Моисеев
        </p>
        <span>телефон:&nbsp;<span>{{ phone }}</span></span>
      </div>
      <div class="card__buttons">
        <Button
          class="card__button"
          :image-modifier="'pencil'"
          @click="$emit('onEdit')"
        />
        <Button
          class="card__button"
          :image-modifier="'close'"
          @click="$emit('onDelete')"
        />
      </div>
    </div>
    <div class="card__footer">
      <p class="card__date">
        создан:&nbsp;<span>11.09.2002</span>
      </p>
      <p class="card__date">
        изменен:&nbsp;<span>13.10.2002</span>
      </p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'PhoneCard',
  components: {
    Button,
  },
  props: {
    phone: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  //justify-content: space-between;
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
</style>

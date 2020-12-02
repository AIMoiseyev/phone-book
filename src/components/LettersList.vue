<template>
  <div
    class="letter-list"
  >
    <nav
      class="letter-list__alphabeticalList"
    >
      <p
        v-for="item in data"
        :key="item.letter"
        class="letter-list__alphabeticalItem"
        @click="$emit('click', item.letter)"
      >
        {{ item.letter }}
      </p>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LettersList',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.letter-list {
  padding: 16px;
  box-shadow: 0 0 7px 0 rgba(179, 179, 179, 1);
}

.letter-list__alphabeticalList {
  display: flex;
  flex-wrap: wrap;
}

.letter-list__alphabeticalItem {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 9px 0 0;
  color: black;
  font-weight: bold;
  cursor: pointer;
}

.letter-list__alphabeticalItem:hover {
  text-decoration: underline;
}

.letter-list__alphabeticalItem:focus {
  text-decoration: underline;
}

.letter-list__alphabeticalItem:visited {
  color: red;
}

@media (max-width: 585px) {
  .letter-list {
    display: flex;
    justify-content: center;
  }
}
</style>

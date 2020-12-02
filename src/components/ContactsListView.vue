<template>
  <div
    v-if="alphabetList.length"
  >
    <div>
      <LettersList
        :data="alphabetList"
        @click="scrollToLetter"
        class="letter-container"
      />
      <nav
        class="alphabeticalList"
      >
        <div
          v-for="item in alphabetList"
          :id="item.letter"
          :key="item.letter"
          :ref="item.letter"
          class="alphabeticalList__item"
        >
          <span class="alphabeticalList__letter">{{ item.letter }} </span>
          <ul class="alphabeticalList__list">
            <li
              v-for="listItem in item.list"
              :key="listItem.id"
              class="alphabeticalList__listItem"
            >
              <p
                class="alphabeticalList__listLink"
                @click="$emit('click',listItem.id)"
              >
                {{ `${listItem.lastName} ${listItem.firstName} ${listItem.middleName}` }}
              </p>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  <div v-else>
    Нет контактов
  </div>
</template>

<script>
import LettersList from '@/components/LettersList.vue';

export default {
  name: 'ContactsListView',
  components: {
    LettersList,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    alphabetList() {
      if (!this.data) {
        return null;
      }
      const data = this.data.reduce((prevVal, item) => {
        const object = prevVal;
        const letter = item.lastName[0].toUpperCase();
        if (!object[letter]) {
          object[letter] = [];
          object[letter].push(item);
        } else {
          object[letter].push(item);
        }
        return object;
      }, {});

      const result = [];
      Object.keys(data).forEach((item) => {
        result.push({ letter: item, list: data[item] });
      });
      return result;
    },
  },
  methods: {
    scrollToLetter(letter) {
      if (Object.keys(this.$refs).length === 0) {
        return;
      }
      const slide = this.$refs[letter][0];
      slide.scrollIntoView({ behavior: 'smooth' });
    },
  },
};

</script>

<style scoped>
.letter-container {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
}
.alphabeticalList {
  margin-top: 16px;
  padding: 12px;
}
.alphabeticalList__item {
  display: flex;
  box-sizing: border-box;
  padding: 8px;
}

.alphabeticalList__letter {
  flex-shrink: 0;
  font-weight: bold;
  font-size: 20px;
  line-height: 16px;
  margin-right: 8px;
  color: black;
  width: 20px;
}

.alphabeticalList__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.alphabeticalList__listItem {
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
}

.alphabeticalList__listLink {
  color: black;
  margin: 0;
  transition: all .3s ease-in-out;
}

.alphabeticalList__listLink:hover {
  color: dodgerblue;
}

@media (max-width: 585px) {
  .alphabeticalList {
    margin: 16px auto 0;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
}
</style>

<template>
  <layout
    @sideBarHandler="sideBarHandler"
  >
    <template v-slot:sideBar>
      <transition name="slide">
        <SideBar
          v-if="open"
          class="ppp"
        />
      </transition>
    </template>
    <template v-slot:main>
      <div class="card__container">
        <transition-group
          name="list-complete"
        >
          <PhoneCard
            v-for="(item, index) in cards"
            :key="item"
            :phone="item"
            @onDelete="onDelete(index)"
            @onEdit="onEdit(index)"
            class="list-complete-item"
          />
        </transition-group>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from '@/layouts/MainLayout.vue';
import PhoneCard from '@/components/PhoneCard.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'PhoneBookPage',
  components: {
    Layout,
    PhoneCard,
    SideBar,
  },
  data() {
    return {
      open: false,
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  methods: {
    sideBarHandler() {
      this.open = !this.open;
    },
    onDelete(item) {
      console.log(this.cards);
      this.cards.splice(item, 1);
    },
    onEdit(index) {
      console.log(index);
      console.log(this.cards);
      this.cards.sort(() => Math.random() - 0.5);
    },
  },
};
</script>
<style scoped>
.ppp{
  stop-color: darkgreen;
}
.card__container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 50vw;
  margin: 20px auto;
}

.slide-enter-active {
  transition: all .3s linear;
}
.slide-leave-active {
  transition: all .3s linear;
}
.slide-enter, .slide-leave-to {
  width: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  margin-bottom: 8px;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>

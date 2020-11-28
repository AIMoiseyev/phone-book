<template>
  <Layout>
    <template v-slot:main>
      <form
        class="form"
        @submit.prevent="submitHandler"
      >
        <Input />
      </form>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/layouts/MainLayout.vue';
import Input from '@/components/Input.vue';

export default {
  name: 'AddContactPage',
  components: {
    Layout,
    Input,
  },
  methods: {
    submitHandler() {
      console.log('submit');
    },
  },
};
</script>

<style scoped>

</style>

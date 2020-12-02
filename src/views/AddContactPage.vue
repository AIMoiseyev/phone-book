<template>
  <Layout>
    <template v-slot:main>
      <div class="form__container">
        <form
          class="form"
          @submit.prevent="submitHandler"
        >
          <div class="form__input-container">
            <FormInput
              v-for="(item, key) in cards"
              :key="key"
              v-model="item.value"
              :id="key"
              :label="item.title"
              class="form__input"
            >
              <template v-slot:validationMessage>
                <span
                  v-if="key !== 'phone' && !$v.cards[key].value.required
                    && $v.cards[key].value.$dirty"
                  class="form__input-error-text"
                >поле не может быть пустым</span>
                <span
                  v-else-if="(key !== 'phone' && $v.cards[key].value.$dirty
                    && !$v.cards[key].value.minLength)
                    || (key !== 'phone' && $v.cards[key].value.$dirty
                      && !$v.cards[key].value.maxLength)"
                  class="form__input-error-text"
                >{{ `${item.title} должно быть от 2 до 30 символов` }}</span>
                <span
                  v-else-if="(key === 'phone' && $v.cards[key].value.$dirty
                    && !$v.cards[key].value.checkPhoneNumber)"
                  class="form__input-error-text"
                >
                  введите корректный номер телефона</span>
              </template>
            </FormInput>
          </div>
          <div class="form__buttons">
            <Button
              :text="'Отменить'"
              class="form__button"
              @click="goToMain"
            />
            <Button
              :text="'Сохранить'"
              class="form__button"
              :type="'submit'"
            />
          </div>
        </form>
      </div>
    </template>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import { VALIDATION_FIELDS, CONTACTS_MODEL } from '@/config/config';
import Layout from '@/layouts/MainLayout.vue';
import FormInput from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import checkPhoneNumber from '@/utils/check-phone-number';

function generateId() {
  return `f${(Math.floor(Math.random() * 1e8)).toString(16)}`;
}

export default {
  name: 'AddContactPage',
  components: {
    Layout,
    FormInput,
    Button,
  },
  data() {
    return {
      cards: JSON.parse(JSON.stringify(VALIDATION_FIELDS)),
      model: JSON.parse(JSON.stringify(CONTACTS_MODEL)),
    };
  },
  validations: {
    cards: {
      firstName: {
        value: { required, minLength: minLength(2), maxLength: maxLength(30) },
      },
      middleName: {
        value: { required, minLength: minLength(2), maxLength: maxLength(30) },
      },
      lastName: {
        value: { required, minLength: minLength(2), maxLength: maxLength(30) },
      },
      phone: {
        value: { required, checkPhoneNumber },
      },
    },
  },
  computed: {
    ...mapState('contacts', {
      contacts: (s) => s.contacts,
    }),
  },
  created() {
    this.$store.dispatch('contacts/getContacts');
  },
  methods: {
    goToMain() {
      this.$router.push({ name: 'contacts' });
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        firstName: this.cards.firstName.value,
        middleName: this.cards.middleName.value,
        lastName: this.cards.lastName.value,
        phone: this.cards.phone.value,
        id: generateId(),
        created: new Date(),
        updated: new Date(),
      };
      const contacts = JSON.parse(JSON.stringify(this.contacts)) || this.model;
      contacts.contacts.push(formData);
      this.$store.dispatch('contacts/setContacts', contacts);
      this.$router.push({ name: 'contacts' });
    },
  },
};
</script>

<style scoped>
.form__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 600px;
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid black;
  min-height: 430px;
  box-shadow: 0 0 7px 0 rgba(179, 179, 179, 1);
}
.form__input-container {
  width: 100%;
}

.form__input {
  margin-bottom: 24px;
}

.form__buttons {
  align-self: flex-end;
}
.form__button {
  margin-right: 8px;
}
.form__button:last-of-type {
  margin-right: 0;
}

.form__input-error-text {
  /*//margin-top: 8px;*/
  font-size: 12px;
  color: red;
  position: absolute;
  left: 0;
  top: 65px;
}

@media (max-width: 585px) {
  .form {
    width: 100%;
    margin: 0 16px;
  }
  .form__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .form__button {
    margin-right: 0;
    margin-bottom: 8px;
  }
  .form__button:last-of-type {
    margin-bottom: 0;
  }
}
</style>

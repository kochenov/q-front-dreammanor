<template>
  <div class="row">
    <div class="col">
      <FlashMessage :errorMessage="authStore.error" />
      <q-form
        @submit.prevent="loginSubmit({ email, password })"
        class="q-my-sm q-gutter-xs"
      >
        <q-input
          filled
          dense
          v-model="email"
          type="text"
          label="Email *"
          hint="Адрес электронной почты"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Пожалуйста введите Email',
            (val) =>
              val.match(
                /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) || 'Введите правильный Email',
          ]"
        />

        <q-input
          filled
          type="password"
          dense
          v-model="password"
          label="Пароль *"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || 'Введите пароль']"
        />

        <!-- <q-toggle dense v-model="accept" label="С правилами портала согласен" /> -->

        <div class="flex flex-center q-gutter-md">
          <q-btn
            label="Войти"
            type="submit"
            icon-right="login"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../../../stores/authStore";
import FlashMessage from "../../helpers/FlashMessage.vue";

const authStore = useAuth();

const email = ref(null);
const password = ref(null);
const accept = ref(false);
const authError = ref();

const emit = defineEmits(["closeModal"]);

const loginSubmit = async (payload) => {
  await authStore.login(payload);
  authStore.error === null ? emit("closeModal") : null;
};
</script>

<style lang="scss" scoped></style>

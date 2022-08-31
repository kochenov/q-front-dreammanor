<template>
  <FlashMessage :errorMessage="authError" />

  <q-form @submit.prevent="registration()" class="q-my-sm q-gutter-xs">
    <q-input
      filled
      dense
      v-model="name"
      type="text"
      label="Имя пользователя *"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Пожалуйста введите Ваше имя',
      ]"
    />
    <q-input
      filled
      dense
      v-model="email"
      type="text"
      label="Email *"
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
      hint="Минимальная длина пароля 8 символов"
      lazy-rules
      :rules="[
        (val) => (val !== null && val !== '') || 'Введите пароль',
        (val) =>
          val.length >= 8 || 'Введите пароль содержащий не мение 8 символов',
      ]"
    />

    <q-input
      filled
      type="password"
      dense
      v-model="passwordConfirm"
      label="Пароль *"
      lazy-rules
      :rules="[
        (val) => (val !== null && val !== '') || 'Введите пароль ещё раз',
        (val) => val == password || 'Пароли не совпадают',
      ]"
    />

    <!-- <q-toggle dense v-model="accept" label="С правилами портала согласен" /> -->

    <div class="flex flex-center q-gutter-md">
      <q-btn
        label="Регистрация"
        type="submit"
        icon-right="login"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup>
import FlashMessage from "src/components/helpers/FlashMessage.vue";
import { ref } from "vue";
import { getError } from "src/utils/helpers";
import AuthService from "src/services/AuthService";
import { useAuth } from "src/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuth();
const name = ref(null);
const email = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);

const authError = ref(null);

const emit = defineEmits(["closeModal"]);

const registration = async () => {
  authError.value = null;
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirm.value,
  };
  try {
    await AuthService.registerUser(payload);
    await authStore.getAuthUser();
    emit("closeModal");
    router.push("/profile");
  } catch (error) {
    authError.value = getError(error);
  }
};
</script>

<style lang="scss" scoped></style>

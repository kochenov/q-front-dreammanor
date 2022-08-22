<template>
  <q-layout view="lhr lpR lfr">
    <q-ajax-bar position="top" color="red" size="4px" />
    <q-header class="color-bg text-white" height-hint="69">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="text-primary"
          @click="toggleLeftDrawer"
        />

        <TopMenu
          @subMenu="
            (e) => {
              tab = e;
            }
          "
        />

        <q-space />
        <q-fab
          class="btn-security"
          v-if="!authStore.loggedIn"
          v-model="authButton"
          label="Авторизация"
          label-position="left"
          external-label
          flat
          outline
          color="primary"
          icon="https"
          direction="down"
          padding="xs"
        >
          <q-fab-action
            padding="5px"
            external-label
            label-position="left"
            color="secondary"
            @click="openDialogAuth('login')"
            icon="login"
            label="Вход"
          />
          <q-fab-action
            padding="5px"
            external-label
            label-position="left"
            color="orange"
            @click="openDialogAuth('registration')"
            icon="person_add"
            label="Регистрация"
          />
          <q-fab-action
            padding="5px"
            external-label
            label-position="left"
            color="primary"
            @click="openDialogAuth('reset')"
            icon="vpn_key_off"
            label="Восстановление пароля"
          />
        </q-fab>
        <q-btn
          v-if="authStore.loggedIn"
          dense
          flat
          round
          icon="perm_identity"
          class="text-primary q-ml-auto"
          @click="toggleRightDrawer"
        />
      </q-toolbar>

      <SubMenu :tabName="tab" />
      <HeaderPromo />
      <BreadcrumbsHeader v-if="$route.name != 'home'" />
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- Левый сайдбар-->
      <LeftPart />
      <!-- /Левый сайдбар -->
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      :width="320"
      side="right"
      overlay
      elevated
    >
      <!-- Правый сайдбар -->
      <div class="flex q-pa-xs">
        <q-space />
        <q-btn
          dense
          flat
          round
          size="md"
          xs
          icon="close"
          @click="rightDrawerOpen = false"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </div>
      <RightPart />
      <!-- /Правый сайдбар -->
    </q-drawer>

    <q-page-container>
      <!-- страница -->
      <router-view />
      <!-- /страница -->
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <!-- Содержимое подвала -->
      <FooterPart />
      <!--/ Содержимое подвала -->
    </q-footer>
    <q-dialog v-model="authDialog" persistent>
      <q-card style="min-width: 300px; width: 600px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-xs">
          <div class="text-h6">{{ authDialogTitle }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <component
            @isLogin="authDialog = false"
            @isRegister="authDialog = false"
            :is="authFormActive"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { markRaw, ref } from "vue";
import TopMenu from "../components/navs/menu/TopMenu.vue";
import SubMenu from "../components/navs/menu/SubMenu.vue";
import BreadcrumbsHeader from "../components/navs/BreadcrumbsHeader.vue";
import LeftPart from "../components/parts/LeftPart.vue";
import FooterPart from "../components/parts/FooterPart.vue";
import RightPart from "../components/parts/RightPart.vue";
import HeaderPromo from "../components/promo/HeaderPromo.vue";
import { useAuth } from "../stores/authStore";
import LoginForm from "../components/forms/auth/LoginForm.vue";
import RegistrationForm from "../components/forms/auth/RegistrationForm.vue";

const authStore = useAuth();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const tab = ref("home");

const authButton = ref(false);
const authDialog = ref(false);
const authDialogTitle = ref(null);
const authFormActive = ref(null);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const openDialogAuth = (form) => {
  authDialog.value = false;
  if (form === "login") {
    authFormActive.value = markRaw(LoginForm);
    authDialogTitle.value = "Авторизация";
  } else if (form === "registration") {
    authFormActive.value = markRaw(RegistrationForm);
    authDialogTitle.value = "Регистрация";
    console.log("registration");
  } else if (form === "reset") {
    authFormActive.value = LoginForm;
    authDialogTitle.value = "Восстановление пароля";
    console.log("reset");
  } else {
    return;
  }
  authDialog.value = true;
};
</script>
<style lang="scss">
.btn-security {
  .q-fab__icon {
    font-size: 20px !important;
  }
}
</style>

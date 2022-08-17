<template>
  <q-layout view="lhr lpR lfr">
    <q-ajax-bar
      ref="bar"
      position="top"
      color="accent"
      size="2px"
      skip-hijack
    />

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
        <q-btn
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

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- Правый сайдбар -->
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
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import TopMenu from "../components/navs/menu/TopMenu.vue";
import SubMenu from "../components/navs/menu/SubMenu.vue";
import BreadcrumbsHeader from "../components/navs/BreadcrumbsHeader.vue";
import LeftPart from "src/components/parts/LeftPart.vue";
import FooterPart from "../components/parts/FooterPart.vue";
import RightPart from "../components/parts/RightPart.vue";
import HeaderPromo from "../components/promo/HeaderPromo.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const tab = ref("home");

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

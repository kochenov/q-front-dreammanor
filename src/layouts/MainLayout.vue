<template>
  <q-layout view="lHr lpR lfr">
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
          :menuItems="menuItems"
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

      <SubMenu :tabName="tab" :currentMenu="currentMenu" />
      <HeaderPromo />
      <BreadcrumbsHeader />
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

const menuItems = [
  {
    id: 1,
    name: "home",
    icon: "home",
    label: null,
  },
  {
    id: 2,
    name: "news",
    icon: "newspaper",
    label: "Новости",
  },
  {
    id: 3,
    name: "about",
    icon: "business",
    label: "О нас",
  },
  {
    id: 4,
    name: "adb",
    icon: "real_estate_agent",
    label: "Объявления",
  },
  {
    id: 5,
    name: "blogs",
    icon: "rss_feed",
    label: "Блоги",
  },
  {
    id: 6,
    name: "articles",
    icon: "feed",
    label: "Статьи",
  },
  {
    id: 7,
    name: "calculate",
    icon: "calculate",
    label: "Расчёты",
  },
  {
    id: 8,
    name: "calendars",
    icon: "calendar_month",
    label: "Календари",
  },
];
const currentMenu = {
  home: [
    {
      id: 1,
      name: "home",
      label: "Главная",
    },
    {
      id: 2,
      name: "topBlogers",
      label: "Топ блогеров",
    },
    {
      id: 3,
      name: "topVideo",
      label: "Топ видео",
    },
    {
      id: 4,
      name: "reitingGroup",
      label: "Рейтинг сообществ",
    },
  ],
  news: [
    {
      id: 1,
      name: "actionsFeed",
      label: "События",
    },
    {
      id: 2,
      name: "news",
      label: "Новости портала",
    },
    {
      id: 3,
      name: "newUsers",
      label: "Новые пользователи",
    },
    {
      id: 4,
      name: "records",
      label: "Рекорды портала",
    },
  ],
  about: [
    {
      id: 1,
      name: "about",
      label: "О сайте",
    },
    {
      id: 2,
      name: "contacts",
      label: "Контакты",
    },
    {
      id: 3,
      name: "forPartners",
      label: "Партнёрам",
    },
    {
      id: 4,
      name: "forAuthors",
      label: "Партнёрам",
    },
    {
      id: 5,
      name: "forEditors",
      label: "Стать автором",
    },
    {
      id: 6,
      name: "feedback",
      label: "Обратная связь",
    },
    {
      id: 7,
      name: "rules",
      label: "Правила",
    },
  ],
  adb: [
    {
      id: 1,
      name: "realEstate",
      label: "Недвижимость",
    },
    {
      id: 2,
      name: "products",
      label: "Продукция",
    },
    {
      id: 3,
      name: "animals",
      label: "Животные",
    },
    {
      id: 4,
      name: "addAds",
      label: "Добавить объявление",
    },
  ],
  blogs: [
    {
      id: 1,
      name: "allPosts",
      label: "Все записи",
    },
    {
      id: 2,
      name: "listBlogs",
      label: "Список блогов",
    },
    {
      id: 3,
      name: "blogers",
      label: "Блогеры",
    },
    {
      id: 4,
      name: "addBlog",
      label: "Создать блог",
    },
  ],
  articles: [
    {
      id: 1,
      name: "useful",
      label: "Полезное",
    },
    {
      id: 2,
      name: "vegetableGarden",
      label: "Огород и сад",
    },
    {
      id: 3,
      name: "animalHusbandry",
      label: "Животноводство",
    },
    {
      id: 4,
      name: "addArticle",
      label: "Добавить статью",
    },
  ],
  calculate: [
    {
      id: 1,
      name: "seeding",
      label: "Расчёты посева",
    },
    {
      id: 2,
      name: "feedCalculation",
      label: "Расчёт корма",
    },
    {
      id: 3,
      name: "weightControl",
      label: "Контроль веса",
    },
    {
      id: 4,
      name: "businesPlans",
      label: "Бизнес планы",
    },
    {
      id: 5,
      name: "userCalculations",
      label: "Расчёты пользователей",
    },
  ],
  calendars: [
    {
      id: 1,
      name: "taskList",
      label: "Список задач",
    },
    {
      id: 2,
      name: "recommendations",
      label: "Рекомендации",
    },
    {
      id: 3,
      name: "userTasks",
      label: "Задачи пользователей",
    },
    {
      id: 4,
      name: "addTask",
      label: "Добавить задачу",
    },
  ],
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-page padding>
    <div class="flex items-center">
      <h1>{{ title }}</h1>
      <q-space />
      <div class="q-gutter-sm">
        <q-btn
          to="/calculate/seeding"
          color="secondary"
          :outline="$route.params.id === '' ? false : true"
          unelevated
          size="10px"
          label="Расчёт"
          square
        />
        <q-btn
          to="/calculate/seeding/history"
          color="secondary"
          :outline="$route.params.id === 'history' ? false : true"
          unelevated
          size="10px"
          label="История"
          square
        />
        <q-btn
          to="/calculate/seeding/my-plan"
          color="secondary"
          unelevated
          :outline="$route.params.id === 'my-plan' ? false : true"
          size="10px"
          label="Мои посадки"
          square
        />
      </div>
    </div>
    <q-separator class="q-mt-xs q-mb-lg" />
    <!-- content -->
    <component :is="currentPage" />
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMeta } from "quasar";
import FormSeeding from "../components/forms/seeding/FormSeeding.vue";
import HistorySeeding from "../components/parts/page/seeding/HistorySeeding.vue";
import MyPlanSeeding from "../components/parts/page/seeding/MyPlanSeeding.vue";

const route = useRoute();
const router = useRouter();

const title = ref("");

const currentPage = computed(() => {
  return funcRouteCurent();
});

const funcRouteCurent = () => {
  let compTemp = "";
  switch (route.params.id) {
    case "":
      title.value = "Калькулятор расчёта размера грядок овощей";
      compTemp = FormSeeding;
      break;
    case "history":
      title.value = "История расчётов размера грядок";
      compTemp = HistorySeeding;
      break;
    case "my-plan":
      title.value = "Запланированые к возделыванию грядки овощей";
      compTemp = MyPlanSeeding;
      break;
    default:
      router.push({ name: "notFound" });
      break;
  }

  return compTemp;
};
useMeta(() => {
  return { title: title.value };
});
</script>

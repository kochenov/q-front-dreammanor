<template>
  <div class="q-pa-md row items-start q-gutter-lg">
    <q-card
      v-for="item in seedingStore.seedings"
      :key="item.id"
      class="my-card"
      bordered
    >
      <q-card-actions>
        <q-chip square>
          <q-avatar color="secondary" text-color="white">{{
            item.bushes
          }}</q-avatar>
          {{ declOfNum(item.bushes, ["куст", "куста", "кустов"]) }}
        </q-chip>
        <q-chip square>
          <q-avatar color="secondary" text-color="white">{{
            item.rows
          }}</q-avatar>
          {{ declOfNum(item.rows, ["ряд", "ряда", "рядов"]) }}
        </q-chip>
        <q-chip square>
          <q-avatar color="secondary" text-color="white">{{
            item.sort
              ? item.sort.distanceBetweenBushes
              : item.distanceBetweenBushes
          }}</q-avatar>
          Расстояние между кустов
        </q-chip>
        <q-chip square>
          <q-avatar color="secondary" text-color="white">{{
            item.sort ? item.sort.distanceBetweenRows : item.distanceBetweenRows
          }}</q-avatar>
          Расстояние между рядов
        </q-chip>
      </q-card-actions>
      <q-separator />
      <q-card-section horizontal class="my-row">
        <q-card-section class="q-pt-xs col-12 col-md-8">
          <q-chip dense square color="primary" text-color="white">
            {{ item.vegetable.name }}
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              class="bg-indigo text-body2"
              :offset="[10, 10]"
            >
              Название овоща
            </q-tooltip>
          </q-chip>
          <q-chip
            v-if="item.sort"
            dense
            outline
            square
            color="primary"
            text-color="white"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              class="bg-indigo text-body2"
              :offset="[10, 10]"
            >
              Сорт овоща
            </q-tooltip>
            {{ item.sort.name }}
          </q-chip>

          <div class="text-h5 q-my-md">{{ item.name }}</div>
        </q-card-section>

        <q-card-section class="col-12 col-md-4 flex flex-center">
          <q-space />
          <q-btn
            color="primary"
            @click="setOpenResult(item.id)"
            :icon="
              currentResultOpen === item.id ? 'arrow_drop_down' : 'arrow_right'
            "
          >
            {{
              currentResultOpen === item.id ? "Скрыть расчёт" : "Расчёт грядки"
            }}
          </q-btn>
        </q-card-section>
      </q-card-section>
      <q-slide-transition :duration="100">
        <q-card-section v-if="currentResultOpen === item.id">
          <q-separator />
          <ResultCalculateSeeding
            :fixRows="Number(item.rows)"
            :rows="Number(item.rows)"
            :bushes="Number(item.bushes)"
            :distanceBetweenBushes="
              Number(
                item.sort
                  ? item.sort.distanceBetweenBushes
                  : item.distanceBetweenBushes
              )
            "
            :distanceBetweenRows="
              Number(
                item.sort
                  ? item.sort.distanceBetweenRows
                  : item.distanceBetweenRows
              )
            "
          />
        </q-card-section>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script setup>
import { useNavigationsStore } from "stores/navigations";
import { onMounted, ref } from "vue";
import { declOfNum } from "../../../../utils/word";
import { useSeeding } from "stores/seedingStore";
import ResultCalculateSeeding from "./ResultCalculateSeeding.vue";

const seedingStore = useSeeding();
const navigations = useNavigationsStore();
const currentResultOpen = ref(null);

const setOpenResult = (id) => {
  currentResultOpen.value = id != currentResultOpen.value ? id : null;
};

navigations.addRoutes({
  meta: {
    title: "История расчётов грядок овощей",
  },
});

onMounted(async () => {
  await seedingStore.seedingList();
  console.log(seedingStore.seedings);
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
@media (max-width: $breakpoint-md-min) {
  .my-row {
    flex-direction: column;
  }
}
</style>

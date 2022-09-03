<template>
  <div class="q-pa-md row wrap items-start justify-center q-gutter-md">
    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Количество кустов</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ bushes }} <br />
          <span :style="{ fontSize: '18px' }"
            >{{ declOfNum(bushes, ["куст", "куста", "кустов"]) }}
          </span>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card col"
      :class="rows != fixRows ? 'text-white' : null"
      :style="{
        background:
          rows != fixRows
            ? 'radial-gradient(circle, rgb(254 25 25) 0%, rgb(77 19 19) 100%)'
            : null,
      }"
    >
      <q-card-section class="text-center">
        <strong>Количество рядов</strong>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="flex flex-center"
        :style="{
          fontSize: '26px',
        }"
      >
        <div class="text-center">
          {{ rows != fixRows ? fixRows : rows }}

          <br /><span :style="{ fontSize: '18px' }">{{
            declOfNum(rows, ["ряд", "ряда", "рядов"])
          }}</span>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Расстояние между кустами</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ distanceBetweenBushes }} см <br />
          <span :style="{ fontSize: '18px' }"
            >{{ distanceBetweenBushes / 100 }} м</span
          >
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Расстояние между рядами</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ distanceBetweenRows }} см <br />
          <span :style="{ fontSize: '18px' }"
            >{{ distanceBetweenRows / 100 }} м</span
          >
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Кустов в одном ряду</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ oneRowsComp }} <br />
          <span :style="{ fontSize: '18px' }"
            >{{ declOfNum(oneRowsComp, ["куст", "куста", "кустов"]) }}
          </span>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Ширина грядки</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ whidhComp }} см<br />
          <span :style="{ fontSize: '18px' }">{{ whidhComp / 100 }} м </span>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col">
      <q-card-section class="text-center">
        <strong>Длина грядки</strong>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          {{ heightComp }} см<br />
          <span :style="{ fontSize: '18px' }">{{ heightComp / 100 }} м </span>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card col flex flex-center">
      <q-card-section class="flex flex-center" :style="{ fontSize: '26px' }">
        <div class="text-center">
          <q-btn
            @click="dialogOpen = true"
            color="primary"
            size="12px"
            label="Показать схему грядки"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="dialogOpen"
    :maximized="maximizedToggle"
    style="height: 100vh"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Закрыть</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section
        style="min-height: 81vh; height: 89vh"
        class="q-py-none scroll relative-position"
      >
        <span class="fixed top"> Длина грядки </span>
        <span class="fixed left"> Ширина грядки</span>
        <SchemeSeeding
          v-if="dialogOpen"
          :rows="rows"
          :height="heightComp"
          :width="whidhComp"
          :bushes="bushes"
          :oneRows="oneRowsComp"
          :distanceBetweenRows="distanceBetweenRows"
          :distanceBetweenBushes="distanceBetweenBushes"
        />
      </q-card-section>
      <q-space />
      <q-separator />

      <q-card-actions align="center">
        <span>Схема грядки</span>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { declOfNum } from "../../../../utils/word";
import { oneRows, width, height } from "../seeding/resCalculate";
import SchemeSeeding from "../seeding/SchemeSeeding.vue";
const dialogOpen = ref(false);
const maximizedToggle = ref(true);
const props = defineProps({
  rows: {
    type: Number,
    default: null,
  },
  fixRows: {
    type: Number,
    default: null,
  },
  bushes: {
    type: Number,
    default: null,
  },
  distanceBetweenRows: {
    type: Number,
    default: null,
  },
  distanceBetweenBushes: {
    type: Number,
    default: null,
  },
});

const oneRowsComp = computed(() => {
  return oneRows(props.bushes, props.rows);
});

const whidhComp = computed(() => {
  return width(
    props.bushes,
    props.distanceBetweenRows,
    oneRows(props.bushes, props.rows)
  );
});

const heightComp = computed(() => {
  return height(oneRows(props.bushes, props.rows), props.distanceBetweenBushes);
});
</script>

<style lang="scss" scoped>
.my-card {
  //width: 100%;
  min-width: 230px;
  max-width: 100%;
  min-height: 165px;
}
.top,
.left {
  font-size: 16px;
  font-weight: 700;
  display: block;
  background-color: #ffffff;
}
.top {
  left: 0;
  right: 0;
  top: 32px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.left {
  top: 50vh;
  transform: rotate(270deg);
  left: -32px;
}
</style>

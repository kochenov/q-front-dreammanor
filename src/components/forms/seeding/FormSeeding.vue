<template>
  <q-stepper
    v-model="step"
    style="height: 100%"
    vertical
    color="primary"
    animated
    done-color="positive"
    bordered
    header-class="text-bold"
  >
    <q-step
      :name="1"
      title="Выберите овощь для расчёта размеров грядок"
      caption="При выборе открывается следующий шаг расчёта размера грядок"
      icon="settings"
      :done="step > 1"
    >
      <div class="row q-col-gutter-md q-pt-lg">
        <div class="col-xs-12 col-md-6">
          <q-select
            use-input
            input-debounce="0"
            transition-show="scale"
            transition-hide="scale"
            label="Выбирете овощь для расчёта грядки"
            @filter="filterFnVegetables"
            outlined
            v-model="currentVegetable"
            :options="vegetables"
            dense
            options-dense
            clear-icon
            behavior="dialog"
          >
            <template v-slot:before>
              <q-icon name="category" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> Не найден </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </q-step>

    <q-step
      :name="2"
      title="Расчёт размера грядки под пасадку овощей"
      caption="Это действие позволяет произвести расчёт размера грядок"
      icon="create_new_folder"
      :done="step > 2"
    >
      <q-banner inline-actions class="text-white bg-secondary q-mt-md">
        Выбран для расчёта грядок:
        <q-badge outline align="middle" color="accent" class="q-ml-sm">
          {{ currentVegetable.label }}
        </q-badge>
        <template v-slot:action>
          <q-btn flat color="white" @click="step = 1" label="Выбрать другой" />
        </template>
      </q-banner>
      <q-form @submit.prevent="calculate(3)">
        <div class="row q-col-gutter-md q-my-md">
          <div class="col-xs-12 col-md-4">
            <q-select
              use-input
              input-debounce="0"
              transition-show="scale"
              transition-hide="scale"
              label="Выбирете сорт овоща"
              @filter="filterFn"
              outlined
              v-model="currentSort"
              :options="sorts"
              dense
              options-dense
              clear-icon
              behavior="dialog"
            >
              <template v-slot:before>
                <q-icon name="category" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> Не найден </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-xs-12 col-md-4">
            <q-input
              outlined
              v-model="bushes"
              type="number"
              dense
              lazy-rules
              label="Количество кустов"
              placeholder="Введите количество кустов"
              hint="Введите положительное число от 1 до 100"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Поле обязательно для заполнения',
                (val) =>
                  (val > 0 && val < 100) ||
                  'Количество кустов должно быть от 1 до 100',
                (val) =>
                  val >= rows ||
                  'Кустов должно быть больше чем рядов (или равно им)',
              ]"
            >
              <template v-slot:before>
                <q-icon name="pin" />
              </template>
              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Введите планируемое количество рядов на грядке
              </q-tooltip>
            </q-input>
          </div>

          <div class="col-xs-12 col-md-4">
            <q-input
              outlined
              v-model="rows"
              type="number"
              dense
              lazy-rules
              label="Количество рядов"
              placeholder="Введите количество рядов"
              hint="Введите положительное число от 1 до 100"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Поле обязательно для заполнения',
                (val) =>
                  (val > 0 && val < 100) ||
                  'Количество рядов должно быть от 1 до 100',
                (val) =>
                  // BUG Протестировать  валидацию
                  bushes >= val ||
                  'Рядов должно быть меньше чем кустов (или равно им)',
              ]"
            >
              <template v-slot:before>
                <q-icon name="pin" />
              </template>
              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Введите планируемое количество рядов на грядке
              </q-tooltip>
            </q-input>
          </div>

          <div class="col-xs-12 col-md-6">
            <q-input
              outlined
              v-model="distanceBetweenRows"
              type="number"
              autogrow
              dense
              lazy-rules
              label="Расстояние между рядов, см"
              suffix="см"
              placeholder="60"
              hint="Введите положительное число от 5 до 500"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Поле обязательно для заполнения',
                (val) =>
                  (val > 4 && val < 500) ||
                  'Расстояние должно быть от 5 до 500 см',
              ]"
            >
              <template v-slot:before>
                <q-icon name="square_foot" />
              </template>
              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Введите расстояние между рядов в сантимертах
              </q-tooltip>
            </q-input>
          </div>
          <div class="col-xs-12 col-md-6">
            <q-input
              outlined
              v-model="distanceBetweenBushes"
              type="number"
              autogrow
              dense
              lazy-rules
              label="Расстояние между кустов, см"
              suffix="см"
              placeholder="80"
              hint="Введите положительное число от 5 до 500"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Поле обязательно для заполнения',
                (val) =>
                  (val > 4 && val < 500) ||
                  'Расстояние должно быть от 5 до 500 см',
              ]"
            >
              <template v-slot:before>
                <q-icon name="square_foot" />
              </template>
              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Введите расстояние между кустов в сантимертах
              </q-tooltip>
            </q-input>
          </div>
        </div>

        <q-stepper-navigation class="q-pl-lg">
          <q-btn
            type="submit"
            size="13px"
            color="primary"
            label="Сделать расчёт"
          />
          <q-btn
            flat
            @click="step = 1"
            size="13px"
            color="primary"
            label="Назад"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-form>
    </q-step>

    <q-step :name="3" title="Результат вычислений" icon="assignment">
      Таблица вычислений

      <q-stepper-navigation>
        <q-btn color="primary" size="13px" label="Сохранить результат" />
        <q-btn
          size="13px"
          color="secondary"
          class="q-ml-sm"
          label="Запланировать посадку"
        />
        <q-btn
          flat
          size="13px"
          @click="step = 2"
          color="primary"
          label="Назад"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { ref, watch } from "vue";

// TODO Сорт овоща получать данные из базы
const stringOptionsSort = [
  { id: 0, label: "Без учёта сорта" },
  { id: 1, label: "Сорт 1" },
  { id: 2, label: "Сорт 2" },
  { id: 3, label: "Сорт 3" },
  { id: 4, label: "Сорт 4" },
  { id: 4, label: "Сорт 5" },
]; // Список из сотов определённого овоща
const stringOptionsVegetables = [
  { id: 0, label: "Арбуз" },
  { id: 1, label: "Баклажаны" },
  { id: 2, label: "Сельдерей" },
  { id: 3, label: "Картофель" },
  { id: 4, label: "Салат" },
  { id: 4, label: "Огурец" },
];
const currentSort = ref({ id: 0, label: "Без учёта сорта" }); // Выбранный сорт
const sorts = ref(stringOptionsSort); // Реакстивный список

const currentVegetable = ref(null); // Выбранный veget
const vegetables = ref(stringOptionsVegetables); // Реакстивный список

const bushes = ref(null); // кусты
const rows = ref(null); // ряды
const distanceBetweenRows = ref(null); // расстояние между рядов
const distanceBetweenBushes = ref(null); // расстояние между кустов

const step = ref(1);
// фильтрация списка sort
const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      sorts.value = stringOptionsSort;
    });
  } else {
    update(() => {
      console.log(12);
      const needle = val.toLowerCase();
      console.log(needle);
      sorts.value = stringOptionsSort.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    });
  }
};

// фильтрация списка
const filterFnVegetables = (val, update) => {
  if (val === "") {
    update(() => {
      vegetables.value = stringOptionsVegetables;
    });
  } else {
    update(() => {
      const needle = val.toLowerCase();
      vegetables.value = stringOptionsVegetables.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    });
  }
};

const calculate = (num) => {
  step.value = num;
};

watch(currentVegetable, (newValue, oldValue) => {
  if (vegetables.value.includes(newValue)) {
    step.value = 2;
  }
});
</script>

<style lang="scss" scoped></style>

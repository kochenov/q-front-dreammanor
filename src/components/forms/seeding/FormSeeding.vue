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
            :loading="vegetableStore.loading"
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
            <template v-slot:prepend>
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
      <q-banner dense inline-actions class="text-white bg-positive q-mt-md">
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
              :loading="vegetableStore.loading"
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
              <template v-slot:prepend>
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
                  //11 >= 3
                  Number(val) >= Number(rows) ||
                  'Кустов должно быть больше чем рядов (или равно им)',
              ]"
            >
              <template v-slot:prepend>
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
                  Number(val) <= Number(bushes) ||
                  'Рядов должно быть меньше чем кустов (или равно им)',
              ]"
            >
              <template v-slot:prepend>
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
              <template v-slot:prepend>
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
              <template v-slot:prepend>
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
      <q-banner v-if="isFixRows()" class="text-white bg-info q-pa-md q-mx-lg">
        Указанное количество рядов:
        <q-chip
          dense
          square
          color="warning"
          text-color="black"
          icon="directions"
          >{{ rows }}</q-chip
        >, система определила оптимальное количество
        <q-chip dense square color="red" text-color="black" icon="directions">
          {{ fixRows }} </q-chip
        >, исключены пустые посадочные места.
      </q-banner>
      <ResultCalculateSeeding
        :fixRows="Number(fixRows)"
        :rows="Number(rows)"
        :bushes="Number(bushes)"
        :distanceBetweenBushes="Number(distanceBetweenBushes)"
        :distanceBetweenRows="Number(distanceBetweenRows)"
      />

      <q-stepper-navigation>
        <div
          ref="result"
          class="q-pa-md row wrap items-start justify-center q-gutter-md"
        >
          <q-btn color="primary" @cklick.prevent size="13px">
            Сохранить результат
            <q-popup-edit
              v-model="nameSaveSeeding"
              :validate="(val) => val != null && val.length > 5"
              v-slot="scope"
            >
              <q-input
                autofocus
                dense
                v-model="scope.value"
                :model-value="scope.value"
                hint="Введите название грядки"
                :rules="[
                  (val) =>
                    scope.validate(val) || 'Должно быть больше 5 символов',
                ]"
              >
                <template v-slot:after>
                  <q-btn
                    flat
                    dense
                    color="negative"
                    icon="cancel"
                    @click.stop.prevent="scope.cancel"
                  />

                  <q-btn
                    flat
                    dense
                    color="positive"
                    icon="check_circle"
                    @click.stop.prevent="scope.set"
                    :disable="
                      scope.validate(scope.value) === false ||
                      scope.initialValue === scope.value
                    "
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-btn>
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
        </div>
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useVegetable } from "../../../stores/vegetableStore";
import ResultCalculateSeeding from "../../parts/page/seeding/ResultCalculateSeeding.vue";
import { oneRows } from "../../parts/page/seeding/resCalculate";
import { Notify } from "quasar";

//State инициализация
const vegetableStore = useVegetable();
/* Данные поиска из списка Select */
const stringOptionsVegetables = ref(null); // Список овощей для Select
const stringOptionsSort = ref(null); // Список сотов определённого овоща
/* список овощей и их сортов */
const vegetables = ref(stringOptionsVegetables.value); // Список овощей
const sorts = ref(stringOptionsSort.value); // Список соров овощей
/* Текущии данные */
const currentVegetable = ref(null); // Выбранный veget
const currentSort = ref(null); // Выбранный сорт
/* Данные формы */
const bushes = ref(null); // кусты
const rows = ref(null); // ряды
const fixRows = ref(null);
const distanceBetweenRows = ref(null); // расстояние между рядов
const distanceBetweenBushes = ref(null); // расстояние между кустов

const result = ref(null);
/* Текуший шаг в расчётах */
const step = ref(1);
const nameSaveSeeding = ref(null);
const saveResultSeeding = () => {
  Notify.create({
    type: "positive",
    message: "Грядка сохранена.",
  });

  console.log(nameSaveSeeding.value);
};
const isFixRows = () => {
  // Фиксированный
  fixRows.value = Math.ceil(
    Number(bushes.value) / Math.ceil(oneRows(bushes.value, rows.value))
  );
  return fixRows.value != rows.value;
};
/**
 * При загрузке компонента
 */
onMounted(async () => {
  await vegetableStore.list(); // получаю список овощей
  stringOptionsVegetables.value = vegetableStore.vegetables; // Копирую данные в список поиска овощей (SELECT)
});

// фильтрация списка sort
const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      sorts.value = stringOptionsSort.value;
    });
  } else {
    update(() => {
      const needle = val.toLowerCase();
      sorts.value = stringOptionsSort.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    });
  }
};

// фильтрация списка
const filterFnVegetables = (val, update) => {
  if (val === "") {
    update(() => {
      vegetables.value = stringOptionsVegetables.value;
    });
  } else {
    update(() => {
      const needle = val.toLowerCase();
      vegetables.value = stringOptionsVegetables.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    });
  }
};

const calculate = (num) => {
  if (num == 3) {
    setTimeout(() => {
      let el = result.value;
      window.scrollTo(0, el.offsetTop);
    }, 1);
  }
  step.value = num;
};

watch(currentVegetable, (newValue, oldValue) => {
  if (vegetables.value.includes(newValue)) {
    updateSorts(currentVegetable.value.id);
    step.value = 2;
  }
});

watch(currentSort, (newValue, oldValue) => {
  if (currentSort.value.id !== 0 && currentSort.value) {
    distanceBetweenRows.value = currentSort.value.distanceBetweenRows; // расстояние между рядов
    distanceBetweenBushes.value = currentSort.value.distanceBetweenBushes;
    //step.value = 3;
  }
});

watch(nameSaveSeeding, (newValue, oldValue) => {
  if (nameSaveSeeding.value != null) {
    saveResultSeeding();
  }
});

const updateSorts = async (id) => {
  currentSort.value = { id: 0, label: "Без учёта сорта" };
  await vegetableStore.one(id);
  stringOptionsSort.value = [
    currentSort.value,
    ...vegetableStore.currentVegetable.sorts,
  ];
  distanceBetweenRows.value = null; // расстояние между рядов
  distanceBetweenBushes.value = null;
};
</script>

<style lang="scss" scoped></style>

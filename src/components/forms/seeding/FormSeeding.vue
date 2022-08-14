<template>
  <q-form @submit.prevent>
    <div class="row q-col-gutter-md">
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
          placeholder="Количество кустов"
          hint="Введите положительное число от 1 до 100"
        >
          <q-tooltip
            class="bg-grey-8"
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            >Введите планируемое количество кустов на грядке
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
              (val !== null && val !== '') || 'Поле обязательно для заполнения',
            (val) =>
              (val > 0 && val < 100) ||
              'Количество рядов должно быть от 1 до 100',
          ]"
        >
          <q-tooltip
            class="bg-grey-8"
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            >Введите планируемое количество рядов на грядке
          </q-tooltip>
        </q-input>
      </div>
    </div>
    <div class="q-my-xl flex flex-center">
      <q-btn
        size="11px"
        padding="6px 80px"
        color="secondary"
        type="submit"
        label="Сделать расчёт"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
// Сорт овоща
const stringOptions = [
  { id: 0, label: "Без учёта сорта" },
  { id: 1, label: "Сорт 1" },
  { id: 2, label: "Сорт 1" },
  { id: 3, label: "Сорт 1" },
]; // Список из сотов определённого овоща
const currentSort = ref({ id: 0, label: "Без учёта сорта" }); // Выбранный сорт
const sorts = ref(stringOptions); // Реакстивный список
// фильтрация списка
const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      sorts.value = stringOptions;
    });
  } else {
    update(() => {
      console.log(12);
      const needle = val.toLowerCase();
      sorts.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    });
  }
};
/**
 * Количество кустов
 */
const bushes = ref(null);
/**
 * Количество
 */
const rows = ref(null);
</script>

<style lang="scss" scoped></style>

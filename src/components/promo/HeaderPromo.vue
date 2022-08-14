<template>
  <div class="promo">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      height="35px"
      class="bg-promo text-white"
    >
      <q-carousel-slide name="style" class="flex no-wrap flex-center">
        <div class="text-center">
          <span>Это рекламное обьявление: </span>
          <q-btn
            class="q-ml-xs"
            outline
            dense
            glossy
            padding="1px 15px"
            color="yellow"
            size="9px"
            to="/"
            label="Подробности"
            ><q-badge color="orange" floating transparent>22</q-badge></q-btn
          >
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="flex no-wrap flex-center">
        <div class="text-center">Текст 2</div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="flex no-wrap flex-center">
        <div class="text-center">Текст 3</div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="flex no-wrap flex-center">
        <div class="text-center">Текст 4</div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const slide = ref("style");

defineProps({
  slides: {
    type: String,
    default: null,
  },
});
</script>

<style lang="scss">
.promo {
  font-size: 13px;
  border-top: 0.105rem solid #ffffff;
  .flex {
    flex-wrap: nowrap;
  }
}
</style>

<template>
  <div class="row q-px-xl q-pt-lg" style="height: 100%">
    <div class="col-12 flex flex-center text-center">
      <canvas ref="сanvasEl"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const сanvasEl = ref(null);

const props = defineProps({
  rows: {
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
  height: {
    type: Number,
    default: null,
  },
  width: {
    type: Number,
    default: null,
  },
  oneRows: {
    type: Number,
    default: null,
  },
});
onMounted(() => {
  сanvasEl.value.setAttribute("width", Math.ceil(props.height));
  сanvasEl.value.setAttribute("height", Math.ceil(props.width));

  let canvas = сanvasEl.value.getContext("2d");
  // Рисуем прямоугольник
  canvas.strokeRect(0, 0, Math.ceil(props.height), Math.ceil(props.width));
  canvasRow(canvas);
});

// Рисует полотно под грядки
const canvasRow = (canvas) => {
  //
  let l = 0;
  // Количество итераций
  let iteracia = 0;
  //
  let w = 0;
  for (let i = 1; i <= props.bushes; ++i) {
    // Если количество итераций равно количеству кустов в одном ряду
    if (props.oneRows == iteracia) {
      // Обнуляю итерации
      iteracia = 0;
      //
      l = 0;
      w = w + props.distanceBetweenRows;
    }
    createImage(
      canvas,
      props.distanceBetweenRows + w,
      props.distanceBetweenBushes + l
    );
    l = l + props.distanceBetweenBushes;
    ++iteracia;
  }
};
const createImage = (canvas, r, l) => {
  let circle = new Path2D();
  //circle.moveTo(125, 35);
  circle.arc(l, r, 2, 0, 2 * Math.PI);
  canvas.fill(circle);
};
</script>

<style lang="scss" scoped></style>

<template>
  <div></div>
</template>

<script setup>
import { useNavigationsStore } from "stores/navigations";
const navigations = useNavigationsStore();

navigations.addRoutes({
  meta: {
    title: "История расчётов грядок овощей",
  },
});
</script>

<style lang="scss" scoped></style>

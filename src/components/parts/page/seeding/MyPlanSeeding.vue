<template>
  <div></div>
</template>

<script setup>
import { useNavigationsStore } from "stores/navigations";
const navigations = useNavigationsStore();

navigations.addRoutes({
  meta: {
    title: "Запланированные посадки",
  },
});
</script>

<style lang="scss" scoped></style>

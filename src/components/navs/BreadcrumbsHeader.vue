<template>
  <div class="q-py-sm q-px-lg breadscrumbs">
    <q-breadcrumbs class="text-grey" active-color="black">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el to="/" icon="home" />
      <q-breadcrumbs-el
        v-for="item in navigations.navBread"
        :key="item.path"
        :label="item.meta.title"
        :to="
          $route.matched[$route.matched.length - 1].name != item.name ||
          !item.path
            ? item.path
            : null
        "
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import { useNavigationsStore } from "stores/navigations";
import { watch } from "vue";
import { useRoute } from "vue-router";
const navigations = useNavigationsStore();
const route = useRoute();

const getBreatUptate = () => {
  navigations.load(route.matched);
};
getBreatUptate();
watch(route, () => {
  console.log("route");
  getBreatUptate();
});
</script>

<style lang="scss" scoped>
.breadscrumbs {
  background: #f4f5f7;
  font-size: 14px;
}
</style>

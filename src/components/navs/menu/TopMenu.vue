<template>
  <q-tabs
    dense
    inline-label
    align="left"
    shrink
    outside-arrows
    mobile-arrows
    narrow-indicator
    class="main-menu text-primary text-weight-bold"
    v-model="tab"
  >
    <q-tab
      v-for="item in menuItems"
      :key="item.id"
      :name="item.name"
      :icon="item.icon"
      :label="item.label"
    />
  </q-tabs>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const tab = ref("");

onMounted(() => {
  tab.value = route.matched[0].name || "home";
});

const emit = defineEmits(["subMenu"]);
defineProps({
  menuItems: Array,
});

watch(tab, (newValue, oldValue) => {
  emit("subMenu", tab.value);
});
</script>

<style lang="scss">
.main-menu {
  .q-tab__label {
    font-family: "Bitter", sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #194484;
  }
  .q-tab__icon {
    font-size: 14px;
  }
  .q-tab--inactive {
    opacity: 1;
  }
  .absolute-bottom {
    right: 0;
    bottom: 0px;
    left: 0;
  }
  .q-tab {
    min-height: 50px !important;
  }
  .q-tab__indicator {
    height: 0px;
  }
  .q-tab__indicator::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0px);
    border-width: 8px;
    border-style: solid;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-image: initial;
    border-bottom-color: #194484;
  }

  .q-hoverable:hover {
    .q-focus-helper {
      opacity: 0 !important;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, 0px);
      border-width: 8px;
      border-style: solid;
      border-top-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
      border-image: initial;
      border-bottom-color: #194484;
    }
  }
}
</style>

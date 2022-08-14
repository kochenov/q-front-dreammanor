<template>
  <q-tabs
    align="left"
    inline-label
    shrink
    outside-arrows
    narrow-indicator
    mobile-arrows
    indicatorColor="white"
    active-color="white"
    class="sub-menu bg-primary text-white shadow-2"
  >
    <q-route-tab
      v-for="item in currentMenu[tabName]"
      :key="item.id"
      :name="item.name"
      :label="item.label"
      :to="item.name != 'home' ? '/' + tabName + '/' + item.name : '/'"
      exact
    />
  </q-tabs>
</template>

<script setup>
defineProps({
  tabName: String,
  currentMenu: Object,
});
</script>

<style lang="scss">
.sub-menu {
  height: 80px;
  .q-tab__label {
    font-family: "Bitter", sans-serif;
    font-weight: 600;
    font-size: 11px;
  }
  .absolute-bottom {
    bottom: 15px;
  }
  .q-tab__indicator {
    height: 10px;
  }
  .q-tab--active .q-tab__indicator {
    opacity: 0.5;
    transform-origin: left /* rtl:ignore */;
  }

  .q-hoverable:hover {
    .q-tab__indicator {
      opacity: 0.5;
    }
    .q-focus-helper {
      opacity: 0 !important;
    }
  }
}
</style>

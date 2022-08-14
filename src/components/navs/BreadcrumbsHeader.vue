<template>
  <div class="q-py-sm q-px-lg breadscrumbs" v-if="$route.name != 'home'">
    <q-breadcrumbs class="text-grey" active-color="black">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el to="/" icon="home" />
      <q-breadcrumbs-el
        v-for="item in $route.matched"
        :key="item.path"
        :label="item.meta.title"
        :to="
          $route.matched[$route.matched.length - 1].name != item.name
            ? item.path
            : null
        "
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.breadscrumbs {
  background: #f4f5f7;
  font-size: 14px;
}
</style>

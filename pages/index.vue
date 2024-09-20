<template>
  <div class="flex gap-xl" :class="isMobile ? 'column reverse' : 'row'">
    <CountryList />
    <RandomCountryWidget />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
title: "Countries",
layout: "default"
});

const $q = useQuasar();

const isMobile = computed(() => {
  return $q.screen.xs;
})
</script>

<style lang="scss" scoped>
</style>
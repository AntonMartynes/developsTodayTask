<template>
  <q-layout view="hHh Lpr fFf" class="bg-background-1">
    <q-header>
      <TheHeader />
    </q-header>

    <q-page-container
      class="bg-background-1 q-pa-none q-pa"
    >
      <q-page
        class="bg-color-background-1 q-pt-xl q-pa-md q-pa-md-xl"
      >
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.q-page {
  max-width: 100%;
}
.q-layout__section--marginal {
  background-color: var(--color-bg-2);
  color: var(--color-text-primary);
}
</style>

<template>
  <q-btn color="teal" class="btn q-mb-md" @click="goBackToMain">
    <q-icon left size="24px" name="directions" />
    <span>Go Back</span>
  </q-btn>
</template>

<script setup lang="ts">
const goBackToMain = () => {
  navigateTo({
    path: `/`,
  })
}
</script>

<style lang="scss" scoped>
.btn {
  width: max-content;
}

</style>
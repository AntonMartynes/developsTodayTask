<template>
  <div class="container">
    <CountrySelect
    v-if="!isLoading && countries.length && !isError"
    :countries="countries"
    v-model:selected="model"
    />

    <p class="q-mb-md">Countries List</p>

    <q-card v-if="!isLoading && countries.length > 0 && !isError" class="my-card q-pa-md">
      <div v-for="(card, index) in countries" :key="card.countryCode">
        <q-card class="my-card" @click="goToCountyDetails(card)">
          <q-card-section>
            {{ card.name }} - {{ card.countryCode }}
          </q-card-section>
        </q-card>
        <q-separator
          v-if="index !== countries.length - 1"
          class="q-my-lg"
          color="color-main"
        />
      </div>
    </q-card>

    <div v-else>
      Loading...
    </div>

    <div v-if="isError">
    Error Ocured, try again later
    </div>
    
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "default",
});

const config = useRuntimeConfig();

const countries = ref<CountryType[] | []>([]);
const model = ref("");
const isLoading = ref(false);
const isError = ref(false);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const { data } = await useFetch(
      `${config.public.BASE_URL}/AvailableCountries`
    );
    countries.value = data.value;
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const goToCountyDetails = (country: CountryType) => {
  navigateTo({
    path: `/country/${country.countryCode}`,
  })
};

fetchData();
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 100%;
}
.separator {
  max-width: 500px !important;
}
</style>
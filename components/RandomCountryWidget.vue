<template>
  <div class="container">
  <p class="q-mb-md">Random Country Widget</p>

  <q-card v-if="!isLoading && countries.length > 0 && !isError" class="my-card q-pa-md">
    <div v-for="(card, index) in countries" :key="card.countryCode">
      <q-card class="my-card">
        <q-card-section class="flex gap-md column">
          <p>{{ `Country name - ${card.countryName}` }}</p>
          <p>{{ `Next Holiday - ${card.holiday.name}` }}</p>
          <p>{{ `Date - ${card.holiday.date}` }}</p>
        </q-card-section>
      </q-card>
      <q-separator
        v-if="index !== countries.length - 1"
        class="q-my-lg"
        color="color-main"
      />
    </div>
  </q-card>

  <div v-if="isLoading">
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
const isLoading = ref(true);
const isError = ref(false);

const countryCodes = ["UA", "US", "GB"]

const fetchHolidays = async () => {
  try {
    isLoading.value = true;

    const promises = countryCodes.map(async (code) => {
      const holidaysResponse = await useFetch(`${config.public.BASE_URL}/NextPublicHolidays/${code}`);

      const countryInfoResponse = await useFetch(`${config.public.BASE_URL}/CountryInfo/${code}`);

      const holidaysArray = holidaysResponse.data.value;
      const countryInfo = countryInfoResponse.data.value;

      return {
        holiday: holidaysArray[0],
        countryName: countryInfo.commonName, 
      };
    });

    const results = await Promise.all(promises);
    countries.value = results;

  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

fetchHolidays();
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 100%;
}
.separator {
  max-width: 500px !important;
}
</style>
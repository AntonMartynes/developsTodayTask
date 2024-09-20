<template>
  <BackBtn />
  <div class="container" :style="$q.screen.xs ? 'width: 100%' : 'width: 60%'">
  <p class="q-mb-md">{{ `Country Name - ${countries.countryName}` }} </p>

  <q-card v-if="!isLoading && countries && !isError" class="my-card q-pa-md">
    <div v-for="(card, index) in countries.holiday" :key="card.name">
      <q-card class="my-card">
        <q-card-section class="flex gap-md column">
          <p>{{ `Holiday Info - ${card.name}` }}</p>
          <p>{{ `Date - ${card.date}` }}</p>
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

<div class="flex row justify-around q-mt-md">
  <q-btn 
    v-for="year in years" 
    :key="year" 
    flat 
    :color="isYearSelected(year) ? 'primary' : 'secondary'" 
    :label="year"
    @click="changeActiveYear(year)"
  />
</div>
  
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const countries = ref<CountryType[] | []>([]);
const isLoading = ref(true);
const isError = ref(false);

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
const activeYear = ref("2024");
const changeActiveYear = (year: string) => {
  activeYear.value = year;
}

const isYearSelected = (index: string) => {
  return activeYear.value === index;
};

const countryCode = route.params.id;

const fetchHolidays = async () => {
  try {
    isLoading.value = true;

    const holidaysResponse = await useFetch(`${config.public.BASE_URL}/PublicHolidays/${activeYear.value}/${countryCode}`);

    const countryInfoResponse = await useFetch(`${config.public.BASE_URL}/CountryInfo/${countryCode}`);

    const holidaysArray = holidaysResponse.data.value;
    const countryInfo = countryInfoResponse.data.value;

    countries.value = {
      holiday: holidaysArray,
      countryName: countryInfo.commonName,
    };
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

fetchHolidays();

watch(activeYear, () => {
  fetchHolidays();
})
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 100%;
}
.separator {
  max-width: 500px !important;
}
</style>
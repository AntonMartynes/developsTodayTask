<template>
  <q-select
    filled
    v-model="selectedCountry"
    use-input
    input-debounce="0"
    label="Simple filter"
    :options="filteredCountries"
    option-value="name"
    option-label="name"
    @filter="filterFn"
    @update:model-value="onCountrySelect"
    behavior="menu"
    class="q-mb-md"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps" class="row items-center q-pa-xs-sm">
        <p
          class="q-mx-xs-sm text-body1"
          :class="{ 'text-color-main': selectedCountry === scope.opt.name }"
        >
          {{ scope.opt.name }}
        </p>
        <p class="text-body2-stable text-color-text-gray">
          - {{ scope.opt.countryCode }}
        </p>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
const props = defineProps({
  countries: Array,
  selected: String,
});

const emits = defineEmits(['update:selected']);

const selectedCountry = ref(props.selected || "");
const filteredCountries = ref([...props.countries]);

watch(selectedCountry, (newVal) => {
  emits('update:selected', newVal);
});

const filterFn = (val: string, update: Function) => {
  if (val === "") {
    update(() => {
      filteredCountries.value = props.countries;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredCountries.value = props.countries.filter((country) =>
      country.name.toLowerCase().includes(needle)
    );
  });
};

const onCountrySelect = (country: CountryType) => {
  navigateTo({
    path: `/country/${country.countryCode}`,
  })
};
</script>

<style scoped>
.q-item {
  cursor: pointer;
}

.q-select .q-field__input {
  height: 36px; /* Set a fixed height */
  padding: 8px; /* Adjust padding as needed */
}
</style>
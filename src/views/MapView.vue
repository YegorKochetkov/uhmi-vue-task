<template>
  <div @keydown.esc="showModal = false">
    <MapInstanceVue
      v-model:show-modal="showModal"
      v-model:marker-lat="markerLat"
      v-model:marker-lng="markerLng"
      v-model:map="map"
    />

    <MarkerFormVue
      v-model:show-modal="showModal"
      v-model:marker-lat="markerLat"
      v-model:marker-lng="markerLng"
      v-model:marker-title="markerTitle"
      v-model:map="map"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import MapInstanceVue from "@/components/MapInstance.vue";
import MarkerFormVue from "@/components/MarkerForm.vue";

const showModal = ref(false);

const map = ref();
const markerTitle = ref("");
const markerLat = ref(0);
const markerLng = ref(0);
</script>

<style></style>

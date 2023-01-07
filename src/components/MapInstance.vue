<template>
  <div id="map" class="map"></div>
</template>

<script setup lang="ts">
import leaflet from "leaflet";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { useMarkersStore } from "@/stores/markers";

const store = useMarkersStore();
const { markers } = storeToRefs(store);

defineProps({
  showModal: Boolean,
  markerLat: Number,
  markerLng: Number,
  map: Object,
});
const emit = defineEmits([
  "update:showModal",
  "update:markerLat",
  "update:markerLng",
  "update:map",
]);

onMounted(() => {
  const map = leaflet.map("map").setView([48.444, 31.179], 6);
  emit("update:map", map);

  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  map.on("click", onMapClick);

  markers.value.forEach((item: string) => {
    const data: {
      _latlng: { lat: number; lng: number };
      options: { title: string };
    } = JSON.parse(item);

    const marker = leaflet
      .marker([data._latlng.lat, data._latlng.lng], {
        title: data.options.title,
      })
      .bindPopup(data.options.title);
    marker.addTo(map);
  });
});

function onMapClick(e: { latlng: { lat: number; lng: number } }) {
  emit("update:markerLat", e.latlng.lat);
  emit("update:markerLng", e.latlng.lng);
  emit("update:showModal", true);
}
</script>

<style>
.map {
  height: 50vh;
}
</style>

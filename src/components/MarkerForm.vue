<template>
  <Teleport to="body">
    <modal :show="showModal" @close="$emit('update:showModal', false)">
      <template #header>
        <h3>Set marker</h3>
      </template>
      <template #body>
        <form @submit.prevent>
          <div class="form-group">
            <label for="markerTitle">Title</label>
            <input
              type="text"
              class="form-control"
              id="markerTitle"
              placeholder="Enter title"
              :value="markerTitle"
              @input="
                $emit(
                  'update:markerTitle',
                  ($event.target as HTMLInputElement).value
                )
              "
              required
            />
          </div>
          <div class="form-group">
            <label for="markerLat">Longitude</label>
            <input
              type="number"
              step="any"
              class="form-control"
              id="markerLat"
              :value="markerLat"
              @input="
                $emit(
                  'update:markerLat',
                  ($event.target as HTMLInputElement).value
                )
              "
              required
            />
          </div>
          <div class="form-group">
            <label for="markerLng">Latitude</label>
            <input
              type="number"
              step="any"
              class="form-control"
              id="markerLng"
              :value="markerLng"
              @input="
                $emit(
                  'update:markerLng',
                  ($event.target as HTMLInputElement).value
                )
              "
              required
            />
          </div>
          <button type="submit" class="btn btn-success" @click="setMarker">
            OK
          </button>
        </form>
      </template>
    </modal>
  </Teleport>
</template>

<script setup lang="ts">
import leaflet from "leaflet";

import { useMarkersStore } from "@/stores/markers";
import Modal from "./ModalWindow.vue";

const props = defineProps({
  showModal: Boolean,
  markerLat: Number,
  markerLng: Number,
  markerTitle: String,
  map: Object,
});
const emit = defineEmits([
  "update:showModal",
  "update:markerLat",
  "update:markerLng",
  "update:markerTitle",
]);

const store = useMarkersStore();

function setMarker() {
  if (props.markerTitle && props.markerLat && props.markerLng) {
    const marker = leaflet.marker([+props.markerLat, +props.markerLng], {
      title: props.markerTitle,
    });

    store.addMarker(JSON.stringify(marker));
    marker.bindPopup(props.markerTitle).addTo(props.map);

    emit("update:markerTitle", "");
    emit("update:markerLat", 0);
    emit("update:markerLng", 0);
    emit("update:showModal", false);
  }
}
</script>

<style></style>

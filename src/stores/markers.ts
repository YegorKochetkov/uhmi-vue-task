import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, type RemovableRef } from "@vueuse/core";

export const useMarkersStore = defineStore("markers", () => {
  const markers = ref<RemovableRef<string[]>>(useLocalStorage("markers", []));

  function addMarker(marker: string) {
    markers.value.push(marker);
  }

  return { markers, addMarker };
});

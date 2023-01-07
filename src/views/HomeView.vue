<script setup lang="ts">
import PostsListVue from "@/components/PostsList.vue";
</script>

<template>
  <Transition>
    <Suspense>
      <main class="main">
        <PostsListVue />
      </main>

      <template #fallback>
        <div class="fallback">Loading...</div>
      </template>
    </Suspense>
  </Transition>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 100vh;
}

.fallback {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

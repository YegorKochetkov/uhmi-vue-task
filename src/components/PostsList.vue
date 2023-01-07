<template>
  <template v-if="fetchErrorMsg">
    <h2>{{ fetchErrorMsg }}</h2>
    <p>{{ fetchErr }}</p>
  </template>

  <template v-else>
    <form class="form">
      <div class="form-group">
        <label for="filterInput">Filter</label>
        <input
          type="text"
          class="form-control"
          id="filterInput"
          placeholder="Search"
          name="filter"
          v-model="searchQuery"
        />
      </div>
    </form>

    <ul class="post-list">
      <PostItemVue v-for="post in visibleItems" :key="post.id" :post="post" />
    </ul>

    <paginate
      v-model="currPageNumber"
      :page-count="pageCount"
      :page-range="3"
      :click-handler="pageChangeHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </paginate>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Paginate from "vuejs-paginate-next";

import PostItemVue from "./PostItem.vue";
import type { IPost } from "@/types/post.interface";
import { usePagination } from "./hooks/usePagination";

const route = useRoute();
const searchQuery = ref(route.query.search ? String(route.query.search) : "");

const API_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

let fetchErrorMsg = "";
let fetchErr: unknown;
let posts: IPost[] = [];

try {
  fetchErrorMsg = "";
  const res = await fetch(API_POSTS_URL);
  posts = await res.json();
} catch (err) {
  fetchErrorMsg = "Something went wrong... Try again";
  fetchErr = err;
}

const { currPageNumber, pageCount, visibleItems, pageChangeHandler } =
  usePagination(posts, searchQuery);
</script>

<style scoped lang="scss">
.form {
  margin-bottom: 0.5rem;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
}
</style>

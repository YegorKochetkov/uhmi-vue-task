<template>
  <li class="card">
    <article class="card-body">
      <h2 class="card-title">
        <b>{{ post.id }}</b> {{ post.title }}
      </h2>
      <p class="card-text">{{ post.body }}</p>
      <p class="card-text comments">Comments: {{ comments.length }}</p>
    </article>
    <BarChart :chart-data="chartData" :chart-options="chartOptions" />
  </li>
</template>

<script setup lang="ts">
import BarChart from "./BarChart.vue";
import type { IComment } from "@/types/comment.interface";
import type { IPost } from "@/types/post.interface";

const props = defineProps<{ post: IPost }>();
const API_COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

const res = await fetch(API_COMMENTS_URL + `?postId=${props.post.id}`);
const comments: IComment[] = await res.json();
const labelsForChart: string[] = [];
const dataForChart: number[] = [];

for (const comment of comments) {
  labelsForChart.push(`User ID ${comment.id}`);
  dataForChart.push(comment.email.length);
}

const chartData = {
  labels: labelsForChart,
  datasets: [{ data: dataForChart, label: "mail length" }],
};

const chartOptions = {
  responsive: true,
};
</script>

<style scoped>
.card-body {
  color: var(--color-text);
  background: var(--color-background);
}
.comments {
  text-align: right;
}
</style>

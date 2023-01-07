import { computed, ref, watch, type Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { IPost } from "@/types/post.interface";
import _ from "lodash";

export function usePagination<Type>(items: Type[], searchQuery: Ref<string>) {
  const router = useRouter();
  const route = useRoute();

  const currPageNumber = ref(route.query.page ? Number(route.query.page) : 1);
  const pageCount = ref(0);
  const allItems = items as IPost[];
  const itemsPerPage = 10;

  const filteredPosts = computed(() =>
    allItems.filter((post) => post.title.includes(searchQuery.value))
  );

  const paginatedPosts = computed(() =>
    _.chunk(filteredPosts.value, itemsPerPage)
  );

  pageCount.value = paginatedPosts.value.length;

  if (pageCount.value === 0) {
    currPageNumber.value = 0;
  }

  watch(paginatedPosts, () => {
    pageCount.value = paginatedPosts.value.length;

    if (pageCount.value < currPageNumber.value) {
      currPageNumber.value = 1;
    }
  });

  const visibleItems = computed(
    () =>
      paginatedPosts.value[currPageNumber.value - 1] || paginatedPosts.value[0]
  );

  function pageChangeHandler(pageNum: number) {
    router.push(
      `${route.path}?page=${currPageNumber.value}&search=${searchQuery.value}`
    );
    // TODO:figure out why it renders in reverse order only when click here
    visibleItems.value.reverse();
    currPageNumber.value = pageNum;
  }

  return { currPageNumber, pageCount, visibleItems, pageChangeHandler };
}

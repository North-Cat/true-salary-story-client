<script lang="ts" setup>
useHead({
  title: '搜尋',
});
const route = useRoute()
// const { postId, commentId } = route.params
const { searchType, param } = route.query
console.log(searchType);
console.log(param);
</script>

<template>
  <div class="search pt-[130px]">
    <section>搜尋</section>
  </div>
</template>

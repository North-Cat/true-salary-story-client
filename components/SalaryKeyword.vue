<script setup lang="ts">
const { shareSalaryApi } = useApi();
const keywords = ref([]);
const data = await shareSalaryApi.getKeywords();
keywords.value = data.keywords;
</script>

<template>
  <section class="lg:w-2/6 flex flex-col justify-start items-start pb-6 lg:ml-[30px] h-fit">
    <h5 class="text-white bg-black-10 p-6 rounded-t">#熱門關鍵字</h5>
    <div class="border-2 border-black-10 sm:py-5 sm:px-7 lg:py-6 lg:px-6 bg-white rounded-b rounded-tr">
      <div class="flex flex-col">
        <div class="flex flex-wrap justify-between items-center">
          <TextLink
            v-for="keyword in keywords"
            :key="keyword"
            :content="keyword"
            size="sm"
            @click="keywordSearch(keyword)"
          >
          </TextLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>

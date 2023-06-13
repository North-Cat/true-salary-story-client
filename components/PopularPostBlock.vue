<script setup lang="ts">
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore();
const { latestPosts, popularPosts } = storeToRefs(searchStore);

// 取得熱門薪水
searchStore.fetchTopPost();

// 薪水檔案櫃
const postCarousel = ref(); // 輪播元件
async function clickPostCard(postId: string) {
  await navigateTo('salary/' + postId);
}
function postsNext() {
  // 下一頁
  postCarousel.value.next();
}
function postsPrev() {
  // 上一頁
  postCarousel.value.prev();
}

</script>

<template>
    <section class="bg-white sm:py-10 md:py-10 lg:pt-20 lg:pb-1 max-[1920px]:overflow-x-hidden">
        <div
          class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center"
        >
          <div class="w-full flex justify-between items-center mb-9">
            <!-- sm text -->
            <h4 class="sm:block md:hidden lg:hidden">薪水檔案櫃</h4>
            <!-- md lg text -->
            <h2 class="sm:hidden md:block lg:block">薪水檔案櫃</h2>
            <div class="sm:hidden lg:flex flex-row justify-center items-start">
              <NavButton :is-circle="true" :is-left="true" class="me-5" @click="postsPrev"></NavButton>
              <NavButton :is-circle="true" :is-left="false" @click="postsNext"></NavButton>
            </div>
          </div>

          <!-- md lg carousel -->
          <div
            v-if="popularPosts && popularPosts.length != 0"
            class="post-block sm:hidden md:hidden lg:block lg:w-full"
          >
            <carousel ref="postCarousel" class="w-full" :items-to-show="1" wrap-around>
              <slide
                v-for="slide in Math.ceil(popularPosts.length / 3)"
                :key="slide"
                style="margin-top: 25px; margin-bottom: 25px"
              >
                <div class="w-full flex flex-col">
                  <div class="w-full flex flex-row mb-6">
                    <div v-for="(post, index) in popularPosts" :key="post.postId">
                      <PostCard
                        v-if="index >= (slide - 1) * 3 && index <= (slide - 1) * 3 + 2"
                        :class="{ 'me-6': index != (slide - 1) * 3 + 2 }"
                        cate="top"
                        :title="post.title"
                        :company="post.companyName"
                        :overtime="post.overtime"
                        :feeling="post.feeling"
                        @click="clickPostCard(post.postId)"
                      >
                      </PostCard>
                    </div>
                  </div>
                  <div class="w-full flex flex-row">
                    <div v-for="(post, index) in latestPosts" :key="post.postId">
                      <PostCard
                        v-if="index >= (slide - 1) * 3 && index <= (slide - 1) * 3 + 2"
                        :class="{ 'me-6': index != (slide - 1) * 3 + 2 }"
                        cate="new"
                        :title="post.title"
                        :company="post.companyName"
                        :overtime="post.overtime"
                        :feeling="post.feeling"
                        @click="clickPostCard(post.postId)"
                      >
                      </PostCard>
                    </div>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>

          <!-- sm carousel -->
          <div v-if="popularPosts && popularPosts.length != 0" class="post-block sm:block sm:w-full lg:hidden">
            <carousel ref="smPostCarousel" class="w-full" :items-to-show="1.5" wrap-around snap-align="start">
              <slide v-for="slide in popularPosts.length" :key="slide">
                <div class="w-full flex flex-col">
                  <div class="w-full flex flex-row mb-6">
                    <div v-for="(post, index) in popularPosts" :key="post.postId">
                      <PostCard
                        v-if="index == slide - 1"
                        cate="top"
                        :title="post.title"
                        :company="post.companyName"
                        :overtime="post.overtime"
                        :feeling="post.feeling"
                        @click="clickPostCard(post.postId)"
                      >
                      </PostCard>
                    </div>
                  </div>
                  <div class="w-full flex flex-row">
                    <div v-for="(post, index) in latestPosts" :key="post.postId">
                      <PostCard
                        v-if="index == slide - 1"
                        cate="new"
                        :title="post.title"
                        :company="post.companyName"
                        :overtime="post.overtime"
                        :feeling="post.feeling"
                        @click="clickPostCard(post.postId)"
                      >
                      </PostCard>
                    </div>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </section>
</template>
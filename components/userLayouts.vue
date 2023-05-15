<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/user';
  const route = useRoute();
  const router = useRouter();
  const user = useUserStore();
  const { logout } = user;
  const { currentUser } = storeToRefs(user);
  const loginOut = () => {
    logout();
  };
  const userList = ref([
    {
      title: '關於我',
      icon: 'icon-person-circle',
      type: 'link',
      id: 'user',
      to: {
        name: 'user',
      },
    },
    {
      title: '我的薪水',
      icon: 'icon-edit',
      type: 'link',
      id: 'user-my-salary',
      to: {
        name: 'user-my-salary',
      },
    },
    {
      title: '薪水訂閱',
      icon: 'icon-plus-circle',
      type: 'link',
      id: 'user-subscribed-companies',
      to: {
        name: 'user-subscribed-companies',
      },
    },
    {
      title: '請教紀錄',
      icon: 'icon-message',
      type: 'link',
      id: 'user-consult',
      to: {
        name: 'user-consult',
      },
    },
    {
      type: 'hr',
    },
    {
      title: '積分明細',
      type: 'link',
      icon: 'icon-star-circle',
      id: 'user-credit-history',
      to: {
        name: 'user-credit-history',
      },
    },
    {
      title: '訂單總覽',
      type: 'link',
      icon: 'icon-file',
      id: 'user-orders',
      to: {
        name: 'user-orders',
      },
    },
    {
      title: '登出',
      type: 'click',
      icon: 'icon-person',
      id: 'loginOut',
      click: loginOut,
    },
  ]);
</script>
<template>
  <section
    class="user bg-gray pt-[130px] pb-10 md:py-20 max-[1920px]:overflow-x-hidden min-h-screen"
  >
    <div
      class="container mx-auto max-w-full md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center lg:mt-20"
    >
      <div
        class="w-full flex sm:flex-col lg:flex-row lg:justify-between sm:mb-10 lg:mb-20"
      >
        <!-- 側邊選單 -->
        <div class="lg:w-2/6 lg:mr-[30px] lg:mt-0 md:mt-15 md:block hidden">
          <div class="h-full">
            <div
              class="sticky top-[80px] border border-black-1 bg-white flex flex-col justify-start items-start py-6 px-3"
            >
              <template v-for="userItem in userList">
                <div class="group w-full">
                  <nuxt-link
                    v-if="userItem.to"
                    :class="{
                      'bg-blue-light text-blue  border-transparent':
                        $route.name === userItem.to.name,
                    }"
                    :to="userItem.to"
                    class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue group-hover:border-transparent transition duration-300 ease-in-out"
                  >
                    <div
                      class="w-[48px] h-[48px] flex justify-center items-center mr-3"
                    >
                      <span
                        class="text-2xl text-black-5 group-hover:text-blue transition duration-300 ease-in-out"
                        :class="[
                          `icomoon ${userItem.icon}`,
                          { 'text-blue': $route.name === userItem.to.name },
                        ]"
                      ></span>
                    </div>
                    <h6>{{ userItem.title }}</h6>
                  </nuxt-link>
                  <button
                    v-if="userItem.type === 'click'"
                    class="w-full flex justify-start items-center py-2 px-3 rounded group-hover:bg-blue-light group-hover:text-blue group-hover:border-transparent transition duration-300 ease-in-out"
                    @click="userItem.click"
                  >
                    <div
                      class="w-[48px] h-[48px] flex justify-center items-center mr-3"
                    >
                      <span
                        class="text-2xl text-black-5 group-hover:text-blue transition duration-300 ease-in-out"
                        :class="`icomoon ${userItem.icon}`"
                      ></span>
                    </div>
                    <h6>{{ userItem.title }}</h6>
                  </button>
                  <hr v-if="userItem.type === 'hr'" class="text-black-3 my-3" />
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- 頁面內容 -->
        <div
          class="lg:w-4/6 border-2 border-black-10 mt-20 md:mt-10 lg:mt-0 rounded-bl rounded-br"
        >
          <!-- 切頁 -->
          <div class="w-100 p-6 bg-black-10 text-white">
            <template v-if="$route.name === 'user'">
              <span class="text-2xl"> Hi, {{ currentUser.displayName }}</span>
              <br />
              <!-- FIX UID -->
              <!-- <span>UID: {{ 'xxxxxxx' }}</span> -->
            </template>
            <template v-else>
              {{
                userList.find((item) => item.id === $route.name)?.title ||
                '會員資訊'
              }}
            </template>
          </div>
          <div class="min-h-full md:min-h-[300px] p-6">
            <slot />
          </div>
          <!-- <PostManagement v-if="isPage(Page.POST)"/>
            <KeywordManagement v-if="isPage(Page.KEYWORD)"/> -->
        </div>
      </div>
    </div>
  </section>
</template>

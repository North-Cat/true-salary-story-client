<script setup lang="ts"></script>

<template>
  <!-- sm nav -->
  <nav
    class="z-10 fixed md:hidden bg-white/80 w-full h-[77px] bottom-0 left-0 pb-2 px-4 shadow-nav backdrop-blur-sm"
    aria-label="行動版選單"
  >
    <div class="flex justify-between">
      <btn cate="text-sm" content="分享">
        <span class="icon-edit text-2xl mb-1"></span>
      </btn>
      <btn cate="text-sm" content="搜尋">
        <span class="icon-search text-2xl mb-1"></span>
      </btn>
      <!-- TODO: 取得是否登入 -->
      <btn cate="text-sm" content="訊息" v-if="isLogin">
        <div class="-mb-1">
          <!-- 訊息紅點 -->
          <span
            class="z-10 absolute -right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2"
          ></span>
          <span class="icon-mail text-3xl"></span>
        </div>
      </btn>
      <btn cate="text-sm" content="150" v-if="isLogin">
        <span class="icon-star-circle text-2xl mb-1"></span>
      </btn>
      <btn cate="text-sm" content="帳號" v-if="isLogin">
        <span class="icon-person-circle text-2xl mb-1"></span>
      </btn>
      <btn
        to="/login"
        cate="text-sm"
        content="登入"
        class="me-5"
        v-if="!isLogin"
      >
        <span class="icon-person text-2xl mb-1"></span>
      </btn>
      <btn cate="text-sm" content="加薪計畫" v-if="!isLogin">
        <span class="icon-star text-3xl"></span>
      </btn>
    </div>
  </nav>
  <!-- md lg nav -->
  <nav
    class="z-10 fixed top-0 left-0 bg-white/80 w-full sm:py-3 sm:px-3 md:py-6 md:px-10 lg:py-6 lg:px-10 shadow-nav backdrop-blur-sm"
    aria-label="平板電腦版選單"
  >
    <div
      class="container mx-auto max-w-[1800px] flex justify-between items-center"
    >
      <a href="#" class="sm:w-[80px] md:w-[150px] lg:w-[150px]">
        <img src="../assets/img/LOGO.png" alt="LOGO" />
      </a>
      <div class="sm:hidden md:flex flex-row justify-center items-center">
        <btn cate="blue-text" content="匿名分享" class="me-0">
          <span class="icon-edit text-lg me-2"></span>
        </btn>
        <btn cate="gray-text" content="搜尋" :class="{ 'me-8': !isLogin }">
          <span class="icon-search text-lg me-2"></span>
        </btn>
        <!-- TODO: 取得是否登入 -->
        <btn cate="gray-text" content="訊息" v-if="isLogin">
          <div>
            <!-- 訊息紅點 -->
            <span
              class="z-10 absolute right-1 inline-flex rounded-full h-3 w-3 bg-red border-white border-2"
            ></span>
            <span class="icon-mail text-2xl me-2"></span>
          </div>
        </btn>
        <btn cate="yellow-text" content="240 積分" class="me-8" v-if="isLogin">
          <span class="icon-star-circle text-xl me-2"></span>
        </btn>
        <button class="rounded-full overflow-hidden me-8" v-if="isLogin">
          <img
            class="w-12 h-12"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80"
            alt="圖片"
          />
        </button>
        <btn
          to="/login"
          cate="secondary"
          content="登入"
          class="me-5"
          v-if="!isLogin"
        >
          <span class="icon-person text-xl me-2"></span>
        </btn>
        <btn cate="primary" content="加薪計畫">
          <span class="icon-star text-2xl me-2"></span>
        </btn>
      </div>
    </div>
  </nav>

  <!-- 各頁面內容 -->
  <slot />

  <footer
    class="bg-white sm:py-10 sm:px-3 sm:mb-20 md:mb-0 lg:py-20 max-[1920px]:overflow-x-hidden"
  >
    <div
      class="container mx-auto sm:max-w-[350px] md:max-w-[600px] lg:max-w-7xl flex flex-col justify-center items-center"
    >
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-4/12 mb-10">
          <div class="w-[150px] lg:w-full">
            <img src="../assets/img/LOGO-lg.png" alt="LOGO" />
          </div>
        </div>
        <div class="w-1/2 md:w-2/12 mb-10">
          <div class="flex flex-col">
            <div class="caption mb-3">服務</div>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              加薪計畫
            </a>
          </div>
        </div>
        <div class="w-1/2 md:w-2/12 mb-10">
          <div class="flex flex-col">
            <div class="caption mb-3">支援</div>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              服務條款
            </a>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              隱私權政策
            </a>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              幫助中心
            </a>
          </div>
        </div>
        <div class="w-1/2 md:w-2/12">
          <div class="flex flex-col">
            <div class="caption mb-3">友站連結</div>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              面試趣
            </a>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              小任務
            </a>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              ibook 知識健身房
            </a>
          </div>
        </div>
        <div class="w-1/2 md:w-2/12">
          <div class="flex flex-col">
            <div class="caption mb-3">社群媒體</div>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              Facebook
            </a>
            <a
              href="#"
              class="caption text-black-6 hover:text-black-10 transition duration-150 ease-in-out mb-3"
            >
              Medium
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<template>
    <div class="flex sm:flex-col md:flex-row border border-black-1 sm:w-[257px] min-w-[257px] md:w-[410px] max-w-[416px] cursor-pointer hover:shadow-card transition duration-150 ease-in-out">
        <!-- 精選 左側 -->
        <div v-if="cate=='top'"  
        class="flex sm:flex-row md:flex-col sm:justify-start md:justify-center  md:items-center text-white fill-white px-3 sm:py-2 md:py-5 bg-blue">
            <span class="icon-star-circle-fill text-sm mr-1.5 mt-0.5 md:m-0 md:mb-1"></span>
            <div class="flex sm:flex-row md:flex-col text-center text-sm font-light tracking-wide leading-4">
                <span>精</span><span>選</span>
            </div>
        </div> 
        <!-- 最新 左側 -->
        <div v-if="cate=='new'"  
        class="flex sm:flex-row md:flex-col sm:justify-start md:justify-center  md:items-center text-white fill-white px-3 sm:py-2 md:py-5 bg-black-10">
            <span class="icon-fire sm:text-base mr-1.5 mt-0.5 md:m-0 md:mb-1"></span>
            <div class="flex sm:flex-row md:flex-col text-center text-sm font-light tracking-wide leading-4">
                <span>最</span><span>新</span>
            </div>
        </div>  
        <div class="sm:p-3 md:p-5 truncate flex flex-col justify-center items-start">
            <h6 class="mb-1 truncate">{{title}}</h6>
            <div class="caption text-black-6 mb-3 truncate">{{company}}</div>
            <div class="flex justify-start items-center">
                <!-- 加班狀況 start -->
                <div v-if="overtime == '1'" 
                class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-time-good text-sm"></span>
                    <span class="ms-1">準時上下班</span>
                </div>
                <div v-else-if="overtime == '2'" 
                class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-time-good text-sm"></span>
                    <span class="ms-1">很少加班</span>
                </div>
                <div v-else-if="overtime == '3'" 
                class="caption border border-yellow text-yellow fill-yellow rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-time-normal text-sm"></span>
                    <span class="ms-1">偶爾加班</span>
                </div>
                <div v-else-if="overtime == '4'" 
                class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-time-bad text-sm"></span>
                    <span class="ms-1">常常加班</span>
                </div>
                <div v-else-if="overtime == '5'" 
                class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-time-bad text-sm"></span>
                    <span class="ms-1">賣肝拼經濟</span>
                </div>
                <!-- 加班狀況 end -->

                <!-- 上班心情 start -->
                <div v-if="feeling == '1'" 
                class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-face-good text-sm"></span>
                    <span class="ms-1">非常開心</span>
                </div>
                <div v-else-if="feeling == '2'" 
                class="caption border border-green text-green fill-green rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-face-good text-sm"></span>
                    <span class="ms-1">還算愉快</span>
                </div>
                <div v-else-if="feeling == '3'" 
                class="caption border border-yellow text-yellow fill-yellow rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-face-normal text-sm"></span>
                    <span class="ms-1">平常心</span>
                </div>
                <div v-else-if="feeling == '4'" 
                class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-face-bad text-sm"></span>
                    <span class="ms-1">有苦說不出</span>
                </div>
                <div v-else-if="feeling == '5'" 
                class="caption border border-red text-red fill-red rounded-full flex justify-center items-center px-3 py-1 sm:me-1 md:me-2">
                    <span class="icon-face-bad text-sm"></span>
                    <span class="ms-1">想換工作了</span>
                </div>
                <!-- 上班心情 end -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    cate: { // 'new':最新; 'top':精選
        type: String,
        required: true
    },
    title: { // 職位
        type: String,
        required: true
    },
    company: { // 公司
        type: String,
        required: true
    },
    overtime: { // '1':準時上下班; '2':很少加班; '3':偶爾加班; '4':常常加班; '5':賣肝拼經濟
        type: String,
        required: true
    },
    feeling: { // '1':非常開心; '2':還算愉快; '3':平常心; '4':有苦說不出; '5':想換工作了
        type: String,
        required: true
    }
})
</script>
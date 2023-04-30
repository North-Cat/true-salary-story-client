<template>
    <!-- 主要按鈕 -->
    <nuxt-link 
        v-if="to" :to="to"
        :type="type"
        class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out"
        :class="{
            'flex-row text-white fill-white bg-blue hover:bg-black-10': cate == 'primary',
            'flex-row text-white fill-white bg-black-10 hover:bg-blue': cate == 'secondary',
            'flex-row text-blue fill-blue hover:text-black-10 hover:fill-black-10': cate == 'blue-text',
            'flex-row text-yellow fill-yellow hover:text-blue hover:fill-blue': cate == 'yellow-text',
            'flex-row text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10': cate == 'gray-text',
            'flex-col text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10': cate == 'text-sm',
        }"
    >
        <slot></slot>
        <div v-if="cate == 'text-sm'" class="caption">{{content}}</div>
        <h6 v-else>{{content}}</h6>
    </nuxt-link>
    <button
        v-else 
        :type="type"
        class="flex py-3 px-5 justify-center items-center transition duration-150 ease-in-out"
        :class="{
            'flex-row text-white fill-white bg-blue hover:bg-black-10': cate == 'primary',
            'flex-row text-white fill-white bg-black-10 hover:bg-blue': cate == 'secondary',
            'flex-row text-blue fill-blue hover:text-black-10 hover:fill-black-10': cate == 'blue-text',
            'flex-row text-yellow fill-yellow hover:text-blue hover:fill-blue': cate == 'yellow-text',
            'flex-row text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10': cate == 'gray-text',
            'flex-col text-black-6 fill-black-6 hover:text-black-10 hover:fill-black-10': cate == 'text-sm',
        }"
    >
        <slot></slot>
        <div v-if="cate == 'text-sm'" class="caption">{{content}}</div>
        <h6 v-else>{{content}}</h6>
    </button> 
</template>

<script>
export default {
    props: { 
        type: {
            type: String,
            default: 'button',
        },
        cate: { // 'secondary': 次要按鈕, 'primary': 主要按鈕, 'gray-text':灰色無邊框, 'blue-text':藍色無邊框, 'yellow-text':黃色無邊框, 'text-sm':小型無邊框
            type: String,
            default: 'primary',
        },
        content: { // 按鈕文字
            type: String,
        },
        to: {
            type: [String, Object],
            default: '/' ,
        }
    },
};
</script>
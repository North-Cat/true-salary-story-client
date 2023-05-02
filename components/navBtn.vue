<template>
    <button 
    :type="type"
    class="flex justify-center items-center bg-black-10 fill-white hover:bg-blue transition duration-150 ease-in-out"
    :class="{'rounded-full py-4 px-5': isCircle, 'py-2 px-3.5': !isCircle}">
        <!-- 向左 -->
        <span class="icon-left-arrow text-white text-2xl" v-if="isLeft"></span>
        <!-- 向右 -->
        <span class="icon-right-arrow text-white text-2xl" v-else-if="!isLeft"></span>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    type: {
        type: String as () => 'button' | 'submit' | 'reset',
        default: 'button',
    },
    isCircle: { // true:圓形 ; false:方形
        type: Boolean,
        required: true
    },
    isLeft: { // true:向左 ; false:向右
        type: Boolean,
        required: true
    },
})
</script>
<script setup lang="ts">
import lottie from "lottie-web";
import { ObjectFlags } from "typescript";

interface ILottieOption {
    loop: boolean,
    autoplay: boolean,
    animationData: boolean
}

const props = defineProps({
    options: {
        type: Object,
        require: true,
    },
    height: String,
    width: String,
});

// 回傳給父元件建立好的動畫元件
const emit = defineEmits(['animCreated']); 

const style = ref({
    // width: props.width ? `${props.width}` : "100%",
    // height: props.height ? `${props.height}` : "100vh",
    // overflow: "hidden",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center"
})

const lavContainer = ref();

onMounted(() => {
    const anim = lottie.loadAnimation({
        container: lavContainer.value,
        renderer: "svg",
        // progressiveLoad: true,
        loop: props.options?.loop !== false,
        autoplay: props.options?.autoplay  !== false,
        animationData: props.options?.animationData,
    })
    emit('animCreated', anim); 
})

</script>
<template>
    <div ref="lavContainer" :style="style"></div>
</template>
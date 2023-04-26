<template>
    <button class="text-white bg-blue rounded-full px-3 py-1 hover:bg-black-10 transition duration-150 ease-in-out ">
        <div class="caption">{{content}}</div>
    </button>
</template>

<script>
export default {
    props: { 
        content: {
            type: String
        }
    },
};
</script>
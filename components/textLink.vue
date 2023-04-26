<template>
    <button class="text-black-10 px-2 py-2 rounded flex justify-between hover:bg-black-1 transition duration-150 ease-in-out truncate">
        <div class="w-full flex justify-between">
            <h6 class="truncate">{{content}}</h6>
            <h6 class="text-black-5">{{endContent}}</h6>
        </div>
    </button>
</template>

<script>
export default {
    props: { 
        content: {
            type: String
        },
        endContent: {
            type: String
        }
    },
};
</script>
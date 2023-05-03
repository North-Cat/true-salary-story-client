<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useUserStore } from '@/store/user';
  const user = useUserStore();
  const { currentUser } = storeToRefs(user);
  // console.log(currentUser.value);
  const { displayName } = currentUser.value;
  const title = displayName;

  useHead({
    title,
  });
</script>
<template>
  <div class="user pt-[130px]">
    <section>USER PAGE</section>
  </div>
</template>

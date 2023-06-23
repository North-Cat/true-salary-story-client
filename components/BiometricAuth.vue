<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const user = useUserStore();
const { currentUser } = storeToRefs(user);
const biometricEnabled = ref(false);

const { toggleBiometric } = user;

const toggleEnableBiometric = async () => {
  try {
    await toggleBiometric(biometricEnabled.value);
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => currentUser.value?.biometricEnable,
  (value) => {
    biometricEnabled.value = value;
  },
);

onMounted(() => {
  biometricEnabled.value = currentUser.value.biometricEnable;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center w-full bg-black-1 rounded-full">
      <label class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            v-model="biometricEnabled"
            type="checkbox"
            class="sr-only biometric-register"
            @change="toggleEnableBiometric"
          />
          <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
    </div>
  </div>
</template>

<style scoped>
.biometric-register:checked ~ .dot {
  transform: translateX(100%);
  background-color: #366bab;
}
</style>

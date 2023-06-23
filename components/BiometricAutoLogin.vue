<script lang="ts" setup>
const isChecked = ref(false);

const toggleChange = (value: boolean) => {
  if (value) {
    localStorage.setItem('biometricState', 'true');
  } else {
    localStorage.removeItem('biometricState');
  }
};

// Load the biometric state from localStorage when component is mounted
onMounted(() => {
  const biometricState = localStorage.getItem('biometricState');
  isChecked.value = biometricState === 'true';
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center w-full bg-black-1 rounded-full">
      <label class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            v-model="isChecked"
            type="checkbox"
            class="sr-only biometric-register"
            @change="toggleChange(isChecked)"
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

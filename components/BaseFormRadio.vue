<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  options: {
    type: Object,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: 'default',
    required: true,
  },
  placeholder: {
    type: String,
    default: '請選擇',
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: String,
    default: '',
  },
  isButtonStyle: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="text-black-10" :class="{ 'mb-2': !description }">{{ label }}</div>
  <span v-if="description" class="block mb-2 mt-1 text-sm text-black-6" v-text="description"></span>
  <div v-if="isButtonStyle" class="flex items-center justify-center">
    <label
      v-for="(item, $index) in options"
      :key="$index"
      :for="`${name}-${item.value}`"
      class="flex-1 releative cursor-pointer items-center inline-flex justify-start"
    >
      <input
        :id="`${name}-${item.value}`"
        type="radio"
        :value="item.value"
        :name="name"
        class="h-0 left-0 opacity-0 pointer-events-none absolute top-0 invisible width-0 appearance-none"
        @change="$emit('update:modelValue', item.value)"
      />
      <span
        class="bg-dark releative items-center flex justify-center py-3 w-full"
        :class="{
          'rounded-l': Number($index) === 0,
          'rounded-r': Number($index) === options.length - 1,
          'shadow-input bg-white text-blue': modelValue === item.value,
        }"
      >
        {{ item.text }}
      </span>
    </label>
  </div>
  <div v-else class="flex items-center justify-between">
    <label
      v-for="(item, $index) in options"
      :key="$index"
      :for="`${name}-${item.value}`"
      class="flex-1 releative cursor-pointer items-center inline-flex justify-start"
    >
      <input
        :id="`${name}-${item.value}`"
        type="radio"
        :value="item.value"
        :name="name"
        class="appearance-none w-[20px] h-[20px] relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-0 after:w-[15px] after:h-[15px] after:border after:border-black-6 after:border-solid after:rounded-full checked:after:border-[6px] checked:after:border-blue"
        :checked="item.value === modelValue"
        @change="$emit('update:modelValue', item.value)"
      />
      <span class="ml-2">{{ item.text }}</span>
    </label>
  </div>
</template>
<style scoped></style>

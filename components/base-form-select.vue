<script lang="ts" setup>
const emit = defineEmits(['update:modelValue']);
interface IOption {
  text: string,
  value: string | number
}
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Object,
    default: () => { }
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  inputName: {
    type: String,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '請選擇',
  }
})

import { onClickOutside } from '@vueuse/core'
const dropdown = ref(false)
const onChange = (val: string) => {
  emit('update:modelValue', val)
  dropdown.value = false
}
const selectText = computed(() =>
  props.options.find((item: IOption) => item.value === props.modelValue)?.text || ""
)
const target = ref(null)
onClickOutside(target, () => {
  dropdown.value = false
});

</script>
<template>
  <div class="w-full">
    <label :for="inputName" :class="{ 'mb-2': !description }">{{ label }}</label>
    <span v-if="description" v-html="description" class="block mt-1 mb-2 text-sm text-black-6"></span>
    <div ref="target" class="relative">
      <div class="relative block" @click.stop="dropdown = !dropdown">
        <input :id="inputName" :value="selectText" type="text" :name="inputName" :placeholder="placeholder" readonly
          class="w-full border border-black-1 rounded py-2 pl-4 pr-9">
        <slot>
          <span class="absolute inset-y-0 right-4 flex items-center">
            <i class="icomoon icon-right-arrow text-xs rotate-90"></i>
          </span>
        </slot>
      </div>

      <ul class="z-10 absolute mt-2 w-full rounded bg-gray shadow-input top-10 right-0 lefe-0 h-[336px] overflow-auto" s
        v-if="dropdown">
        <li v-for="(item) in options" class="cursor-pointer select-none p-3 hover:bg-blue hover:text-white"
          @click="onChange(item.value)">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>
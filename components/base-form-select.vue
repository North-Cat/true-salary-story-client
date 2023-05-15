<script lang="ts" setup>
  import { onClickOutside } from '@vueuse/core';

  const emit = defineEmits(['update:modelValue']);
  interface IOption {
    text: string;
    value: string | number;
  }
  const props = defineProps({
    modelValue: {
      type: [String, Number],
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
    hiddenLabel: {
      type: Boolean,
      default: false,
    },
  });
  const dropdown = ref(false);
  const onChange = (val: string) => {
    emit('update:modelValue', val);
    dropdown.value = false;
  };
  const selectText = computed(
    () =>
      props.options.find((item: IOption) => item.value === props.modelValue)
        ?.text || '',
  );
  const target = ref(null);
  onClickOutside(target, () => {
    dropdown.value = false;
  });
</script>
<template>
  <div class="w-full">
    <label
      v-if="!hiddenLabel"
      :for="name"
      :class="{ 'mb-2 block': !description, hidden: hiddenLabel }"
      >{{ label }}</label
    >
    <span
      v-if="description"
      class="block mt-1 mb-2 text-sm text-black-6"
      v-html="description"
    ></span>
    <div ref="target" class="relative">
      <div class="relative block" @click.stop="dropdown = !dropdown">
        <VField
          v-slot="{ errors }"
          v-model.trim="selectText"
          :name="name"
          :label="label"
          :type="type"
          :rules="required"
          readonly
          class="w-full border border-black-1 rounded py-2 pl-4 pr-9"
          :class="{ 'mt-2': hiddenLabel }"
          :placeholder="placeholder"
        />

        <!-- <input :id="name" :value="selectText" type="text" :name="name" :placeholder="placeholder" readonly
          class="w-full border border-black-1 rounded py-2 pl-4 pr-9"> -->
        <slot>
          <span
            class="absolute inset-y-0 right-4 flex items-center"
            :class="{ 'top-2': hiddenLabel }"
          >
            <i class="icomoon icon-right-arrow text-xs rotate-90"></i>
          </span>
        </slot>
      </div>
      <VErrorMessage :name="name" as="div" class="text-red" />
      <ul
        v-if="dropdown"
        class="z-10 absolute mt-2 w-full rounded bg-gray shadow-input top-10 right-0 lefe-0 h-[336px] overflow-auto"
        s
      >
        <li
          v-for="item in options"
          class="cursor-pointer select-none p-3 hover:bg-blue hover:text-white"
          @click="onChange(item.value)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style></style>

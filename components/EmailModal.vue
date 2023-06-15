<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
const user = useUserStore();
const { isCodeSent, isEmailUpdated } = storeToRefs(user);
withDefaults(
  defineProps<{
    isVisible: boolean;
  }>(),
  {
    isVisible: false,
  },
);
const emit = defineEmits(['close']);
const email = ref('');
const code = ref('');
const hasError = ref(false);
const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const onNext = () => {
  if (!regex.test(email.value)) {
    hasError.value = true;
    return;
  }
  hasError.value = false;
  user.fetchVerificationCode(email.value);
};
const closeHandler = () => {
  hasError.value = false;
  emit('close');
};
const updateHandler = async () => {
  const params = {
    verificationCode: code.value,
    newEmail: email.value,
  };
  await user.updateEmail(params);
  if (isEmailUpdated.value) emit('close');
};
</script>

<template>
  <teleport to="body">
    <div v-if="isVisible" class="z-10 fixed inset-0 flex items-center justify-center bg-black-3 bg-opacity-50">
      <div class="w-full max-w-lg p-6 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h4>變更通知信箱</h4>
          <button class="px-2 py-1 text-sm tracking-widest" @click="closeHandler">
            <i class="icon-cross text-lg"></i>
          </button>
        </div>
        <div class="mt-4">
          <div class="mb-4 body">
            <div class="min-h-[130px]">
              <label for="email" class="text-black-10">通知信箱</label>
              <input
                v-model.trim="email"
                name="email"
                label="通知信箱"
                type="text"
                class="w-full border border-black-1 rounded py-2 px-4 mt-2"
              />
              <p v-show="hasError" class="text-red">Email 格式錯誤</p>
            </div>
            <div class="flex justify-end">
              <BaseButton cate="secondary" :disabled="isCodeSent" @click="onNext">取得驗證碼</BaseButton>
            </div>
            <template v-if="isCodeSent">
              <label for="code" class="text-black-10">驗證碼</label>
              <input
                v-model.trim="code"
                name="code"
                label="驗證碼"
                maxlength="4"
                placeholder="- - - -"
                type="text"
                class="text-center w-full border border-black-1 rounded py-2 px-4 mt-2 mb-4"
              />
              <div class="flex flex-col">
                <BaseButton cate="primary" @click="updateHandler">變更通知信箱</BaseButton>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

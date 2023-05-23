import { computed } from 'vue';

export const useFeelingClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '非常開心':
      className = 'icon-face-good text-green';
      break;
    case '還算愉快':
      className = 'icon-face-good text-green';
      break;
    case '平常心':
      className = 'icon-face-normal text-yellow';
      break;
    case '有苦說不出':
      className = 'icon-face-bad text-red';
      break;
    case '想換工作了':
      className = 'icon-face-bad text-red';
      break;
  }
  return className;
});

export const useOvertimeClass = computed(() => (text: string) => {
  let className = '';
  switch (text) {
    case '準時上下班':
      className = 'icon-time-good text-green';
      break;
    case '很少加班':
      className = 'icon-time-good text-green';
      break;
    case '偶爾加班':
      className = 'icon-time-normal text-yellow';
      break;
    case '常常加班':
      className = 'icon-time-bad text-red';
      break;
    case '賣肝拼經濟':
      className = 'icon-time-bad text-red';
      break;
  }
  return className;
});

export const useNumberRange = computed(() => (number: number) => {
  let text = '-';
  let range = 0;
  if (number >= 100000) {
    // 若為六位數，範圍間距為 10k
    range = 10000;
  } else if (number >= 1000 && number < 100000) {
    // 若為四、五位數，範圍間距為 1k
    range = 1000;
  }

  let max = Math.ceil(number / range); // ceil 回傳大於等於所給數字的最大整數
  const min = Math.floor(number / range); // floor 回傳小於等於所給數字的最大整數
  max = min === max ? (max += 1) : max; // 若為整數 (例 40000) 依上述寫法會變成 40-40k， 則將上限加 1k 變為 40-41k

  if (number >= 100000) {
    text = `${min * 10} - ${max * 10}k`;
  } else if (number >= 1000 && number < 100000) {
    text = `${min} - ${max}k`;
  } else if (number > 0 && number < 1000) {
    text = '低於 1k';
  }
  return text;
});

export const useTruncateText = computed(() => (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
});

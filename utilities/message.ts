import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();

export function showInfo(title: string, text: string) {
  notify({
    title,
    text,
    type: 'info',
  });
}

export function showError(title: string, text: string) {
  notify({
    title,
    text,
    type: 'error',
  });
}

export function showSuccess(title: string, text: string) {
  notify({
    title,
    text,
    type: 'success',
  });
}

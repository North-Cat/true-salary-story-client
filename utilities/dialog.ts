import { useDialogStore } from '@/store/dialog';

/*
 *  用來顯示 Dialog 視窗，可設定「標題」、「內容」、「確認按紐文字」、「取消按紐文字」、「確認功能」、「取消功能」
 */
/**
 * 共用的 Dialog
 * @param {*} title             標題 預設「提示」
 * @param {*} message               內容
 * @param {*} confirmFunc       確認功能 function
 * @param {*} cancelFunc        取消功能 function
 * @param {*} confirmText       確認按鈕文字 預設「確認」
 * @param {*} cancelText        取消按鈕文字 預設「取消」
 * @param {*} showCancelBtn     是否顯示 Cancel Button
 */
function openDefaultDialog(
  showCancelBtn: boolean,
  title: string,
  message: string,
  confirmFunc: () => void,
  cancelFunc: () => void,
  confirmText?: string | undefined,
  cancelText?: string | undefined,
) {
  const dialogInfo = {
    showCancel: showCancelBtn,
    title,
    message,
    cancelText: cancelText || '取消',
    confirmText: confirmText || '確認',
    cancelFunc,
    confirmFunc,
  };
  const dialogStore = useDialogStore();
  // 將視窗資訊存入 store
  // @ts-ignore
  dialogStore.dialogInfo = dialogInfo;
  dialogStore.open(); // 開啟視窗
}

/**
 * @description  有確認、取消的 Modal
 */
export function openConfirmModal(
  title: string,
  message: string,
  confirmFunc: () => void,
  cancelFunc?: () => void,
  confirmText?: string,
  cancelText?: string,
) {
  cancelFunc = cancelFunc || closeModal;
  openDefaultDialog(true, title, message, confirmFunc, cancelFunc, confirmText, cancelText);
}

/**
 * @description  只有確認的 Modal
 */
export function openPromptModal(title: string, message: string, confirmFunc?: () => void, confirmText?: string) {
  confirmFunc = confirmFunc || closeModal;
  openDefaultDialog(false, title, message, confirmFunc, closeModal, confirmText, undefined);
}

function closeModal(): void {
  const dialogStore = useDialogStore();
  dialogStore.close(); // 關閉視窗
}

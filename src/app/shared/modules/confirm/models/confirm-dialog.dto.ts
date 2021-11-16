export interface ConfirmDialogDto {
  message: string;
  submitText: string;
  cancelText: string;
  submitFn: () => void;
  cancelFn?: () => void;
}

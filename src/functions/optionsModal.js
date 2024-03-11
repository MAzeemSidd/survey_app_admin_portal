import { Modal } from "antd";

export const optionsModal = (title, content, onOkFunc, onCancelFunc, okText='Ok', cancelText='Cancel') => {
  Modal.confirm({
    title: title,
    content: content,
    onOk(){onOkFunc();},
    onCancel(){onCancelFunc();},
    okText: okText,
    cancelText: cancelText
  });
}




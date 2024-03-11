import { Modal } from "antd";

export const optionsModal = (title, content, onOkFunc, onCancelFunc) => {
  Modal.confirm({
    title: title,
    content: content,
    onOk(){onOkFunc();},
    onCancel(){onCancelFunc();}
  });
}




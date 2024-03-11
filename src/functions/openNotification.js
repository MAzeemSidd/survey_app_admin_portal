import { notification } from "antd";

export const openNotification = (message, description) => {
  notification.error({
    message: message,
    description: description,
  });
};
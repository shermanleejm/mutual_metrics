import { message } from "antd";

export const successMsg = (msg: string) => {
  message.success({ content: msg, className: "success-msg" });
};
export const infoMsg = (msg: string) => {
  message.info({ content: msg, className: "info-msg" });
};
export const errorMsg = (msg: string) => {
  message.error({ content: msg, className: "error-msg" });
};

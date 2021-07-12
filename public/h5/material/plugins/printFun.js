/*
 * @Autor: 邓易
 * @Date: 2021-03-17 09:22:56
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-17 09:29:52
 */
import print from "./printarea";

export const printFun = () => {
  let ele = document.getElementById("print");
  ele.innerHTML = "";
  let form = document.getElementById("ruleform1").cloneNode(true);
  let textNode = document.querySelector(".ql-editor").cloneNode(true);
  let icons = [...form.querySelectorAll("i.iconfont")];
  let radios = [...form.querySelectorAll(".el-radio")];
  let file_node = [...form.querySelectorAll(".file-node")];
  file_node.forEach(item => {
    item.parentNode.removeChild(item);
  });
  icons.forEach(item => {
    item.parentNode.removeChild(item);
  });
  radios.forEach(item => {
    if (!item.classList.contains("is-checked")) {
      item.parentNode.removeChild(item);
    } else {
      item.querySelector(".el-radio__label").style.color = "#606266";
    }
  });
  ele.appendChild(form);
  ele.appendChild(textNode);
  new print({
    ids: "print", // * 局部打印必传入id
    standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
    extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
    extraCss: "", // 额外的css连接，多个逗号分开
    popTitle: "", // title的标题
    endCallback() {
      // 调用打印之后的回调事件
      ele.innerHTML = "";
      ele = null;
    },
  });
};

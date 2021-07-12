
// 数字加逗号
export const parseFormatNum = (number, n = 2) => {
  let str = "";
  if (number < 0) {
    str = "-";
    number = 0 - number;
  }
  if (n != 0) {
    n = n > 0 && n <= 20 ? n : 2;
  }
  number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let sub_val = number
    .split(".")[0]
    .split("")
    .reverse();
  let sub_xs = number.split(".")[1];
  let show_html = "";
  for (let i = 0; i < sub_val.length; i++) {
    show_html +=
      sub_val[i] + ((i + 1) % 3 == 0 && i + 1 != sub_val.length ? "," : "");
  }
  if (n == 0) {
    return (
      str +
      show_html
        .split("")
        .reverse()
        .join("")
    );
  } else {
    return (
      str +
      show_html
        .split("")
        .reverse()
        .join("") +
      "." +
      sub_xs
    );
  }
};

export const parseBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

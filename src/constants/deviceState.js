/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-28 16:56:13
 */
export const stateArr = [
  "运行",
  "维修",
  "保养",
  "闲置",
  "待报废",
  "已报废",
  "调拨确认",
  "待调拨",
  "已调拨",
  "待退场",
  "已退场",
  "待确认",
];
export const colorArr = [
  "",
  "#3FDE34",
  "#3377FF",
  "#3377FF",
  "#FD5672",
  "#FF8F2A",
  "#8e95a7",
  "#7948EA",
  "#FF8F2A",
  "#3377FF",
  "#FF8F2A",
  "#8e95a7",
  "#7948EA",
];
export const bgColorArr = [
  "",
  "#E4FBD8",
  "#DEE9FF",
  "#DEE9FF",
  "#FFE4E4",
  "#FFF4DE",
  "#E9E8EF",
  "#C9BAEE",
  "#FFF4DE",
  "#DEE9FF",
  "#FFF4DE",
  "#E9E8EF",
  "#C9BAEE",
];

export const ownStateArr = [
  { lable: "运行", value: 1 },
  { lable: "闲置", value: 4 },
  { lable: "待报废", value: 5 },
  { lable: "已报废", value: 6 },
  { lable: "待调拨", value: 8 },
  { lable: "已调拨", value: 9 },
  { lable: "待确认", value: 12 },
  { lable: "调拨确认", value: 7 },
];
export const leaseStateArr = [
  { lable: "运行", value: 1 },
  { lable: "闲置", value: 4 },
  { lable: "待报废", value: 5 },
  { lable: "已报废", value: 6 },
  { lable: "待退场", value: 10 },
  { lable: "已退场", value: 11 },
  { lable: "待确认", value: 12 },
];

export const deviceArr1 = [
  { text: "运行", color: "#3FDE34", state: 1 },
  { text: "保养", color: "#FFC500", state: 3 },
  { text: "维修", color: "#FF8F2A", state: 2 },
  { text: "调拨", color: "#3377FF", state: 9 },
  { text: "闲置", color: "#FD5571", state: 4 },
  { text: "报废", color: "#4B5670", state: 6 },
];
export const deviceArr2 = [
  { text: "运行", color: "#3FDE34", state: 1 },
  { text: "保养", color: "#FFC500", state: 3 },
  { text: "维修", color: "#FF8F2A", state: 2 },
  { text: "闲置", color: "#FD5571", state: 4 },
  { text: "退场", color: "#4B5670", state: 11 },
];

/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-09 11:06:20
 */
import Tip from "./Tips/index.js";
import nodata from "./nodata";
import search from "./search";
import button from "./button";
import StatusButton from "./StatusButton";
import dialog from "./dialog";
import Scroll from "./Scroll";
import TreeSelect from "./TreeSelect/treeSelect.vue";
import TreeMulti from "./TreeMulti/index.vue";
import Tree from "./Tree/index.vue";
import Editor from "./Editor";
import BackTop from "./BackTop";
import AddItemContent from "./AddItemContent";
import ChoosePerson from "./ChoosePerson";
import BarChart from "@/components/common/Chart/barChart.vue";
import BarColor from "@/components/common/Chart/barColor";
import LineChart from "@/components/common/Chart/lineChart.vue";
import doubleRing from "@/components/common/Chart/doubleRing.vue";
import FullPie from "@/components/common/Chart/fullPie.vue";
import FullPie2 from "@/components/common/Chart/fullPie2.vue";
import Line from "@/components/common/lineCharts/index.vue";
import InfoItem from "./InfoItem/index.vue";
import InfoTitle from "./InfoTitle/index.vue";
import PicInfo from "./PicInfo/index.vue";
import FileInfo from "./FileInfo/index.vue";
import VideoInfo from "./VideoInfo/index.vue";

import PicUpload from "./PicUpload/index.vue";
import FileUpload from "./FileUpload/index.vue";
import NewFileUpload from "./FileUpload1/index.vue";
import VideoUpload from "./VideoUpload/index.vue";
import Video from "@/components/common/Video/index.vue";
import ApprovalProcess from "./ApprovalProcess/index.vue";
import NumInput from "./NumInput";

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.component("nNodata", nodata);
  Vue.component("nSearch", search);
  Vue.component("nButton", button);
  Vue.component("nStatusButton", StatusButton);
  Vue.component("nDialog", dialog);
  Vue.component("nScroll", Scroll);
  Vue.component("nTreeselect", TreeSelect);
  Vue.component("nTreeMulti", TreeMulti);
  Vue.component("nTree", Tree);
  Vue.component("nEditor", Editor);
  Vue.component("nBackTop", BackTop);
  Vue.component("nAddItemContent", AddItemContent);
  Vue.component("nChoosePerson", ChoosePerson);
  Vue.component("nBarChart", BarChart);
  Vue.component("nBarColor", BarColor);
  Vue.component("nLineChart", LineChart);
  Vue.component("nDoubleRing", doubleRing);
  Vue.component("nFullPie", FullPie);
  Vue.component("nFullPie2", FullPie2);
  Vue.component("nLine", Line);
  Vue.component("nInfoItem", InfoItem);
  Vue.component("nInfoTitle", InfoTitle);
  Vue.component("nPicInfo", PicInfo);
  Vue.component("nFileInfo", FileInfo);
  Vue.component("nVideoInfo", VideoInfo);
  Vue.component("nPicUpload", PicUpload);
  Vue.component("nFileUpload", FileUpload);
  Vue.component("nNewFileUpload", NewFileUpload);
  Vue.component("nVideoUpload", VideoUpload);
  Vue.component("nApprovalProcess", ApprovalProcess);
  Vue.component("NumInput", NumInput);
  Vue.component("nVideo", Video);

  Vue.prototype.$tip = Tip.tip;
}

export default plugin;

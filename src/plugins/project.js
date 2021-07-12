// 判断是否满足大小里程
function conputedMileFun(
  that,
  type1,
  start_l,
  start_r,
  end_l,
  end_r,
  item,
) {
  let pre_start = item
    ? item[start_l] * 1000 + Number(item[start_r])
    : that[start_l] * 1000 + Number(that[start_r]);
  let pre_end = item
    ? item[end_l] * 1000 + Number(item[end_r])
    : that[end_l] * 1000 + Number(that[end_r]);
  let lengths = pre_start - pre_end;
  //小里程判断
  if (type1 == 2) {
    if (pre_start < pre_end) {
      that.$tip({
        isTip: true,
        message: '起始桩号要大于终止桩号'
      });
      item ? (item[end_l] = '') : (that[end_l] = '');
      item ? (item[end_l] = '') : (that[end_r] = '');
      return;
    } else {
      return lengths;
    }
  } else {
    if (pre_start > pre_end) {
      that.$tip({
        isTip: true,
        message: '起始桩号要小于终止桩号'
      });
      item ? (item[end_l] = '') : (that[end_l] = '');
      item ? (item[end_l] = '') : (that[end_r] = '');
      return;
    } else {
      return lengths;
    }
  }
}
//计算里程
function conputedMile(start, length, type) {
  let s1 = start.split('+')[0];
  let s2 = start.split('+')[1];
  //大里程
  if (type == 1) {
    let computeLength = Number(length) + Number(s2);
    if (computeLength < 1000) {
      return s1 + '+' + Number(computeLength).toFixed(3);
    } else {
      let end1 = Math.floor(computeLength / 1000);
      let end2 = Math.floor(computeLength % 1000);
      return Number(s1) + end1 + '+' + end2.toFixed(3);
    }
  } else {
    let computeLength = Number(s2) - Number(length);
    //小里程
    if (computeLength < 0) {
      let end1 = Math.floor(computeLength / 1000);
      let end2 = Math.floor(computeLength % 1000);
      return Number(s1) + end1 + '+' + (1000 + end2).toFixed(3);
    } else {
      return s1 + '+' + Number(computeLength).toFixed(3);
    }
  }
}
// 判断是否在预报范围内(t:1——表示只有一个桩号;;有item 表示不是直接通过this.**来取值)
function conputedRangeFun(
  that,
  length,
  start_l,
  start_r,
  end_l,
  end_r,
  range_start,
  range_end,
  type,
  t,
  item,
  ind,
  bool
) {
  let range_start_s =
    range_start.split('+')[0] * 1000 + Number(range_start.split('+')[1]);
  let range_end_s =
    range_end.split('+')[0] * 1000 + Number(range_end.split('+')[1]);
  if (t == 1) {
    let pileSingle;
    if (item) {
      pileSingle = item[start_l] * 1000 + Number(item[start_r]);
    } else {
      pileSingle = that[start_l] * 1000 + Number(that[start_r]);
    }
    if (type == 2) {
      //小里程
      if (pileSingle > range_start_s || pileSingle < range_end_s) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        item ? (item[start_l] = '') : (that[start_l] = '');
        item ? (item[start_r] = '') : (that[start_r] = '');
        return false;
      }
    } else if (type == 3 || type == 1) {
      if (pileSingle < range_start_s || pileSingle > range_end_s) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        item ? (item[start_l] = '') : (that[start_l] = '');
        item ? (item[start_r] = '') : (that[start_r] = '');
        return false;
      }
    }
  } else {
    let pre_start = item
      ? item[start_l] * 1000 + Number(item[start_r])
      : that[start_l] * 1000 + Number(that[start_r]);
    let pre_end = item
      ? item[end_l] * 1000 + Number(item[end_r])
      : that[end_l] * 1000 + Number(that[end_r]);
    let lengths = pre_start - pre_end;
    if (type == 2) {
      //小里程
      if (
        pre_start > range_end_s ||
        pre_end < range_start_s ||
        pre_end > pre_start
      ) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        if (!bool) {
          item ? (item[start_l] = '') : (that[start_l] = '');
          item ? (item[start_r] = '') : (that[start_r] = '');
        }
        item ? (item[end_l] = '') : (that[end_l] = '');
        item ? (item[end_r] = '') : (that[end_r] = '');
        // item ? that['info']['situation_list'][ind][length] = '' : that['info'][length] = '';
        return false;
      } else {
        return lengths;
      }
    } else if (type == 1) {
      if (
        pre_start < range_start_s ||
        pre_end > range_end_s ||
        pre_end < pre_start
      ) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        if (!bool) {
          item ? (item[start_l] = '') : (that[start_l] = '');
          item ? (item[start_r] = '') : (that[start_r] = '');
        }
        item ? (item[end_l] = '') : (that[end_l] = '');
        item ? (item[end_r] = '') : (that[end_r] = '');
        return false;
      } else {
        return lengths;
      }
    }
  }
}

//
function conputedRangeFunFromK3(
  that,
  length,
  start_l,
  start_r,
  end_l,
  end_r,
  range_start,
  range_end,
  type,
  t,
  item,
  ind,
  bool
) {
  let range_start_s =
    range_start.split('+')[0] * 1000 + Number(range_start.split('+')[1]);
  let range_end_s =
    range_end.split('+')[0] * 1000 + Number(range_end.split('+')[1]);
  let pre_start = item
    ? item[start_l] * 1000 + Number(item[start_r])
    : that[start_l] * 1000 + Number(that[start_r]);
  let pre_end = item
    ? item[end_l] * 1000 + Number(item[end_r])
    : that[end_l] * 1000 + Number(that[end_r]);
  let lengths = pre_start - pre_end;
  if (t == 1) {
    if (
      pre_start >= range_start_s &&
      pre_start <= range_end_s &&
      pre_end >= range_start_s &&
      pre_end <= range_end_s
    ) {
      return lengths;
    } else {
      that.$tip({
        isTip: true,
        message: '起止桩号不在范围内'
      });
      if (!bool) {
        item ? (item[start_l] = '') : (that[start_l] = '');
        item ? (item[start_r] = '') : (that[start_r] = '');
      }
      item ? (item[end_l] = '') : (that[end_l] = '');
      item ? (item[end_r] = '') : (that[end_r] = '');
      // item ? that['info']['situation_list'][ind][length] = '' : that['info'][length] = '';
      return false;
    }
  } else {
    if (type == 2) {
      //小里程
      if (
        pre_start > range_start_s ||
        pre_end < range_end_s ||
        pre_end > pre_start
      ) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        if (!bool) {
          item ? (item[start_l] = '') : (that[start_l] = '');
          item ? (item[start_r] = '') : (that[start_r] = '');
        }
        item ? (item[end_l] = '') : (that[end_l] = '');
        item ? (item[end_r] = '') : (that[end_r] = '');
        // item ? that['info']['situation_list'][ind][length] = '' : that['info'][length] = '';
        return false;
      } else {
        return lengths;
      }
    } else if (type == 1) {
      if (
        pre_start < range_start_s ||
        pre_end > range_end_s ||
        pre_end < pre_start
      ) {
        that.$tip({
          isTip: true,
          message: '起止桩号不在范围内'
        });
        if (!bool) {
          item ? (item[start_l] = '') : (that[start_l] = '');
          item ? (item[start_r] = '') : (that[start_r] = '');
        }
        item ? (item[end_l] = '') : (that[end_l] = '');
        item ? (item[end_r] = '') : (that[end_r] = '');
        return false;
      } else {
        return lengths;
      }
    }
  }
}

export default {
  conputedMile,
  conputedMileFun,
  conputedRangeFun,
  conputedRangeFunFromK3
};

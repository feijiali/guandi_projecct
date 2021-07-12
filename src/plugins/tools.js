import md5 from 'js-md5'
import AsyncValidator from 'async-validator'
import api from '@/api/index'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import XLSX from 'xlsx'
//季度插件
dayjs.extend(quarterOfYear)

// 简单合并列表的listQuery、没有递归
function mergeListQuery(parent, child) {
  for (const key in child) {
    parent[key] = child[key]
  }
  return parent
}

/**
 * 获取本周，本日，本季，本年
 * type
 * 'date'本日'，'week'本周，'month'本月，'quarter'本季，'year'本年
 */
function getHours(value) {
  if (!isNaN(value)) {
    let secondTime = parseInt(value) // 秒
    let minuteTime = 0 // 分
    let hourTime = 0 // 小时
    // let datTime = 0; // 天
    if (secondTime >= 60) {
      //如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60)
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60)
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60)
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60)
        // if (hourTime > 24) {
        //   //获取天，获取小时除以24，得到整数天
        //   datTime = parseInt(hourTime / 24);
        //   //获取天后取佘的小时，获取小时除以24取佘的小时
        //   hourTime = parseInt(hourTime % 24);
        // }
      }
    }
    // var result = "" + parseInt(secondTime) + "秒";
    let result = ''
    if (minuteTime > 0) {
      result = '' + parseInt(minuteTime) + '分' + result
    }
    if (hourTime > 0) {
      result = '' + parseInt(hourTime) + '小时' + result
    }
    // if (datTime > 0) {
    //   result = "" + parseInt(datTime) + "天" + result;
    // }
    return result ? result : 0
  } else {
    return value
  }
}
function getComputeDate(type, format = 'YYYY-MM-DD') {
  let startDate, endDate
  let dateArr = []
  startDate = dayjs()
    .startOf(type)
    .format(format)
  endDate = dayjs()
    .endOf(type)
    .format(format)
  dateArr.push(startDate, endDate)
  return dateArr
}
// md5加密
function calcuMD5(pwd) {
  pwd = pwd.toUpperCase()
  pwd = md5(pwd)
  return pwd
}
//数字返回2位数
function numLen(num) {
  num = num + ''
  return num.length == 1 ? 0 + num : num
}
//手机号隐藏中间四位
function hidePartOfPhoneNum(num) {
  num = num.toString()
  return num.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

//dayjs时间格式化
function parseDate2Str(date, format) {

  format = format || 'YYYY-MM-DD HH:mm:ss'  //dayjs文档https://www.cnblogs.com/cjrfan/p/9154539.html
  return dayjs(date).format(format)
}
//时间转化
function formatDate(data) {
  return data.toString().replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
}
// 时间格式化
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
/**
 *获取几个月前的输入日期
 *{param:DateTime} date 输入日期(YYYY-MM-DD)
 *{param:number } monthNum 月数
 */
function getPreMonthDay(date, monthNum) {
  var dateArr = date.split('-')
  var year = dateArr[0] //获取当前日期的年份
  var month = dateArr[1] //获取当前日期的月份
  var day = dateArr[2] //获取当前日期的日
  var days = new Date(year, month, 0)
  days = days.getDate() //获取当前日期中月的天数
  var year2 = year
  var month2 = parseInt(month) - monthNum
  if (month2 <= 0) {
    var absM = Math.abs(month2)
    year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12)
    month2 = 12 - (absM % 12)
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}
// 数据换行处理
function dataFormatter(data, num) {
  data = String(data)
  if (data) {
    let datas = data.replace(/\r?\n/g, '<br />')
    return num
      ? datas.length > 200
        ? datas.substr(0, num)
        : data.replace(/\r?\n/g, '<br />')
      : data.replace(/\r?\n/g, '<br />')
  } else {
    return ''
  }
}
//时间格式化
function getCurrentTime(sj, year, month, sf, m, fg) {
  var date = sj || sj === 0 ? new Date(parseInt(sj) * 1000) : new Date(),
    mouth = numLen(date.getMonth() + 1),
    day = numLen(date.getDate()),
    resT =
      date.getFullYear() +
      (fg == 1 ? '年' : '-') +
      mouth +
      (fg == 1 ? '月' : '-') +
      day +
      (fg == 1 ? '日' : '')
  if (year == 'year') {
    resT = date.getFullYear() + ''
  }
  if (month == 'month') {
    resT = date.getFullYear() + (fg == 1 ? '年' : '-') + mouth
  }
  // if (month == 'month') {
  //   resT = date.getFullYear() + (fg == 1 ? '年' : '-') + mouth + (fg == 1 ? '年' : '-') + day
  // }
  if (sf == 'sf') {
    resT += ' ' + numLen(date.getHours()) + ':' + numLen(date.getMinutes())
  }
  if (m == 'm') {
    resT += ':' + numLen(date.getSeconds())
  }
  if (resT.indexOf('1970') >= 0) {
    resT = ''
  }
  return resT
}
function judgeTime(time) {
  let s = Number(time.split(' ')[1].split(':')[0])
  return s > 12 ? 2 : 1
}
//获取当前日期的前几天或者后几天日期
function fun_date(day) {
  var date1 = new Date(),
    time1 =
      date1.getFullYear() + '-' + numLen(date1.getMonth() + 1) + '-' + numLen(date1.getDate()) //time1表示当前时间
  var date2 = new Date(date1)
  date2.setDate(date1.getDate() + day)
  var time2 =
    date2.getFullYear() + '-' + numLen(date2.getMonth() + 1) + '-' + numLen(date2.getDate())
  return time2
}
//获取前一个月时间数组
function getLastMonth() {
  let arr = []
  arr[0] = fun_date(-30)
  arr[1] = getCurrentTime()
  return arr
}

// 获取对象的长度
function objLength(input) {
  let type = toString(input)
  let length = 0
  if (type !== '[object Object]') {
    // throw '输入必须为对象{}！'
  } else {
    for (let key in input) {
      if (key !== 'number') {
        length++
      }
    }
  }
  return length
}
function getDaysBetween(dateString1, dateString2, type) {
  var startDate = Date.parse(dateString1)
  var endDate = Date.parse(dateString2)
  let time
  if (type == 'day' || !type) {
    time = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
  } else if (type == 'min') {
    time = (endDate - startDate) / (1 * 24 * 60)
  }
  return time
}
// 验证是否是手机号码
function vailPhone(number) {
  let flag = true
  let myreg = /^(1[0-9]{10})$/
  if (!number || number.length !== 11 || !myreg.test(number)) {
    flag = false
  }
  return flag
}

// 验证是身份证号
function vailIdCard(number) {
  let flag = true
  let myreg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  if (!myreg.test(number)) {
    flag = false
  }
  return flag
}

// 验证是否是数字
function vailNumber(number) {
  let flag = true
  let myreg = /^\d+$|^\d+[.]?\d+$/
  if (!number || !myreg.test(number)) {
    flag = false
  }
  return flag
}

//获取某个月的天数
function getMonthDays(str) {
  var selectedDate = new Date(str)
  var selectedMonth = selectedDate.getMonth() + 1
  selectedDate.setMonth(selectedMonth)
  selectedDate.setDate(0)
  var dayMany = selectedDate.getDate()
  return dayMany
}
//获取当月多少天
function getDayNum(date) {
  var curDate = date ? new Date(date) : new Date()
  var curMonth = curDate.getMonth()
  curDate.setMonth(curMonth + 1)
  curDate.setDate(0)
  return curDate.getDate()
}
// 浮点型加法函数
function accAdd(arg1, arg2, isFixed = true) {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  if (isFixed)
    return ((arg1 * m + arg2 * m) / m).toFixed(2)
  else
    return ((arg1 * m + arg2 * m) / m)
}

//  遍历对象属性和值
function displayProp(obj) {
  let names = ''
  for (let name in obj) {
    names += name + obj[name]
  }
  return names
}

//  去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/g, '')
}
// 去除字符串首尾空格
function trimFun(str) {
  //去掉首尾两端的空格(^\s*)|(\s*$)
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 数组去重
function unique(arr) {
  return Array.from(new Set(arr))
}
// 编辑数据时渲染表单
function renderRuleForm(that, json, dataObj, list) {
  json.forEach((item, index) => {
    that.$set(dataObj, item, list[item])
  })
}
function imgToBase64(url) {
  return new Promise(resolve => {
    // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
    let Img = new Image()
    Img.src = url
    Img.onload = () => {
      // 要先确保图片完整获取到，这是个异步事件
      let dataURL = ''
      let canvas = document.createElement('canvas') // 创建canvas元素
      let width = Img.width // 确保canvas的尺寸和图片一样
      let height = Img.height
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(Img, 0, 0, width, height) // 将图片绘制到canvas中
      dataURL = canvas.toDataURL('image/jpeg') // 转换图片为dataURL
      resolve(dataURL)
    }
  })
}
// canvas.toDataURL 转换为文件
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
//表单校验提示信息
/*
  obj: vue页面的this对象。
  ruleForm:表单验证规则，为数组类型 如： 
  must: [ {must: [], tip: []}, {must: [], tip: []}]
  data: 需要校验的数据 如：
  form: {account:"", pwd:"", test:{number: "", price:""}}
  secondKey:如果data下面的属性仍为对象，则需要二级校验，此时需要传递一个数组，
  按照must第二个开始的顺序传递data下面的二级属性名,比如上面的form，此时需要这样传参：
  ruleFormTip(this, must, form, ["test"])

  */
function ruleFormTip(obj, ruleForm, data, secondKey) {
  var j = 0
  for (let item of ruleForm) {
    if (j == 0) {
      for (let [i, k] of item.must.entries()) {
        if (!data[k] && data[k] !== 0) {
          obj.$tip({
            isTip: true,
            message: item.tip[i] + '！'
          })
          return false
        }
      }
    } else {
      for (let [i, k] of item.must.entries()) {
        if (!data[secondKey[j - 1]][k]) {
          obj.$tip({
            isTip: true,
            message: item.tip[i] + '！'
          })
          return false
        }
      }
    }
    j++
  }
  return true
}

/**
 *
 * @param {*} obj vue页面的this对象。
 * @param {*} rule 表单验证规则,直接写element表单验证规则就行了
 * @param {*} data 表单数据
 */
function ruleFormPro(obj, rule, data) {
  let flag = true
  for (let item in rule) {
    if (!flag) {
      break
    }
    // 校验当前项：依赖async-validate
    let descriptor = { [item]: rule[item] }
    let validator = new AsyncValidator(descriptor)
    validator.validate({ [item]: data[item] }, errors => {
      if (errors) {
        // 校验失败
        obj.$tip({
          isTip: true,
          message: errors[0].message
        })
        flag = false
      }
    })
  }
  return flag
}

// 比较时间大小
function timeDiff(startTime, endTime, equalIncluded) {
  if (startTime && endTime) {
    var start = new Date(startTime).getTime()
    var end = new Date(endTime).getTime()
    var hour = Math.floor((end - start) / 1000 / 3600)
    if (start < end) return true
    if (!equalIncluded && start == end) return true
    return false
  } else {
    return true
  }
}
// 获取文件类型
function getFileType(filePath) {
  var startIndex = filePath.lastIndexOf('.')
  if (startIndex != -1) return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
  else return ''
}
//  格式化文件大小
function renderSize(value) {
  if (null == value || value == '') {
    return '0 Bytes'
  }
  var unitArr = new Array('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB')
  var index = 0,
    srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  //  保留的小数位数
  size = size.toFixed(2)
  return size + unitArr[index]
}
// 编辑数据时渲染图片
/**
 * @param {Object} fileArr  文件数组对象
 * @param {Object} fileListobj  要被赋值的数组
 * @param {Object} t   类型
 */
function renderFile(fileArr, fileListobj, t, nameArr) {
  if (fileArr.length) {
    //编辑的时候如果有图片，则遍历图片，push到fileList中（不能直接push进去，要push json对象）
    fileArr.map((item, index) => {
      console.log(item.file_json)
      let json = {}
      if (t == 'file') {
        //判断是否是object，是的话表示是草稿箱的文件
        json.file_json = (typeof item.file_json == 'object') ? item.file_json : item.file_json ? JSON.parse(item.file_json) : ''
        json.name = item.org_name //用于显示原文件名字
        json.file_name = item.file_name //用于编辑时候没有改变文件时传给后台的名字
        json.size = item.file_size
        json.url = item.url
        fileListobj.push(json)
      } else if (t == 'video') {
        json.file_json = (typeof item.file_json == 'object') ? item.file_json : item.file_json ? JSON.parse(item.file_json) : ''
        json.name = item.org_name
        json.file_name = item.file_name //用于编辑时候没有改变文件时传给后台的名字
        json.url = item.url
        fileListobj.push(json)
      } else if (t == 'pic') {
        //判断是否是object，是的话表示是草稿箱的文件
        json.file_json = (typeof item.file_json == 'object') ? item.file_json : item.file_json ? JSON.parse(item.file_json) : ''
        json.file_name = item.file_name ? item.file_name : nameArr[index] //用于编辑时候没有改变文件时传给后台的名字
        json.url = item.url ? item.url : item
        fileListobj.push(json)
      }
    })
  } else {
    fileListobj = []
  }
}
/**
 * @name: uploadFile
 * @msg:文件上传
 * @param {Array} keys 在data中定义的存放文件列表的字段，
 * @return:Promise
 */
function uploadFile(keys, obj, that, callback) {
  let _this = that ? that : this
  let fileInfoList = []
  let fileNeedUpload = []
  function createFile(file) {
    let result = {}
    result.file_json = JSON.parse(file.file_json)
    result.name = file.org_name //用于显示原文件名字
    result.file_name = file.file_name
    result.size = file.file_size
    result.url = file.url
    return result
  }
  for (let i = 0; i < keys.length; i++) {
    let fileInfo = {
      fileUploaded: [],
      fileNumOfNeedUploaded: 0,
      key: keys[i]
    }
    for (let file of this[keys[i]]) {
      if (file.raw) {
        fileNeedUpload.push(file.raw)
        ++fileInfo.fileNumOfNeedUploaded
      } else {
        fileInfo.fileUploaded.push(file)
      }
    }
    fileInfoList.push(fileInfo)
  }
  if (fileNeedUpload.length > 0) {
    return _this.uploadFile(fileNeedUpload, obj, '', callback).then(res => {
      let result = res.result
      for (let fileInfo of fileInfoList) {
        let files = result.splice(0, fileInfo.fileNumOfNeedUploaded)
        for (let file of files) {
          fileInfo.fileUploaded.push(createFile(file))
        }
        this[fileInfo.key] = fileInfo.fileUploaded
      }
    })
  } else {
    return Promise.resolve()
  }
  // if (fileNeedUpload.length > 0) {
  //   let FD = new FormData();
  //   for (let value of fileNeedUpload) {
  //     FD.append("uploadFile", value);
  //   }
  //   return import("../api/index")
  //     .then(({ default: api }) => {
  //       return api.uploadFile(FD);
  //     })
  //     .then((res) => {
  //       let result = res.result;
  //       for (let fileInfo of fileInfoList) {
  //         let files = result.splice(0, fileInfo.fileNumOfNeedUploaded);
  //         for (let file of files) {
  //           fileInfo.fileUploaded.push(createFile(file));
  //         }
  //         this[fileInfo.key] = fileInfo.fileUploaded;
  //       }
  //     });
  // } else {
  //   return Promise.resolve();
  // }
}
// 文件类型判断
function beforeAvatarUpload(file, type, that) {
  const IMG_ALLOWD = ['jpeg', 'jpg', 'gif', 'png', 'bmp', 'pic'] //图片支持格式
  const VIDEO_ALLOWD = ['avi', 'wmv', 'mp4', 'mov', 'mkv', 'flv', 'm4v', 'rmvb'] //视频支持格式
  const TABEL_ALLOWD = ['xlsx', 'xls'] //表格文件支持格式
  const fileType = file.raw.type.split('/')[1]
  const imgSize = file.size / 1024 / 1024
  if (type == 'img') {
    if (IMG_ALLOWD.indexOf(fileType) === -1) {
      that.$tip({
        isTip: true,
        message: '上传图片格式错误！'
      })
      return false
    }
  } else if (type == 'video') {
    if (VIDEO_ALLOWD.indexOf(fileType) === -1) {
      that.$tip({
        isTip: true,
        message: '上传视频格式错误！'
      })
      return false
    }
  } else if (type == 'file') {
    if (
      IMG_ALLOWD.indexOf(fileType) !== -1 ||
      VIDEO_ALLOWD.indexOf(fileType) !== -1 ||
      VIDEO_ALLOWD.indexOf(fileType) !== -1
    ) {
      that.$tip({
        isTip: true,
        message: '上传文件格式错误！'
      })
      return false
    }
  }
  if (imgSize >= 100) {
    // 判断图片大小
    that.$tip({
      isTip: true,
      message: '文件大小大于100M！'
    })
    return false
  } else {
    return true
  }
}
//去除字符串前后的空格
function trim(str) {
  if (str && typeof str === 'string') {
    return str.replace(/(^\s*)|(\s*)$/g, '') //去除前后空白符
  }
}
// 合并json数据
function jsonCombine(j1, j2, j3) {
  let resJ = {}
  for (let i in j1) {
    resJ[i] = j1[i]
  }
  for (let i in j2) {
    resJ[i] = j2[i]
  }
  if (j3.length != 0) {
    for (let i in j3) {
      resJ[i] = j3[i]
    }
  }
  return resJ
}
//深拷贝
function cloneObj(d) {
  return JSON.parse(JSON.stringify(d))
}
//获取图表数据里的最大值，数据格式为： arr[{data: []}] 返回的是arr中所有的data里最大的一个值
function getMax(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let itemArr = arr[i].data.sort((a, b) => {
      return b - a
    })
    result.push(itemArr[0])
  }
  return result.sort((a, b) => {
    return b - a
  })[0]
}
function getDateDiff(dateTimeStamp) {
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let halfamonth = day * 15
  let month = day * 30
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  let result
  if (diffValue < 0) {
    return
  }
  let monthC = diffValue / month
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute
  if (monthC >= 1) {
    // result="" + parseInt(monthC) + "月前";
    result = getCurrentTime(
      dateTimeStamp.substring(0, dateTimeStamp.length - 3),
      '',
      '',
      'sf',
      'm'
    )
  } else if (weekC >= 1) {
    // result="" + parseInt(weekC) + "周前";
    result = getCurrentTime(
      dateTimeStamp.substring(0, dateTimeStamp.length - 3),
      '',
      '',
      'sf',
      'm'
    )
  } else if (dayC >= 1) {
    result = getCurrentTime(
      dateTimeStamp.substring(0, dateTimeStamp.length - 3),
      '',
      '',
      'sf',
      'm'
    )
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else result = '刚刚'
  return result
}
// 导出标记
let export_flag = true
// 导出
async function handleExport(name, params, fileName, bool) {
  if (export_flag) {
    export_flag = false
    setTimeout(() => {
      export_flag = true
    }, 2000)
    let reSetparams = JSON.parse(JSON.stringify(params))
    reSetparams.page = -1
    let data = await api[name](reSetparams)
    downloadfile(data.result[0].url, fileName, bool, params)
  }
}

// 通用下载方法
function downloadfile(url, fileName, bool, params) {
  let isXLSX = url.includes('.xls')
  url = url + (isXLSX ? '' : '.xlsx')
  let urlName = url.split('/')[url.split('/').length - 1] //文件名
  fileName = (fileName ? (bool ? fileName.split('.')[0] + ' ' + params.search_time : fileName.split('.')[0] + '-' + urlName) : url) + (isXLSX ? '' : '.xlsx') //图片名
  downloadNormalfile(url, fileName)
}
// 别改了
function downloadNormalfile(url, fileName) {
  let alink = document.createElement('a')
  alink.href = url
  alink.target = '_blank'
  alink.download = fileName //图片名
  alink.click()
}
// 处理浮点数精度失真问题 可作为保留小数点
function float_point(num, len) {
  // num：目标数字 len:小数点儿保留位数 如果没有小数，则返回整数
  var str = ''
  str = num + ''
  if (str.indexOf('.') != -1) {
    var little = str.split('.')[1]
    if (little.length > len) {
      //如果有小数，并且小数位数大于2位，则保留2位
      str = parseFloat(str)
      str = str.toFixed(len)
    }
  }
  return parseFloat(str)
}

// canvas判断内容是否未空
function isCanvasBlank(canvas) {
  var blank = document.createElement('canvas') //系统获取一个空canvas对象
  blank.width = canvas.width
  blank.height = canvas.height
  return canvas.toDataURL() == blank.toDataURL() //比较值相等则为空
}

// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback) {
  // 拿取文件对象
  // 用FileReader来读取
  var reader = new FileReader()
  // 重写FileReader上的readAsBinaryString方法
  FileReader.prototype.readAsBinaryString = function (file) {
    var binary = ''
    var wb // 读取完成的数据
    var outdata // 你需要的数据
    var reader = new FileReader()
    reader.onload = function (e) {
      // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
      var bytes = new Uint8Array(reader.result)
      var length = bytes.byteLength
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      // 接下来就是xlsx了，具体可看api
      wb = XLSX.read(binary, {
        type: 'binary'
      })
      outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      if (callback) callback(outdata)
    }
    reader.readAsArrayBuffer(file)
  }
  reader.readAsBinaryString(file)
}
/**
 * 大数字转换，将大额数字转换为万、千万、亿等
 * @param value 数字值
 */
function bigNumberTransform(value) {
  let flag = value < 0 ? true : false
  value = Math.abs(value)
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
  }
  if (num <= 4) {
    // 千
    newValue[0] = parseInt(value / 1000) + ''
    newValue[1] = '千'
  } else if (num <= 8) {
    // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  } else if (num <= 16) {
    // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1
    if (text1 === '亿') {
      fm = 100000000
    } else if (text1 === '千亿') {
      fm = 100000000000
    } else if (text1 === '万亿') {
      fm = 1000000000000
    } else if (text1 === '千万亿') {
      fm = 1000000000000000
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  }
  if (value < 1000) {
    newValue[0] = value + ''
    newValue[1] = ''
  }
  return (flag ? '-' : '') + newValue.join('')
}
//阿拉伯数字转换成大写汉字
function numberParseChina(money) {
  let moneyOld = money;
  //汉字的数字
  var cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  );
  //基本单位
  var cnIntRadice = new Array("", "拾", "佰", "仟");
  //对应整数部分扩展单位
  var cnIntUnits = new Array("", "万", "亿", "兆");
  //对应小数部分单位
  var cnDecUnits = new Array("角", "分", "毫", "厘");
  //整数金额时后面跟的字符
  var cnInteger = "整";
  //整型完以后的单位
  var cnIntLast = "圆";
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = "";
  //分离金额后用的数组，预定义
  var parts;
  if (money == "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return "";
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = Math.abs(money).toString();
  if (money.indexOf(".") == -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != "") {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == "") {
    chineseStr += cnInteger;
  }
  if (moneyOld.slice(0, 1) == "-") {
    return "负" + chineseStr;
  } else {
    return chineseStr;
  }
}
export default {
  imgToBase64,
  mergeListQuery,
  isCanvasBlank: isCanvasBlank,
  calcuMD5: calcuMD5,
  getCurrentTime: getCurrentTime,
  judgeTime: judgeTime,
  fun_date: fun_date,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  getDaysBetween: getDaysBetween,
  vailPhone: vailPhone,
  vailIdCard: vailIdCard,
  vailNumber: vailNumber,
  accAdd: accAdd,
  unique: unique,
  renderRuleForm: renderRuleForm,
  ruleFormPro: ruleFormPro,
  dataURLtoFile: dataURLtoFile,
  ruleFormTip: ruleFormTip,
  timeDiff: timeDiff,
  getFileType: getFileType,
  renderSize: renderSize,
  renderFile: renderFile,
  beforeAvatarUpload: beforeAvatarUpload,
  downloadNormalfile: downloadNormalfile,
  uploadFile: uploadFile,
  formatDate: formatDate,
  hidePartOfPhoneNum,
  parseDate2Str,
  getDayNum,
  getHours,
  getComputeDate,
  trim,
  getLastMonth,
  getPreMonthDay,
  dataFormatter,
  jsonCombine: jsonCombine,
  cloneObj: cloneObj,
  getMax: getMax,
  getDateDiff: getDateDiff,
  handleExport: handleExport,
  downloadfile: downloadfile,
  trimFun: trimFun,
  getMonthDays: getMonthDays,
  float_point,
  readWorkbookFromLocalFile,
  bigNumberTransform: bigNumberTransform,
  numberParseChina: numberParseChina
}

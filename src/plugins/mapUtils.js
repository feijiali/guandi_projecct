/**
 * 创建地图
 * @param {*} el
 * @param {*} option
 */
export const initMap = (el, option) => {
  let map = new AMap.Map(el, option);  
  return map;
};
/**
 * 销毁地图
 * @param {*} map
 */
export const destroyMap = map => {
  map.destroy();
};
/**
 * 创建图标
 * @param {*} option
 */
export const CreateIcon = option => {
  let icon = new AMap.Icon(option);
  return icon;
};
export const ampSize = (x, y) => new AMap.Size(x, y);
export const ampPixel = (x, y) => new AMap.Pixel(x, y);
/**
 * 创建marker
 * @param {*} map
 */
export const createMarker = (map, lnglat, option) => {
  let marker = new AMap.Marker({
    position: new AMap.LngLat(...lnglat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    ...option
  });
  map.add(marker);
  return marker;
};
export const setPosition = (marker, lnglat) => {
  marker.setPosition(new AMap.LngLat(...lnglat));
};
/**
 * 创建多个marker
 * @param {*} map
 * @param {*} lnglats
 * @param {*} option
 */
export const createMarkerList = (map, lnglats, option) => {
  let markerList = [];
  for (let i = 0; i < lnglats.length; i++) {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(...lnglats[i]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      ...option
    });
    markerList.push(marker);
  }
  map.add(markerList);
  return markerList;
};
export const DestoryMarker = (map, marker) => {
  map.remove(marker);
  marker = null;
};
/**
 * 获取当前城市
 */
export const getCity = () => {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.CitySearch", function() {
      let citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          resolve(result);
        } else {
          reject();
        }
      });
    });
  });
};
/**
 * 获取当前经纬度
 */
export const getLnglat = () => {
  return new Promise((resolve, reject) => {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      //  不显示定位按钮
      showButton: false
    });
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, "complete", data => {
      resolve(data);
    });
    AMap.event.addListener(geolocation, "error", data => {
      reject(data);
    });
  });
};
export const getAddress = (lnglat, callback, callbackerror) => {
  AMap.plugin("AMap.Geocoder", function() {
    var geocoder = new AMap.Geocoder();
    geocoder.getAddress(lnglat, function(status, result) {
      if (status === "complete" && result.info === "OK") {
        // result为对应的地理位置详细信息
        callback(result);
      } else {
        callbackerror();
      }
    });
  });
};
/**
 * 监听点击事件
 * @param {*} map
 * @param {*} event
 */
export const clickgetPoistion = (that,map, event) => {  
  map.on("click", event);
  //输入提示  
};
export const handleKeyDown  = (that,lng, lat,location) => {
  if (that['marker']) {
    setPosition(that['marker'], [lng, lat]);
    return;
  }
  let icon = CreateIcon({
    size: ampSize(41, 66), // 图标尺寸
    image: require("@/assets/images/icon_map_pin.png"),
    imageOffset: ampPixel(-11, -32), // 图像相对展示区域的偏移量，适于雪碧图等
    imageSize: ampSize(41, 66), // 根据所设置的大小拉伸或压缩图片
  });
  that['marker']=createMarker(that['map'], [lng, lat], {
    icon: icon,
  });
  that['map'].setCenter([lng, lat])
};
/**
 * 移除点击事件
 * @param {*} map
 * @param {*} event
 */
export const clickOff = (map, event) => {
  map.off("click", event);
};

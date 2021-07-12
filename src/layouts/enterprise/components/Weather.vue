<template>
  <div class="header-weather ml-3 d-flex-cen">
    <span class="d-inline-block">
      <img :src="weather.icon" alt />
    </span>
    <p class="font-weight-bold d-inline-block ml-1">{{ weather.label }}</p>
    <p class="d-inline-block ml-1">{{ weather.value }}℃</p>
    <div class="font-15 ml-2">{{ timeData.date }}&emsp;{{ timeData.day }}</div>
    <div class="font-14 font-weight-bold ml-2">{{ timeData.time }}</div>
  </div>
</template>

<script>
const AMap = window.AMap;
export default {
  data() {
    return {
      timeData: {
        date: "",
        time: "",
        day: "",
      },
      weather: {
        label: "",
        value: "",
      },
      weatherIcon: [
        require("@/assets/images/weather/weather_cloud.png"),
        require("@/assets/images/weather/weather_sun.png"),
        require("@/assets/images/weather/weather_rain.png"),
        require("@/assets/images/weather/weather_showery.png"),
        require("@/assets/images/weather/weather_snow.png"),
        require("@/assets/images/weather/weather_torrential.png"),
        require("@/assets/images/weather/weather_wind.png"),
      ],
    };
  },
  mounted() {
    setInterval(this.getTime, 1000);
    // 获取天气
    this.getWeather();
  },
  methods: {
    queryMessageMsg() {
      this.$store.dispatch(
        "app/set_read",
        Number(this.$store.getters.account_id)
      );
    },
    // 获取天气
    getWeather() {
      var that = this;
      AMap.plugin(["AMap.CitySearch", "AMap.Weather"], function () {
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            if (result && result.city && result.bounds) {
              var cityinfo = result.city;
              var weather = new AMap.Weather();
              //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
              weather.getLive(cityinfo, function (err, data) {
                if (!err) {
                  that.weather.label = data.weather;
                  that.weather.value = data.temperature;
                  var weatherIcon = that.weatherIcon;
                  if (
                    data.weather.indexOf("多云") != -1 ||
                    data.weather.indexOf("阴") != -1
                  ) {
                    that.weather.icon = weatherIcon[0];
                  } else if (data.weather.indexOf("晴") != -1) {
                    that.weather.icon = weatherIcon[1];
                  } else if (data.weather.indexOf("大雨") != -1) {
                    that.weather.icon = weatherIcon[3];
                  } else if (data.weather.indexOf("暴雨") != -1) {
                    that.weather.icon = weatherIcon[5];
                  } else if (data.weather.indexOf("雪") != -1) {
                    that.weather.icon = weatherIcon[4];
                  } else if (data.weather.indexOf("雨") != -1) {
                    that.weather.icon = weatherIcon[2];
                  } else if (data.weather.indexOf("风") != -1) {
                    that.weather.icon = weatherIcon[6];
                  }
                }
              });
            }
          } else {
          }
        });
      });
    },
    // 头部实时时间
    getTime() {
      var show_day = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
      );
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth();
      var date = time.getDate();
      var day = time.getDay();
      var hour = time.getHours();
      var minutes = time.getMinutes();
      var second = time.getSeconds();
      month = parseInt(month) + 1;
      month < 10 ? (month = "0" + month) : month;
      date < 10 ? (date = "0" + date) : date;
      hour < 10 ? (hour = "0" + hour) : hour;
      minutes < 10 ? (minutes = "0" + minutes) : minutes;
      second < 10 ? (second = "0" + second) : second;
      this.timeData.date = year + "-" + month + "-" + date;
      this.timeData.time = hour + ":" + minutes + ":" + second;
      this.timeData.day = show_day[day];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
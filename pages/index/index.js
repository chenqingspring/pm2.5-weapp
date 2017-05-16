//index.js
//获取应用实例
var app = getApp();
Page({
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {        
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        });
        wx.request({
          url: 'https://pm25-weapp.leanapp.cn/1.1/functions/searchByLocation',
          method: 'POST',
          data: {
            lat: res.latitude,
            lng: res.longitude
          },
          header: {
            'content-type': 'application/json',
            'X-LC-Id': 'PmV1nY70lW7jOSgdaz77Ek4x-gzGzoHsz',
            'X-LC-Key': 'y73IcLAkxJznpDxczxmA9sak'
          },
          success: function (res) {
            var districts = JSON.parse(res.data.result);
            var cityData = districts[0];

            var markers = districts.map(function(district, index) {
              return {
                id: index,
                latitude: district.lat,
                longitude: district.lng,
                title: 'pm2.5值：' + district.pm2_5 + 'μg/m³',
                width: 30,
                height: 30,
                iconPath: '/resources/pin.png'
              }
            }).filter(function (district) { return (!!district.latitude && !!district.longitude)})
            that.setData({markers: markers, city: cityData.area, pm25: cityData.pm2_5})
          }
        })
      }
    })
  }
})

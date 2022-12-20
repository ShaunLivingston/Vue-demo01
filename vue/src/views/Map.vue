<template>
  <div>
    <div class="info">
      <p id='info' style="font-size: 20px;font-weight: bold"></p>
    </div>
    <div id="container" style="width: 100%;height: 100vh"></div>
  </div>
</template>
<script>
// 信息窗体的内容
var content = [
  "<div>高德软件有限公司</b>",
  "电话 : 010-84107000   邮编 : 100102",
  "地址 : 宁波市望京阜通东大街方恒国际中心A座16层</div></div>"
];
export default {
  name: "Map",
  mounted() {
    /*创建地图实例*/
    var map = new AMap.Map("container", {
      zoom: 13,
      center: [121.73304124122616, 29.804199155070606],
      icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
      resizeEnable: true
    })

    // 创建 infoWindow 实例
    var infoWindow = new AMap.InfoWindow({
      anchor: 'top-left',
      content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
    });

    var clickHandler = function (e) {
      console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');
      // 打开信息窗体
      infoWindow.open(map, [121.73304124122616, 29.804199155070606]);
    };

    // 绑定事件
    map.on('click', clickHandler);

    // 创建一个 Marker 实例：
    var marker = new AMap.Marker({
      position: new AMap.LngLat(121.73304124122616, 29.804199155070606),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '东吴镇中心小学'
    })

    marker.on('click', clickHandler);

    // 将创建的点标记添加到已有的地图实例：
    map.add(marker);

    //绘制初始路径
    var path = [];
    path.push([121.732833, 29.804447]);
    path.push([121.753681, 29.801933]);
    path.push([121.772764, 29.788497]);
    map.plugin("AMap.DragRoute", function () {
      var route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE); //构造拖拽导航类
      route.search(); //查询导航路径并开启拖拽导航
    });

//获取用户所在城市信息
    function showCityInfo() {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city;
            var citybounds = result.bounds;
            document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
            //地图显示当前城市
            map.setBounds(citybounds);
          }
        } else {
          document.getElementById('info').innerHTML = result.info;
        }
      });
    }

    //定位
    showCityInfo()
  }
}
</script>

<style>

</style>

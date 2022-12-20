<template>
  <div id='building'>
    <div class="header">
      <div style="width: 500px;display: flex;padding-left: 20px;">
        <div style="width: 270px;height: 90px">
          <img src="../../assets/wallpaperlogo.png"
               style="width: 235px;height: 50px; position: relative; top: 5px; right: 0"/>
        </div>
        <div style="flex:1;color: #fff;font-weight: bold;">Welcome to wallpaper</div>
      </div>
      <div style="flex:1">
        <ul style="list-style:none;margin-top: 0px;height: 100px;margin-top: 7px;">
          <li class="item">
            <a class="nag" href="/front/home">
              <img src="../../assets/01.png" style="width:40px;"/>
              <span style="color: #ad3;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">首页</span>
            </a>
          </li>
          <li class="item">
            <a class="nag" href="/front/video">
              <img src="../../assets/02.png" style="width:40px;"/>
              <span
                  style="color: #b760f0;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">视频播放</span>
            </a>
          </li>
          <li class="item">
            <a class="nag" href="/front/article">
              <img src="../../assets/03.png" style="width:40px;"/>
              <span style="color: #e73;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">文章列表</span>
            </a>
          </li>
          <li class="item">
            <a class="nag">
              <img src="../../assets/04.png" style="width:40px;"/>
              <span style="color: #d55;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">工作台</span>
            </a>
          </li>
          <li class="item">
            <a class="nag">
              <img src="../../assets/05.png" style="width:40px;"/>
              <span style="color: #fb3;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">消息中心</span>
            </a>
          </li>
          <li class="item">
            <a class="nag">
              <img src="../../assets/01.png" style="width:40px;"/>
              <span style="color: #ad3;margin-left:5px;position: relative; top: -10px;font-weight:  bold;">订单管理</span>
            </a>
          </li>
        </ul>
      </div>
      <div style="width:300px">
        <div v-if="!user.username" style="text-align:right;padding-right:30px">
          <el-button @click="$router.push('/login')" class="loginFront" type="primary">登录</el-button>
          <el-button @click="$router.push('/register')" class="registerFront" type="success">注册</el-button>
        </div>
        <div v-else>
          <div style="width:160px;display: inline-block;">
            <span class="city">宁波 </span>
            <span>
              <img src="../../assets/weather.png" class="weather"/>
              <span class="temp">11℃</span>
            </span>
            <span style="background-color:#82c91e;border-radius: 10px;">
              <span class="quality">良</span>
            </span>
          </div>
          <span>
            <el-dropdown style="width: 130px; cursor: pointer; text-align: right">
              <div style="display:inline-block">
                <img :src="user.avatar"
                     style="width: 35px;border-radius: 50%; padding: 2px; position: relative; top: 7px;">
                <span style="margin: 10px 10px;color: #fff">{{ user.nickname }}</span><i class="el-icon-arrow-down"
                                                                                         style="color:#fff;margin-left: 10px"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item>
                  <router-link to="/front/password" class="perItem">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/front/person" class="perItem">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span class="perItem" @click="logout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </div>
    <div style="width:1600px;margin:0 auto">
      <router-view/>
    </div>
    <div>
      <Bottom/>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  border: 0
}

#building {
  background: url("../../assets/wallpaper.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  overflow-y: scroll;
  max-width: 100vw;
  margin: 0 auto;
}

.header {
  margin: 20px auto;
  display: flex;
  height: 100px;
  width: 1760px;
  line-height: 100px;
  border-bottom: 1px solid #eee;
}

.city {
  color: #fff;
  font-weight: bold;
  margin-right: 10px;
}

.weather {
  width: 23px;
  height: 23px;
  margin-right: 10px;
  position: relative;
  top: 5px;
}

.temp {
  color: #fff;
  margin-right: 10px;
}

.quality {
  color: #fff;
  padding: 0 6px;
}

.perItem {
  text-decoration: none;
  color: grey;
}

.perItem:hover {
  color: rgb(0, 140, 255);
}

.item {
  display: inline-block;
  width: 135px;
  height: 100px;
  text-align: center;
  cursor: pointer;
  margin-left: 3px;
}

.nag {
  width: 120px;
  height: 70px;
  display: block;
  background: linear-gradient(to top, rgba(0, 0, 0, .5) 0, rgba(0, 0, 0, .1) 100%);
  border-radius: 3px;
  padding: 5px;
  margin: auto;
}

.loginFront {
  margin-right: 10px;
  width: 60px;
  height: 24px;
  padding: 5px;
}

.registerFront {
  width: 60px;
  height: 24px;
  padding: 5px;
}
</style>
<script>

import Bottom from "@/views/front/Bottom";

export default {
  name: "Front",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  components: {
    Bottom
  },
  created() {

  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    }
  }
}
</script>

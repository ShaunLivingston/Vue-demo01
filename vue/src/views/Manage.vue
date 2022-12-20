<template>
  <div>
    <el-container style="height: 770px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <Aside></Aside>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px">
          <Header :user="user"></Header>
        </el-header>

        <el-main>
          <!--          当前页面的子路由会在<router-view/>里面展示-->
          <router-view @refreshUser="getUser"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'HomeView',
  components: {
    Aside,
    Header
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      //从后台获取User数据
      this.request.get("/user/username/" + username).then(res => {
        //重新赋值后台的最新user数据
        this.user = res.data
      })
    }
  }
}
</script>


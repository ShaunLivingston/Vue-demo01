<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <el-breadcrumb separator="/" style="display: inline-block;margin-right: 1050px">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 120px; cursor: pointer">
      <i class="el-icon-setting" style="margin-right: 20px"></i>
      <div style="display: inline-block">
        <img :src="user.avatar" alt="" referrerpolicy="no-referrer"
             style="width: 43px;border-radius: 50%;position: relative; top:10px; right: 5px">
        <span>{{ user.nickname }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
        <el-dropdown-item style="font-size: 14px;padding: 5px 0">
          <router-link to="/pwd" style="text-decoration: none;color: black">修改密码</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px;padding: 5px 0">
          <router-link to="/person" style="text-decoration: none;color: black">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px;padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    user: Object
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      // localStorage.removeItem("user")
      // this.$router.replace("/login")
      this.$store.commit("logout")
      this.$message.success("退出成功~~~")
    }
  }
}
</script>

<style scoped>

</style>

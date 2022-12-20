<template>
  <el-card style="width: 450px">
    <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>修改密码</b></div>
    <el-form :model="pwd" :rules="rules" ref="changePwdForm" label-width="100px" size="small">
      <el-form-item label="原密码" prop="original">
        <el-input autocomplete="off" prefix-icon="el-icon-lock" show-password
                  v-model="pwd.original"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input autocomplete="off" prefix-icon="el-icon-lock" show-password
                  v-model="pwd.newPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPwd">
        <el-input autocomplete="off" prefix-icon="el-icon-lock" show-password
                  v-model="pwd.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "FrontPassword",
  data() {
    return {
      pwd: {},
      rules: {
        original: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
        ],
        newPwd: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
        ],
        confirmPwd: [
          {required: true, message: '请再次输入新密码', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
        ]
      },
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.pwd.username = this.user.username
  },
  methods: {
    changePwd() {
      this.$refs.changePwdForm.validate((valid) => {
        if (valid) {
          if (this.pwd.newPwd !== this.pwd.confirmPwd) {
            this.$message.error("两次次输入的新密码不相同！")
            return false
          }
          if (this.pwd.original !== this.user.password) {
            this.$message.error("原密码输入错误!")
          } else {
            this.request.post("/user/password", this.pwd).then(res => {
              if (res.code === '200') {
                this.$message.success("密码修改成功！")
                this.$store.commit("logout")
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>


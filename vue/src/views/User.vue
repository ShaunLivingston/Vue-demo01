<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                v-model="username"></el-input>
      <el-input style="width: 200px;" class="ml-5" placeholder="请输入昵称" suffix-icon="el-icon-message"
                v-model="nickname"></el-input>
      <el-input style="width: 200px;" class="ml-5" placeholder="请输入地址"
                suffix-icon="el-icon-s-promotion" v-model="address"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定批量删除!'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="这些用户信息确定删除吗？"
          @confirm="handleDelBatch"
      >
        <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-upload
          :action="'http://' + serverIp + ':9090/user/import'" :show-file-list="false" accept="xlsx"
          :on-success="handleExcelImportSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" @click="exp" class="ml-5">导出<i class="el-icon-top"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg"
              @selection-change="handleSelectionChange">>
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="140">
      </el-table-column>
      <el-table-column prop="role" label="角色" width="140">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.role === 'ROLE_ADMIN'">管理员</el-tag>
          <el-tag type="warning" v-if="scope.row.role === 'ROLE_TEACHER'">老师</el-tag>
          <el-tag type="success" v-if="scope.row.role === 'ROLE_STUDENT'">学生</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="140">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="140">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="140">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="lookCourse(scope.row.courses)" v-if="scope.row.role === 'ROLE_TEACHER'">
            查看教授课程 <i class="el-icon-document"></i></el-button>
          <el-button type="warning" @click="lookStuCourse(scope.row.stuCourses)" v-if="scope.row.role === 'ROLE_STUDENT'">查看已选课程 <i class="el-icon-document"></i></el-button>
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定删除!'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="这个用户信息确定删除吗？"
              @confirm="handleDel(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除<i class="el-icon-delete"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select clearable v-model="form.role" placeholder="请选择角色" style="width: 100%">
            <el-option v-for="item in roles" :key="item.description" :label="item.description" :value="item.flag">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="课程信息" :visible.sync="vis" width="30%">
      <el-table :data="courses" border stripe>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="score" label="学分"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="课程信息" :visible.sync="stuVis" width="30%" >
      <el-table :data="stuCourses" border stripe>
        <el-table-column prop="name" label="课程名称"></el-table-column>
        <el-table-column prop="score" label="学分"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {serverIp} from "../../public/config";

export default {
  name: "User",
  data() {
    return {
      serverIp: serverIp,
      headerBg: 'headerBg',
      tableData: [],
      username: '',
      nickname: '',
      address: '',
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      roles: [],
      vis: false,
      courses: [],
      stuVis: false,
      stuCourses: []
    }
  },
  created() {
    //初始请求分页查询数据
    this.load()
  },
  methods: {
    load() {
      // fetch("http://localhost:9090/user/page?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&username=" + this.username + "&nickname=" + this.nickname + "&address=" + this.address).then(res => res.json()).then(res => {
      //       console.log(res),
      //           this.tableData = res.records,
      //           this.total = res.total
      //     }
      // )
      //访问main.js中全局已经注册好的request
      this.request.get("/user/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          nickname: this.nickname,
          address: this.address
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      }),
          this.request.get("/role").then(res => {
            this.roles = res.data
          })
    },
    handleAdd() {
      this.dialogFormVisible = true,
          this.form = {}
    },
    handleEdit(row) {
      this.form = row,
          this.dialogFormVisible = true
    },
    handleDel(id) {
      this.request.delete("/user/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功~"),
              this.dialogFormVisible = false,
              this.load()
        } else {
          this.$message.error("删除失败~~~")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val),
          this.multipleSelection = val
    },
    handleDelBatch() {
      let ids = this.multipleSelection.map(v => v.id)   //[{},{},{}] => [1,2,3]
      this.request.delete("/user/del/batch", {
        data: ids
      }).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功~"),
              this.load()
        } else {
          this.$message.error("批量删除失败~~~")
        }
      })
    },
    save() {
      this.request.post("/user", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功~"),
              this.dialogFormVisible = false,
              this.load()
        } else {
          this.$message.error("保存失败~~~")
        }
      })
    },
    reset() {
      this.username = '',
          this.nickname = '',
          this.address = '',
          this.load()
    },
    exp() {
      window.open(`http://${serverIp}:9090/user/export`)
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功...")
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize),
          this.pageSize = pageSize,
          this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum),
          this.pageNum = pageNum,
          this.load()
    },
    lookCourse(courses) {
      this.courses = courses
      this.vis = true
    },
    lookStuCourse(stuCourses) {
      this.stuCourses = stuCourses
      this.stuVis = true
    }
  }
}
</script>
<style>
.headerBg {
  background: #eee !important;
}
</style>

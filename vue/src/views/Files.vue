<template>
  <div>
    <div style="margin: 10px 0">
      <div style="margin: 10px 0">
        <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"
                  v-model="name"></el-input>
        <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
      <el-upload
          :action="'http://' + serverIp +':9090/file/upload'" :show-file-list="false"
          :on-success="handleFileUploadSuccess" style="display: inline-block">
        <el-button type="primary" class="ml-5">上传文件<i class="el-icon-top"></i></el-button>
      </el-upload>
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
    </div>
    <el-table :data="tableData" border stripe
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="name" label="文件名称">
      </el-table-column>
      <el-table-column prop="type" label="文件类型">
      </el-table-column>
      <el-table-column prop="size" label="文件大小(kb)">
      </el-table-column>
      <el-table-column label="预览">
        <template slot-scope="scope">
          <el-button type="primary" @click="preview(scope.row.url)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="下载链接">
        <template slot-scope="scope">
          <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc"
                     @change="changeEnable(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import {serverIp} from "../../public/config";

export default {
  name: "Files",
  data() {
    return {
      serverIp: serverIp,
      tableData: [],
      name: '',
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      //访问main.js中全局已经注册好的request
      this.request.get("/file/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleDel(id) {
      this.request.delete("/file/" + id).then(res => {
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
      this.request.delete("/file/del/batch", {
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
    reset() {
      this.name = '',
          this.load()
    },
    handleFileUploadSuccess() {
      this.load()
    },
    download(url) {
      window.open(url)
    },
    changeEnable(row) {
      this.request.post("/file/update", row).then(res => {
        if (res.code === '200') {
          this.$message.success("操作成功...")
        }
      })
    },
    preview(url) {
      window.open('https://file.keking.cn/onlinePreview?url=' + encodeURIComponent(window.btoa((url))))
    }
  }
}
</script>

<style scoped>

</style>

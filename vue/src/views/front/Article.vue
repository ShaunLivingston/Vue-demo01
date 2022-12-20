<template>
  <div style="width:900px;margin: 5px auto;color: white">
    <div style="margin: 10px 0">
      <el-input size="small" style="width: 300px" placeholder="请输入要查找的文章标题" suffix-icon="el-icon-search"
                v-model="header"></el-input>
      <el-button class="ml-5" type="primary" @click="load" size="small">搜索</el-button>
      <el-button type="warning" @click="reset" size="small">重置</el-button>
    </div>

    <div style="margin: 20px 0">
      <div style="padding: 15px 0; border-bottom: 1px dashed #ccc" v-for="item in tableData" :key="item.id">
        <div class="pd-10" style="font-size: 20px; color: #e73; cursor: pointer"
             @click="$router.push('/front/articleDetail?id=' + item.id)">{{ item.header }}
        </div>
        <div style="font-size: 14px; margin-top: 10px">
          <i class="el-icon-user-solid"></i> <span>{{ item.user }}</span>
          <i class="el-icon-time" style="margin-left: 15px"></i> <span>{{ item.time }}</span>
        </div>
      </div>
    </div>


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
export default {
  name: "Article",
  data() {
    return {
      form: {},
      tableData: [],
      header: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      content: '',
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/article/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          header: this.header,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    reset() {
      this.header = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
  }
}
</script>

<style scoped>
</style>

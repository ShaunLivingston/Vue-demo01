<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 30px">
      <el-col :span="6">
        <el-card style="color: #409EFF">
          <div><i class="el-icon-user-solid"/>用户总数</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            <el-tag type="primary" style="font-size: 20px">100</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #F56C6C">
          <div><i class="el-icon-s-order"/> 销售总量</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            <el-tag type="danger" style="font-size: 20px">￥1000000</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #67C23A">
          <div><i class="el-icon-money"/> 收益总额</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            <el-tag type="success" style="font-size: 20px">￥30000</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #E6A23C">
          <div><i class="el-icon-s-shop"/>门店总数</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            <el-tag type="warning" style="font-size: 20px">99</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card style="width: 650px;height: 550px">
          <div id="main" style="width: 600px;height: 500px">
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width: 650px;height: 550px">
          <div id="pie" style="width: 600px;height: 500px">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {}
  },
  mounted() { //页面元素渲染完后再触发
    var option = {
      title: {
        text: '各季度会员数量统计',
        subtext: '趋势图',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度", "第二季度", "第三季度", "第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '会员人数',
          data: [],     //填空
          type: 'line'
        },
        {
          name: '实时会员人数',
          data: [],     //填空
          type: 'bar'
        }
      ]
    };
    var pieOption = {
      title: {
        text: '各季度会员数量统计',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          label: {
            normal: {     //饼图图像上的文本标签
              show: true,
              position: 'inner', //标签的位置
              textStyle: {
                frontWeight: 300,
                fontSize: 16,
                // color: "#fff"
              },
              formatter: '{d}%'
            }
          },
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          // label: {
          //   show: false,
          //   position: 'center'
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: []  //填空
        }
      ]
    };
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    // this.request.get("/echarts/example").then(res => {
    //   option.xAxis.data = res.data.x;
    //   option.series[0].data = res.data.y;
    //   option.series[1].data = res.data.y;
    //   //数据准备完之后再set
    //   myChart.setOption(option);
    // })

    var pieChartDom = document.getElementById('pie');
    var myPieChart = echarts.init(pieChartDom);

    this.request.get("/echarts/members").then(res => {
      option.series[0].data = res.data;
      option.series[1].data = res.data;
      //数据准备完之后再set
      myChart.setOption(option);

      pieOption.series[0].data = [
        {
          name: "第一季度", value: res.data[0]
        },
        {
          name: "第二季度", value: res.data[1]
        }, {
          name: "第三季度", value: res.data[2]
        }, {
          name: "第四季度", value: res.data[3]
        }
      ]
      myPieChart.setOption(pieOption);
    })


  }
}
</script>

<style>

</style>

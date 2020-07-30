<template>
  <div>
    <div class="chart" id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  components: {},
  data() {
    return {
      myChart: "",
    };
  },
  methods: {},
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "电器",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["电脑", "手机", "手表", "平板", "电视机", "冰箱"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [55, 200, 361, 105, 120, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style scoped>
.chart {
  width: 80%;
  height: 600px;
}
</style>
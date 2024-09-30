<template>
  <div class="line">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- block -->
    <div class="line_block">
      <!-- 顶部 -->
      <div class="line_top">
        <!-- 列车列表 -->
        <div class="line_Tleft">
          <div class="line_Tleft_title font_size26w">列车列表</div>
          <!-- 列表头部 -->
          <div class="train_header font_size20">
            <div class="train_number header_train_number">车号</div>
            <div class="state header_state">设备状态</div>
            <div class="alarm header_alarm">报警数</div>
            <div class="forewarn header_forewarn">预警数</div>
            <div class="operate header_operate">操作</div>
          </div>
          <!-- 列表身体 -->
          <div class="train_body font_size18">
            <div class="train_body_list" v-for="item in state" :key="item.trainNum">
              <!-- 车号-->
              <div class="train_number body_train_number">{{ item.trainNum }}</div>
              <!-- 设备状态-->
              <div class="state body_state">
                <div class="state_border font_size24">{{ stateText(item.state) }}</div>
              </div>
              <!-- 报警数-->
              <div class="alarm body_alarm">{{ item.alarm }}</div>
              <!--预警数-->
              <div class="forewarn body_forewarn">{{ item.warning }}</div>
              <!--操作 -->
              <div class="operate body_operate">
                <router-link to="/TrainClass" class="router_link">查看详情</router-link>
              </div>
            </div>
          </div>
        </div>
        <!-- 辅变系统 -->
        <div class="line_Tcenter font_size26w" style=" display: flex ;flex-direction: column; ">
          <div style="display: flex;justify-content: space-between;padding:  0 10px;">
            <div>辅变系统</div>
            <div> <el-select v-model="trainValue" placeholder="11号线">
                <el-option v-for="item in trainOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select></div>
          </div>
          <AssistChange></AssistChange>
        </div>

        <!-- 警示记录 -->
        <div class="line_Tbott">
          <!-- 报警记录 -->
          <div class="line_alarm">
            <!-- 报警title -->
            <div class="alarm_title">
              <!-- <div class="recording font_size20">报警记录</div> -->
              <!-- 日期选择 -->
              <div class="alarm_choose font_size16">
                <div class="alarm_time1">近7天</div>
                <div class="alarm_time2">近30天</div>
                <div class="alarm_time3">近12个月</div>
              </div>
              <!-- 年月日选择器 -->
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <!-- 历史分析 -->
              <div class="alarm_history font_size16">历史分析</div>
            </div>
            <!-- 列表头部 -->
            <div class="alarm_header font_size20">
              <div class="train_number header_train_number">车号</div>
              <div class="state header_state">车厢</div>
              <div class="alarm header_alarm">报警名称</div>
              <div class="forewarn header_forewarn">发生时间</div>
              <div class="operate header_operate">操作</div>
            </div>
            <!-- 报警body -->
            <div class="alarm_body font_size18">
              <div class="train_body_list" v-for="n in 13" :key="n">
                <!-- 车号-->
                <div class="train_number body_train_number">07073074</div>
                <!-- 设备状态-->
                <div class="state body_alarm">B1车</div>
                <!-- 报警数-->
                <div class="alarm body_alarm">电机1滤网堵塞</div>
                <!--预警数-->
                <div class="forewarn body_forewarn">15:20:32</div>
                <!--操作 -->
                <div class="operate body_operate">
                  <router-link to="/AlarmInfo" class="router_link">查看详情</router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- 预警记录 -->
          <div class="line_alarm train_margin">
            <!-- 预警title -->
            <div class="alarm_title">
              <!-- <div class="recording font_size20">报警记录</div> -->
              <!-- 日期选择 -->
              <div class="alarm_choose font_size16">
                <div class="alarm_time1">近7天</div>
                <div class="alarm_time2">近30天</div>
                <div class="alarm_time3">近12个月</div>
              </div>
              <!-- 年月日选择器 -->
              <el-date-picker v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <!-- 历史分析 -->
              <div class="alarm_history font_size16">历史分析</div>
            </div>
            <!-- 列表头部 -->
            <div class="alarm_header font_size20">
              <div class="train_number header_train_number">车号</div>
              <div class="state header_state">B1车</div>
              <div class="alarm header_alarm">预警名称</div>
              <div class="forewarn header_forewarn">发生时间</div>
              <div class="operate header_operate">操作</div>
            </div>
            <!-- 报警body -->
            <div class="alarm_body font_size18">
              <div class="train_body_list" v-for="n in 3" :key="n">
                <!-- 车号-->
                <div class="train_number body_train_number">07073074</div>
                <!-- 设备状态-->
                <div class="state body_alarm">B1车</div>
                <!-- 报警数-->
                <div class="alarm body_alarm">电机1滤网堵塞</div>
                <!--预警数-->
                <div class="forewarn body_forewarn">15:20:32</div>
                <!--操作 -->
                <div class="operate body_operate">
                  <router-link to="/AlarmInfo" class="router_link">查看详情</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 车辆报警预警统计 -->
      <div class="line_bott">
        <div class="line_bott_title font_size26w">
          <div class="bott_title_left">车辆预警报警统计</div>
          <div class="bott_title_right">
            <!-- 年月日选择器 -->
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <!-- <el-divider /> -->
        <div class="line_bott_echarts font_size20">
          <!-- 报警预警趋势 -->
          <div class="line_warning1">
            <div class="alarm_echarts_title font_size20">报警预警趋势</div>
            <!-- <div ref="alarm_echarts" class="alarm_echarts"></div> -->
            <EChartsCom :width="'100%'" :height="'92%'" :option="alarm_echarts_option"></EChartsCom>
          </div>

          <el-divider direction="vertical" style="height: 100%" />
          <!-- 历史报警分布统计 -->
          <div class="line_warning2">
            <div class="history_alarm_title">历史报警分布统计</div>
            <!-- <div ref="history_alarm" class="history_alarm" style="height: 78%; width: 100%"></div> -->
            <EChartsCom :width="'100%'" :height="'92%'" :option="history_alarm_option"></EChartsCom>
          </div>
          <!-- 历史预警发布统计 -->
          <div class="line_warning3">
            <div class="history_forewarn_title">历史预警发布统计</div>
            <!-- <div ref="history_forewarn" class="history_forewarn" style="height: 78%; width: 100%"></div> -->
            <EChartsCom :width="'100%'" :height="'92%'" :option="history_forewarn_option"></EChartsCom>
          </div>
          <!-- 报警预警top10 -->
          <div class="line_warning4">
            <div class="line_top10_title">报警预警top10</div>
            <!-- <div ref="line_top10" class="line_top10" style="height: 78%; width: 100%"></div> -->
            <EChartsCom :width="'100%'" :height="'92%'" :option="top10_option">
            </EChartsCom>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import * as echarts from "echarts";
import EChartsCom from "@/components/EChartsCom.vue";
import AssistChange from "@/components/AssistChange.vue";
import { getState } from "@/api/train"

export default {
  name: "HomeView",
  components: {
    EChartsCom,
    AssistChange
  },
  data() {
    return {
      state: [],

      value1: "",
      // 报警预警趋势
      alarm_echarts: null,
      // 历史警报饼图
      history_alarm: null,
      // 历史预警饼图
      history_forewarn: null,
      // 报警预警top10
      line_top10: null,

      alarm_echarts_option: {
        legend: {
          textStyle: {
            color: "#adb0b6", // 图例文字颜色设置为蓝色
          },
        },
        tooltip: {},
        color: ["#7093b3", "#e69e4e"],
        dataset: {
          source: [
            ["类型", "预警", "故障"],
            ["2024-06", 0, 0],
            ["2024-07", 0, 0],
            ["2024-08", 0, 0],
            ["2024-09", 0, 0],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }],
      },
      history_alarm_option: {
        legend: {
          textStyle: {
            color: "#adb0b6", // 图例文字颜色设置为蓝色
          },
        },
        tooltip: {},
        color: ["#7093b3", "#e69e4e"],
        dataset: {
          source: [
            ["类型", "预警", "故障"],
            ["2024-06", 0, 0],
            ["2024-07", 0, 0],
            ["2024-08", 0, 0],
            ["2024-09", 0, 0],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "line" }, { type: "line" }],
      },
      history_forewarn_option: {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: [50, 100],
            data: [
              { value: 0, name: "已处置率" },
              { value: 0, name: "未处置率" },
            ],
            color: ["#7093b3", "#e69e4e"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      top10_option: {},
      trainValue: '11号线',
      trainOptions: [{
        value: '11号线',
        label: '11号线'
      }],
    };
  },
  computed: {

  },
  // 初始化之前
  beforeCreate() { },
  // 初始化之后
  created() { },
  // 挂载前
  beforeMount() {
    getState().then(response => {
      this.state = response.data.data;
    });


  },
  // 挂载后
  mounted() {
    this.init_my_charts();

    window.addEventListener("resize", () => {
      if (this.alarm_echarts) {
        this.alarm_echarts.dispose();
        this.alarm_echarts = null;
      }
      if (this.history_alarm) {
        this.history_alarm.dispose();
        this.history_alarm = null;
      }
      if (this.history_forewarn) {
        this.history_forewarn.dispose();
        this.history_forewarn = null;
      }
      if (this.line_top10) {
        this.line_top10.dispose();
        this.line_top10 = null;
      }
      this.init_my_charts();
      // console.log('窗口变化了');
    });
  },
  methods: {
    stateText(state) {
      const statusMap = {
        0: '离线',
        1: '库内',
        2: '正线'
      };
      return statusMap[state + 1] || 'Unknown';
    },
    get_alarm_charts_option() {
      let op = {
        legend: {
          textStyle: {
            color: "#adb0b6", // 图例文字颜色设置为蓝色
          },
        },
        tooltip: {},
        color: ["#7093b3", "#e69e4e"],
        dataset: {
          source: [
            ["类型", "预警", "故障"],
            ["2024-06", 43.3, 85.8],
            ["2024-07", 83.1, 73.4],
            ["2024-08", 86.4, 65.2],
            ["2024-09", 72.4, 53.9],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }],
      };
      return op;
    },

    get_history_alarm_option() {
      let op = {
        legend: {
          textStyle: {
            color: "#adb0b6", // 图例文字颜色设置为蓝色
          },
        },
        tooltip: {},
        color: ["#da1e28", "#fc7b1e"],
        dataset: {
          source: [
            ["类型", "预警", "故障"],
            ["2024-06", 3, 0],
            ["2024-07", 40, 1],
            ["2024-08", 12, 0],
            ["2024-09", 5, 0],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          { type: "line", smooth: true },
          { type: "line", smooth: true },
        ],
      };
      return op;
    },

    get_history_forewarn_option() {
      let op = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: [50, 100],
            data: [
              { value: 1048, name: "已处置率" },
              { value: 735, name: "未处置率" },
            ],
            color: ["#7093b3", "#e69e4e"],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      return op;
    },

    get_top10_option() {
      let op = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            show: true,
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            fontSize: 20,
          },
        },
        color: ["#7093b3"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: false, // 不显示 Y 轴的轴线
          },
          axisLabel: {
            fontSize: 18,
            interval: 0,
          },
          axisTick: {
            show: false, // 不显示 Y 轴的刻度线
          },
          data: [
            "101102",
            "101103",
            "101104",
            "101105",
            "101106",
            "101107",
            "101108",
            "101109",
            "101110",
            "101111",
          ], // 这里假设了一些类别名称
        },
        series: [
          {
            name: "次数",
            type: "bar",
            barWidth: "90%",
            stack: "总量",
            label: {
              show: true,
              // insideLeft:'left',
              position: "insideLeft",
              fontSize: 14,
              formatter: "{c}", // 显示具体的数值
            },
            emphasis: {
              focus: "series",
            },
            // barMaxWidth: '15',
            data: [866, 740, 638, 610, 544, 477, 410, 390, 351, 288].reverse(), // 这里是您的数据
          },
        ],
      };
      return op;
    },

    inti_charts(params) {
      //  根据屏幕宽度调整 文字大小
      var e = document.body.clientWidth;
      // 报警预警趋势图
      if (this.$refs.alarm_echarts) {
        this.alarm_echarts = echarts.init(this.$refs.alarm_echarts);

        this.alarm_echarts.setOption({
          // 鼠标悬浮提示
          tooltip: {
            trigger: "axis",
            itemHeight: (e / 1920) * 10, // 图例项的高度，单位可以是像素或百分比（如 '10%'）
            itemWidth: (e / 1920) * 10, // 图例项的宽度，单位同上
            textStyle: {
              fontSize: (e / 1920) * 20,
            },
          },
          legend: {
            data: ["预警", "故障"],
            itemGap: 20, //图例间隔
            itemHeight: (e / 1920) * 10, // 图例项的高度，单位可以是像素或百分比（如 '10%'）
            itemWidth: (e / 1920) * 10, // 图例项的宽度，单位同上
            textStyle: {
              // 图例文本的样式设置
              color: "#ffffff", // 设置图例文本颜色为白色
              fontSize: (e / 1920) * 18,
            },
          },
          grid: {
            // left: '3%',
            // right: '4%',
            bottom: "3%",
            top: "20%",
            containLabel: true,
            splitLine: {
              // x轴网格线样式
              // show: true, // 显示网格线
              lineStyle: {
                color: "#282f41", // 设置网格颜色
                type: "solid", // 线条类型，默认为实线
              },
            },
          },
          toolbox: {},
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["2023-09-25", "2023-10-03", "2023-10-11", "2023-10-19"],
            axisLine: {
              lineStyle: {
                // color: "red",
                color: "#282f41",
              },
            },
            axisLabel: {
              fontSize: (e / 1920) * 16,
              interval: 0, // 显示所有标签
              margin: (e / 1920) * 18,
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              // x轴网格线样式
              show: true, // 显示网格线
              lineStyle: {
                color: "#282f41",
                type: "solid", // 线条类型，默认为实线
                width: (e / 1920) * 3,
              },
            },
            // axisLabel: {
            //   fontSize: e / 1920 * 16,
            //   interval: 0, // 显示所有标签
            // },
            axisLabel: {
              fontSize: (e / 1920) * 16,
              interval: 0, // 显示所有标签
              margin: (e / 1920) * 18,
            },
          },
          series: [
            {
              name: "预警",
              type: "line",
              // stack: 'Total',
              symbolSize: (e / 1920) * 8,
              label: {
                show: true, // 开启标签显示
                position: "top", // 设置标签位置在数据点的上方
                color: "red",
                fontSize: (e / 1920) * 18,
              },
              lineStyle: {
                // 设置线的样式
                color: "#882d3c", // 线的颜色
                width: (e / 1920) * 3,
              },
              itemStyle: {
                // normal: {
                color: "red",
                borderWidth: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                borderHeight: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                // },
              },
              data: [0, 8, 0, 0],
            },
            {
              name: "故障",
              type: "line",
              axisLabel: {
                fontSize: (e / 1920) * 18, // y轴刻度标签的字体大小
              },
              // stack: 'Total',
              symbolSize: (e / 1920) * 8,
              label: {
                show: true, // 开启标签显示
                position: "top", // 设置标签位置在数据点的上方
                color: "red",
                fontSize: (e / 1920) * 18,
              },
              lineStyle: {
                // 设置线的样式
                // color: '#e48555' // 线的颜色
                width: (e / 1920) * 3,
              },
              itemStyle: {
                // color:'#da8157',
                // normal: {
                color: "#da8157",
                borderWidth: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                borderHeight: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                // },
              },
              data: [0, 4, 0, 0],
            },
          ],
        });
      }

      // 历史报警饼图
      if (this.$refs.history_alarm) {
        this.history_alarm = echarts.init(this.$refs.history_alarm);

        this.history_alarm.setOption({
          tooltip: {
            trigger: "item",
            textStyle: {
              fontSize: (e / 1920) * 20,
            },
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["28%", "60%"],
              avoidLabelOverlap: false,
              label: {
                show: true, // 显示标签
                position: "outer", // 标签位置设置为饼图外部
                color: "white",
                fontSize: (e / 1920) * 20,
                formatter: function (params) {
                  // 使用 rich 文本标签功能
                  return (
                    "{a|" +
                    params.name +
                    "}\n{b|" +
                    params.percent.toFixed(0) +
                    "%}"
                  );
                },
                rich: {
                  a: {
                    // 类别文本样式
                    color: "white", // 文本颜色
                    // 其他样式属性...
                    fontSize: (e / 1920) * 20,
                  },
                  b: {
                    // 百分比文本样式
                    color: "white", // 文本颜色
                    lineHeight: (e / 1920) * 20, // 行高，控制文本间距
                    align: "center", // 文本水平对齐方式
                    fontSize: (e / 1920) * 12,
                  },
                },
              },
              labelLine: {
                show: true, // 显示标签与扇区之间的线
                length: (e / 1920) * 20, // 线的长度
                length2: (e / 1920) * 20, // 第二段线的长度，当存在两个分段时
              },
              data: [
                { value: 735, name: "正报率", itemStyle: { color: "#507edc" } },
                {
                  value: 1048,
                  name: "误报率",
                  itemStyle: { color: "#51bb97" },
                },
                {
                  value: 580,
                  name: "漏报率",
                  itemStyle: { color: "#536384cc" },
                },
              ],
            },
          ],
        });
      }
      // 历史预警饼图
      if (this.$refs.history_forewarn) {
        this.history_forewarn = echarts.init(this.$refs.history_forewarn);
        this.history_forewarn.setOption({
          tooltip: {
            trigger: "item",
            textStyle: {
              fontSize: (e / 1920) * 20,
            },
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["28%", "60%"],
              avoidLabelOverlap: false,
              label: {
                show: true, // 显示标签
                position: "outer", // 标签位置设置为饼图外部
                color: "white",
                formatter: function (params) {
                  // 使用 rich 文本标签功能
                  return (
                    "{a|" +
                    params.name +
                    "}\n{b|" +
                    params.percent.toFixed(0) +
                    "%}"
                  );
                },
                rich: {
                  a: {
                    // 类别文本样式
                    color: "white", // 文本颜色
                    fontSize: (e / 1920) * 20,
                  },
                  b: {
                    // 百分比文本样式
                    color: "white", // 文本颜色
                    lineHeight: (e / 1920) * 20, // 行高，控制文本间距
                    align: "center", // 文本水平对齐方式
                    fontSize: (e / 1920) * 12,
                  },
                },
              },
              labelLine: {
                show: true, // 显示标签与扇区之间的线
                length: (e / 1920) * 20, // 线的长度
                length2: (e / 1920) * 20, // 第二段线的长度，当存在两个分段时
              },
              data: [
                { value: 735, name: "正报率", itemStyle: { color: "#507edc" } },
                {
                  value: 1048,
                  name: "误报率",
                  itemStyle: { color: "#51bb97" },
                },
                {
                  value: 580,
                  name: "漏报率",
                  itemStyle: { color: "#536384cc" },
                },
              ],
            },
          ],
        });
      }
      // 报警/预警top10 柱状图
      if (this.$refs.line_top10) {
        this.line_top10 = echarts.init(this.$refs.line_top10);
        this.line_top10.setOption({
          // title: {
          //   text: '柱状图示例'
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // show:false,
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              fontSize: (e / 1920) * 20,
            },
          },
          // legend: {
          //   data: ['数值'] // 图例数据
          // },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          // 下载按钮
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: "value",
            show: false,
          },
          yAxis: {
            type: "category",
            axisLine: {
              show: false, // 不显示 Y 轴的轴线
            },
            axisLabel: {
              fontSize: (e / 1920) * 18,
              interval: 0,
            },
            axisTick: {
              show: false, // 不显示 Y 轴的刻度线
            },
            data: [
              "101102",
              "101103",
              "101104",
              "101105",
              "101106",
              "101107",
              "101108",
              "101109",
              "101110",
              "101111",
            ], // 这里假设了一些类别名称
          },
          series: [
            {
              name: "次数",
              type: "bar",
              barWidth: "90%",
              stack: "总量",
              label: {
                show: true,
                // insideLeft:'left',
                position: "insideLeft",
                fontSize: (e / 1920) * 14,
                formatter: "{c}", // 显示具体的数值
              },
              emphasis: {
                focus: "series",
              },
              // barMaxWidth: '15',
              data: [866, 740, 638, 610, 544, 477, 410, 390, 351, 288], // 这里是您的数据
            },
          ],
        });
      }
    },

    init_my_charts() {
      let alarm_charts_option = this.get_alarm_charts_option();
      this.alarm_echarts_option = alarm_charts_option;

      let history_alarm_option = this.get_history_alarm_option();
      this.history_alarm_option = history_alarm_option;

      let history_forewarn_option = this.get_history_forewarn_option();
      this.history_forewarn_option = history_forewarn_option;

      let top10_option = this.get_top10_option();
      this.top10_option = top10_option;
    },
  },

  // DOM重新加载前
  // beforeUpdate() {},
  // DOM重新加载
  // updated() {  },
  // 销毁前
  // beforeDestroy() {},
  // 销毁
  // destroyed() {},
};
</script>

<!-- less 只使用嵌套式写法 scoped让css样式只在这个组件生效 -->
<style lang="less" scoped>
body {
  touch-action: pan-y;
}

.line {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 实际内容区*/
.line_block {
  // min-width: 1280px;
  // min-height: 768px;
  // height: 100vh;
  // width: 100vw;
  // height: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0b1121;
  color: white;

  /*  顶部所有*/
  .line_top {
    background-color: #0b1121;
    // height: 62vh;
    height: 60%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 1.2rem 0;

    // 列车列表
    .line_Tleft {
      width: 25%;
      height: 100%;

      >div {
        box-sizing: border-box;
        padding: 0 0.625rem;
      }

      .train_number {
        width: 25%;
      }

      .state {
        width: 25%;

        >.state_border {
          border: #555b69 solid 1px;
          padding: 0.3vw 0;
          max-width: 4vw;
          box-sizing: border-box;
          line-height: 1.3vw;
          border-radius: 2vw;
          text-align: center;
          letter-spacing: 0.1vw;
        }
      }

      .alarm {
        width: 25%;
      }

      .forewarn {
        width: 25%;
      }

      .operate {
        width: 25%;
      }

      // 列车title
      .line_Tleft_title {
        height: 7%;
        // min-height: 25px;
        background-color: #181f31;
        width: 100%;
        border-bottom: solid 0.25rem #252c3e;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }

      // 列表头部
      .train_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #20283b;
        height: 7%;
        // min-height: 25px;
        border-top: 0.25rem solid #181f32;
      }

      // 列表身体
      .train_body {
        background-color: #181f31;
        height: 86%;
        color: #989eae;
        overflow-y: auto;

        // min-height: 347.926px;
        .train_body_list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // height: 1.875rem;
          height: 2.9vw;

          // 设备状态
          .body_state {
            padding-left: 0.5rem;
          }

          // 操作
          .body_operate {
            color: #164b7d;
          }
        }
      }
    }

    // 辅变系统
    .line_Tcenter {
      width: 45%;
      height: 100%;
      // background-color: rgb(16, 50, 80);
    }

    // 警示记录
    .line_Tbott {
      width: 30%;
      height: 100%;
      background-color: #181f31;
      // font-size: 0.8vw;
      box-sizing: border-box;
      padding: 0 30px 0 10px;

      // 报警记录
      .line_alarm {
        height: 50%;
        overflow: hidden;

        .train_number {
          width: 25%;
        }

        .state {
          width: 20%;

          >.state_border {
            width: 3.5vw;
            height: 1.5vw;
            box-sizing: border-box;
            border: #555b69 solid 1px;
            line-height: 1.3vw;
            border-radius: 2vw;
            text-align: center;
            letter-spacing: 2px;
          }
        }

        .alarm {
          width: 30%;
        }

        .forewarn {
          width: 25%;
        }

        .operate {
          width: 25%;
        }

        // 报警title
        .alarm_title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 12%;
          width: 100%;

          // 报警记录
          .recording {
            // flex: 2;
            width: 15%;
            // min-width: 61px;
            // flex: 0 0 auto;
          }

          // 日期选择
          .alarm_choose {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // flex: 2.9;
            width: 28%;
            // width: 25%;
            // min-width: 140px;
            box-sizing: border-box;
            // padding-right: 10px;
          }

          // 日期选择器
          .el-range-editor.el-input__inner {
            height: 23px;
            width: 39%;
            background: transparent;
            border: #33384c solid 1px;
          }

          // 历史分析
          .alarm_history {
            // flex: 1;
            width: 12%;
            // min-width: 56px;
          }
        }

        // 报警头部
        .alarm_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #20283b;
          height: 12%;
          // min-height: 25px;
          border-top: 0.25rem solid #181f32;
          box-sizing: border-box;
        }

        // 报警/预警body
        .alarm_body {
          // background-color: #181f31;
          background-color: #192138;
          height: 76%;
          color: #989eae;
          overflow-y: auto;

          .train_body_list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 3vw;

            // 设备状态
            .body_state {
              padding-left: 0.5rem;
            }

            // 操作
            .body_operate {
              color: #164b7d;
            }
          }
        }
      }

      // 预警body
      .train_margin {

        // margin-top: 35px;
        // 预警title
        .alarm_title {
          height: 12%;
        }
      }
    }
  }

  /* 底部所有*/
  .line_bott {
    padding: 0 30px 0 10px;
    box-sizing: border-box;
    background-color: #181f31;
    height: 40%;

    // min-height: 350px;
    // 查询
    .line_bott_title {
      max-height: 20%;
      background-color: #181f31;
      // height: 2vw;
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .bott_title_left {
        line-height: 2vw;
        height: 100%;
      }

      .bott_title_right {
        // min-width: 30px;
        width: 12vw;

        // 日期选择器
        .el-range-editor.el-input__inner {
          width: 100%;
          height: 1.8vw !important;
          background: transparent;
          border: #33384c solid 1px;
          font-size: 0.8vw;
          // width: 268px;
          // transform: scale(0.6);
        }
      }
    }

    // background-color: purple;
    .line_bott_echarts {
      // max-height: 80%;
      height: 90%;
      width: 100%;
      display: flex;
      justify-content: space-between;

      // flex-direction: column;
      // 报警预警趋势
      .line_warning1 {
        // min-height: 320px;
        height: 100%;
        width: 25%;
        background-color: #181f31;

        .alarm_echarts_title {
          height: 10%;
        }

        // 图
        .alarm_echarts {
          height: 90%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      // 历史报警分布统计
      .line_warning2 {
        height: 100%;
        width: 25%;
        background-color: #181f31;

        .history_alarm_title {
          height: 10%;
        }

        // 图
        .history_alarm {
          height: 90%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      // 历史预警发布统计
      .line_warning3 {
        height: 100%;
        width: 25%;
        background-color: #181f31;

        .history_forewarn_title {
          height: 10%;
        }

        // 图
        .history_forewarn {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      // 报警预警top10
      .line_warning4 {
        height: 100%;
        width: 25%;
        background-color: #181f31;

        .line_top10_title {
          height: 10%;
        }

        // 图
        .line_top10 {
          height: 90%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
<style>
/* 日期选择器 */
.alarm_title .el-input__icon,
.bott_title_right .el-input__icon {
  height: auto;
  font-size: 0.6vw;
  margin-left: -5px;
  color: #c0c4cc;
  float: left;
  line-height: 0vw;
}

.alarm_title .el-date-editor .el-range-separator,
.bott_title_right .el-date-editor .el-range-separator {
  height: auto;
  font-size: 0.6vw;
}

.alarm_title .el-date-editor .el-range-input,
.bott_title_right .el-date-editor .el-range-input {
  font-size: 0.6vw;
  background-color: transparent;
}

.alarm_title .el-date-editor .el-range__icon {
  font-size: 0.6vw;
  margin-left: -5px;
  color: #c0c4cc;
  float: left;
  line-height: 0vw;
}

.line .line_block .line_top .line_Tbott .line_alarm .alarm_title .el-range-editor.el-input__inner {
  height: 1.8vw !important;
  width: 39%;
  background: transparent;
  border: #33384c solid 1px;
}

.el-date-editor .el-range__close-icon {
  font-size: 0.6vw;
  color: #c0c4cc;
  width: 25px;
  display: inline-block;
  float: right;
  line-height: 0vw;
}

.el-select-dropdown {

  border: 1px solid rgba(255, 255, 255, .15);
  background-color: #181f30;
}

.el-popper .popper__arrow {
  visibility: hidden;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #223147;
}

.line_Tcenter .el-select .el-input__inner {
  background-color: #0b1121 !important;
  border: 0;
  color: #0084ffa6;
  width: 100px;
}
</style>

<template>
  <div class="train">
    <div class="train-select">
      <div class="svg">
        <div>
          <svg viewBox="156.059 225.515 91.041 59.736" xmlns="http://www.w3.org/2000/svg" width="30px">
            <rect style="stroke: rgb(0, 0, 0); stroke-miterlimit: 3.87; stroke-width: 0px; fill: rgb(66, 173, 93);"
              x="156.059" y="225.515" width="88.38" height="59.736" rx="2" ry="2" />
            <rect x="244.439" y="235.686" width="2.661" height="10.561"
              style="stroke-width: 0px; stroke: rgb(66, 173, 93); paint-order: stroke; fill: rgb(66, 173, 93);" />
            <rect x="244.422" y="263.414" width="2.661" height="10.561"
              style="stroke: rgb(0, 0, 0); stroke-width: 0px; fill: rgb(66, 173, 93);" />
            <rect style="stroke: rgb(0, 0, 0); fill: rgb(39, 53, 83); stroke-miterlimit: 3.87; stroke-width: 0px;"
              x="160.912" y="229.93" width="78.908" height="51.677" rx="2.231" ry="2.231" />
            <text style="fill: rgb(66, 173, 93); font-family: Arial, sans-serif; font-size: 28px; white-space: pre;"
              x="224.754" y="258.002"
              transform="matrix(1.3642630577087402, 0, 0, 1.2998440265655518, -136.27794493487204, -67.0629607616197)">SIV</text>
          </svg>
        </div>
        <div>
          <el-select v-model="trainValue" placeholder="11001002">
            <el-option v-for="item in trainOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="back-btn">
        <el-button @click="goback">返回</el-button>
      </div>
    </div>
    <!-- 顶部实时预警/报警 12.5-->
    <div class="train_top">
      <!-- 实时报警 -->
      <div class="train_top_alarm">
        <warning :msg="0" />
      </div>
      <!-- 实时预警 -->
      <div class="train_top_alert">
        <warning :msg="1" />
      </div>
      <!-- 寿命预警 -->
      <div class="train_top_lifetime">
        <LifetimeCom />
      </div>
    </div>
<!-- git config --global --unset http.proxy
git config --global --unset https.proxy -->

    <!-- 列车状态实时监视 33.6-->
    <div class="train_center">
      <!-- 车厢选择 -->
      <div class="train_center_title">
        <div class="train_title_name font_size20">车厢选择</div>
        <div class="train_title_black">
          <!-- 顶部图片 -->
          <div class="train_title_img"></div>
          <!-- 底部车厢 -->
          <div class="train_title_nick font_size18">
            <div class="train_nick1">
              <div>A1</div>
              <img src="../../public/img/jinggao.png" alt="" />
            </div>
            <div class="train_nick2">
              <div>A2</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick3">
              <div>A3</div>
              <img src="../../public/img/weixian.png" alt="" />
            </div>
            <div class="train_nick4">
              <div>A4</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick5">
              <div>A5</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick6">
              <div>A6</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
          </div>
          <!-- 选项透明膜 -->
          <div class="train_item" @click="sideCard">
            <div :class="card.isActive ? 'visibilit' : 'Card'" v-for="(card, index) in cards" :key="card.id"
              :data-id="card.id"></div>
          </div>
        </div>
      </div>
      <!-- canvas电路图 -->
      <div class="train_center_canvas">
        <!-- <img style="width: 100vw;" src="../../public/img/map.png" alt="" /> -->
        <!-- <canvas ref="circuit_fig" ></canvas> -->
        <CanvasCircuit />
      </div>

      <div class="train-signal">
        <div>
          <span>信号量</span>
        </div>
        <div class="signal-btn-div">
          <el-button size="mini" class="signal-btn">全部</el-button>
          <el-button size="mini" class="signal-btn">辅助变流器</el-button>
          <el-button size="mini" class="signal-btn">高压电气箱</el-button>
          <el-button size="mini" class="signal-btn">逆变输出</el-button>
          <el-button size="mini" class="signal-btn">充电机</el-button>
        </div>
        <div class="data-time">
          <i class="el-icon-time"></i>数据时间: {{ data_time }}
        </div>
        <div class="signal-panels">
          <!-- <div class="singal-item" v-for="i in 30">
            <SignalCom :signal_name="'A1-充电机输出电流传感器BC11'" signal_value="50A" :color="'#ac3577'">
            </SignalCom>
          </div> -->
          <div class="singal-item" v-for="(item, index) in signals" v-bind:key="item">
            <SignalCom :signal_name="'A' + item" :signal_value="getSignalsVal(index)" :color="getColor(index)">
            </SignalCom>
          </div>
          <div class="add-signal-btn" @click="modSignals">
            <div><i class="el-icon-plus"></i></div>
            <span> &nbsp;编辑信号量</span>
          </div>
        </div>
        <div>
          <EChartsCom :width="'100%'" :height="'40dvh'" :option="signal_option"></EChartsCom>
        </div>
      </div>
    </div>
    <!-- 关键指标展示 53.9-->
    <div class="train_bott">
      <!-- 关键指标展示 -->
      <div class="train_indicators">
        <!-- 图太模糊 不知道是啥 -->
        <div class="indicators_top"></div>
        <!-- 指标表格 -->
        <div class="indicators">
          <!-- title -->
          <div class="indicators_title font_size26w">
            <div v-for="(item, index) in indicators_cards" :key="index" :class="item.isActive ? 'border' : ''"
              @click="indicators_togg(index)">
              {{ item.name }}
            </div>
          </div>
          <!-- list -->
          <table class="indicators_table">
            <thead>
              <tr class="indicators_thead font_size26w">
                <th v-for="(item, index) in indicators_title" :key="index">
                  {{ item }}
                </th>
              </tr>
            </thead>
            <tbody class="indicators_tbody">
              <template v-for="(item1, index1) in indicators_content">
                <tr v-for="(item, index) in item1.parts" class="font_size20">
                  <td :rowspan="10" v-if="index === 0 && index1 === 0">
                    <!-- <td :rowspan="parts_long" v-if="index === 0 && index1 === 0"> -->
                    {{ item1.system }}
                  </td>
                  <td :rowspan="item1.parts.length" v-if="index === 0">
                    {{ item.parts_ }}
                  </td>
                  <td>{{ item.performance_metrics }}</td>
                  <td>{{ item.metric_values }}</td>
                  <td>
                    <span :class="item.state === 0 ? 'abnormal' : 'normal'">{{
                      item.state === 0 ? "异常" : "正常"
                    }}</span>
                  </td>
                  <td class="detail">
                    <span @click="instructions_togg">查看详情</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template>
      <!-- 弹出层 -->
      <div class="pop_ups">
        <!-- 弹出层 -->
        <el-dialog class="indicator_curves" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false"
          @close="dialogVisible = false">
          <!-- 关键指标曲线 -->
          <div class="curves_title font_size26w">
            <!-- 部件名称 -->
            <div class="curves_title_le">电机滤网</div>
            <!-- 查询时间 -->
            <div class="curves_title_ri">
              <!-- <div class="choices">
                <div>近7天</div>
                <div>近30天</div>
                <div>近12月</div>
              </div> -->
              <div class="block">
                <el-date-picker v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <!-- ECharts 图表容器 -->
          <div ref="chartRef" class="chartref"></div>
        </el-dialog>
      </div>
    </template>

    <el-dialog :visible.sync="dialogVisible1" class="selector">
      <SignalSelector @cancel="cancel" @comfirm="comfirm" :initCheckList="signals" />
    </el-dialog>
  </div>
</template>

<script>
import { warning } from "../components/train.vue";
import * as echarts from "echarts";
import moment from "moment";
import SignalCom from "../components/SignalCom.vue";
import EChartsCom from "@/components/EChartsCom.vue";
import LifetimeCom from "@/components/LifetimeCom.vue";
import CanvasCircuit from "@/components/CanvasCircuit.vue"
import SignalSelector from '@/components/SignalSelector.vue';
import { colors, lineData } from '@/api/api.js'

export default {
  name: "train",
  props: {
    msg: String,
  },
  comments: {
    warning,
  },
  components: {
    SignalCom,
    EChartsCom,
    LifetimeCom,
    CanvasCircuit,
    SignalSelector
  },
  data() {
    let min = 30;
    let max = 40;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      data_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      signal_option: {
        color: colors(),
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
          axisLabel: {
            formatter: function (value, index) {
              var date = new Date(value);
              return (
                moment(date).format("YYYY-MM-DD") +
                "\n" +
                moment(date).format("HH:mm:ss.SSS")
              );
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "A",
            position: "left",
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#1d2434",
              },
            },
          },
          {
            type: "value",
            name: "V",
            position: "left",
            offset: 35,
            // alignTicks: true, // ！！配置多坐标轴标签对齐
            scale: false,
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "0/1",
            min: 0,
            max: 1,
            position: "right",
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [],
      },

      dialogVisible1: false,
      signals: ['1-逆变器V相电流', '1-LLC输出下半部电压', '8-斩波输出电压2'],

      // 列车车厢 透明膜点击
      cards: [
        { id: "A1", class: "Card", isActive: true },
        { id: "A2", class: "Card", isActive: false },
        { id: "A3", class: "Card", isActive: false },
        { id: "A4", class: "Card", isActive: false },
        { id: "A5", class: "Card", isActive: false },
        { id: "A6", class: "Card", isActive: false },
      ],
      // 被点击车厢
      index: "A1",
      // 指标表格 title
      indicators_title: ["系统", "部件", "性能指标", "指标值", "状态", "操作"],
      // 全部零件
      indicators_cards: [
        { id: "A1", class: "Card", name: "全部53/10", isActive: true },
        { id: "A2", class: "Card", name: "辅助变流器120/3", isActive: false },
        { id: "A3", class: "Card", name: "充电机14/1", isActive: false },
        { id: "A4", class: "Card", name: "蓄电池5/1", isActive: false },
        { id: "A5", class: "Card", name: "辅助变流器220/3", isActive: false },
        { id: "A6", class: "Card", name: "充电机24/2", isActive: false },
      ],
      // 指标表格 body
      indicators_content: [
        {
          system: "辅助变流器1",
          parts: [
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 1,
            },
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
          ],
        },
        {
          system: "辅助变流器1",
          parts: [
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
          ],
        },
        {
          system: "辅助变流器1",
          parts: [
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
            {
              parts_: "网压传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
          ],
        },
      ],
      // 指标表格parts长度
      parts_long: null,
      // 弹窗
      dialogVisible: false,
      searchQuery: "",
      chart: null, // 用于保存 ECharts 实例
      // 时间选择
      value1: "",
      // 左上角选择器
      value: null,
      options: null,
      // 图表
      chartRef: null,

      trainValue: '',
      trainOptions: [{
        value: '11005006',
        label: '11005006'
      },
      {
        value: '11001002',
        label: '11001002'
      },
      {
        value: '11003004',
        label: '11003004'
      }],
    };
  },
  methods: {
    generateTimeValuePairs(startDate, numEntries, intervalSeconds) {
      // 初始化moment对象
      var moment = require("moment"); // 如果在Node.js环境中

      // 结果数组
      let data = [];

      // 基础日期
      let currentTimestamp = moment(startDate);

      for (let i = 0; i < numEntries; i++) {
        // 格式化时间戳
        let formattedTimestamp = currentTimestamp.format("YYYY/M/D HH:mm:ss");

        // 生成随机数值
        let randomValue = Math.floor(Math.random() * 2000); // 例如在0到2000之间

        // 添加到结果数组
        data.push([formattedTimestamp, randomValue]);

        // 增加时间间隔
        currentTimestamp.add(intervalSeconds, "seconds");
      }

      return data;
    },
    // 列车车厢选择
    sideCard(e) {
      // 获取点击对象
      const clickedCard = e.target.closest(".Card");
      if (clickedCard) {
        // console.log(clickedCard.dataset.id);
        this.index = clickedCard.dataset.id;
        this.cards.forEach((ele, i) => {
          ele.isActive = false;
        });
        this.cards.forEach((ele, i) => {
          if (ele.id === clickedCard.dataset.id) {
            ele.isActive = true;
          }
        });
      }
    },
    // 指标选择
    indicators_togg(e) {
      this.indicators_cards.forEach((element, i) => {
        element.isActive = false;
        if (i === this.indicators_cards.length - 1) {
          this.indicators_cards[e].isActive = true;
          // 修改tbody的值
          this.indicators_content = [
            {
              system: "辅助变流器" + (e + 1),
              parts: [
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
              ],
            },
            {
              system: "辅助变流器" + (e + 1),
              parts: [
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
              ],
            },
            {
              system: "辅助变流器" + (e + 1),
              parts: [
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
                {
                  parts_: "网压传感器",
                  performance_metrics: "电压偏置因子[-5,5]",
                  metric_values: "-3.17",
                  state: 0,
                },
              ],
            },
          ];
        }
      });
    },
    // 指标曲线图
    echarts_() {
      //  根据屏幕宽度调整 文字大小
      var e = document.body.clientWidth;
      if (this.$refs.chartRef) {
        this.chartRef = echarts.init(this.$refs.chartRef);
        this.chartRef.setOption({
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
            name: "时间(天)",
            nameTextStyle: {
              fontSize: (e / 1920) * 16,
            },
            type: "category",
            boundaryGap: false,
            data: ["2023-09-25", "2023-10-03", "2023-10-11", "2023-10-19"],
            axisLine: {
              lineStyle: {
                // color: "red",
                color: "#757984",
              },
            },
            axisLabel: {
              fontSize: (e / 1920) * 16,
              interval: 0, // 显示所有标签
              margin: (e / 1920) * 18,
            },
          },
          yAxis: {
            name: "°c",
            nameTextStyle: {
              fontSize: (e / 1920) * 16,
            },
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
              smooth: true, // 变为曲线
              // stack: 'Total',
              symbolSize: (e / 1920) * 8,
              // label: {
              //   show: true, // 开启标签显示
              //   position: 'top', // 设置标签位置在数据点的上方
              //   color: 'red',
              //   fontSize: e / 1920 * 18
              // },

              lineStyle: {
                // 设置线的样式
                color: "#882d3c", // 线的颜色
                width: (e / 1920) * 3,
              },
              itemStyle: {
                color: "red",
                borderWidth: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                borderHeight: (e / 1920) * 5, // 正常状态下数据点的边框宽度
              },
              data: [0, 8, 0, 0],
              markLine: {
                data: [
                  {
                    yAxis: 6, // 阈值
                    label: {
                      // 自定义阈值线的标签
                      formatter: "阈值: 6",
                      position: "middle",
                    },
                    lineStyle: {
                      type: "dashed", // 虚线
                      color: "red", // 红色
                    },
                  },
                ],
              },
            },
            {
              name: "故障",
              type: "line",
              smooth: true, // 变为曲线
              axisLabel: {
                fontSize: (e / 1920) * 18, // y轴刻度标签的字体大小
              },
              // stack: 'Total',
              symbolSize: (e / 1920) * 8,
              // label: {
              //   show: true, // 开启标签显示
              //   position: 'top', // 设置标签位置在数据点的上方
              //   color: '#da8157',
              //   fontSize: e / 1920 * 18
              // },
              lineStyle: {
                // 设置线的样式
                // color: '#e48555' // 线的颜色
                width: (e / 1920) * 3,
              },
              itemStyle: {
                color: "#da8157",
                borderWidth: (e / 1920) * 5, // 正常状态下数据点的边框宽度
                borderHeight: (e / 1920) * 5, // 正常状态下数据点的边框宽度
              },
              data: [0, 4, 0, 0],
            },
          ],
        });
      }
    },

    // 查看部件详情
    instructions_togg() {
      this.dialogVisible = true;
      if (this.chartRef) {
        this.chartRef.dispose();
        this.chartRef = null;
      }
      let checkChartRef = setInterval(() => {
        if (this.$refs.chartRef) {
          clearInterval(checkChartRef);
          this.echarts_();
        }
      }, 30);
    },
    goback() {
      this.$router.back();
    },

    // 渲染电路图

    fun_circuitFig(w, h, x, y) {
      // 画布宽度 高度 圆心坐标x y
      // 电压表
      var ammeter = new Image();
      ammeter.src = "./img/canvas/ammeter.png";
      // 电感器
      var Inductors = new Image();
      Inductors.src = "./img/canvas/Inductors.png";
      // 电阻
      var resistance = new Image();
      resistance.src = "./img/canvas/resistance.png";
      // 传感器
      var sensor = new Image();
      sensor.src = "./img/canvas/sensor.png";

      // const ctx = this.$refs.circuit_fig;
      const ctx = this.$refs.circuit_fig.getContext("2d");
      const canvas = this.$refs.circuit_fig;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = 1600 * ratio; // 实际渲染像素
      canvas.height = 800 * ratio; // 实际渲染像素
      canvas.style.width = `${w}px`; // 控制显示大小
      canvas.style.height = `${h}px`; // 控制显示大小
      // 文本
      ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.fillStyle = "#95979d"; // 设置文本颜色
      // 文本 输入接触EEB
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      // 各个点的名称
      // ======================================
      // 绘制线的颜色
      ctx.strokeStyle = "#95979d";
      // 默认配置
      ctx.lineCap = "butt";
      // 圆的半径，即小圆点的大小
      var radius = 5;
      // 圆右边起点 圆心 + 半径
      var center_r = x + radius;
      // 电子元件宽度高度
      let electronic_w = 40;
      let electronic_h = 40;
      // ===================================
      // 开始绘制 电路图左边区域 =========区域1==========
      ctx.beginPath();
      // 圆1
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      // 绘制圆形
      ctx.stroke();
      // DC文本间距
      let DC_jianju = 40;
      // DC1500V+  汉字 12   大写字母 8   数字 5
      ctx.fillText(
        "DC1500V+",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        y - DC_jianju
      );
      // 虚线1
      ctx.beginPath();
      // 起点
      ctx.moveTo(center_r, y);
      // 终点
      // 虚线1 终点
      let dashed1 = center_r + 320;
      ctx.lineTo(dashed1, y);
      // 虚线的配置
      ctx.setLineDash([8, 10]);
      ctx.stroke();
      // 电感器 水平移动距离
      let Inductors_level = center_r + 90;
      // ctx.font = "12px Arial"; // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      // ctx.fillStyle = "#95979d"; // 设置文本颜色
      // // 文本 输入接触EEB
      // ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 7.33  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        "输入接触器B",
        Inductors_level + electronic_w / 2 - (12 * 4 + 7.33 * 3) / 2,
        y + 40
      );
      // 传感器 水平移动距离
      let sensor_level = center_r + 180;
      // 使用更常见的字体，如Arial，以确保跨浏览器兼容性
      ctx.font = "12px Arial";
      // 设置文本颜色
      ctx.fillStyle = "#95979d";
      // 文本 输入电压传感器
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // 图片中心位置 - 文本中心位置
        "输入电流传感器",
        sensor_level + electronic_w - (12 * 7 + 7.33 * 0) / 2,
        y + electronic_h
      );
      // 圆心 + 图片高度 + 文本行高 + 1
      ctx.fillText(
        "--A",
        sensor_level + electronic_w - (12 * 1 + 7.33 * 1) / 2,
        y + electronic_h + 14
      );

      // 圆2
      // 重新修改为实线
      ctx.setLineDash([]);
      ctx.beginPath();
      // 圆2 的圆心y坐标
      let center_r2_y = y + 150;
      ctx.arc(x, center_r2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // DC1500V+
      ctx.fillText(
        "DC1500V-",
        x - (12 * 0 + 7.33 * 3 + 5 * 5) / 2,
        center_r2_y + DC_jianju
      );
      // 虚线2
      let dashed2 = center_r + 320;
      ctx.beginPath();
      ctx.moveTo(center_r, center_r2_y);
      ctx.lineTo(dashed2, center_r2_y);
      ctx.setLineDash([8, 10]);
      ctx.stroke();

      // 虚线3
      ctx.beginPath();
      ctx.moveTo(x + 30, y);
      ctx.lineTo(x + 30, center_r2_y);
      ctx.setLineDash([8, 10]);
      ctx.stroke();
      // 电压表 水平移动距离
      let ammeter1_level = x + 30;
      // 电压表 垂直移动距离
      let ammeter1_vertical = center_r2_y;
      // 文本 电压 --v
      ctx.textBaseline = "middle"; // 设置文本的基线为中间 汉字 13 大写字母 8  (12*7+7*3) 文本宽度  图片中心位置--> x + 50（移动的长度）+ 20 （图片宽度一半）
      ctx.fillText(
        // （圆心点 + 移动距离 -图片宽度一半 ）- 文本长度 - 一丢丢距离
        "网压",
        ammeter1_level - electronic_w / 2 - (12 * 2 + 7.33 * 0) - 5,
        center_r2_y - (center_r2_y - y) / 2 - 6
      );
      // console.log("圆点2的圆心", center_r2_y);
      ctx.fillText(
        "--v",
        ammeter1_level - electronic_w / 2 - (12 * 1 + 7.33 * 1) - 5,
        center_r2_y - (center_r2_y - y) / 2 + 6
      );
      // 矩形
      ctx.setLineDash([]);
      ctx.beginPath();
      // 矩形超出的距离
      let rectangle_overflow = 15;
      // 矩形的宽度
      let rectangle_w = dashed1 + 100;
      // 矩形的高度
      // let rectangle_h = 150;
      ctx.moveTo(dashed1, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(rectangle_w, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.lineTo(dashed1, y - rectangle_overflow);
      ctx.stroke();
      // 斜杠
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y - rectangle_overflow);
      ctx.lineTo(dashed2, center_r2_y + rectangle_overflow);
      ctx.stroke();
      let rectangle_jianju = 10;
      // HVM模块
      ctx.fillText(
        "输入变换器",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 1 + 7.33 * 3 + 5 * 5) / 2,
        y - rectangle_overflow - rectangle_jianju
      );
      // ----°c
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju
      );
      ctx.fillText(
        "----°c",
        (rectangle_w - dashed1) / 2 + dashed1 - (12 * 0 + 7.33 * 3 + 5 * 0) / 2,
        center_r2_y + rectangle_overflow + rectangle_jianju + 12 * 1.2
      );
      // DC  AC
      ctx.fillText(
        "DC",
        dashed1 + 12 * 1,
        (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
        (y - rectangle_overflow)
      );
      // AC
      ctx.fillText(
        "AC",
        rectangle_w - 12 * 2,
        center_r2_y +
        rectangle_overflow -
        (y - rectangle_overflow) -
        (center_r2_y + rectangle_overflow - (y - rectangle_overflow)) / 4 +
        (y - rectangle_overflow)
      );

      //线圈
      ctx.setLineDash([8, 10]);
      // 线圈长度
      let coil_w = rectangle_w + 60;
      let coil_h = 30;
      // 线圈1
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y);
      ctx.lineTo(coil_w, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rectangle_w, y + coil_h);
      ctx.lineTo(coil_w, y + coil_h);
      ctx.stroke();
      //弧形 (x,y,半径,弧度,是否对称)
      // 弧的半径
      var arc_r = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(coil_w, y + arc_r, arc_r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        y + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 线圈2
      ctx.setLineDash([8, 10]);
      // bott
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y);
      ctx.lineTo(coil_w, center_r2_y);
      ctx.stroke();
      // top
      ctx.beginPath();
      ctx.moveTo(rectangle_w, center_r2_y - coil_h);
      ctx.lineTo(coil_w, center_r2_y - coil_h);
      ctx.stroke();
      //弧形
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 2,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.arc(
        coil_w,
        center_r2_y - coil_h + arc_r + arc_r * 4,
        arc_r,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 系统电路图（广三东延） 左边区域绘制结束（不包括图片）
      // 开始绘制 电路图右上边区域 =========区域2==========
      // 左手边为区域2 原点(线圈1 左上角)
      // ==========线圈1 + 线圈2==========
      // 弧
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = y + arc_r;
        } else {
          var coil_rtop_x = coil_w + 20;
          var coil_rtop_y = center_r2_y - coil_h + arc_r;
        }
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 2,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.arc(
          coil_rtop_x,
          coil_rtop_y + arc_r * 4,
          arc_r,
          -Math.PI / 2,
          Math.PI / 2,
          true
        );
        ctx.stroke();
        // 弧虚线top1.1
        ctx.setLineDash([8, 10]);
        // 长度
        var coil_xu_top1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y - arc_r);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r);
        ctx.stroke();
        // 弧虚线bott1.1
        // 长度
        var coil_xu_bott1_1 = coil_rtop_x + 50;
        ctx.beginPath();
        ctx.moveTo(coil_rtop_x, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(coil_xu_bott1_1, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
        // ======半导体top======
        ctx.setLineDash([]);
        // 宽度
        var diode_img_w = 50;
        // 超出部分
        var diode_img_h = 10;
        // 矩形
        ctx.beginPath();
        ctx.moveTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y - arc_r - diode_img_h
        );
        ctx.lineTo(
          coil_xu_top1_1 + diode_img_w,
          coil_rtop_y + (arc_r + 1) * 4 + diode_img_h
        );
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y + (arc_r + 1) * 4 + diode_img_h);
        ctx.lineTo(coil_xu_top1_1, coil_rtop_y - arc_r - diode_img_h);
        ctx.stroke();
        // 半导体图标（二极管）
        // 二极管 顶点坐标
        if (i === 0) {
          var erjg_y = y;
        } else {
          var erjg_y = center_r2_y - coil_h;
        }
        var erjg_x = coil_xu_top1_1 + diode_img_w / 2;
        var erjg_h = 30;
        // 竖
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y);
        ctx.lineTo(erjg_x, erjg_y + erjg_h);
        ctx.stroke();
        // 横
        // 距离定点 的距离
        var top_erjg = 8;
        ctx.beginPath();
        ctx.moveTo(erjg_x - top_erjg, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg);
        ctx.stroke();
        // 三角形
        // 三角形高度
        var sjx_erjg = 15;
        ctx.beginPath();
        ctx.moveTo(erjg_x, erjg_y + top_erjg);
        ctx.lineTo(erjg_x + top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x - top_erjg, erjg_y + top_erjg + sjx_erjg);
        ctx.lineTo(erjg_x, erjg_y + top_erjg);
        ctx.stroke();
        // ==================
        // 弧虚线top1.2
        // 起点
        var hu_top1_2 = coil_xu_bott1_1 + diode_img_w;
        // 长度
        var hu_top1_2w = 50;
        ctx.setLineDash([8, 10]);
        ctx.beginPath();
        // 弧虚线top1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y - arc_r);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y - arc_r);
        ctx.stroke();
        ctx.beginPath();
        // 弧虚线bott1.2
        ctx.moveTo(hu_top1_2, coil_rtop_y + (arc_r + 1) * 4);
        ctx.lineTo(hu_top1_2 + hu_top1_2w, coil_rtop_y + (arc_r + 1) * 4);
        ctx.stroke();
      }
      // 顶部虚线
      // 原点坐标
      let top_xu_x = (hu_top1_2 + hu_top1_2w - hu_top1_2) / 2 + hu_top1_2;
      let top_xu_y = y;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(top_xu_x, top_xu_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // 虚线
      // 虚线高度
      let top_xu_h = 60;
      let top_xu_w = 640;
      ctx.moveTo(top_xu_x, top_xu_y);
      ctx.lineTo(top_xu_x, top_xu_y - top_xu_h);
      ctx.lineTo(top_xu_x + top_xu_w, top_xu_y - top_xu_h);
      ctx.stroke();
      // 相电流传感器
      ctx.fillText(
        "U_DC_Out",
        top_xu_x + top_xu_w - (12 * 0 + 7.33 * (7 + 3) + 5 * 0),
        top_xu_y - top_xu_h + 12 * 1.3
      );
      // 传感器5
      // 图片中心位置
      // let sensor5_x = rectangle3_xu_x + rectangle3_xu_w -310
      let sensor6_y = top_xu_y - top_xu_h;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        top_xu_x + top_xu_w + radius,
        top_xu_y - top_xu_h,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // ===================顶部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle3_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      // var rectangle3_y = coil_rtop_y  - arc_r - diode_img_h
      var rectangle3_y = y - arc_r - diode_img_h;
      var rectangle3_w = 70;
      var rectangle3_h = 70;
      ctx.beginPath();
      ctx.moveTo(rectangle3_x, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x + rectangle3_w, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.lineTo(rectangle3_x, rectangle3_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle3_x + 12, rectangle3_y + 12 * 1.5);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle3_x + rectangle3_w - 12 * 2,
        rectangle3_y + rectangle3_h - 12
      );
      ctx.fillText(
        "充电机",
        (rectangle3_x + rectangle3_w - rectangle3_x) / 4 + rectangle3_x,
        rectangle3_y + rectangle3_h + 12
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle3_x + rectangle3_w, rectangle3_y);
      ctx.lineTo(rectangle3_x, rectangle3_y + rectangle3_h);
      ctx.stroke();
      // 横向虚线1=============
      ctx.setLineDash([8, 10]);
      // 虚线1起点
      let rectangle3_xu_x = rectangle3_x + rectangle3_w;
      // 往下移动距离
      let rectangle3_xu_ = 25;
      let rectangle3_xu_y = rectangle3_y + rectangle3_xu_;
      // 虚线长度
      let rectangle3_xu_w = 500;
      // 虚线1
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y);
      ctx.lineTo(rectangle3_xu_x + rectangle3_xu_w, rectangle3_xu_y);
      ctx.stroke();

      // 传感器6
      let sensor6_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      // 相电流传感器
      ctx.fillText("--A", sensor6_x + (electronic_w / 2) * 3, sensor6_y - 12);
      // 传感器5
      // 图片中心位置
      let sensor5_x = rectangle3_xu_x + rectangle3_xu_w - 310;
      let sensor5_y = rectangle3_xu_y;
      // 相电流传感器
      ctx.fillText(
        "蓄电池充放电流传感器",
        sensor5_x + (electronic_w / 2) * 3,
        sensor5_y - 12
      );
      ctx.fillText("--A", sensor5_x + (electronic_w / 2) * 3, sensor5_y + 12);
      // 增加虚线1 和 虚线2 的宽度
      let jianju = 10;
      // 横向虚线2=============
      ctx.beginPath();
      ctx.moveTo(rectangle3_xu_x, rectangle3_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle3_xu_x + rectangle3_xu_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 电容器 图案
      // 左顶点坐标
      let capacitor_topX = rectangle3_xu_x + rectangle3_xu_w;
      let capacitor_topY = rectangle3_xu_y;
      let capacitor_bottX = rectangle3_xu_x + rectangle3_xu_w;
      let capacitor_bottY = rectangle3_xu_y + rectangle3_xu_ + jianju;
      // 矩形宽度
      let capacitor_w = 60;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w, capacitor_bottY);
      ctx.lineTo(capacitor_bottX, capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      // 底部
      //弧形
      let hu_radius = 4;
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius,
        hu_radius,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      ctx.stroke();
      // 横
      ctx.beginPath();
      ctx.moveTo(capacitor_bottX, capacitor_bottY + hu_radius * 2);
      ctx.lineTo(
        capacitor_bottX + capacitor_w,
        capacitor_bottY + hu_radius * 2
      );
      ctx.stroke();
      // 顶部
      // 弧形
      let hu_radius2 = 7;
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        capacitor_topY,
        hu_radius2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 口
      // 高度
      let kou_h = 18;
      // ----------左
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2, capacitor_topY);
      ctx.lineTo(capacitor_topX + hu_radius2 * 2, capacitor_topY - kou_h);
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2,
        capacitor_topY - kou_h
      );
      ctx.lineTo(capacitor_topX + capacitor_w - hu_radius2 * 2, capacitor_topY);
      ctx.stroke();
      // 间距
      let kou_w = 5;
      ctx.beginPath();
      ctx.moveTo(capacitor_topX + hu_radius2 * 2 + kou_w, capacitor_topY);
      ctx.lineTo(
        capacitor_topX + hu_radius2 * 2 + kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY - kou_h + kou_w
      );
      ctx.lineTo(
        capacitor_topX + capacitor_w - hu_radius2 * 2 - kou_w,
        capacitor_topY
      );
      ctx.stroke();

      // 外部电极
      // 负极 左点坐标
      let fu_x_left = capacitor_topX + hu_radius2 - hu_radius2 / 2;
      let fu_y_left = capacitor_topY - hu_radius2;
      let fu_h_left = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x_left, fu_y_left);
      ctx.lineTo(fu_x_left, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fu_x_left + hu_radius2, fu_y_left);
      ctx.lineTo(fu_x_left + hu_radius2, fu_y_left - fu_h_left);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        capacitor_topX + hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();
      // 正极 右点坐标
      let zheng_x_right =
        capacitor_topX +
        capacitor_w -
        hu_radius2 +
        hu_radius2 -
        hu_radius2 -
        hu_radius2 / 2;
      let zheng_y_right = capacitor_topY - hu_radius2;
      let zheng_h_right = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x_right, zheng_y_right);
      ctx.lineTo(zheng_x_right, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(zheng_x_right + hu_radius2, zheng_y_right);
      ctx.lineTo(zheng_x_right + hu_radius2, zheng_y_right - zheng_h_right);
      ctx.stroke();
      ctx.beginPath();
      //       ctx.arc(capacitor_topX + capacitor_w - hu_radius2, capacitor_topY, hu_radius2, 0, -Math.PI, true);
      ctx.arc(
        capacitor_topX + capacitor_w - hu_radius2,
        fu_y_left - fu_h_left,
        hu_radius2 / 2,
        0,
        -Math.PI,
        true
      );
      ctx.stroke();

      // - +
      // 负极
      let fu_x = capacitor_topX + 5;
      let fu_y = (capacitor_topY - capacitor_bottY) / 2 + capacitor_bottY;
      let fu_w = 10;
      let fu_h = 5;
      ctx.beginPath();
      ctx.moveTo(fu_x, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y);
      ctx.lineTo(fu_x + fu_w, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y - fu_h);
      ctx.lineTo(fu_x, fu_y);
      ctx.stroke();
      // 正极
      let zheng_x = capacitor_topX + capacitor_w - 5;
      let zheng_y = fu_y;
      let zheng_w = 10;
      let zheng_h = 5;
      ctx.beginPath();
      ctx.moveTo(zheng_x, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y + zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y);
      ctx.lineTo(zheng_x - zheng_w * 1.5, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x - zheng_w, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w);
      ctx.lineTo(zheng_x - zheng_w / 2, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y - zheng_w / 2);
      ctx.lineTo(zheng_x, zheng_y);
      ctx.stroke();
      // ----°c
      ctx.fillText(
        "----°c",
        (capacitor_topX +
          capacitor_w -
          hu_radius2 -
          (capacitor_topX + hu_radius2)) /
        2 +
        (capacitor_topX + hu_radius2) -
        (12 * 0 + 7.33 * 1 + 5 * 4) / 2,
        capacitor_bottY + 12 * 2
      );
      /*
            // 矩形宽度
      let capacitor_w = 60
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(capacitor_topX, capacitor_topY);
      ctx.lineTo(capacitor_topX + capacitor_w, capacitor_topY);
      ctx.lineTo(capacitor_bottX + capacitor_w,capacitor_bottY);
      ctx.lineTo(capacitor_bottX,capacitor_bottY);
      ctx.lineTo(capacitor_topX, capacitor_topY);
      ctx.stroke();
      */

      ctx.fillText(
        "DC+",
        capacitor_topX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_topY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );
      ctx.fillText(
        "DC-",
        capacitor_bottX - (12 * 0 + 7.33 * 2 + 5 * 1) - 12,
        capacitor_bottY - (12 * 0 + 7.33 * 2 + 5 * 1) / 2
      );

      // ===================顶部电压表2=======================
      // 电压表1 左边圆心坐标
      let voltmeter_top1_x =
        (rectangle3_x + rectangle3_w - rectangle3_x) / 2 + rectangle3_x;
      let voltmeter_top1_y = sensor6_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top1_x, voltmeter_top1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // 虚线top1
      // 往上移动的距离
      let voltmeter_top1_h = 70;
      let voltmeter_top1_w = 60;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top1_x, voltmeter_top1_y - radius);
      ctx.lineTo(
        voltmeter_top1_x,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        voltmeter_top1_y - radius - voltmeter_top1_h
      );
      ctx.lineTo(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表1坐标
      let top1_voltmeter_imgX =
        (voltmeter_top1_x + voltmeter_top1_w - voltmeter_top1_x) / 2 +
        voltmeter_top1_x;
      let top1_voltmeter_imgY = voltmeter_top1_y - radius - voltmeter_top1_h;
      // DC  AC
      ctx.fillText(
        "充电机输入电压",
        top1_voltmeter_imgX - (12 * 7 + 7.33 * 0 + 5 * 0) / 2,
        top1_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top1_x + voltmeter_top1_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // 电压表2 左边圆心坐标
      // 电表间距
      let voltmeter_jianju = 22;
      let voltmeter_top2_x =
        voltmeter_top1_x + voltmeter_top1_w + voltmeter_jianju;
      let voltmeter_top2_y = rectangle3_xu_y;
      // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_top2_x, voltmeter_top2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // 虚线top1
      // 往上移动的距离
      let voltmeter_top2_h = 70;
      let voltmeter_top2_w = 60;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_top2_x, voltmeter_top2_y - radius);
      ctx.lineTo(
        voltmeter_top2_x,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        voltmeter_top1_y - voltmeter_top1_h - radius
      );
      ctx.lineTo(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju - radius
      );
      ctx.stroke();
      // 顶部电压表2坐标
      let top2_voltmeter_imgX =
        (voltmeter_top2_x + voltmeter_top2_w - voltmeter_top2_x) / 2 +
        voltmeter_top2_x;
      let top2_voltmeter_imgY = voltmeter_top1_y - voltmeter_top1_h - radius;
      // DC  AC
      ctx.fillText(
        "蓄电池电压",
        top2_voltmeter_imgX - (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        top2_voltmeter_imgY - electronic_h / 2 - 12
      );
      ctx.fillText(
        "--V",
        top2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        top2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_top2_x + voltmeter_top2_w,
        rectangle3_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);

      // ===================底部矩形===================
      ctx.setLineDash([]);
      // 矩形定点位置（半导体x +  // 弧虚线top1.2长度,半导体y ）
      var rectangle4_x = coil_xu_top1_1 + diode_img_w + hu_top1_2w;
      var rectangle4_y = coil_rtop_y - arc_r - diode_img_h - 10;
      var rectangle4_w = 70;
      var rectangle4_h = 140;
      ctx.beginPath();
      ctx.moveTo(rectangle4_x, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x + rectangle4_w, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.lineTo(rectangle4_x, rectangle4_y);
      ctx.stroke();
      // DC  AC
      ctx.fillText("DC", rectangle4_x + 12, rectangle4_y + 12 * 1.3);
      // DC  AC
      ctx.fillText(
        "AC",
        rectangle4_x + rectangle4_w - 12 * 2,
        rectangle4_y + rectangle4_h - 12
      );
      ctx.fillText(
        "----°c",
        (rectangle4_x + rectangle4_w - rectangle4_x) / 4 + rectangle4_x,
        rectangle4_y + rectangle4_h + 12
      );
      ctx.fillText(
        "逆变器",
        rectangle4_x - 12 * (3 + 1),
        rectangle4_y + rectangle4_h - 12 * 2
      );
      // 斜线
      ctx.beginPath();
      ctx.moveTo(rectangle4_x + rectangle4_w, rectangle4_y);
      ctx.lineTo(rectangle4_x, rectangle4_y + rectangle4_h);
      ctx.stroke();
      // 虚线1起点
      ctx.setLineDash([8, 10]);
      let rectangle4_xu_x = rectangle4_x + rectangle4_w;
      // 往下移动距离
      // let rectangle3_xu_ = 25;
      let rectangle4_xu_y = rectangle4_y + rectangle3_xu_;
      // 虚线长度
      let rectangle4_xu_w = 640;
      // 横向虚线1.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y);
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.stroke();
      // 传感器2
      // 图片中心位置
      let sensor2_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        220;
      let sensor2_y = rectangle4_xu_y;
      // 相电流传感器
      ctx.fillText(
        "U相电流传感器",
        sensor2_x + (electronic_w / 2) * 3,
        sensor2_y - 12
      );
      ctx.fillText(
        "--A",
        sensor2_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor2_y - 12 * 2.2
      );
      // 连接点1
      let lj_h = 20;
      let lj_w = 30;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y
      );
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y - lj_h
      );
      ctx.stroke();
      //
      ctx.fillText(
        "输出接触器",
        lj_w / 2 +
        (rectangle4_xu_x + rectangle4_xu_w) -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        (12 * 5 + 7.33 * 0 + 5 * 0) / 2,
        rectangle4_xu_y - lj_h - 12
      );

      // 横向虚线1.2=============
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y
      );
      ctx.lineTo(rectangle4_xu_x + rectangle4_xu_w, rectangle4_xu_y);
      ctx.stroke();
      // 小圆1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      ctx.fillText(
        "U",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y
      );

      // 横向虚线2.1=============
      ctx.beginPath();
      ctx.moveTo(rectangle4_xu_x, rectangle4_xu_y + rectangle3_xu_ + jianju);
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();
      // 传感器3
      // 图片中心位置
      let sensor3_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        150;
      let sensor3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // E相电流传感器
      ctx.fillText(
        "V相电流传感器",
        sensor3_x + (electronic_w / 2) * 3,
        sensor3_y - 12
      );
      ctx.fillText(
        "--A",
        sensor3_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor3_y - 12 * 2.2
      );
      // 连接点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);

      // 横向虚线2.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      ctx.stroke();

      // 小圆2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      ctx.fillText(
        "V",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + rectangle3_xu_ + jianju
      );
      // 横向虚线3.1=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 传感器4
      // 图片中心位置
      let sensor4_x =
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 -
        80;
      let sensor4_y = rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2;
      // F相电流传感器
      ctx.fillText(
        "W相电流传感器",
        sensor4_x + (electronic_w / 2) * 3,
        sensor4_y + 12
      );
      ctx.fillText(
        "--A",
        sensor4_x + (electronic_w / 2) * 3 + (12 * 4 + 7.33 * 0 + 5 * 0) / 2,
        sensor4_y + 12 * 2.2
      );
      // 连接点3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 - lj_h
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // 横向虚线3.2=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x +
        rectangle4_xu_w -
        (rectangle4_xu_x + rectangle4_xu_w) / 5 +
        lj_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      ctx.stroke();
      // 小圆3
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      ctx.fillText(
        "W",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2
      );
      // 横向虚线4=============
      ctx.beginPath();
      ctx.moveTo(
        rectangle4_xu_x,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.lineTo(
        rectangle4_xu_x + rectangle4_xu_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      ctx.stroke();
      // 小圆4
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        rectangle4_xu_x + rectangle4_xu_w + radius,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      ctx.fillText(
        "X",
        rectangle4_xu_x + rectangle4_xu_w + radius + 7.33 * 2,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 3
      );
      // =============底部电表============
      // 电压表1 左边圆心坐标=========================
      let voltmeter_bott1_x = voltmeter_top1_x + voltmeter_top1_w;
      let voltmeter_bott1_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott1_x, voltmeter_bott1_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // 虚线top1
      // // 往上移动的距离
      let voltmeter_bott1_h =
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * (3 + 5 / 3);
      let voltmeter_bott1_w = 65;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott1_x, voltmeter_bott1_y - radius);
      ctx.lineTo(voltmeter_bott1_x, voltmeter_bott1_h);
      ctx.lineTo(voltmeter_bott1_x + voltmeter_bott1_w, voltmeter_bott1_h);
      ctx.lineTo(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      let bott1_voltmeter_imgX =
        (voltmeter_bott1_x + voltmeter_bott1_w - voltmeter_bott1_x) / 2 +
        voltmeter_bott1_x;
      let bott1_voltmeter_imgY = voltmeter_bott1_h;
      ctx.fillText(
        "UV相电压",
        bott1_voltmeter_imgX - (12 * 3 + 7.33 * 2 + 5 * 0) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott1_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott1_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott1_x + voltmeter_bott1_w,
        rectangle4_xu_y + rectangle3_xu_ + jianju,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // // 电压表2 左边圆心坐标=======================
      let voltmeter_bott2_x =
        voltmeter_bott1_x + voltmeter_bott1_w + voltmeter_jianju;
      let voltmeter_bott2_y = rectangle4_xu_y;
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott2_x, voltmeter_bott2_y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // // 虚线top1
      // // 往上移动的距离
      let voltmeter_bott2_h = voltmeter_bott1_h;
      let voltmeter_bott2_w = voltmeter_bott1_w;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott2_x, voltmeter_bott2_y + radius);
      ctx.lineTo(voltmeter_bott2_x, voltmeter_bott2_h);
      ctx.lineTo(voltmeter_bott2_x + voltmeter_bott2_w, voltmeter_bott2_h);
      ctx.lineTo(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // 顶部电压表1坐标
      let bott2_voltmeter_imgX =
        (voltmeter_bott2_x + voltmeter_bott2_w - voltmeter_bott2_x) / 2 +
        voltmeter_bott2_x;
      let bott2_voltmeter_imgY = voltmeter_bott2_h;
      ctx.fillText(
        "UW电压",
        bott2_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott2_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott2_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott2_x + voltmeter_bott2_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // // 电压表3 左边圆心坐标=======================
      let voltmeter_bott3_x =
        voltmeter_bott2_x + voltmeter_bott2_w + voltmeter_jianju;
      let voltmeter_bott3_y = rectangle4_xu_y + rectangle3_xu_ + jianju;
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(voltmeter_bott3_x, voltmeter_bott3_y, radius, 0, 2 * Math.PI);
      ctx.stroke();
      // // // 虚线top1
      // // // 往上移动的距离
      let voltmeter_bott3_h = voltmeter_bott1_h;
      let voltmeter_bott3_w = voltmeter_bott2_w;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(voltmeter_bott3_x, voltmeter_bott3_y + radius);
      ctx.lineTo(voltmeter_bott3_x, voltmeter_bott3_h);
      ctx.lineTo(voltmeter_bott3_x + voltmeter_bott3_w, voltmeter_bott3_h);
      ctx.lineTo(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2 + radius
      );
      ctx.stroke();
      // // // 顶部电压表1坐标
      let bott3_voltmeter_imgX =
        (voltmeter_bott3_x + voltmeter_bott3_w - voltmeter_bott3_x) / 2 +
        voltmeter_bott3_x;
      let bott3_voltmeter_imgY = voltmeter_bott3_h;
      ctx.fillText(
        "VW电压",
        bott3_voltmeter_imgX - (12 * 2 + 7.33 * 2 + 5 * 0) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12
      );
      ctx.fillText(
        "--V",
        bott3_voltmeter_imgX - (12 * 0 + 7.33 * 1 + 5 * 2) / 2,
        bott3_voltmeter_imgY + electronic_h / 2 + 12 * 2
      );
      // // // 小圆
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(
        voltmeter_bott3_x + voltmeter_bott3_w,
        rectangle4_xu_y + (rectangle3_xu_ + jianju) * 2,
        radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      // 变阻器 对应点
      let black_spots_x = sensor2_x + (electronic_w + electronic_w / 2);
      let black_spots_y = voltmeter_top1_y;
      // 点1
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, black_spots_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // 变阻器icon1
      // 三角形顶点
      let vertex_x =
        ((black_spots_x - (voltmeter_top2_x + voltmeter_top2_w)) / 2) *
        (1 + 0.4) +
        (voltmeter_top2_x + voltmeter_top2_w);
      let vertex_y = black_spots_y;
      // 竖
      // 长度
      let shu_w = 10;
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y - shu_w);
      ctx.lineTo(vertex_x, vertex_y + shu_w);
      ctx.stroke();
      // 三角形
      ctx.beginPath();
      ctx.moveTo(vertex_x, vertex_y);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y - shu_w * 0.8);
      ctx.lineTo(vertex_x - shu_w * 1.5, vertex_y + shu_w * 0.8);
      ctx.lineTo(vertex_x, vertex_y);
      ctx.stroke();
      // 点2
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(black_spots_x, rectangle3_xu_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#95979d";
      ctx.fill(); // 填充圆
      ctx.stroke();
      ctx.setLineDash([8, 10]);
      // 连接线
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x, black_spots_y + radius);
      ctx.lineTo(black_spots_x, rectangle3_xu_y - radius);
      ctx.stroke();
      // 变阻器 对应点
      let black_spots_x2 = black_spots_x;
      let black_spots_y2 =
        ((rectangle3_xu_y - radius - (black_spots_y + radius)) / 2) *
        (1 - 0.4) +
        black_spots_y +
        radius;
      // 变阻器icon2
      // 竖
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(black_spots_x2 - shu_w, black_spots_y2);
      ctx.lineTo(black_spots_x2 + shu_w, black_spots_y2);
      ctx.stroke();
      // // 三角形
      ctx.beginPath();
      ctx.moveTo(black_spots_x2, black_spots_y2);
      ctx.lineTo(black_spots_x2 - shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2 + shu_w * 0.8, black_spots_y2 + shu_w * 1.5);
      ctx.lineTo(black_spots_x2, black_spots_y2);
      ctx.stroke();

      // 绘制图片 路径 x轴 y轴 宽度 高度
      sensor.onload = function () {
        // 图片1

        ctx.drawImage(
          Inductors,
          Inductors_level,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器
        ctx.drawImage(
          sensor,
          sensor_level + electronic_w / 2,
          y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器2
        ctx.drawImage(
          sensor,
          sensor2_x + electronic_w / 2,
          sensor2_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器3
        ctx.drawImage(
          sensor,
          sensor3_x + electronic_w / 2,
          sensor3_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器4
        ctx.drawImage(
          sensor,
          sensor4_x + electronic_w / 2,
          sensor4_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器5
        ctx.drawImage(
          sensor,
          sensor5_x + electronic_w / 2,
          sensor5_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 传感器6
        ctx.drawImage(
          sensor,
          sensor6_x + electronic_w / 2,
          sensor6_y - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 电压表
        ctx.drawImage(
          ammeter,
          ammeter1_level - electronic_w / 2,
          center_r2_y - (center_r2_y - y) / 2 - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表1
        ctx.drawImage(
          ammeter,
          top1_voltmeter_imgX - electronic_w / 2,
          top1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 顶部电压表2
        ctx.drawImage(
          ammeter,
          top2_voltmeter_imgX - electronic_w / 2,
          top2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表1
        ctx.drawImage(
          ammeter,
          bott1_voltmeter_imgX - electronic_w / 2,
          bott1_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表2
        ctx.drawImage(
          ammeter,
          bott2_voltmeter_imgX - electronic_w / 2,
          bott2_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
        // 底部电压表3
        ctx.drawImage(
          ammeter,
          bott3_voltmeter_imgX - electronic_w / 2,
          bott3_voltmeter_imgY - electronic_h / 2,
          electronic_w,
          electronic_h
        );
      };
    },

    modSignals() {
      this.dialogVisible1 = true
    },
    cancel() {
      this.dialogVisible1 = false
    },
    comfirm(val) {
      this.dialogVisible1 = false
      this.signals = val
      this.getSignalsData()
    },
    getColor(i) {
      return colors(i)
    },
    getSignalsData() {
      var data = []
      for (let i = 0; i < this.signals.length; i++) {
        data.push(lineData(this.signals[i], 1, new Date(), 1400, 1550))
      }
      this.signal_option.series = data
      console.log('series', this.signal_option.series);

    },
    getSignalsVal(i) {
      return String(this.signal_option.series[i].data[0][1])
    },
  },
  created() {
    this.total;
  },
  computed: {
    total() {
      this.parts_long = this.indicators_content.reduce((sum, item) => {
        return sum + item.parts.length;
      }, 0);
    },
  },
  beforeMount() {
    this.getSignalsData()
  },
  // 挂载后
  mounted() {
    window.addEventListener("resize", () => {
      if (this.dialogVisible) {
        if (this.chartRef) {
          this.chartRef.dispose();
          this.chartRef = null;
        }
        this.echarts_();
      }
    });
    // this.fun_circuitFig(1400,700,50,300)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.train {
  width: 100%;
  height: 100%;
  color: white;
  overflow: auto;

  .train-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0f1e3f;
    height: 70px;

    .svg {
      background-color: #273553;
      display: flex;
      padding: 10px 0;
      align-items: center;

      :last-child {
        margin-left: 2px;
      }
    }
  }

  // 顶部实时预警/报警
  .train_top {
    height: 32.5%;
    background-color: #0b1121;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1vw;

    >div {
      width: 33.3%;
      height: 100%;
      box-sizing: border-box;
    }

    // 报警
    .train_top_alarm {
      padding-right: 0.5vw;
    }

    // 预警
    .train_top_alert {
      padding-left: 0.5vw;
    }

    // 寿命
    .train_top_lifetime {
      padding-left: 0.5vw;
    }
  }

  // 列车状态实时监视
  .train_center {
    // height: 33.6%;
    background-color: #0b1121;
    box-sizing: border-box;
    // padding: 0 0.5vw;

    // 车厢选择
    .train_center_title {
      // border-bottom: 0.1vw solid #3a404f;
      // height: 7vw;
      // height: 25%;
      min-height: 7vw;
      height: 25%;
      box-sizing: border-box;
      display: flex;
      justify-content: left;
      align-items: center;

      // title
      .train_title_name {
        display: flex;
        // justify-content: center;
        align-items: center;
        height: 100%;
        // font-size: 1.2vw;
        color: #5089f7;

        min-width: 8%;
      }

      .train_title_black {
        height: 100%;
        width: 59%;
        position: relative;

        // 列车图
        .train_title_img {
          width: 100%;
          height: 100px;
          background-image: url(../../public/img/train.jpg);
          background-repeat: no-repeat;
          background-size: 100% auto;
        }

        // 车厢名
        .train_title_nick {
          display: flex;
          justify-content: space-between;
          height: 40%;
          // font-size: 1vw;

          >div {
            flex: 1;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            >img {
              width: 1vw;
              margin-left: 0.5vw;
            }
          }
        }

        // 透明膜
        .train_item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >div {
            background: rgb(0, 0, 0, 0.8);
            opacity: 0.2;
            flex: 1;
            height: 100%;
          }

          .visibilit {
            background: transparent;
          }
        }
      }
    }

    // 画布
    .train_center_canvas {
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 450px;
      // border: solid 1px pink;
      // font-size: 10vw;
    }

    .train-signal {
      // height: 50dvh;
      width: 100%;
      padding: 10px;

      .signal-btn-div {
        margin-top: 10px;

        .signal-btn {
          color: #177ddc;
          background-color: #181f30;
          border-color: #177ddc;
        }
      }

      .data-time {
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #aeb1b7;
      }

      .signal-panels {
        margin-top: 1rem;
        background-color: #0b1121;
        display: flex;
        flex-wrap: wrap;

        .singal-item {
          margin: 0.4rem;
          cursor: pointer;
        }

        .add-signal-btn {
          background-color: #242a3b;
          height: 5dvh;
          width: 11dvw;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8rem;
          color: #b3b5bb;
          margin: 0.3rem;
          border-radius: 2px;
          border: 1px dashed;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
    }
  }

  // 关键指标展示
  .train_bott {
    // height: 53.9%;
    background-color: #181f30;

    // 关键指标展示
    .train_indicators {
      width: 100%;
      height: 100%;
      padding: 0 0.5vw;
      box-sizing: border-box;

      // 太糊 不知道是啥
      .indicators_top {
        background-color: pink;
        opacity: 0.2;
        height: 30%;
      }

      // 指标表格
      .indicators {
        // height: 70%;
        background-color: #181f30;
        // font-size: 1vw;
        padding-bottom: 0.5vw;

        // 顶部选项卡
        .indicators_title {
          display: flex;
          align-items: center;
          justify-content: left;
          margin: 0.5vw 0;

          >div {
            // width: 10vw;
            padding: 10px 0;
            margin: 0 10px;
            margin-bottom: 10px;
            border-bottom: 0.1vw solid transparent;
            cursor: pointer;
            color: #aeb1b7;
          }

          .border {
            border-bottom: 0.1vw solid #2186cf;
            color: #2186cf;
          }
        }

        // 指标表格处
        .indicators_table {
          width: 100%;
          border-collapse: collapse;
          /* 确保边框合并 */
          // font-size: 1vw;

          .indicators_thead,
          .indicators_tbody {
            >th:nth-child(1) {
              width: 15.7%;
            }

            >th:nth-child(2) {
              width: 23.9%;
            }

            >th:nth-child(3) {
              width: 23.8%;
            }

            >th:nth-child(4) {
              width: 11.6%;
            }

            >th:nth-child(5) {
              width: 11.6%;
            }

            >th:nth-child(6) {
              width: 13.4%;
            }

            >th {
              background-color: #20283c;
              border: 1px solid #3a404f;
              padding: 0.8vw 0;
              color: #e9eaec;
            }

            tr,
            td {
              border: 1px solid #3a404f;
            }

            td {
              background-color: #20283c;
              border: 1px solid #3a404f;
              padding: 0.8vw 0;
              padding-left: 0.8vw;
              color: #b1b4bb;
            }

            // state border
            .normal {
              padding: 0.2vw 0.6vw;
              background: #132a1c;
              border: 1px solid #42ad5d;
              color: #42ad5d;
              border-radius: 5vw;
            }

            .abnormal {
              padding: 0.2vw 0.6vw;
              background: #321b1c;
              border: 1px solid #e65355;
              color: #e65355;
              border-radius: 5vw;
            }

            // 查看详情
            .detail {
              span {
                color: #2186cf;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  // 弹窗
  .pop_ups {
    .curves_title {
      // font-size: 1vw;
      display: flex;
      justify-content: space-between;

      // 名称
      .curves_title_le {
        width: 300px;
      }

      // 时间
      .curves_title_ri {
        display: flex;
        justify-content: right;
        align-items: center;

        .choices {
          display: flex;
          justify-content: space-evenly;
          align-items: center;

          >div {
            margin: 0 0.4vw;
            // font-size: 1vw;/
          }
        }

        .block {
          width: 100%;
        }
      }
    }

    /* 图表 */
    .chartref {
      width: 80vw;
      height: 50vh;
    }
  }
}
</style>

<style scoped>
/* 引入的element 弹窗 右边X */
.train .el-dialog__headerbtn .el-dialog__close {
  font-size: 2vw;
}

/* 弹窗内容区 */
.train .el-dialog__body {
  padding: 2vw 1vw;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

/* 弹窗 */
.train .el-dialog {
  background-color: #181f30;
}

/* 日期选择器 */
.train .el-input__icon,
.bott_title_right .el-input__icon {
  height: auto;
}

.train .el-date-editor .el-range-separator,
.bott_title_right .el-date-editor .el-range-separator {
  height: auto;
  font-size: 0.6vw;
}

.train .el-date-editor .el-range-input,
.bott_title_right .el-date-editor .el-range-input {
  font-size: 0.6vw;
  background-color: transparent;
}

.train .el-date-editor .el-range__icon {
  font-size: 0.6vw;
  margin-left: -5px;
  color: #c0c4cc;
  float: left;
  line-height: 0vw;
}

.el-range-editor.el-input__inner {
  /* height: 1.5vw; */
  width: 100%;
  background: transparent;
  border: #33384c solid 1px;
  font-size: 1vw;
  height: 2.5vw;
  line-height: 2.5vw;
}
</style>
<style>
.selector .el-dialog__header {
  display: none;
}

.selector .el-dialog__body {
  height: 70dvh;
  padding: 0;
}

.train .el-input__inner {
  background-color: #273553;
  border: 0;
  font-size: 22px;
  padding: 0;
  margin: 0;
  width: 120px;
}

.train .el-popper .el-select-dropdown {

  /* border: 1px solid rgba(255, 255, 255, .15); */
  /* border: 0 !important; */
  background-color: #181f30;

}

.train .el-select-dropdown__item.hover,
.train .el-select-dropdown__item:hover {
  background-color: #223147;
}
</style>
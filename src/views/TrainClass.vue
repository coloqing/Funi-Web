<template>
  <div class="train">
    <div class="train-select">
      <div class="svg">
        <div>
          <svg viewBox="156.059 225.515 91.041 59.736" xmlns="http://www.w3.org/2000/svg" width="30px">
            <rect style="
                stroke: rgb(0, 0, 0);
                stroke-miterlimit: 3.87;
                stroke-width: 0px;
                fill: rgb(66, 173, 93);
              " x="156.059" y="225.515" width="88.38" height="59.736" rx="2" ry="2" />
            <rect x="244.439" y="235.686" width="2.661" height="10.561" style="
                stroke-width: 0px;
                stroke: rgb(66, 173, 93);
                paint-order: stroke;
                fill: rgb(66, 173, 93);
              " />
            <rect x="244.422" y="263.414" width="2.661" height="10.561" style="
                stroke: rgb(0, 0, 0);
                stroke-width: 0px;
                fill: rgb(66, 173, 93);
              " />
            <rect style="
                stroke: rgb(0, 0, 0);
                fill: rgb(39, 53, 83);
                stroke-miterlimit: 3.87;
                stroke-width: 0px;
              " x="160.912" y="229.93" width="78.908" height="51.677" rx="2.231" ry="2.231" />
            <text style="
                fill: rgb(66, 173, 93);
                font-family: Arial, sans-serif;
                font-size: 28px;
                white-space: pre;
              " x="224.754" y="258.002"
              transform="matrix(1.3642630577087402, 0, 0, 1.2998440265655518, -136.27794493487204, -67.0629607616197)">
              SIV
            </text>
          </svg>
        </div>
        <div>
          <el-select v-model="trainValue" placeholder="请选择车号" @change="handleChange">
            <!-- 离线 -1  库内 0  正线 1 ali -->
            <el-option v-for="item in trainOptions" :class="item.state === 0
              ? 'text-green'
              : item.state === -1
                ? 'text-gray'
                : 'text-white'
              " :key="item.trainNum" :label="item.trainNum" :value="item.trainNum">
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
        <warning :msg="0" :train_value="trainValue" :key="trainValue + 0" />
      </div>
      <!-- 实时预警 -->
      <div class="train_top_alert">
        <warning :msg="1" :train_value="trainValue" :key="trainValue + 1" />
      </div>
      <!-- 寿命预警 -->
      <div class="train_top_lifetime">
        <LifetimeCom :train_value="trainValue" :key="trainValue + 2" />
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
              <div>B1</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick3">
              <div>C1</div>
              <img src="../../public/img/weixian.png" alt="" />
            </div>
            <div class="train_nick4">
              <div>C2</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick5">
              <div>B2</div>
              <img src="../../public/img/tongguo.png" alt="" />
            </div>
            <div class="train_nick6">
              <div>A2</div>
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
          <div class="singal-item" v-for="(item, index) in signals" v-bind:key="item.id">
            <SignalCom :signal_name="item.name" :signal_value="item.value" :color="getColor(index)">
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
                  <td :rowspan="item1.parts.length" v-if="index === 0">
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
      <SignalSelector @cancel="cancel" @comfirm="comfirm" :initCheckList="sigletonSignal" />
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
import CanvasCircuit from "@/components/CanvasCircuit.vue";
import SignalSelector from "@/components/SignalSelector.vue";
import { colors, lineData } from "@/api/api.js";
import { getState } from "@/api/train";
import { indicatorInfo, signalVal } from "@/api/trainClass"
import { getSignals } from "@/api/signalSelector";

// import { getFaultWarn } from "@/api/trainClass";
export default {
  name: "train",
  props: {
    msg: String,
    train_value: String,
  },
  comments: {
    warning,
  },
  components: {
    SignalCom,
    EChartsCom,
    LifetimeCom,
    CanvasCircuit,
    SignalSelector,
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
      signals: [],

      // 列车车厢 透明膜点击
      cards: [
        { id: "A1", class: "Card", isActive: true },
        { id: "B1", class: "Card", isActive: false },
        { id: "C1", class: "Card", isActive: false },
        { id: "C2", class: "Card", isActive: false },
        { id: "B2", class: "Card", isActive: false },
        { id: "A2", class: "Card", isActive: false },
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
          components: [
            {
              name: 'U相输出电流传感器',
              indicators: [
                {
                  name: '电压偏置因子[-5,5]',
                  metric_values: "-3.17",
                  state: 1,
                },
                {
                  name: '传感器零飘值[-5,5]',
                  metric_values: "-3.17",
                  state: 1,
                },
                {
                  name: '电压波动因子[-5,5]',
                  metric_values: "-3.17",
                  state: 1,
                }
              ]
            }
          ]
        },
        {
          system: "辅助变流器1",
          parts: [
            {
              parts_: "V相输出电流传感器",
              performance_metrics: "电压偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 1,
            },
            {
              parts_: "V相输出电流传感器",
              performance_metrics: "传感器零飘值[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
            {
              parts_: "W相输出电流传感器",
              performance_metrics: "电压波动因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
          ],
        },
        {
          system: "充电机1",
          parts: [
            {
              parts_: "W相输出电流传感器",
              performance_metrics: "传感器零飘值[-5,5]",
              metric_values: "-3.17",
              state: 1,
            },
            {
              parts_: "W相输出电流传感器",
              performance_metrics: "电流偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            },
            {
              parts_: "输入电流传感器",
              performance_metrics: "传感器零飘值[-5,5]",
              metric_values: "-3.17",
              state: 1,
            },
            {
              parts_: "输入电流传感器",
              performance_metrics: "电流偏置因子[-5,5]",
              metric_values: "-3.17",
              state: 0,
            }
          ],
        },
        // {
        //   system: "辅助变流器1",
        //   parts: [
        //     {
        //       parts_: "网压传感器",
        //       performance_metrics: "电压偏置因子[-5,5]",
        //       metric_values: "-3.17",
        //       state: 0,
        //     },
        //   ],
        // },
        // {
        //   system: "辅助变流器1",
        //   parts: [
        //     {
        //       parts_: "网压传感器",
        //       performance_metrics: "电压偏置因子[-5,5]",
        //       metric_values: "-3.17",
        //       state: 0,
        //     },
        //     {
        //       parts_: "网压传感器",
        //       performance_metrics: "电压偏置因子[-5,5]",
        //       metric_values: "-3.17",
        //       state: 0,
        //     },
        //   ],
        // },
      ],
      // indicators_content: [
      //   {
      //     system: "辅助变流器1",
      //     parts: [
      //       {
      //         name: "U相输出电流传感器",
      //         indicators: [
      //           {
      //             name: "电压偏置因子[-5,5]",
      //             metric_values: "-3.17",
      //             state: 1,
      //           },
      //           {
      //             name: "传感器零飘值[-5,5]",
      //             metric_values: "-3.17",
      //             state: 1,
      //           },
      //           {
      //             name: "电压波动因子[-5,5]",
      //             metric_values: "-3.17",
      //             state: 1,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
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

      trainValue: "",
      trainOptions: [],

      deviceDM: []
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
    // 获取 车号下拉框
    get_state() {
      getState().then((response) => {
        if (response.data.code === 200) {
          this.trainOptions = response.data.data;
          // console.log('列车号列表',response.data.data);
        } else {
          console.error("获取列车号列表失败");
        }
      });
    },

    // 更改车号
    handleChange(value) {
      // console.log('选中的值',value);
      this.trainValue = value;
    },

    goback() {
      this.$router.back();
    },

    modSignals() {
      this.dialogVisible1 = true;
    },
    cancel() {
      this.dialogVisible1 = false;
    },
    comfirm(val) {
      this.dialogVisible1 = false;
      console.log('valvalvlav', val);
      var newSignals = []
      signalVal(1, '', '', '', true).then(response => {
        var data = response.data.data;

        for (let i = 0; i < val.length; i++) {
          const item = val[i];
          item.value = data[0][item.code.charAt(0).toLowerCase() + item.code.slice(1)]
          newSignals.push(item)
        }

        this.signals = newSignals

        this.initSignalData();
      })
    },
    getColor(i) {
      return colors(i);
    },
    initSignalData() {
      var codes = this.signals
        .map(obj => obj.code)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(',')

      signalVal(1, codes, '2024-10-22 00:00:00.000', '2024-10-22 00:01:00.000', false).then(response => {
        var data = [];

        for (let i = 0; i < this.signals.length; i++) {
          var signal = this.signals[i]
          var axis = 0
          if (signal.name.includes('电压'))
            axis = 1
          else if (signal.name.includes('电流'))
            axis = 0

          var temp = {
            name: signal.name,
            type: "line",
            showSymbol: true,
            smooth: false,
            yAxisIndex: axis,
            sample: "auto",
            data: response.data.data.map(x => [x.createTime, x[signal.code.charAt(0).toLowerCase() + signal.code.slice(1)]]),
          };

          data.push(temp)
        }
        this.signal_option.series = data;
      })
    },

    updateSignalData() {
      var codes = this.signals
        .map(obj => obj.code)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(',')

      signalVal(1, codes, '', '', true).then(response => {
        var data = [];

        for (let i = 0; i < this.signals.length; i++) {
          var signal = this.signals[i]
          var axis = 0
          if (signal.name.includes('电压'))
            axis = 1
          else if (signal.name.includes('电流'))
            axis = 0
          else axis = 2

          var temp = {
            name: signal.name,
            type: "line",
            showSymbol: true,
            smooth: false,
            yAxisIndex: axis,
            sample: "auto",
            data: response.data.data.map(x => [x.createTime, x[signal.code.charAt(0).toLowerCase() + signal.code.slice(1)]]),
          };

          data.push(temp)
        }
        this.signal_option.series = data;
      })
    },

    getIndicatorInfo(trainId, trainNum) {
      indicatorInfo(trainId, trainNum).then(response => {
        var data = response.data.data

        this.deviceDM = data.deviceDM;

        this.setIndicatorsCards(data.devices)

        this.setIndicatorsContent(data.deviceDM)

        this.setInitSignals(data.deviceDM)
      })
    },

    setIndicatorsCards(data) {
      this.indicators_cards = [
        { id: 0, class: "Card", name: "全部", isActive: true }
      ]

      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        this.indicators_cards.push({ id: item.id, class: "Card", name: item.name, isActive: false })
      }
    },

    setIndicatorsContent(data) {
      this.indicators_content = []
      for (let index = 0; index < data.length; index++) {
        var device = data[index];

        var content = {
          system: device.name,
          parts: [
          ],
        }

        for (let i = 0; i < device.components.length; i++) {
          var component = device.components[i];

          for (let y = 0; y < component.indicators.length; y++) {
            var indicator = component.indicators[y];

            content.parts.push({
              parts_: component.name,
              performance_metrics: indicator.name + "[" + indicator.min + "," + indicator.max + "]",
              metric_values: "-3.17",
              state: 1,
            })
          }
        }

        this.indicators_content.push(content)
      }
      console.log(this.indicators_content);

    },

    setInitSignals(deviceDM) {
      getSignals(1, 1000).then(response => {
        var data = response.data.data;

        this.signals = []

        for (let i = 0; i < deviceDM.length; i++) {
          var device = deviceDM[i];

          for (let y = 0; y < device.components.length; y++) {
            var component = device.components[y];

            this.signals.push({
              name: data.find(obj => obj.code === component.signalCode).name,
              code: component.signalCode,
              value: component.signalValue,
              signalName: data.find(obj => obj.code === component.signalCode).name
            })
          }
        }

        this.signals = this.signals.filter((signal, index, self) =>
          index === self.findIndex((u) => (
            u.name === signal.name
          ))
        );

        console.log('signals', this.signals)

        this.initSignalData()
      });
    }
  },
  created() {
    this.total;
    // 调用接口 获取车号列表
    this.get_state();
    // 通过路由获取对应车号
    this.trainValue = this.$route.query.trainNum;
    // 通过车号查询数据
  },
  computed: {
    total() {
      this.parts_long = this.indicators_content.reduce((sum, item) => {
        return sum + item.parts.length;
      }, 0);
    },
    sigletonSignal() {
      return this.signals.map(x => x.signalName).filter((value, index, self) => self.indexOf(value) === index)
    }
  },
  beforeMount() {
    //this.getSignalsData()
    this.getIndicatorInfo(1)
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
// 线路状态颜色
// 库内
.text-green {
  color: #42ad5d;
}

// 离线
.text-gray {
  color: #999;
}

// 正线
.text-white {
  color: white;
}

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
      justify-content: center;
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

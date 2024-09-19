<template>
  <div class="train">
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
        <div class="data-time"><i class="el-icon-time"></i>数据时间: {{ data_time }}</div>
        <div class="signal-panels">
          <div class="singal-item" v-for="i in 30">
            <SignalCom :signal_name="'A1-充电机输出电流传感器BC11'" signal_value="50A" :color="'#ac3577'">
            </SignalCom>
          </div>
          <div class="add-signal-btn">
            <div> <i class="el-icon-plus"></i></div>
            <span> &nbsp;编辑信号量</span>
          </div>
        </div>
        <div>
          <EChartsCom :width="'100%'" :height="'40dvh'" :option="singal_option"></EChartsCom>
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
              <div class="choices">
                <div>近7天</div>
                <div>近30天</div>
                <div>近12月</div>
              </div>
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
  </div>
</template>

<script>
import { warning } from "../components/train.vue";
import * as echarts from "echarts";
import moment from 'moment';
import SignalCom from "../components/SignalCom.vue";
import EChartsCom from '@/components/EChartsCom.vue';
import LifetimeCom from "@/components/LifetimeCom.vue";

export default {
  name: "train",
  props: {
    msg: String,
  },
  comments: {
    warning

  },
  components: {
    SignalCom,
    EChartsCom,
    LifetimeCom
  },
  data() {
    let min = 30;
    let max = 40;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return {
      data_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      singal_option: {
        color: [
          '#1f77b4', // 蓝色
          '#ff7f0e', // 橙色
          '#2ca02c', // 绿色
          '#d62728', // 红色
          '#9467bd', // 紫色
          '#8c564b', // 棕色
          '#e377c2', // 粉红色
          '#7f7f7f', // 灰色
          '#bcbd22', // 黄绿色
          '#17becf', // 青色
          '#d32f2f', // 深红色
          '#1976d2', // 深蓝色
          '#388e3c', // 深绿色
          '#fbc02d', // 黄色
          '#e64a19', // 深橙色
          '#5e35b1', // 深紫色
          '#0097a7', // 深青色
          '#f06292', // 浅粉红色
          '#795548', // 深棕色
          '#c0ca33'  // 浅黄绿色
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            formatter: function (value, index) {
              var date = new Date(value);
              return moment(date).format('YYYY-MM-DD') + '\n' + moment(date).format('HH:mm:ss.SSS');
            }
          }
        },
        yAxis: [{
          type: 'value',
          name: 'A',
          position: 'left',
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#1d2434"
            }
          }
        },
        {
          type: 'value',
          name: 'V',
          position: 'left',
          offset: 35,
          // alignTicks: true, // ！！配置多坐标轴标签对齐
          scale: false,
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          name: '0/1',
          min: 0,
          max: 1,
          position: 'right',
          axisTick: {
            show: true
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        }
        ],
        series: [
          {
            name: '电流',
            type: 'line',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 0,
            data: [['2024/9/13 14:00:00', 53], ['2024/9/13 14:00:01', 49], ['2024/9/13 14:00:02', 53], ['2024/9/13 14:00:03', 50], ['2024/9/13 14:00:04', 53], ['2024/9/13 14:00:05', 50], ['2024/9/13 14:00:06', 48], ['2024/9/13 14:00:07', 51], ['2024/9/13 14:00:08', 48], ['2024/9/13 14:00:09', 48], ['2024/9/13 14:00:10', 53], ['2024/9/13 14:00:11', 50], ['2024/9/13 14:00:12', 50], ['2024/9/13 14:00:13', 52], ['2024/9/13 14:00:14', 54], ['2024/9/13 14:00:15', 51], ['2024/9/13 14:00:16', 52], ['2024/9/13 14:00:17', 51], ['2024/9/13 14:00:18', 53], ['2024/9/13 14:00:19', 54], ['2024/9/13 14:00:20', 54], ['2024/9/13 14:00:21', 47], ['2024/9/13 14:00:22', 51], ['2024/9/13 14:00:23', 50], ['2024/9/13 14:00:24', 54], ['2024/9/13 14:00:25', 51], ['2024/9/13 14:00:26', 51], ['2024/9/13 14:00:27', 50], ['2024/9/13 14:00:28', 53], ['2024/9/13 14:00:29', 47], ['2024/9/13 14:00:30', 47], ['2024/9/13 14:00:31', 51], ['2024/9/13 14:00:32', 54], ['2024/9/13 14:00:33', 48], ['2024/9/13 14:00:34', 53], ['2024/9/13 14:00:35', 47], ['2024/9/13 14:00:36', 54], ['2024/9/13 14:00:37', 49], ['2024/9/13 14:00:38', 51], ['2024/9/13 14:00:39', 53]]
          },
          {
            name: '电压',
            type: 'line',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 1,
            data: this.generateTimeValuePairs('2024-09-13T14:00:00', 40, 1)
          },
          {
            name: '短路接触器',
            type: 'line',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 2,
            data: [['2024/9/13 14:00:00', 0], ['2024/9/13 14:00:01', 0], ['2024/9/13 14:00:02', 0], ['2024/9/13 14:00:03', 0], ['2024/9/13 14:00:04', 0], ['2024/9/13 14:00:05', 0], ['2024/9/13 14:00:06', 0], ['2024/9/13 14:00:07', 0], ['2024/9/13 14:00:08', 0], ['2024/9/13 14:00:09', 0], ['2024/9/13 14:00:10', 0], ['2024/9/13 14:00:11', 0], ['2024/9/13 14:00:12', 0], ['2024/9/13 14:00:13', 0], ['2024/9/13 14:00:14', 0], ['2024/9/13 14:00:15', 0], ['2024/9/13 14:00:16', 0], ['2024/9/13 14:00:17', 0], ['2024/9/13 14:00:18', 0], ['2024/9/13 14:00:19', 0], ['2024/9/13 14:00:20', 0], ['2024/9/13 14:00:21', 0], ['2024/9/13 14:00:22', 0], ['2024/9/13 14:00:23', 0], ['2024/9/13 14:00:24', 0], ['2024/9/13 14:00:25', 0], ['2024/9/13 14:00:26', 0], ['2024/9/13 14:00:27', 0], ['2024/9/13 14:00:28', 0], ['2024/9/13 14:00:29', 0], ['2024/9/13 14:00:30', 0], ['2024/9/13 14:00:31', 0], ['2024/9/13 14:00:32', 0], ['2024/9/13 14:00:33', 0], ['2024/9/13 14:00:34', 0], ['2024/9/13 14:00:35', 0], ['2024/9/13 14:00:36', 0], ['2024/9/13 14:00:37', 0], ['2024/9/13 14:00:38', 0], ['2024/9/13 14:00:39', 0]]
          },
          {
            name: '交流接触器',
            type: 'line',
            showSymbol: true,
            smooth: false,
            yAxisIndex: 2,
            data: [['2024/9/13 14:00:00', 1], ['2024/9/13 14:00:01', 1], ['2024/9/13 14:00:02', 1], ['2024/9/13 14:00:03', 1], ['2024/9/13 14:00:04', 1], ['2024/9/13 14:00:05', 1], ['2024/9/13 14:00:06', 1], ['2024/9/13 14:00:07', 1], ['2024/9/13 14:00:08', 1], ['2024/9/13 14:00:09', 1], ['2024/9/13 14:00:10', 1], ['2024/9/13 14:00:11', 1], ['2024/9/13 14:00:12', 1], ['2024/9/13 14:00:13', 1], ['2024/9/13 14:00:14', 1], ['2024/9/13 14:00:15', 1], ['2024/9/13 14:00:16', 1], ['2024/9/13 14:00:17', 1], ['2024/9/13 14:00:18', 1], ['2024/9/13 14:00:19', 1], ['2024/9/13 14:00:20', 1], ['2024/9/13 14:00:21', 1], ['2024/9/13 14:00:22', 1], ['2024/9/13 14:00:23', 1], ['2024/9/13 14:00:24', 1], ['2024/9/13 14:00:25', 1], ['2024/9/13 14:00:26', 1], ['2024/9/13 14:00:27', 1], ['2024/9/13 14:00:28', 1], ['2024/9/13 14:00:29', 1], ['2024/9/13 14:00:30', 1], ['2024/9/13 14:00:31', 1], ['2024/9/13 14:00:32', 1], ['2024/9/13 14:00:33', 1], ['2024/9/13 14:00:34', 1], ['2024/9/13 14:00:35', 1], ['2024/9/13 14:00:36', 1], ['2024/9/13 14:00:37', 1], ['2024/9/13 14:00:38', 1], ['2024/9/13 14:00:39', 1]]
          }
        ]
      },
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
      // 图表
      chartRef: null,
    };
  },
  methods: {

    generateTimeValuePairs(startDate, numEntries, intervalSeconds) {
      // 初始化moment对象
      var moment = require('moment');  // 如果在Node.js环境中

      // 结果数组
      let data = [];

      // 基础日期
      let currentTimestamp = moment(startDate);

      for (let i = 0; i < numEntries; i++) {
        // 格式化时间戳
        let formattedTimestamp = currentTimestamp.format('YYYY/M/D HH:mm:ss');

        // 生成随机数值
        let randomValue = Math.floor(Math.random() * 2000); // 例如在0到2000之间

        // 添加到结果数组
        data.push([formattedTimestamp, randomValue]);

        // 增加时间间隔
        currentTimestamp.add(intervalSeconds, 'seconds');
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
          color: b3b5bb;
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
          width: 40%;
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

<style>
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

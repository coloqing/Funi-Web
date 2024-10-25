<template>
  <div class="panel">
    <div class="left-panel">
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>线路号</div>
            <div>
              <el-select
                v-model="lineValue"
                placeholder="请选择"
                size="mini"
                @change="lineValueChange"
              >
                <el-option
                  v-for="item in lineOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div>车号</div>
            <div>
              <el-select v-model="trainValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in trainOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>子系统</div>
            <div>
              <el-select v-model="subSysValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in subSysOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div>状态</div>
            <div>
              <el-select v-model="stateValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in [
                    { value: '', label: '全部' },
                    { value: '已消除', label: '已消除' },
                    { value: '未消除', label: '未消除' },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>时间</div>
            <div>
              <el-date-picker
                v-model="timerangeValue"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="12">
            <div>{{ type === "0" ? "报警名称" : "预警名称" }}</div>
            <div>
              <el-input
                size="mini"
                placeholder="请输入"
                v-model="alarmNameValue"
                clearable
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>{{ type === "0" ? "报警类型" : "预警类型" }}</div>
            <div>
              <el-input
                size="mini"
                placeholder="请输入"
                v-model="alarmTypeValue"
                clearable
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="12">
            <div style="display: flex; justify-content: end">
              <el-button size="mini" type="primary" @click="query"
                >查询</el-button
              >
              <el-button size="mini" @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div>
        <el-row>
          <el-col :span="12">
            <div>
              <span>预警列表</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="display: flex; justify-content: end">
              <el-button size="mini"
                >导出(已选择{{ selectedRow.length }}项)</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div>
            <el-table
              ref="alarmTable"
              :data="tableData.data"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @current-change="handleRowChange"
              highlight-current-row
            >
              <el-table-column type="selection"> </el-table-column>
              <el-table-column prop="name" label="预警名称"> </el-table-column>
              <el-table-column prop="subSystem" label="子系统" width="80">
              </el-table-column>
              <el-table-column label="状态" width="90">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row.state == 0"
                    class="crrc-tag crrc-tag-orange crrc-tag-middle crrc-tag-round"
                  >
                    <span class="crrc-tag-status-dot crrc-tag-badge"></span>
                    未消除
                  </div>
                  <div
                    v-if="scope.row.state == 1"
                    class="crrc-tag crrc-tag-blue crrc-tag-middle crrc-tag-round"
                  >
                    <span class="crrc-tag-status-dot crrc-tag-badge"></span>
                    车载消除
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="开始时间">
                <template slot-scope="scope">
                  {{ scope.row.createTime ? scope.row.createTime : "--" }}
                </template>
              </el-table-column>
              <el-table-column label="结束时间">
                <template slot-scope="scope">
                  {{ scope.row.endTime ? scope.row.endTime : "--" }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>

        <el-row>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPageValue"
              :page-sizes="[7, 14, 28, 56]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="tableData.total"
            >
            </el-pagination>
          </div>
        </el-row>
      </div>
    </div>
    <div ref="fsbtn" class="right-panel">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="16">
          <div style="display: flex; align-items: center">
            <div>
              <h2>{{ currentRow.name }}</h2>
            </div>
            <div
              v-if="currentRow.state == 0"
              class="crrc-tag crrc-tag-orange crrc-tag-middle crrc-tag-round"
            >
              <span class="crrc-tag-status-dot crrc-tag-badge"></span>
              未消除
            </div>
            <div
              v-if="currentRow.state == 1"
              class="crrc-tag crrc-tag-blue crrc-tag-middle crrc-tag-round"
            >
              <span class="crrc-tag-status-dot crrc-tag-badge"></span>
              车载消除
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="display: flex; justify-content: end">
            <el-button size="mini" @click="goback">返回</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <span>线路：{{ currentRow.lineId }}</span>
        </el-col>
        <el-col :span="6">
          <span>车型：{{ currentRow.trainModel }}</span>
        </el-col>
        <el-col :span="6">
          <span>车号：{{ currentRow.trainNumber }}</span>
        </el-col>
        <el-col :span="6">
          <span>车厢：{{ currentRow.carriageNumber }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>子系统：{{ currentRow.subSystem }}</span>
        </el-col>
        <el-col :span="6">
          <span>预警等级：{{ currentRow.grade }}</span>
        </el-col>
        <el-col :span="6">
          <span>预警码：{{ currentRow.code }}</span>
        </el-col>
        <el-col :span="6">
          <span
            >发生时间：{{
              currentRow.createTime ? currentRow.createTime : "--"
            }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <div style="display: flex">
          <div class="diagnosis">
            <div class="diagnosis-title">诊断逻辑</div>
            <div class="content">{{ currentRow.diagnoseLogic }}</div>
          </div>
          <div class="operate">
            <div class="operate-title">操作处置建议</div>
            <div class="content">
              {{ currentRow.solution }}
            </div>
          </div>
        </div>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <span style="font-size: 1dvw">信号量</span>
        </el-col>
        <el-col :span="12">
          <div style="color: white; display: flex; justify-content: end">
            <div style="margin-right: 5px; cursor: pointer">
              <svg
                @click="semaphore_togg"
                t="1726801127036"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="878"
                width="22"
                height="22"
              >
                <path
                  d="M882.176 190.610286l-174.08 174.153143a34.304 34.304 0 0 1-48.493714-48.493715l174.153143-174.08H694.198857a34.304 34.304 0 0 1 0-68.608h222.281143c18.944 0 34.304 15.36 34.304 34.304v222.281143a34.304 34.304 0 0 1-68.608 0V190.610286z m-56.758857 646.875428l-174.811429-174.811428a36.571429 36.571429 0 1 1 51.785143-51.638857l174.738286 174.738285V636.854857a36.571429 36.571429 0 0 1 73.142857 0v237.202286a36.571429 36.571429 0 0 1-36.571429 36.571428H676.498286a36.571429 36.571429 0 0 1 0-73.142857h148.918857zM197.997714 146.285714l176.566857 176.566857a36.571429 36.571429 0 1 1-51.712 51.712L146.285714 197.997714v148.918857a36.571429 36.571429 0 0 1-73.142857 0V109.714286a36.571429 36.571429 0 0 1 36.571429-36.571429h237.202285a36.571429 36.571429 0 0 1 0 73.142857H197.997714zM146.285714 772.388571l176.566857-176.566857a36.571429 36.571429 0 1 1 51.712 51.785143l-176.566857 176.566857h148.918857a36.571429 36.571429 0 1 1 0 73.142857H109.714286a36.571429 36.571429 0 0 1-36.571429-36.571428V623.542857a36.571429 36.571429 0 1 1 73.142857 0v148.918857z"
                  fill="#ffffff"
                  p-id="879"
                ></path>
              </svg>
            </div>
            <div style="cursor: pointer">
              <svg
                t="1726801203625"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2803"
                width="22"
                height="22"
              >
                <path
                  d="M925.55776 731.0592c-13.952 0-25.26208 11.20768-25.41568 25.1648l0 155.89888c0 35.25632-1.77664 30.63808-36.98176 30.63808L152.6272 942.76096c-35.20512 0-48.44544 4.61312-48.44544-30.63808L104.18176 129.38752c0-35.26144 13.24032-34.44736 48.44544-34.44736l710.53824 0c35.20512 0 36.98176-0.81408 36.98176 34.44736l0 152.0896 0.3584 0c1.97632 12.07808 12.43136 21.30944 25.05728 21.30944 12.64128 0 23.1424-9.23136 25.1136-21.30944l0.3072 0 0-177.3056c0-35.20512-28.50816-63.76448-63.72352-63.76448L117.06368 40.40704c-35.20512 0-63.7184 28.55936-63.7184 63.76448L53.34528 933.4784c0 35.25632 28.50816 63.8208 63.7184 63.8208l770.19136 0c35.21536 0 63.72352-28.56448 63.72352-63.8208L950.97856 756.224C950.82496 742.272 939.51488 731.0592 925.55776 731.0592L925.55776 731.0592zM1004.34944 507.59168c-1.26976-2.53952-2.944-4.92544-5.07392-7.10656-1.21344-1.21344-2.5344-2.28352-3.95264-3.24608l-246.5536-246.7072c-9.23136-9.23136-24.7552-8.62208-34.65216 1.32096-9.93792 9.93792-10.55744 25.46176-1.31584 34.65216l206.01344 206.16704L405.01248 492.672c-14.0032 0-25.41568 11.3664-25.41568 25.4208 0 14.04928 11.41248 25.46688 25.41568 25.46688l515.27168 0-207.48288 207.59552c-9.23648 9.22624-8.6272 24.75008 1.31584 34.69312 9.89696 9.94816 25.4208 10.50624 34.65216 1.32096l246.5536-246.75328c1.41824-0.91648 2.7392-2.02752 3.95264-3.24608 2.12992-2.13504 3.80416-4.56704 5.07392-7.11168 1.72544-3.14368 2.6368-6.69184 2.73408-10.29632l0-1.82272C1006.98624 514.33984 1006.07488 510.78656 1004.34944 507.59168L1004.34944 507.59168z"
                  fill="#ffffff"
                  p-id="2804"
                ></path>
              </svg>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-button-group>
            <el-button size="mini">全部</el-button>
            <el-button size="mini">数字量</el-button>
            <el-button size="mini">模拟量</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12">
          <div style="display: flex; justify-content: end; align-items: center">
            <div>
              <span>时间范围：</span>
            </div>
            <div style="width: 100px">
              <el-select
                v-model="dataTimeRangeValue"
                placeholder="请选择"
                size="mini"
                @change="get_semaphore_time"
              >
                <el-option
                  v-for="item in [
                    { value: 1, label: '±1分钟' },
                    { value: 3, label: '±3分钟' },
                    { value: 5, label: '±5分钟' },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="signal-panel">
          <div
            class="singal-item"
            v-for="(item, index) in signals"
            v-bind:key="item.id"
          >
            <SignalCom
              :signal_name="item.name"
              :signal_value="item.value"
              :color="getColor(index)"
            >
            </SignalCom>
          </div>
          <div class="add-signal-btn" @click="modSignals">
            <div><i class="el-icon-plus"></i></div>
            <span> &nbsp;编辑信号量</span>
          </div>
        </div>
      </el-row>
      <div>
        <EChartsCom
          :width="'100%'"
          :height="'30dvh'"
          :option="signal_option"
        ></EChartsCom>
      </div>
      <!-- <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    <span>电网电压</span>
                </el-col>
                <el-col :span="12">
                    <el-date-picker v-model="timerangeValue" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="4">
                    <el-button size="mini">导出</el-button>
                </el-col>
            </el-row>
            <div>
                <EChartsCom :width="'100%'" :height="'30dvh'" :option="signal_option"></EChartsCom>
            </div> -->
    </div>
    <template>
      <!-- 弹出层 -->
      <div class="pop_ups">
        <!-- 弹出层 -->
        <el-dialog
          class="indicator_curves"
          :visible.sync="SemaphoreVisible_"
          width="80%"
          :close-on-click-modal="true"
          @close="SemaphoreVisible_ = false"
        >
          <div class="right-panel right-panel2">
            <el-row :gutter="20">
              <el-col :span="12">
                <span style="font-size: 1dvw">信号量</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button-group>
                  <el-button size="mini">全部</el-button>
                  <el-button size="mini">数字量</el-button>
                  <el-button size="mini">模拟量</el-button>
                </el-button-group>
              </el-col>
              <el-col :span="12">
                <div
                  style="
                    display: flex;
                    justify-content: end;
                    align-items: center;
                  "
                >
                  <div>
                    <span>时间范围：</span>
                  </div>
                  <div style="width: 100px">
                    <el-select
                      v-model="dataTimeRangeValue"
                      placeholder="请选择"
                      size="mini"
                      @change="get_semaphore_time"
                    >
                      <el-option
                        v-for="item in [
                          { value: 1, label: '±1分钟' },
                          { value: 3, label: '±3分钟' },
                          { value: 5, label: '±5分钟' },
                        ]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <div class="signal-panel">
                <div
                  class="singal-item"
                  v-for="(item, index) in signals"
                  v-bind:key="item.id"
                >
                  <SignalCom
                    :signal_name="item.name"
                    :signal_value="item.value"
                    :color="getColor(index)"
                  >
                  </SignalCom>
                </div>
                <!-- <div class="add-signal-btn" @click="modSignals">
                  <div><i class="el-icon-plus"></i></div>
                  <span> &nbsp;编辑信号量</span>
                </div> -->
              </div>
            </el-row>
            <div>
              <EChartsCom
                :width="'100%'"
                :height="'30dvh'"
                :option="signal_option"
              ></EChartsCom>
            </div>
          </div>
        </el-dialog>
      </div>
    </template>

    <el-dialog :visible.sync="dialogVisible" class="selector">
      <SignalSelector
        @cancel="cancel"
        @comfirm="comfirm"
        :initCheckList="sigletonSignal"
      />
    </el-dialog>
  </div>
</template>
<script>
import SignalCom from "@/components/SignalCom.vue";
import EChartsCom from "@/components/EChartsCom.vue";
import moment from "moment";
import { getLineTrains, alarmList, colors, lineData } from "@/api/api.js";
import SignalSelector from "@/components/SignalSelector.vue";
import { getLines, getTrains, getAlarmList } from "@/api/alarmInfo";
import { indicatorInfo, signalVal } from "@/api/trainClass";
import { bef_after } from "@/api/api.js";
export default {
  components: {
    SignalCom,
    EChartsCom,
    SignalSelector,
  },
  data() {
    return {
      // 弹窗
      SemaphoreVisible_: false,
      // 0报警  1预警
      type: null,
      lineValue: "",
      lineOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "11",
          label: "11",
        },
      ],
      trainValue: "",
      trainOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "11001002",
          label: "11001002",
        },
        {
          value: "11003004",
          label: "11003004",
        },
      ],
      subSysValue: "",
      subSysOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "辅助系统",
          label: "辅助系统",
        },
      ],
      stateValue: "",

      timerangeValue: "",
      alarmNameValue: "",
      alarmTypeValue: "",

      pageSize: 7,

      dialogVisible: false,

      currentPageValue: 1,

      dataTimeRangeValue: 5,

      tableData: {},
      selectedRow: [],
      currentRow: {},
      options: [
        {
          value: "11",
          label: "11",
        },
        {
          value: "12",
          label: "12",
        },
        {
          value: "13",
          label: "13",
        },
        {
          value: "14",
          label: "14",
        },
        {
          value: "15",
          label: "15",
        },
      ],
      value: "",

      signals: [
        {
          code: "i_DC_Out",
          name: "直流输出电流",
          signalName: "直流输出电流",
          value: 87,
        },
      ],

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
        series: [
          // lineData('电压', 1, new Date(), 1490, 1510),
          // lineData('电流', 0, new Date(), 40, 60)
        ],
      },
    };
  },
  beforeMount() {
    // 获取当前 线路、车号、预警/报警
    // console.log('当前参数:', this.$route.query);
    if (this.$route.query.trainNum) {
      // 线路
      this.lineValue = this.$route.query.trainNum.slice(0, 2);
      // console.log(this.lineValue);
    }
    // 车号
    this.trainValue = this.$route.query.trainNum;
    // console.log(this.trainValue);
    // 预警/报警
    this.type = this.$route.query.state;
    // console.log(this.type);
    //this.getSignalsData();
    this.getLinesData();
    this.getTrainsData();
  },
  mounted() {
    this.getAlarmListData();
  },
  computed: {
    sigletonSignal() {
      return this.signals
        .map((x) => x.signalName)
        .filter((value, index, self) => self.indexOf(value) === index);
    },
  },
  methods: {
    //获取线路数据
    getLinesData() {
      getLines().then((response) => {
        var data = response.data.data;
        var ldata = [];
        ldata.push({
          value: "",
          label: "全部",
        });
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          ldata.push({
            value: element.lineId,
            label: element.lineId,
          });
        }
        this.lineOptions = ldata;
      });
    },

    // 更改线路时触发
    lineValueChange() {
      this.getTrainsData();
      this.trainValue = null;
    },

    //获取列车数据
    getTrainsData() {
      getTrains(this.lineValue, 1, 10000).then((response) => {
        var data = response.data.data;
        var ldata = [];
        ldata.push({
          value: "",
          label: "全部",
        });
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          ldata.push({
            value: element.name,
            label: element.name,
          });
        }
        this.trainOptions = ldata;
      });
    },
    //获取预警列表数据
    getAlarmListData() {
      // getAlarmList(null, null, null, null, null, null, null, this.currentPageValue, this.pageSize).then(response => {
      //     var data = response.data;
      //     this.tableData = data
      // });
      this.query();
      // console.log('选中的ref',this.$refs.alarmTable);
    },
    // 调整查询的时间
    get_semaphore_time(time) {
      if (this.currentRow) {
        const adjustedTimeString = this.currentRow.createTime;
        const adjustedTime = new Date(adjustedTimeString);
        // 计算前一分钟的时间
        const oneMinuteBefore = new Date(
          adjustedTime.getTime() - time * 60 * 1000
        );
        // 计算后一分钟的时间
        const oneMinuteAfter = new Date(
          adjustedTime.getTime() + time * 60 * 1000
        );
        // 自定义格式化函数（可选）
        const formatDate = (date) => {
          const pad = (num) => (num < 10 ? "0" : "") + num;
          return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
          )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
          )}`;
        };
        this.initSignalData(
          formatDate(oneMinuteBefore),
          formatDate(oneMinuteAfter)
        );
      }
    },

    query() {
      var t = this.timerangeValue.split(",");
      var st = "";
      var et = "";
      if (t.length > 0) {
        st = t[0];
        et = t[1];
      }
      getAlarmList(
        this.lineValue,
        this.trainValue,
        this.stateValue,
        st,
        et,
        this.alarmNameValue,
        this.alarmTypeValue,
        this.currentPageValue,
        this.pageSize
      ).then((response) => {
        var data = response.data;
        this.tableData = data;
        // console.log(this.$refs.alarmTable);

        if (data.data.length > 0)
          this.$refs.alarmTable.setCurrentRow(this.tableData.data[0]);

        // 默认查询第一条完成后 开始获取信号量
        // 获取信号量数据
        let result = bef_after(this.currentRow.createTime, 5, 5);
        this.initSignalData(result.beforeTime, result.afterTime);
      });
    },
    reset() {
      this.lineValue = "全部";
      this.trainValue = "全部";
      this.subSysValue = "全部";
      this.stateValue = "全部";
      this.timerangeValue = "";
      this.alarmNameValue = "";
      this.alarmTypeValue = "";
    },

    getSignalsData() {
      var data = [];
      for (let i = 0; i < this.signals.length; i++) {
        data.push(lineData(this.signals[i], 1, new Date(), 1400, 1550));
      }

      this.signal_option.series = data;
    },
    // getSignalsVal(i) {
    //     return String(this.signal_option.series[i].data[0][1]);
    // },

    // 更改每页行数触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAlarmListData();
    },
    handleCurrentChange(val) {
      this.currentPageValue = val;
      this.getAlarmListData();
    },

    // 勾选记录触发
    handleSelectionChange(val) {
      this.selectedRow = val;
    },

    // 选中行时触发
    handleRowChange(val) {
      if (!val) return;
      this.currentRow = val;
      let result = bef_after(this.currentRow.createTime, 5, 5);
      this.initSignalData(result.beforeTime, result.afterTime);
    },

    formatTimestamp(timestamp) {
      return moment.unix(timestamp / 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    // 查看信号量详情
    semaphore_togg() {
      this.SemaphoreVisible_ = true;
    },
    goback() {
      this.$router.back();
    },
    modSignals() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
    },
    comfirm(val) {
      this.dialogVisible = false;
      var newSignals = [];
      signalVal(11001002, "", "", "", true).then((response) => {
        var data = response.data.data;

        for (let i = 0; i < val.length; i++) {
          const item = val[i];
          item.value =
            data[0][item.code.charAt(0).toLowerCase() + item.code.slice(1)];
          newSignals.push(item);
        }

        this.signals = newSignals;

        this.initSignalData();
      });
    },
    getColor(i) {
      return colors(i);
    },
    initSignalData(startTime, endTime) {
      var codes = this.signals
        .map((obj) => obj.code)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(",");

      signalVal(
        this.currentRow.trainNumber,
        codes,
        startTime || "2024-10-24 11:50:00.000",
        endTime || "2024-10-24 11:55:00.000",
        false
      ).then((response) => {
        var data = [];

        for (let i = 0; i < this.signals.length; i++) {
          var signal = this.signals[i];
          var axis = 0;
          if (signal.name.includes("电压")) axis = 1;
          else if (signal.name.includes("电流")) axis = 0;

          var temp = {
            name: signal.name,
            type: "line",
            showSymbol: true,
            smooth: false,
            yAxisIndex: axis,
            sample: "auto",
            data: response.data.data.map((x) => [
              x.createTime,
              x[signal.code.charAt(0).toLowerCase() + signal.code.slice(1)],
            ]),
          };

          data.push(temp);
        }
        this.signal_option.series = data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  background-color: #0b1121;
  color: #ffffffa6;
  min-height: 100dvh;
  width: 100dvw;
  font-size: 0.8rem;
  display: flex;

  .left-panel {
    background-color: #181f30;
    // height: 98dvh;
    width: 40dvw;
    margin: 1dvh;
    border-radius: 3px;
    padding: 1dvw;
    font-size: 14px;
  }

  .right-panel {
    background-color: #181f30;
    // height: 98dvh;
    width: 60dvw;
    margin: 1dvh;
    border-radius: 3px;
    padding: 1dvw;

    .diagnosis {
      flex: 1;
      margin: 0 10px;
      min-height: 10dvh;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem;
      background-color: #182030;

      .diagnosis-title {
        margin-bottom: 4px;
        color: #ffffffe6;
        font-size: 16px;
      }
    }

    .operate {
      flex: 1;
      margin: 0 10px;
      min-height: 10dvh;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem;
      background-color: #182030;

      .operate-title {
        margin-bottom: 4px;
        color: #ffffffe6;
        font-size: 16px;
      }
    }

    .content {
      font-size: 14px;
      line-height: 22px;
    }

    .signal-panel {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;

      .singal-item {
        margin: 0.4rem;
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

      .selector {
        padding: 0;
      }
    }
  }

  /* 信号量弹出层 */
  .panel .pop_ups .el-dialog__body {
    background-color: #181f30;
    padding: 0px;
  }

  // 弹出层
  .pop_ups .right-panel2 {
    box-sizing: border-box;
    background-color: #181f30;
    min-width: 100%;
    margin: 0;
    border-radius: 3px;
  }
}
</style>

<style lang="less">
.panel .el-row {
  margin-bottom: 1dvh;

  &:last-child {
    margin-bottom: 0;
  }
}

// 时间框颜色
.el-input__inner {
  background-color: #181f30 !important;
}

.panel .el-select .el-input__inner {
  background-color: #181f30 !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.panel .el-range-editor.el-input__inner {
  height: 2rem;
  /* width: 39%; */
  background: transparent;
  border: #33384c solid 1px;
}

.panel .el-input__inner {
  background-color: #181f30;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffffa6;
}

.panel .el-input.is-disabled .el-input__inner {
  background-color: #181f30;
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffffa6;
}

.el-range-editor .el-range-input {
  line-height: 1;
  background-color: #181f30;
}

.el-input-group__append .el-button,
.el-input-group__append .el-input,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-input,
.el-input__inner {
  font-size: 14px;
}

.el-picker-panel {
  color: #ffffffa6;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #181f30;
  border-radius: 4px;
  line-height: 30px;
  margin: 5px 0;
}

.el-picker-panel__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 4px;
  text-align: right;
  background-color: #181f30;
  position: relative;
  font-size: 0;
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #314665;
}

.el-time-panel {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: #181f30;
}

.el-time-spinner__item {
  color: #ffffffa6;
}

.el-time-panel__btn {
  color: #ffffffa6;
}

.el-time-spinner__item.active:not(.disabled) {
  color: #ffffffca;
}

.el-time-spinner__item:hover:not(.disabled):not(.active) {
  background: #4a5463;
}

.el-date-editor .el-range__icon {
  line-height: 26px;
}

.el-date-editor .el-range-separator {
  line-height: 26px;
  color: #626468;
}

.el-button {
  background: #181f30;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffffa6;
}
</style>

<style scoped>
.crrc-tag-blue {
  color: #2186cf;
  background-color: #14232e;
  border-color: #2186cf;
}

.crrc-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  white-space: nowrap;
  border-width: 1px;
  border-radius: 12px;
  margin-left: 5px;
}

.crrc-tag-middle {
  height: 24px;
  border-radius: 4px;
}

.crrc-tag-round.crrc-tag-middle {
  border-radius: 24px;
}

.crrc-tag-status-dot {
  position: relative;
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  vertical-align: middle;
  border-radius: 50%;
}

.crrc-tag-blue .crrc-tag-badge {
  background-color: #2186cf;
}

.crrc-tag-orange {
  color: #ffa55c;
  background-color: #35281d;
  border-color: #ffa55c;
}

.crrc-tag-orange .crrc-tag-badge {
  background-color: #ffa55c;
}

.crrc-tag-blue .crrc-tag-badge {
  background-color: #2186cf;
}
</style>

<style>
.el-select {
  width: 100%;
}
.panel .el-dialog__body {
  /* height: 70dvh; */
  padding: 0;
}
.el-select-dropdown {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: #181f30;
}

.el-popper .popper__arrow {
  visibility: hidden;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #223147;
}

.panel .el-divider {
  background-color: #303645;
}

.panel .el-dialog {
  padding: 0;
}

.panel .el-dialog__header {
  display: none;
}

.selector.panel .el-dialog__body {
  height: 70dvh;
  padding: 0;
}

.panel .el-table tr {
  background-color: #181f30;
  color: #aeb1b7;
}

.panel.el-table thead {
  color: #e9eaec;
}

.panel .el-table th.el-table__cell {
  background-color: #20283c;
}

.panel .el-table__footer-wrapper,
.el-table__header-wrapper {
  background-color: #20283c;
}

.panel .el-table__body tr.current-row:hover > td.el-table__cell,
.el-table__body tr.selection-row > td.el-table__cell {
  background-color: #005db4;
}

.panel .el-table__body tr.current-row > td.el-table__cell,
.el-table__body tr.selection-row > td.el-table__cell {
  background-color: #005db4;
}

.panel .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #3a404f;
  font-size: 12px;
}

.panel .el-table__body tr:hover > td.el-table__cell {
  background-color: transparent;
}

.panel .el-pager li {
  background-color: #181f30;
  color: #aeb1b7;
}

.panel .el-pager li.active {
  color: #2186cf;
}

.panel .el-pagination button:disabled {
  background-color: transparent;
  color: #525764;
}

.panel .el-pagination .btn-next,
.el-pagination .btn-prev {
  background-color: transparent;
  color: #aeb1b7;
}

.panel .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.panel .el-table::before {
  height: 0;
}

.panel .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>

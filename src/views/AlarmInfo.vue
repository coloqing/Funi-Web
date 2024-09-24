<template>
    <div class="panel">
        <div class="left-panel">
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>线路号</div>
                        <div>
                            <el-select v-model="lineValue" placeholder="请选择" size="mini">
                                <el-option v-for="item in lineOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>车号</div>
                        <div>
                            <el-select v-model="trainValue" placeholder="请选择" size="mini">
                                <el-option v-for="item in trainOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
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
                                <el-option v-for="item in subSysOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>状态</div>
                        <div>
                            <el-select v-model="stateValue" placeholder="请选择" size="mini">
                                <el-option v-for="item in stateOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>时间</div>
                        <div>
                            <el-date-picker v-model="timerangeValue" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>预警名称</div>
                        <div>
                            <el-input size="mini" placeholder="请输入" v-model="alarmNameValue" clearable>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>预警类型</div>
                        <div>
                            <el-input size="mini" placeholder="请输入" v-model="alarmTypeValue" clearable>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="12">
                        <div style="display: flex;justify-content: end;">
                            <el-button size="mini" type="primary">查询</el-button>
                            <el-button size="mini">重置</el-button>
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
                        <div style="display: flex;justify-content: end;">
                            <el-button size="mini">导出(已选择0项)</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <div>
                        <!-- <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                                    style="width: 100%" @selection-change="handleSelectionChange">
                                    <el-table-column type="selection">
                                    </el-table-column>
                                    <el-table-column label="预警名称">
                                    </el-table-column>
                                    <el-table-column prop="name" label="子系统">
                                    </el-table-column>
                                    <el-table-column prop="address" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="address" label="开始时间">
                                    </el-table-column>
                                    <el-table-column prop="address" label="结束时间">
                                    </el-table-column>
                                </el-table> -->
                    </div>
                </el-row>

                <el-row>
                    <div>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPageValue" :page-sizes="[7, 14, 28, 56]" :page-size="100"
                            layout="sizes, prev, pager, next, jumper" :total="5">
                        </el-pagination>
                    </div>
                </el-row>
            </div>
        </div>
        <div ref="fsbtn" class="right-panel">
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="16">
                    <div style="display: flex;align-items: center;">
                        <div>
                            <h2>A2车SIV-B反馈 蓄电池电压低红色报警指示</h2>
                        </div>
                        <div class="crrc-tag crrc-tag-orange crrc-tag-middle crrc-tag-round">
                            <span class="crrc-tag-status-dot crrc-tag-badge "></span>
                            未消除
                        </div>
                        <div class="crrc-tag crrc-tag-blue crrc-tag-middle crrc-tag-round">
                            <span class="crrc-tag-status-dot crrc-tag-badge  "></span>
                            车载消除
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="display: flex;justify-content: end;">
                        <el-button size="mini" @click="goback">返回</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <span>线路：11</span>
                </el-col>
                <el-col :span="6">
                    <span>车型：E11</span>
                </el-col>
                <el-col :span="6">
                    <span>车号：11013014</span>
                </el-col>
                <el-col :span="6">
                    <span>车厢：A11</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <span>子系统：辅助系统</span>
                </el-col>
                <el-col :span="6">
                    <span>预警等级：中等预警</span>
                </el-col>
                <el-col :span="6">
                    <span>预警码：siv20012</span>
                </el-col>
                <el-col :span="6">
                    <span>发生时间：2024-09-13 09:29:33</span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <div style="display: flex;">
                    <div class="diagnosis">
                        <div class="diagnosis-title">诊断逻辑</div>
                        <div class="content">充电机温度传感器大于150℃或者小于-50℃（该故障为警告，充电机继续保持工作）</div>
                    </div>
                    <div class="operate">
                        <div class="operate-title">操作处置建议</div>
                        <div class="content">
                            1.检查蓄电池；2.检查充电机是否工作{{ text }}
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <span style="font-size: 1dvw;">信号量</span>
                </el-col>
                <el-col :span="12">
                    <div style="color: white; display: flex;justify-content: end;">
                        <div style="margin-right: 5px;">

                            <svg @click="goback" t="1726801127036" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="878" width="22" height="22">
                                <path
                                    d="M882.176 190.610286l-174.08 174.153143a34.304 34.304 0 0 1-48.493714-48.493715l174.153143-174.08H694.198857a34.304 34.304 0 0 1 0-68.608h222.281143c18.944 0 34.304 15.36 34.304 34.304v222.281143a34.304 34.304 0 0 1-68.608 0V190.610286z m-56.758857 646.875428l-174.811429-174.811428a36.571429 36.571429 0 1 1 51.785143-51.638857l174.738286 174.738285V636.854857a36.571429 36.571429 0 0 1 73.142857 0v237.202286a36.571429 36.571429 0 0 1-36.571429 36.571428H676.498286a36.571429 36.571429 0 0 1 0-73.142857h148.918857zM197.997714 146.285714l176.566857 176.566857a36.571429 36.571429 0 1 1-51.712 51.712L146.285714 197.997714v148.918857a36.571429 36.571429 0 0 1-73.142857 0V109.714286a36.571429 36.571429 0 0 1 36.571429-36.571429h237.202285a36.571429 36.571429 0 0 1 0 73.142857H197.997714zM146.285714 772.388571l176.566857-176.566857a36.571429 36.571429 0 1 1 51.712 51.785143l-176.566857 176.566857h148.918857a36.571429 36.571429 0 1 1 0 73.142857H109.714286a36.571429 36.571429 0 0 1-36.571429-36.571428V623.542857a36.571429 36.571429 0 1 1 73.142857 0v148.918857z"
                                    fill="#ffffff" p-id="879"></path>
                            </svg>
                        </div>
                        <div>
                            <svg t="1726801203625" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2803" width="22" height="22">
                                <path
                                    d="M925.55776 731.0592c-13.952 0-25.26208 11.20768-25.41568 25.1648l0 155.89888c0 35.25632-1.77664 30.63808-36.98176 30.63808L152.6272 942.76096c-35.20512 0-48.44544 4.61312-48.44544-30.63808L104.18176 129.38752c0-35.26144 13.24032-34.44736 48.44544-34.44736l710.53824 0c35.20512 0 36.98176-0.81408 36.98176 34.44736l0 152.0896 0.3584 0c1.97632 12.07808 12.43136 21.30944 25.05728 21.30944 12.64128 0 23.1424-9.23136 25.1136-21.30944l0.3072 0 0-177.3056c0-35.20512-28.50816-63.76448-63.72352-63.76448L117.06368 40.40704c-35.20512 0-63.7184 28.55936-63.7184 63.76448L53.34528 933.4784c0 35.25632 28.50816 63.8208 63.7184 63.8208l770.19136 0c35.21536 0 63.72352-28.56448 63.72352-63.8208L950.97856 756.224C950.82496 742.272 939.51488 731.0592 925.55776 731.0592L925.55776 731.0592zM1004.34944 507.59168c-1.26976-2.53952-2.944-4.92544-5.07392-7.10656-1.21344-1.21344-2.5344-2.28352-3.95264-3.24608l-246.5536-246.7072c-9.23136-9.23136-24.7552-8.62208-34.65216 1.32096-9.93792 9.93792-10.55744 25.46176-1.31584 34.65216l206.01344 206.16704L405.01248 492.672c-14.0032 0-25.41568 11.3664-25.41568 25.4208 0 14.04928 11.41248 25.46688 25.41568 25.46688l515.27168 0-207.48288 207.59552c-9.23648 9.22624-8.6272 24.75008 1.31584 34.69312 9.89696 9.94816 25.4208 10.50624 34.65216 1.32096l246.5536-246.75328c1.41824-0.91648 2.7392-2.02752 3.95264-3.24608 2.12992-2.13504 3.80416-4.56704 5.07392-7.11168 1.72544-3.14368 2.6368-6.69184 2.73408-10.29632l0-1.82272C1006.98624 514.33984 1006.07488 510.78656 1004.34944 507.59168L1004.34944 507.59168z"
                                    fill="#ffffff" p-id="2804"></path>
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
                    <span>时间范围：</span>
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <div class="signal-panel">
                    <div class="singal-item" v-for="i in 3" v-bind:key="i">
                        <SignalCom :signal_name="'A1-充电机输出电流传感器BC11'" signal_value="50A" :color="'#ac3577'">
                        </SignalCom>
                    </div>
                    <div class="add-signal-btn">
                        <div> <i class="el-icon-plus"></i></div>
                        <span> &nbsp;编辑信号量</span>
                    </div>
                </div>
            </el-row>
            <div>
                <EChartsCom :width="'100%'" :height="'30dvh'" :option="signal_option"></EChartsCom>
            </div>
            <el-divider></el-divider>
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
            </div>
        </div>
    </div>

</template>
<script>
import SignalCom from '@/components/SignalCom.vue';
import EChartsCom from '@/components/EChartsCom.vue';
import moment from 'moment';
import { test, getLineTrains } from '@/api/api.js'

export default {
    components: {
        SignalCom,
        EChartsCom
    },
    data() {
        return {
            lineValue: '',
            lineOptions: [{
                value: '',
                label: '全部'
            },
            {
                value: '11',
                label: '11'
            }],
            trainValue: '',
            trainOptions: [{
                value: '',
                label: '全部'
            },
            {
                value: '11001002',
                label: '11001002'
            },
            {
                value: '11003004',
                label: '11003004'
            }],
            subSysValue: '',
            subSysOptions: [{
                value: '',
                label: '全部'
            },
            {
                value: '辅助系统',
                label: '辅助系统'
            }],
            stateValue: '',
            stateOptions: [{
                value: '',
                label: '全部'
            },
            {
                value: '已消除',
                label: '已消除'
            },
            {
                value: '未消除',
                label: '未消除'
            }],

            timerangeValue: '',
            alarmNameValue: '',
            alarmTypeValue: '',

            currentPageValue: 1,

            tableData: {},
            options: [{
                value: '11',
                label: '11'
            }, {
                value: '12',
                label: '12'
            }, {
                value: '13',
                label: '13'
            }, {
                value: '14',
                label: '14'
            }, {
                value: '15',
                label: '15'
            }],
            value: '',
            signal_option: {
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
        }
    },
    mounted() {
        var temp = [{
            value: '',
            label: '全部'
        }]

        var lineTrains = getLineTrains().array

        for (let i = 0; i < lineTrains.length; i++) {
            const item = lineTrains[i];
            temp.push({
                value: item.number,
                label: item.number
            })
        }

        this.trainOptions = temp
    },
    computed: {
        text() {
            return test();
        }
    },
    methods: {
        handleSizeChange() {
        },
        handleCurrentChange() {

        },
        handleSelectionChange() {

        },
        goback() {
            this.$router.back()
        }
    }
}
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
            border: 1px solid rgba(255, 255, 255, .1);
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
            border: 1px solid rgba(255, 255, 255, .1);
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
        }
    }
}
</style>

<style>
.el-row {
    margin-bottom: 1dvh;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-select .el-input__inner {
    background-color: #181f30 !important;
    border: 1px solid rgba(255, 255, 255, .15);
}


.el-range-editor.el-input__inner {
    height: 2rem;
    /* width: 39%; */
    background: transparent;
    border: #33384c solid 1px;
}

.el-input__inner {
    background-color: #181f30;
    border: 1px solid rgba(255, 255, 255, .15);
    color: #ffffffa6;
}

.el-input.is-disabled .el-input__inner {
    background-color: #181f30;
    border-color: rgba(255, 255, 255, .15);
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
    border: 1px solid rgba(255, 255, 255, .15);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    background-color: #181f30;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
}

.el-picker-panel__footer {
    border-top: 1px solid rgba(255, 255, 255, .15);
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
    border: 1px solid rgba(255, 255, 255, .15);
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

.el-button {
    background: #181f30;
    border: 1px solid rgba(255, 255, 255, .15);
    color: #ffffffa6;
}

.el-table thead {
    color: #e9eaec;
}

.el-table th.el-table__cell {
    background-color: #20283c;
}

.el-pager li {
    background: #20283c;
}

.el-pager li.active {
    color: #409EFF;
}

.el-pagination button:disabled {
    color: #ffffffca;
    background-color: #20283c;
}

.el-table__footer-wrapper,
.el-table__header-wrapper {
    background-color: #20283c;
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
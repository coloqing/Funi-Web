<template>
  <div class="warning">
    <!-- 报警记录 -->
    <div class="line_alarm">
      <!-- 报警title -->
      <div class="alarm_title">
        <div class="recording font_size26w">
          {{ msg ? "实时预警" : "实时报警" }}
        </div>
        <!-- 日期选择 -->
        <!-- <div class="alarm_choose">
                    <div class="alarm_time1">近7天</div>
                    <div class="alarm_time2">近30天</div>
                    <div class="alarm_time3">近12个月</div>
                </div> -->
        <!-- 年月日选择器 -->
        <!-- <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker> -->
        <!-- 历史分析 -->
        <!-- <div class="alarm_history">历史分析</div> -->
      </div>
      <!-- 列表头部 -->
      <div class="alarm_header font_size20">
        <div class="train_number header_train_number">车号</div>
        <div class="state header_state">车厢</div>
        <div class="alarm header_alarm" v-if="!msg">报警名称</div>
        <div class="alarm header_alarm" v-else>预警名称</div>
        <div class="forewarn header_forewarn">发生时间</div>
        <div class="operate header_operate">操作</div>
      </div>
      <!-- 报警body -->
      <div class="alarm_body font_size18">
        <div class="train_body_list" v-for="(item, n) in message" :key="n">
          <!-- 车号-->
          <div class="train_number body_train_number">{{ item.trainNumber }}</div>
          <!-- 车厢-->
          <div class="state body_state">
            <div class="state_border">{{ item.carriageNumber }}</div>
          </div>
          <!-- 报警名称-->
          <div class="alarm body_alarm">{{ item.name }}</div>
          <!--发送时间-->
          <div class="forewarn body_forewarn">{{ item.createTime }}</div>
          <!--操作 -->
          <div class="operate body_operate">
            <router-link
              :to="{ path: '/AlarmInfo', query: { trainNum: item.trainNumber ,carriage:item.carriageNumber,state:msg}}"
              class="router_link"
              >详情</router-link
            >
          </div>
        </div>
        <div class="null" v-if="!message.length">暂无数据~</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFaultWarn } from "@/api/components/warning";
export default {
  name: "warning",
  props: {
    msg: Number,
    train_value: String,
  },
  data() {
    return {
      // value1: '',
      // 实时数据
      message: [],
    };
  },
  methods: {
    // 获取实时报警、实时预警信息
    get_state() {
      getFaultWarn({
        trainNum: this.train_value,
        pageIndex: 1,
        pageRow: 20,
        alarmType: this.msg === 0 ? 3 : 2,
      }).then((response) => {
        if (response.data.code === 200) {
          this.message = response.data.data;
          //   console.log("获取实时报警/预警 列表:", response.data.data);
        } else {
          console.error("获取实时报警/预警 列表");
        }
      });
    },
  },
  created() {
    this.get_state();
  },
};
</script>

<style lang="less" scoped>
.warning {
  height: 100%;
  padding: 0 0.5vw;
  background: #181f30;

  // 报警记录
  .line_alarm {
    min-height: 100%;
    max-height: 100%;
    height: 100%;

    // overflow: hidden;
    // font-size: 1vw;
    .train_number {
      width: 15%;
    }

    .state {
      width: 15%;

      > .state_border {
        width: 2.5rem;
        height: 1.5rem;
        box-sizing: border-box;
        // border: #555b69 solid 0.1rem;
        line-height: 1.5rem;
        border-radius: 30px;
        // text-align: center;
        // font-size: 1vw;
        letter-spacing: 2px;
      }
    }

    .alarm {
      width: 30%;
    }

    .forewarn {
      width: 30%;
    }

    .operate {
      width: 10%;
    }

    // 报警title
    .alarm_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 12%;

      // 报警记录
      .recording {
        // flex: 2;
        width: 15%;
        min-width: 61px;
        // flex: 0 0 auto;
      }

      // 日期选择
      .alarm_choose {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // flex: 2.9;
        width: 25%;
        min-width: 140px;
        box-sizing: border-box;
        padding-right: 10px;
      }

      // 日期选择器
      .el-range-editor.el-input__inner {
        // background-color: pink;
        min-width: 183px;
        height: 23px;
        // flex: 3.9;
        width: 39%;
        background: transparent;
        border: #33384c solid 1px;
        // width: 268px;
        // transform: scale(0.6);
      }

      // 历史分析
      .alarm_history {
        // flex: 1;
        width: 12%;
        min-width: 56px;
      }
    }

    // 报警头部
    .alarm_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #20283b;
      // height: 12%;
      height: 3.5vh;
      border-top: 0.25rem solid #181f32;
      box-sizing: border-box;
      padding: 0 0.5vw;
    }

    // 报警/预警body
    .alarm_body {
      // background-color: #181f31;
      background-color: #192138;
      height: 76%;
      color: #989eae;
      overflow-y: auto;

      // font-size: 1vw;
      .train_body_list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // height: 1.875rem;
        // height: 5vh;
        height: 2.9vw;

        // 设备状态
        .body_state {
          // padding-left: 0.5rem;
        }

        // 操作
        .body_operate {
          color: #164b7d;
        }
      }
    }
  }
}
</style>

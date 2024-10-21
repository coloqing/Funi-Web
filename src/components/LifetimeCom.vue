<template>
  <div class="warning">
    <!-- 报警记录 -->
    <div class="line_alarm">
      <!-- 报警title -->
      <div class="alarm_title">
        <div class="recording font_size26w">寿命预测</div>
      </div>
      <!-- 列表头部 -->
      <div class="alarm_header font_size20">
        <div class="train_number header_train_number">车厢</div>
        <div class="dev-name header_state">设备名称</div>
        <div class="usage header_state">使用量</div>
        <div class="remain header_forewarn">剩余寿命</div>
        <div class="utime header_forewarn">更新时间</div>
      </div>
      <!-- 报警body -->
      <div class="alarm_body font_size18">
        <div class="train_body_list" v-for="(item,n) in message" :key="n">
          <!-- 车厢-->
          <div class="train_number body_train_number">{{item.cx}}</div>
          <!-- 设备名称 -->
          <div class="dev-name body_train_number">{{item.name}}</div>
          <!-- 使用量-->
          <div class="usage body_alarm">{{item.runLife}}</div>
          <!--剩余寿命-->
          <div class="remain body_forewarn">{{ item.percent }}%</div>
          <!--更新时间-->
          <div class="utime body_forewarn">20:49:28</div>
        </div>
        <div class="null" v-if="!message.length">暂无数据~</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPartsLife } from "@/api/components/LifetimeCom";
export default {
  props: {
    train_value: String,
  },
  data() {
    return {
      // value1: '',
      message:[],
    };
  },
  methods: {
    // 获取实时报警、实时预警信息
    get_parts_life() {
      getPartsLife({
        cxh: this.train_value,
        pageIndex: 1,
        pageRow: 20,
        sortFile:'Percent',
        sortType:'desc'
      }).then((response) => {
        if (response.data.code === 200) {
          this.message = response.data.data;
        //   console.log("获取寿命 列表:", response.data.data);
        } else {
          console.error("获取寿命 列表失败");
        }
      });
    },
  },
  created() {
    // 获取寿命数据
    this.get_parts_life()


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

    .dev-name {
      width: 30%;
    }

    .usage {
      width: 10%;
    }

    .remain {
      width: 15%;
    }

    .utime {
      width: 20%;
    }

    .alarm {
      width: 25%;
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
@/api/components/LifetimeCom
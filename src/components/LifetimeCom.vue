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
                <div class="train_body_list" v-for="n in 13" :key="n">
                    <!-- 车厢-->
                    <div class="train_number body_train_number">A1</div>
                    <!-- 设备名称 -->
                    <div class="dev-name body_train_number">辅变1KMA接触器</div>
                    <!-- 使用量-->
                    <div class="usage body_alarm">
                        43
                    </div>
                    <!--剩余寿命-->
                    <div class="remain body_forewarn">
                        100%
                    </div>
                    <!--更新时间-->
                    <div class="utime body_forewarn">
                        20:49:28
                    </div>
                </div>
            </div>
        </div>


    </div>


</template>

<script>
export default {
    props: {
    },
    data() {
        return {
            // value1: '',
        }
    }
}
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
            width: 10%;
        }

        .dev-name {
            width: 40%;
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

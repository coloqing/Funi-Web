<template>
    <div class="signal">
        <div id="mask"></div>
        <div class="side-bar" :style="cssVariables"></div>
        <div class="right-panel">
            <div class="signal-name">{{ signal_name }}</div>
            <div class="signal-value">{{ signal_value }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        signal_name: String,
        signal_value: String,
        color: String
    },
    computed: {
        cssVariables() {
            return {
                '--color': this.color
            };
        }
    }
}
</script>

<style lang="less" scoped>
.signal {
    background-color: #242a3b;
    height: 5dvh;
    width: 11dvw;
    display: flex;
    border-radius: 2px;
    position: relative;

    #mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        /* 半透明黑色 */
        z-index: 1000;
        /* 确保遮罩在最前面 */
        display: none;
        /* 初始状态隐藏 */
    }

    .side-bar {
        width: 0.15dvw;
        height: 5dvh;
        background-color: var(--color);
        margin-right: 0.3dvw;
    }

    .right-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.3vh;

        .signal-name {
            color: #b3b5bb;
            font-size: 0.7dvw;
        }

        .signal-value {
            color: white;
            font-size: 0.8dvw;
        }
    }


}
</style>
<template>
    <div ref='echartref' :style="{ height: height, width: width }"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
    props: {
        width: String,
        height: String,
        option: Object
    },
    data() {
        return {
            bar_echarts: null
        }
    },
    mounted() {
        if (this.$refs.echartref) {
            this.bar_echarts = echarts.init(this.$refs.echartref);
            this.bar_echarts.setOption(this.option)
        }
    },
    watch: {
        option: {
            handler(newVal, oldVal) {
                this.option = newVal;
                this.bar_echarts.setOption(this.option)
            },
            deep: true
        },

    }
}
</script>

<style lang="less" scoped></style>
<template>
    <div ref='bar' :style="{ height: height, width: width }"></div>
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
        if (this.$refs.bar) {
            this.bar_echarts = echarts.init(this.$refs.bar);
            this.bar_echarts.setOption(this.option)
        }
    },
    watch: {
        option(newValue) {
            this.option = newValue;
            this.bar_echarts.setOption(this.option)
        }
    }
}
</script>

<style lang="less" scoped></style>
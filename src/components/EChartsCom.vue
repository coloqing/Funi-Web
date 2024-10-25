<template>
  <div ref="echartref" :style="{ height: height, width: width }"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    width: String,
    height: String,
    option: Object,
  },
  data() {
    return {
      bar_echarts: null,
      //   被选中的值
      array_name: [],
    };
  },
  methods: {
    ets_togg(Name, bol) {
      //   console.log("子组件执行", Name);
      //   if (!bol) {
      for (let i = 0; i < Name.length; i++) {
        this.bar_echarts.dispatchAction({
          type: "legendToggleSelect",
          name: Name[i],
        });
        for (let j = this.array_name.length; j > -1; j--) {
            if(this.array_name[j] ===  Name[i]){
                this.array_name.splice(i, 1)
                break
                j--
            }else{
                if (j === 0) {
                    this.array_name.push(Name[i])
                }
            }
            
        }
      }
      //   }
    },
    // 多余方法
    show(Name, bol) {
      // console.log('折线');
      if (bol) {
        this.option.legend.selected = [];
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendToggleSelect",
            name: Name[i],
          });
        }
      } else {
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendToggleSelect",
            name: Name[i],
          });
        }
      }
    },
    // 控制 透明度
    _togg(Name, bol) {
      if (bol) {
        // 透明其它元素
        // 遍历所有系列，除了当前被鼠标悬停的那个系列
        this.option.series.forEach(function (series) {
          if (series.name !== Name) {
            // 设置其他系列的透明度
            series.lineStyle.opacity = 0.1; // 你可以根据需要调整这个值
            series.itemStyle.opacity = 0.1;
          }
        });
        // 由于直接修改 option 不会触发更新，我们需要使用 setOption 并禁用合并
        this.bar_echarts.setOption(this.option, true);
      } else {
        //恢复
        // 恢复所有系列的透明度
        this.option.series.forEach(function (series) {
          series.lineStyle.opacity = 1;
          series.itemStyle.opacity = 1;
        });
        // 同样地，我们需要使用 setOption 并禁用合并来更新图表
        this.bar_echarts.setOption(this.option, true);
      }
    },
  },
  mounted() {
    if (this.$refs.echartref) {
      this.bar_echarts = echarts.init(this.$refs.echartref);
      this.bar_echarts.setOption(this.option);
      this.bar_echarts.on("legendToggleSelect", (params) => {
        console.log(params.name);
      });
    }
    console.log(this.bar_echarts);
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        this.option = newVal;
        this.bar_echarts.clear();
        this.bar_echarts.setOption(newVal);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>

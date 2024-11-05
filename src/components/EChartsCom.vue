<template>
  <div  ref="echartref" :style="{ height: height, width: width }"></div>
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
      // 取消选中
      select_no: [],
    };
  },
  methods: {
    ets_togg(Name, bol) {
      // console.log("子组件执行是否隐藏：", bol, "传递的值", Name);
      // for (let i = 0; i < Name.length; i++) {
      //   this.bar_echarts.dispatchAction({
      //     type: "legendToggleSelect",
      //     name: Name[i],
      //   });
      // }
      
      if (bol) {
        this.option.legend.selected = [];
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendSelect",
            name: Name[i],
          });
          // 移除 select_no 中的项
          const filteredSelectNo = this.select_no.filter(
            (item) => !Name.includes(item)
          );
          this.select_no = filteredSelectNo;
        }
      } else {
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendUnSelect",
            name: Name[i],
          });
          // 增加 select_no 中的项
          this.select_no.push(Name[i]);
          this.select_no = [...new Set(this.select_no)];
        }
      }
    },
    // 多余方法
    show(Name, bol) {
      // console.log('折线');
      if (bol) {
        this.option.legend.selected = [];
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendSelect",
            name: Name[i],
          });
        }
      } else {
        for (let i = 0; i < Name.length; i++) {
          this.bar_echarts.dispatchAction({
            type: "legendUnSelect",
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
              console.log('操作的对象',series.lineStyle);
              
            series.lineStyle.opacity = 0.2; // 你可以根据需要调整这个值
            // series.itemStyle.opacity = 0.1;
          }
        });
        // 由于直接修改 option 不会触发更新，我们需要使用 setOption 并禁用合并
        // this.bar_echarts.setOption(this.option, false );
      } else {
        //恢复
        // 恢复所有系列的透明度
        this.option.series.forEach(function (series) {
          series.lineStyle.opacity = 1;
          // series.itemStyle.opacity = 1;
        });
        // 同样地，我们需要使用 setOption 并禁用合并来更新图表
        // this.bar_echarts.setOption(this.option, false );
      }
      this.bar_echarts.setOption(this.option, false);
      // 移入移除后 重新控制取消选中的元素进行取消选中
      this.show(this.select_no, false)
    },
    },
  mounted() {
    if (this.$refs.echartref) {
      this.bar_echarts = echarts.init(this.$refs.echartref);
      this.bar_echarts.setOption(this.option);
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        this.option = newVal;
        // this.bar_echarts.clear();
        this.bar_echarts.setOption(newVal,true);
        console.log('重新渲染',newVal);
        this.show(this.select_no, false)
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>

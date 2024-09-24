<template>
  <div id="app" style="font-size: 14px">
    <!-- <router-view /> -->
    <!-- 页面计算适配测试 -->
    <!-- 最大变化元素 -->
    <!-- <div class="change_container" :style="{ width: screenWidth + 'px', height: screenHeight + 'px' }"> -->
    <div class="change_container" :style="{ width: '100dvw', height: '100dvh' }">
      <router-view />
    </div>
  </div>
</template>
<script>
import * as HomeView from "./views/HomeView.vue";
export default {
  name: "App",
  components: {
    HomeView,
  },
  data() {
    return {
      screenWidth: window.innerWidth, // 初始屏幕宽度
      screenHeight: window.innerHeight, // 初始屏幕高度
    };
  },
  mounted() {
    // 组件挂载后添加事件监听器
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听器，防止内存泄漏
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      // 更新屏幕宽度和高度
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      //  原始页面采用16:9 1600：900     this.screenWidth * y = 1600 * 900
      // if(this.screenWidth > 1600){
      //   this.screenWidth = 1600
      //   this.screenHeight = (1600*900)/this.screenWidth
      // }else{
      this.screenWidth = this.screenWidth;
      this.screenHeight =
        (this.screenWidth * this.screenWidth * (9 / 16)) / this.screenWidth;
      // }
    },
  },
};
</script>
<!-- less 只使用嵌套式写法 -->
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #181f31;
}

.router_link {
  color: #164b7d;
  text-decoration: none;
}

::-webkit-scrollbar {
  display: none;
}

#app {
  background-color: #0b1121;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    Segoe UI Symbol,
    "Noto Color Emoji";
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: "tnum";
}

//-------------------页面适配-------------------------
// .change_container{
//   background-color: rgb(204, 26, 56);
// }
// 文本大小统一
// 标题
.font_size26w {
  // font-size: 1.2vw; //26
  font-size: 1vw;
  font-weight: bold;
}

// 表头
.font_size20 {
  font-size: 1vw; //20
}

// 小号表头(特殊文本)
.font_size16 {
  font-size: 0.6vw; //16
}

// 普通文本
.font_size18 {
  font-size: 0.85vw; //18
}

// 状态(特殊文本)
.font_size24 {
  font-size: 1.1vw; //24
}
</style>
